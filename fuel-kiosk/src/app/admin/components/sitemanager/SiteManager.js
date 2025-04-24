import { useState, useEffect } from 'react';

import {
    Title,
    Stack,
    Table,
    Text,
    Switch,
    Badge,
    Divider,
    Group,
    ActionIcon,
    Tooltip
} from '@mantine/core';

import { IconRefresh } from '@tabler/icons-react';

export function SiteManager() {
    const [siteData, setSiteData] = useState([]);
    const [alertToggles, setAlertToggles] = useState({});
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        // initial load
        loadData();

        // refresh the data every 30 seconds
        const intervalId = setInterval(loadData, 30 * 1000);
        return () => clearInterval(intervalId);
    }, []);

    const loadData = async () => {
        setRefreshing(true); // Start animation

        try {
            const response = await fetch('/api/sites');
            if (response.ok) {
                const data = await response.json();
                setSiteData(data);
                localStorage.setItem('siteData', JSON.stringify(data));

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
        } finally {
            setRefreshing(false); // Stop animation
        }
    };

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

        // healthy if the heartbeat isn't older than configured time
        const isHealthy = diffHours < (process.env.NEXT_PUBLIC_ALLOWED_DOWNTIME_HOURS ?? 12);

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
            <Group>
                <Title order={2}>Site Management:</Title>
                <Tooltip label="Refresh" withArrow position="right">
                    <ActionIcon
                        variant="light"
                        color="blue"
                        size="lg"
                        onClick={loadData}
                        style={{ cursor: 'pointer' }}
                    >
                        <IconRefresh
                            style={{
                                transition: 'transform 0.3s ease',
                                transform: refreshing ? 'rotate(360deg)' : 'rotate(0deg)',
                            }}
                        />
                    </ActionIcon>
                </Tooltip>
            </Group>
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

