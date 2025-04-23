'use client'

import React from 'react';

import { Stack, Group, Button, Center } from '@mantine/core';
import { useRouter } from 'next/navigation';

export function FuelTypeSelector({ site, onSelect }) {
    const fuelTypes = [
        { id: 'UNL', label: 'UNL' },
        { id: 'DSL', label: 'DSL' },
        { id: 'DSL_OFF_ROAD', label: 'DSL OFF ROAD' },
        { id: 'CLEAR_GAS', label: 'CLEAR GAS' },
    ];

    const router = useRouter();

    const logout = async () => {
        try {
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
            <Button onClick={() => router.push(`/transactions?loc_code=${site}`)}>View Transaction Records</Button>
            <Button onClick={logout}>Logout</Button>
            <Center>
                <p>NOTE: Only logout if you are switching sites.</p>
            </Center>
        </Stack>
    );
}
