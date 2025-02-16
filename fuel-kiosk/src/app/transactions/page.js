'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Stack, TextInput, Button, Table, Title, Group } from "@mantine/core";

export default function FuelTransLog() {
    const router = useRouter();

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFilters({
            loc_code: "",
            pid_info: "",
            fuel_type: "",
            business_purpose: "",
            eq_no: "",
            acct_code: "",
            start: new Date().toISOString().slice(0, 10),
            end: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().slice(0, 10),
        });
    };

    return (
        <Stack>
            <Title align="center" order={2} mb="md">Fuel Trans. Review</Title>
            <Table>
                <tbody>
                    <tr>
                        <td>Location</td>
                        <td><TextInput name="loc_code" value={filters.loc_code} onChange={handleChange} /></td>
                        <td>PID Info</td>
                        <td><TextInput name="pid_info" value={filters.pid_info} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Fuel Type</td>
                        <td><TextInput name="fuel_type" value={filters.fuel_type} onChange={handleChange} /></td>
                        <td>Business Purpose</td>
                        <td><TextInput name="business_purpose" value={filters.business_purpose} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>EQ No/Unit</td>
                        <td><TextInput name="eq_no" value={filters.eq_no} onChange={handleChange} /></td>
                        <td>Project/Unit</td>
                        <td><TextInput name="acct_code" value={filters.acct_code} onChange={handleChange} /></td>
                    </tr>
                    <tr>
                        <td>Start Date</td>
                        <td><TextInput name="start" value={filters.start} onChange={handleChange} /></td>
                        <td>End Date</td>
                        <td><TextInput name="end" value={filters.end} onChange={handleChange} /></td>
                    </tr>
                </tbody>
            </Table>
            <Group justify="center">
                <Button variant="default" onClick={handleReset}>Reset Filters</Button>
                <Button>Filter</Button>
                <Button>Download</Button>
            </Group>
            <Button onClick={() => router.back()}>Back</Button>
            <Button onClick={() => router.push('/')}>Log Out</Button>
        </Stack>
    );
};
