'use client'

import React from 'react';

import { Stack, Group, Button, Center } from '@mantine/core';
import { useRouter } from 'next/navigation';

// Component for selecting fuel type and managing site-related actions
export function FuelTypeSelector({ site, onSelect }) {
    // Available fuel type options
    const fuelTypes = [
        { id: 'UNL', label: 'UNL' },
        { id: 'DSL', label: 'DSL' },
        { id: 'DSL_OFF_ROAD', label: 'DSL OFF ROAD' },
        { id: 'CLEAR_GAS', label: 'CLEAR GAS' },
    ];

    const router = useRouter();

    // Handle user logout with final heartbeat
    const logout = async () => {
        try {
            // Send final heartbeat before logout
            await fetch('api/heartbeat')

            const response = await fetch('/api/auth/logout');
            if (!response.ok) {
                throw new Error("Logout failed");
            }
        } catch (error) {
            alert(error.message || "Error logging out");
        } finally {
            router.push('/');
        }
    }

    return (
        <Stack>
            {/* Fuel type selection buttons */}
            <Group position="center" spacing="sm">
                {fuelTypes.map((type) => (
                    <Button
                        key={type.id}
                        onClick={() => onSelect(type.id)}
                        variant={'outline'}
                    >
                        {type.label}
                    </Button>
                ))}
            </Group>
            {/* Navigation and action buttons */}
            <Button onClick={() => router.push(`/transactions?loc_code=${site}`)}>View Transaction Records</Button>
            <Button onClick={logout}>Logout</Button>
            {/* Logout warning message */}
            <Center>
                <p>NOTE: Only logout if you are switching sites.</p>
            </Center>
        </Stack>
    );
}
