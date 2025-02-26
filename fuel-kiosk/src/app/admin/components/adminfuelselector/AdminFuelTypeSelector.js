'use client'

import React from 'react';

import { Stack, Group, Button } from '@mantine/core';

export function AdminFuelTypeSelector({ onSelect }) {
    const fuelTypes = [
        { id: 'UNL', label: 'UNL' },
        { id: 'DSL', label: 'DSL' },
        { id: 'DSL_OFF_ROAD', label: 'DSL OFF ROAD' },
        { id: 'CLEAR_GAS', label: 'CLEAR GAS' },
    ];

    return (
        <Stack>
            <Group position="center" spacing="sm">
                {fuelTypes.map((type) => (
                    <Button
                        key={type.id}
                        onClick={() => onSelect(type.id)}
                        variant={'filled'}
                    >
                        {type.label}
                    </Button>
                ))}
            </Group>
        </Stack>
    );
}
