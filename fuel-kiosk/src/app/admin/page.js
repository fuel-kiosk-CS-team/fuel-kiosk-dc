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
import { AdminFuelTypeSelector } from "./components/adminfuelselector/AdminFuelTypeSelector";

import classes from "./admin.module.css";

export default function Admin() {
    const [selectedPage, setSelectedPage] = useState('');
    const [step, setStep] = useState('SELECT_FUEL');
    const [selectedFuelType, setSelectedFuelType] = useState(null);
    const [totalizerValue, setTotalizerValue] = useState('0.3');

    useEffect(() => {
        setStep('SELECT_FUEL');
    }, [selectedPage]);

    return (
        <div className={classes.container}>
            <aside className={classes.sidebar}>
                <NavbarSimple setPage={setSelectedPage} />
            </aside>
            <main className={classes.mainContent}>
                <Container size="sm" p="md">
                    {selectedPage ? (
                        <Stack spacing="lg">
                            <Title order={1}>{selectedPage}</Title>

                            {step === 'SELECT_FUEL' && (
                                <Stack spacing="md">
                                    <Title order={2}>Select Fuel Type</Title>
                                    <AdminFuelTypeSelector
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
                                    <Title order={2}>Totalizer Initialization/Reset: </Title>
                                    <AdminTotalizerVerification
                                        value={totalizerValue}
                                        onVerify={(verified) => {
                                            if (verified) {
                                                setStep('SELECT_FUEL');
                                            } else {
                                                alert('Please contact administrator for assistance');
                                            }
                                        }}
                                        onBack={() => setStep('SELECT_FUEL')}
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
