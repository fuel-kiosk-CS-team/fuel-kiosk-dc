import React from 'react';
import { Stack, Group, Title, Button } from '@mantine/core';

export function AdminTotalizerVerification({ value, onVerify, onBack }) {
    return (
        <Stack spacing="md" align="center">
            <Title order={2}>Totalizer Initialization/Reset: {value}</Title>
            <Group spacing="md">
                <Button onClick={() => onVerify(true)}>SUBMIT</Button>
            </Group>
            <Button onClick={onBack} variant="outline">
                BACK
            </Button>
        </Stack>
    );
}
