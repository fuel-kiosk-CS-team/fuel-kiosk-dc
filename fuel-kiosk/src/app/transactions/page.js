'use client'

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Stack, TextInput, Button, Table, Title, Group } from "@mantine/core";

function FuelTransLog() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [admin, setAdmin] = useState(false);
    const [logs, setLogs] = useState([]); // Store fetched logs
    const [filters, setFilters] = useState({
        loc_code: "",
        pid_info: "",
        fuel_type: "",
        business_purpose: "",
        eq_no: "",
        acct_code: "",
        start: new Date().toISOString().slice(0, 10),
        end: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().slice(0, 10),
    });

    useEffect(() => {
        const loc_code = searchParams.get('loc_code');
        const isAdmin = loc_code === 'ADMIN';
        setAdmin(isAdmin);

        setFilters((prev) => ({
            ...prev,
            loc_code: isAdmin ? "" : loc_code || "",
        }));
    }, [searchParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        const loc_code = searchParams.get('loc_code');
        setFilters({
            loc_code: admin ? "" : loc_code || "",
            pid_info: "",
            fuel_type: "",
            business_purpose: "",
            eq_no: "",
            acct_code: "",
            start: new Date().toISOString().slice(0, 10),
            end: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().slice(0, 10),
        });
        setLogs([]); // Clear logs when resetting filters
    };

    const getLogs = async () => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });

        const queryString = `/api/transactions?${params.toString()}`;

        try {
            const response = await fetch(queryString);
            const results = await response.json();
            setLogs(results); // Store retrieved logs
        } catch (error) {
            console.error("Error fetching logs:", error);
        }
    };

    const downloadCSV = () => {
        if (logs.length === 0) {
            alert("No logs to download.");
            return;
        }

        // Define CSV headers
        const headers = [
            "Location", "PID Info", "EQ No", "Project/Unit", "Fuel Type",
            "Business Purpose", "Odometer", "Start", "End", "Qty", "Date"
        ];

        // Map logs to CSV rows
        const csvRows = logs.map(log => [
            log.loc_code,
            log.pid_info,
            log.eq_no,
            log.acct_code,
            log.fuel_type,
            log.business_purpose,
            log.odometer,
            log.totalizer_start,
            log.totalizer_end,
            log.qty_fuel,
            new Date(log.datetime_Insert).toLocaleString("en-US") + " PST"
        ].join(","));

        // Combine headers and rows
        const csvString = [headers.join(","), ...csvRows].join("\n");

        // Create Blob and download link
        const blob = new Blob([csvString], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `fuel_logs_${filters.start}_to_${filters.end}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

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
    };

    return (
        <Stack>
            <Title align="center" order={2} mb="md">Fuel Trans. Review</Title>

            {/* Filters Table */}
            <Table withTableBorder >
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td>Location</Table.Td>
                        <Table.Td>
                            <TextInput
                                name="loc_code"
                                value={filters.loc_code}
                                onChange={handleChange}
                                disabled={!admin}
                            />
                        </Table.Td>
                        <Table.Td>PID Info</Table.Td>
                        <Table.Td><TextInput name="pid_info" value={filters.pid_info} onChange={handleChange} /></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>Fuel Type</Table.Td>
                        <Table.Td><TextInput name="fuel_type" value={filters.fuel_type} onChange={handleChange} /></Table.Td>
                        <Table.Td>Business Purpose</Table.Td>
                        <Table.Td><TextInput name="business_purpose" value={filters.business_purpose} onChange={handleChange} /></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>EQ No/Unit</Table.Td>
                        <Table.Td><TextInput name="eq_no" value={filters.eq_no} onChange={handleChange} /></Table.Td>
                        <Table.Td>Project/Unit</Table.Td>
                        <Table.Td><TextInput name="acct_code" value={filters.acct_code} onChange={handleChange} /></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>Start Date</Table.Td>
                        <Table.Td><TextInput name="start" value={filters.start} onChange={handleChange} /></Table.Td>
                        <Table.Td>End Date</Table.Td>
                        <Table.Td><TextInput name="end" value={filters.end} onChange={handleChange} /></Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>

            {/* Action Buttons */}
            <Group justify="center">
                <Button variant="default" onClick={handleReset}>Reset Filters</Button>
                <Button onClick={getLogs}>Filter</Button>
                <Button onClick={downloadCSV}>Download</Button>
            </Group>

            {/* Navigation Buttons */}
            <Group justify="center" mt="md">
                <Button onClick={() => router.back()}>Back</Button>
                <Button onClick={logout}>Log Out</Button>
            </Group>

            <Title align="center" order={1} mt="md">Records</Title>

            {/* Results Table */}
            {logs.length > 0 ? (
                <Table withTableBorder >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Location</Table.Th>
                            <Table.Th>PID Info</Table.Th>
                            <Table.Th>EQ No</Table.Th>
                            <Table.Th>Project/Unit</Table.Th>
                            <Table.Th>Fuel Type</Table.Th>
                            <Table.Th>Business Purpose</Table.Th>
                            <Table.Th>Odometer</Table.Th>
                            <Table.Th>Start</Table.Th>
                            <Table.Th>End</Table.Th>
                            <Table.Th>Qty</Table.Th>
                            <Table.Th>Date</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {logs.map((log, index) => (
                            <Table.Tr key={index}>
                                <Table.Td>{log.loc_code}</Table.Td>
                                <Table.Td>{log.pid_info}</Table.Td>
                                <Table.Td>{log.eq_no}</Table.Td>
                                <Table.Td>{log.acct_code}</Table.Td>
                                <Table.Td>{log.fuel_type}</Table.Td>
                                <Table.Td>{log.business_purpose}</Table.Td>
                                <Table.Td>{log.odometer}</Table.Td>
                                <Table.Td>{log.totalizer_start}</Table.Td>
                                <Table.Td>{log.totalizer_end}</Table.Td>
                                <Table.Td>{log.qty_fuel}</Table.Td>
                                <Table.Td>{(new Date(log.datetime_Insert)).toLocaleString("en-US")} PST</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            ) : (
                    <Title align="center" order={4} mt="md">No records found</Title>
                )}
        </Stack>
    );
}

export default function SuspenseFuelTransLog() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FuelTransLog />
        </Suspense>
    );
}
