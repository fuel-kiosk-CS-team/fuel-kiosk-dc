import { useState, useEffect } from 'react';

import {
    Title,
    Stack,
    Table,
    Text,
    Switch,
    Badge,
    Divider,
} from '@mantine/core';

export function SiteManager() {
    const [siteData, setSiteData] = useState([]);
    const [alertToggles, setAlertToggles] = useState({});

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/api/sites');
                if (response.ok) {
                    const data = await response.json();
                    setSiteData(data);
                    localStorage.setItem('siteData', JSON.stringify(data));

                    // Set alert toggles from `alerts` field
                    const initialToggles = {};
                    data.forEach(site => {
                        initialToggles[site.LOC_loc_code] = site.alert ?? false;
                    });
                    setAlertToggles(initialToggles);
                } else {
                    alert('Failed to fetch data from server.');
                }
            } catch (error) {
                alert('Error fetching site data: ' + error.message);
            }
        };
        loadData();
    }, []);

    const toggleAlert = async (locCode) => {
        const newValue = !alertToggles[locCode];

        // Optimistically update the UI
        setAlertToggles((prev) => ({
            ...prev,
            [locCode]: newValue,
        }));

        try {
            const response = await fetch(`/api/sites/${locCode}/alert`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ alert: newValue }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update alert for ${locCode}`);
            }
        } catch (error) {
            console.error('Error updating alerts:', error);

            // Revert UI change on error
            setAlertToggles((prev) => ({
                ...prev,
                [locCode]: !newValue,
            }));
        }
    };

    const now = new Date();

    const filteredSites = siteData?.filter(
        (site) => site.LOC_loc_code !== 'ADMIN'
    );

    const rows = filteredSites.map((site) => {
        const lastHeartbeat = site.last_heartbeat ? new Date(site.last_heartbeat) : null;
        const diffHours = lastHeartbeat ? (now.getTime() - lastHeartbeat.getTime()) / (1000 * 60 * 60) : 0;
        const isHealthy = diffHours < 6; // Healthy if within 6 hours

        return (
            <Table.Tr key={site.LOC_loc_code}>
                <Table.Td>{site.LOC_loc_code}</Table.Td>
                <Table.Td>
                    { lastHeartbeat ? (
                        <Badge color={isHealthy ? 'green' : 'red'}>
                            {isHealthy ? 'Up' : 'Down'}
                        </Badge>
                    ) : (
                        <Badge color='purple'>
                                Unknown
                        </Badge>
                    )}
                </Table.Td>
                <Table.Td>
                    <Text size="sm">
                        {lastHeartbeat ? (
                            lastHeartbeat.toLocaleString()
                        ) : (
                            "Unknown"
                        )}
                    </Text>
                </Table.Td>
                <Table.Td>
                    <Switch
                        checked={!!alertToggles[site.LOC_loc_code]}
                        onChange={() => toggleAlert(site.LOC_loc_code)}
                        color="teal"
                    />
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <Stack spacing="lg">
            <Title order={1}>ADMIN -- FUEL SITE ADMINISTRATOR</Title>
            <Title order={2}>Site Management:</Title>
            <Divider />

            <Table striped highlightOnHover withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Site</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Last Heartbeat</Table.Th>
                        <Table.Th>Enable Alerts</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                            <Table.Tr>
                                <Table.Td colSpan={4}>
                                    <Text align="center">No site data available.</Text>
                                </Table.Td>
                            </Table.Tr>
                        )}
                </Table.Tbody>
            </Table>
        </Stack>
    );
}

