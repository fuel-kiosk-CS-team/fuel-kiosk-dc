import React, { useState } from 'react';
import { Paper, Stack, TextInput, Select, Group, Button } from '@mantine/core';

export function FuelEntryForm({ siteInfo, initialValues = {}, onSubmit }) {
    const defaultValues = {
        dateTimeInsert: new Date()
            .toLocaleString('en-US', { hour12: false })
            .replace(/,/g, ''),
        date: new Date().toLocaleDateString(),
        totalizerStart: '',
        fuelSite: siteInfo?.label || '',
        fuelType: '',
        eqLicense: '',
        nameInitials: '',
        odometer: '',
        gallonsPumped: '',
        expCategory: '',
        projectUnit: '',
    };

    const [formData, setFormData] = useState({
        ...defaultValues,
        ...initialValues,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleReset = () => {
        setFormData({
            ...defaultValues,
            dateTimeInsert: new Date().toLocaleString('en-US', { hour12: false }),
            date: new Date().toLocaleDateString(),
            fuelSite: siteInfo?.label || '',
            ...initialValues,
        });
    };

    return (
        <Paper shadow="xs" p="md" withBorder>
            <form onSubmit={handleSubmit}>
                <Stack spacing="md">
                    <TextInput
                        label="Date/Time Insert"
                        value={formData.dateTimeInsert || ''}
                        readOnly
                    />
                    <TextInput label="Date" value={formData.date || ''} readOnly />
                    <TextInput
                        label="Totalizer Start (xxx.x)"
                        value={formData.totalizerStart || ''}
                        readOnly
                    />
                    <TextInput
                        label="Fuel Site"
                        value={formData.fuelSite || ''}
                        readOnly
                    />
                    <TextInput
                        label="Fuel Type"
                        value={formData.fuelType || ''}
                        readOnly
                    />
                    <TextInput
                        label="EQ License or Desc."
                        value={formData.eqLicense || ''}
                        onChange={(e) =>
                            setFormData({ ...formData, eqLicense: e.target.value })
                        }
                    />
                    <TextInput
                        label="Name, initials, etc."
                        value={formData.nameInitials || ''}
                        onChange={(e) =>
                            setFormData({ ...formData, nameInitials: e.target.value })
                        }
                    />
                    <TextInput
                        label="Odometer (If Required)"
                        value={formData.odometer}
                        onChange={(e) =>
                            setFormData({ ...formData, odometer: e.target.value })
                        }
                        placeholder="No Tenths"
                    />
                    <TextInput
                        label="Gallons Pumped (xx.x)"
                        value={formData.gallonsPumped}
                        onChange={(e) =>
                            setFormData({ ...formData, gallonsPumped: e.target.value })
                        }
                        placeholder="0.0"
                    />
                    <Select
                        label="Exp. Category: (Required)"
                        value={formData.expCategory}
                        onChange={(value) =>
                            setFormData({ ...formData, expCategory: value })
                        }
                        placeholder="Select an option"
                        data={[
                            { value: 'Field Work', label: 'Field Work' },
                            { value: 'Research', label: 'Research' },
                            { value: 'Local Travel', label: 'Local Travel' },
                            { value: 'Out of state travel', label: 'Out of state travel' },
                            { value: 'Various', label: 'Various' },
                            { value: 'Totalizer Reading', label: 'Totalizer Reading' },
                        ]}
                        required
                    />
                    <TextInput
                        label="Project or Unit"
                        value={formData.projectUnit}
                        onChange={(e) =>
                            setFormData({ ...formData, projectUnit: e.target.value })
                        }
                        placeholder="Recommended"
                    />

                    <Group position="apart" mt="md">
                        <Button type="submit">Submit</Button>
                        <Button variant="outline" onClick={handleReset}>
                            Reset
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Paper>
    );
}