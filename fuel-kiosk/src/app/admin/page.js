'use client'

import { useState, useEffect } from 'react';
import {
    Container,
    Title,
    Stack,
    Text,

} from '@mantine/core';

import { NavbarSimple } from "./components/navbar/NavbarSimple";

import { AdminTotalizerVerification } from './components/admintotalizer/AdminTotalizerVerification';
import { AdminFuelTypeSelector } from './components/adminfuelselector/AdminFuelTypeSelector';
import { FuelEntryForm } from '../components/fuelentry/FuelEntryForm';

import classes from "./admin.module.css";

export default function Admin() {
    const [siteInfo, setSiteInfo] = useState(null);
    const [step, setStep] = useState('SELECT_FUEL');
    const [selectedFuelType, setSelectedFuelType] = useState(null);
    const [totalizerValue, setTotalizerValue] = useState(null);

    useEffect(() => {
        setStep('SELECT_FUEL');
    }, [siteInfo]);

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

    return (
        <div className={classes.container}>
            <aside className={classes.sidebar}>
                <NavbarSimple setSite={setSiteInfo} />
            </aside>
            <main className={classes.mainContent}>
                <Container size="sm" p="md">
                    {siteInfo ? (
                        <Stack spacing="lg">
                            <Title order={1}>{siteInfo.LOC_loc_code}--{siteInfo.name}</Title>

                            {step === 'SELECT_FUEL' && (
                                <Stack spacing="md">
                                    <Title order={2}>Select Fuel Type</Title>
                                    <AdminFuelTypeSelector
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
                                    <Title order={2}>Totalizer Initialization/Reset: </Title>
                                    <AdminTotalizerVerification
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
                                        resetTotalizer={false}
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
            </main>
        </div>
    );
}
