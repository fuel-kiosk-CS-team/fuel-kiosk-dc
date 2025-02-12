import React from 'react';
import { Stack, Group, Title, Button } from '@mantine/core';

export function TotalizerVerification({ value, onVerify, onBack }) {
  return (
    <Stack spacing="md" align="center">
      <Title order={2}>Totalizer Start: {value}</Title>
      <Group spacing="md">
        <Button onClick={() => onVerify(true)}>YES</Button>
        <Button onClick={() => onVerify(false)}>NO</Button>
      </Group>
      <Button onClick={onBack} variant="outline">
        BACK
      </Button>
    </Stack>
  );
}