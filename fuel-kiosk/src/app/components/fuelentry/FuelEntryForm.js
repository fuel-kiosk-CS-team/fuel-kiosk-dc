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
        fuelSiteCode: siteInfo?.value || '',
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        try {
            // Prepare the data for submission
            const dataToSubmit = {
                loc_code: siteInfo?.label || '',
                fuel_type: formData.fuelType,
                totalizerStart: formData.totalizerStart,
                eqLicense: formData.eqLicense,
                nameInitials: formData.nameInitials,
                odometer: formData.odometer,
                gallonsPumped: formData.gallonsPumped,
                expCategory: formData.expCategory,
                projectUnit: formData.projectUnit
            };
    
            //console.log('Submitting data:', dataToSubmit);
    
            const response = await fetch('/api/fuel-entry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSubmit)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            
            if (result.success) {
                onSubmit?.(result.data);
                handleReset();
                alert('Fuel entry saved successfully!');
            } else {
                throw new Error(result.error || 'Failed to save fuel entry');
            }
        } catch (err) {
            console.error('Submission error:', err);
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData({
            ...defaultValues,
            dateTimeInsert: new Date().toLocaleString('en-US', { hour12: false }),
            date: new Date().toLocaleDateString(),
            fuelSite: siteInfo?.label || '',
            fuelSiteCode: siteInfo?.value || '',
        });
        setError(null);
    };

    return (
        <Paper shadow="xs" p="md" withBorder>
            <form onSubmit={handleSubmit}>
                <Stack spacing="md">
                    {error && (
                        <div style={{ color: 'red', marginBottom: '1rem' }}>
                            {error}
                        </div>
                    )}
                    
                    <TextInput
                        label="Date/Time Insert"
                        value={formData.dateTimeInsert || ''}
                        readOnly
                    />
                    <TextInput 
                        label="Date" 
                        value={formData.date || ''} 
                        readOnly 
                    />
                    <TextInput
                        label="Totalizer Start (xxx.x)"
                        value={formData.totalizerStart}
                        onChange={(e) =>
                            setFormData({ ...formData, totalizerStart: e.target.value })
                        }
                        required
                    />
                    <TextInput
                        label="Fuel Site"
                        value={formData.fuelSite}
                        readOnly
                    />
                    <TextInput
                        label="Fuel Type"
                        value={formData.fuelType}
                        onChange={(e) =>
                            setFormData({ ...formData, fuelType: e.target.value })
                        }
                        required
                    />
                    {/* Rest of your form fields... */}
                    <TextInput
                        label="EQ License or Desc."
                        value={formData.eqLicense}
                        onChange={(e) =>
                            setFormData({ ...formData, eqLicense: e.target.value })
                        }
                    />
                    <TextInput
                        label="Name, initials, etc."
                        value={formData.nameInitials}
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
                        required
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
                        <Button 
                            type="submit" 
                            loading={isSubmitting}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={handleReset}
                            disabled={isSubmitting}
                        >
                            Reset
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Paper>
    );
}