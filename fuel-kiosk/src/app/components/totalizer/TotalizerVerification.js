import React from 'react';
import { Stack, Group, Title, Button } from '@mantine/core';

// Component for verifying totalizer start value
export function TotalizerVerification({ value, onVerify, onBack }) {
    return (
        <Stack spacing="md" align="center">
            {/* Display totalizer value for verification */}
            <Title order={2}>Totalizer Start: {value}</Title>
            {/* Verification buttons */}
            <Group spacing="md">
                <Button onClick={() => onVerify(true)}>YES</Button>
                <Button onClick={() => onVerify(false)}>NO</Button>
            </Group>
            {/* Back button for navigation */}
            <Button onClick={onBack} variant="outline">
                BACK
            </Button>
        </Stack>
    );
}