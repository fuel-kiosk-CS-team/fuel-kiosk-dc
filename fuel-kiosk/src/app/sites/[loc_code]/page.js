'use client';

import React, { useContext, useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import {
    Container,
    Title,
    Loader,
    Alert,
    Paper,
    Button,
    Stack,
    Text,
} from '@mantine/core';

import { FuelTypeSelector } from '../../components/fuelselector/FuelTypeSelector';
import { TotalizerVerification } from '../../components/totalizer/TotalizerVerification';
import { FuelEntryForm } from '../../components/fuelentry/FuelEntryForm';
import { FuelFlowStatus } from '../../components/dashboard/contents/FuelFlowStatus';
import { FuelFlowContext } from "../../components/context/FuelFlowProvider";

export default function FuelSitePage({ params: paramsPromise }) {
    const router = useRouter();
    const params = use(paramsPromise);

    const { loc_code } = params;

    const [step, setStep] = useState('SELECT_FUEL');
    const [resetTotalizer, setResetTotalizer] = useState(false);

    const [selectedFuelType, setSelectedFuelType] = useState(null);
    const [totalizerValue, setTotalizerValue] = useState(null);

    const [siteInfo, setSiteInfo] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { socket, timeoutID } = useContext(FuelFlowContext);
    const [socketValue, setSocketValue] = socket;
    const [timeoutIDValue, setTimeoutIDValue] = timeoutID;

    useEffect(() => {
        const fetchSiteInfo = async () => {
            try {
                const response = await fetch(`/api/sites/${loc_code}`);
                const site = await response.json();

                if (!site || site.LOC_loc_code === 'ADMIN') {
                    setError('Site not found');
                } else {
                    setSiteInfo(site);
                }
            } catch (error) {
                setError('Error loading site information');
            } finally {
                setLoading(false);
            }
        };

        fetchSiteInfo();
    }, [loc_code, router]);

    const updateTotalizerValue = async (fuelType) => {
        if (!siteInfo || !fuelType) return;

        try {
            const response = await fetch(`/api/sites/${siteInfo.LOC_loc_code}?fuel_type=${fuelType}&totalizer=true`);
            const data = await response.json();

            if (data?.FuelTransactions?.length > 0) {
                setTotalizerValue(data.FuelTransactions[0].totalizer_end);
            } else {
                setTotalizerValue('0.0');
            }
        } catch (error) {
            console.error("Error fetching totalizer value:", error);
        }
    }

    if (loading) {
        return (
            <Container p="md" style={{ textAlign: 'center' }}>
                <Loader />
            </Container>
        );
    }

    if (error) {
        return (
            <Container p="md">
                <Stack spacing="md">
                    <Alert color="red" title="Error">
                        {error}
                    </Alert>
                    <Paper shadow="xs" p="md">
                        <Title order={4}>Debug Information:</Title>
                        <Text>Requested Site ID: {loc_code}</Text>
                    </Paper>
                    <Button onClick={() => router.push('/')}>Return to Home</Button>
                </Stack>
            </Container>
        );
    }

    return (
        <Container size="sm" p="md">
            {siteInfo ? (
                <Stack spacing="lg">
                    <Title order={1}>{siteInfo.LOC_loc_code}--{siteInfo.name}</Title>
                    <FuelFlowStatus loc_code={loc_code}/>
                    {step === 'SELECT_FUEL' && (
                        <Stack spacing="md">
                            <Title order={2}>Select Fuel Type</Title>
                            <FuelTypeSelector
                                site={siteInfo.LOC_loc_code}
                                onSelect={async (value) => {
                                    setSelectedFuelType(value);
                                    await updateTotalizerValue(value);
                                    setStep('VERIFY_TOTALIZER');
                                }}
                            />
                        </Stack>
                    )}

                    {step === 'VERIFY_TOTALIZER' && (
                        <Stack spacing="md">
                            <Title order={2}>Verify Totalizer Reading</Title>
                            <TotalizerVerification
                                value={totalizerValue}
                                onVerify={async (verified) => {
                                    // Send error Email
                                    if (!verified) {
                                        const emailData = {
                                            to: siteInfo.email_addr,
                                            data: {
                                                fuel_site: siteInfo.LOC_loc_code,
                                                fuel_type: selectedFuelType,
                                            },
                                        }

                                        await fetch('/api/email/totalizererror', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(emailData)
                                        });

                                        setResetTotalizer(true)
                                    }

                                    setStep('ENTRY_FORM');
                                }}
                                onBack={() => setStep('SELECT_FUEL')}
                            />
                        </Stack>
                    )}

                    {step === 'ENTRY_FORM' && (
                        <Stack spacing="md">
                            <Title order={2}>Fuel Site Entry Log</Title>
                            <FuelEntryForm
                                siteInfo={siteInfo}
                                resetTotalizer={resetTotalizer}
                                initialValues={{
                                    totalizerStart: totalizerValue,
                                    fuelType: selectedFuelType,
                                }}
                                onSubmit={ async (data) => {
                                    const emailData = {
                                        to: siteInfo.email_addr,
                                        data: data,
                                    }

                                    await fetch('/api/email/fuelticket', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(emailData)
                                    });
                                    clearTimeout(timeoutIDValue);

                                    setStep('SELECT_FUEL');
                                    setResetTotalizer(false);
                                    setSelectedFuelType(null);
                                }}
                            />
                        </Stack>
                    )}
                </Stack>
            ) : (
                <Text>Site information not available</Text>
            )}
        </Container>
    );
}
