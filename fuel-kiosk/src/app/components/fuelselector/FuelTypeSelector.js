import React from 'react';
import { Group, Button } from '@mantine/core';

export function FuelTypeSelector({ onSelect, selectedType }) {
    const fuelTypes = [
        { id: 'UNL', label: 'UNL' },
        { id: 'DSL', label: 'DSL' },
        { id: 'DSL_OFF_ROAD', label: 'DSL OFF ROAD' },
        { id: 'CLEAR_GAS', label: 'CLEAR GAS' },
    ];

    return (
        <Group position="center" spacing="sm">
            {fuelTypes.map((type) => (
                <Button
                    key={type.id}
                    onClick={() => onSelect(type.id)}
                    variant={selectedType === type.id ? 'filled' : 'outline'}
                >
                    {type.label}
                </Button>
            ))}
        </Group>
    );
}