import { useState } from 'react';
import { Stack, Group, Title, Button, TextInput } from '@mantine/core';

export function AdminTotalizerVerification({ value, onVerify, onBack }) {
    const [inputValue, setInputValue] = useState(value);

    return (
        <Stack spacing="md" align="left" style={{ width: "100%" }}>
            <Group spacing="md">
                <Title order={2}>Totalizer Start:</Title>
                <TextInput
                    value={inputValue}
                    onChange={(event) => setInputValue(event.currentTarget.value)}
                />
            </Group>
            <Group spacing="md">
                <Title order={2}>Update Totalizer:</Title>
                <Button onClick={() => onVerify(true)}>SUBMIT</Button>
                <Button onClick={onBack} variant="outline">BACK</Button>
            </Group>
        </Stack>
    );
}
