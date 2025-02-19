'use client';

import React, { useState, useEffect, use } from 'react';
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

export default function FuelSitePage({ params: paramsPromise }) {
    const router = useRouter();
    const params = use(paramsPromise);
    const { loc_code } = params;

    const [step, setStep] = useState('SELECT_FUEL');
    const [selectedFuelType, setSelectedFuelType] = useState(null);
    const [totalizerValue, setTotalizerValue] = useState('0.3');
    const [siteInfo, setSiteInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSiteInfo = async () => {
            try {
                console.log('Fetching for loc_code:', loc_code);
                const response = await fetch('/api/sites');
                const sites = await response.json();
                console.log('Sites from API:', sites);

                const site = sites.find((s) => s.LOC_loc_code === loc_code);
                console.log('Found site:', site);

                if (!site) {
                    setError('Site not found');
                } else {
                    setSiteInfo(site);
                }
            } catch (error) {
                console.error('Error:', error);
                setError('Error loading site information');
            } finally {
                setLoading(false);
            }
        };

        fetchSiteInfo();
    }, [loc_code, router]);

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

                    {step === 'SELECT_FUEL' && (
                        <Stack spacing="md">
                            <Title order={2}>Select Fuel Type</Title>
                            <FuelTypeSelector
                                selectedType={selectedFuelType}
                                onSelect={(value) => {
                                    setSelectedFuelType(value);
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
                                onVerify={(verified) => {
                                    if (verified) {
                                        setStep('ENTRY_FORM');
                                    } else {
                                        alert('Please contact administrator for assistance');
                                    }
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
                                initialValues={{
                                    totalizerStart: totalizerValue,
                                    fuelType: selectedFuelType,
                                }}
                                onSubmit={(data) => {
                                    console.log('Form submitted:', data);
                                    setStep('SELECT_FUEL');
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
