"use client"

import React, { useState, useEffect } from 'react';
import { TextInput, Select, Button, Switch, NumberInput, Group, Paper, Title } from '@mantine/core';
import {DateInput} from "@mantine/dates"

const FuelForm = ({ previousMax, fuelSites, onSubmit }) => {
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    dateTime: new Date().toISOString().split('T')[0],
    date: new Date().toISOString().split('T')[0],
    totalizerStart: previousMax || 0,
    fuelSite: '',
    fuelType: '',
    eqLicense: '',
    name: '',
    odometer: 0,
    gallonsPumped: 0.0,
    totalizerEnd: 0.0,
    expCategory: '',
    projectOrUnit: 'Recommended',
  });

  const fuelTypeOptions = ['UNL', 'DSL', 'DSL OFF ROAD', 'CLEAR GAS'];
  const expCategoryOptions = ['Category 1', 'Category 2', 'Category 3']; // Add actual categories as needed.

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    if (onSubmit) onSubmit(formData);
  };

  return (
    <Paper shadow="xs" padding="lg">
      <Title order={3} mb="md">Fuel Entry Form</Title>
      <form>
        <Group direction="column" spacing="md">
          <TextInput
            label="Date & Time"
            value={formData.dateTime}
            readOnly
          />
          <DateInput
            label="Date"
            value={new Date(formData.date)}
            onChange={(value) => handleChange('date', value.toISOString().split('T')[0])}
          />
          <NumberInput
            label="Totalizer Start"
            value={formData.totalizerStart}
            readOnly={!editable}
            onChange={(value) => handleChange('totalizerStart', value)}
          />
          <Switch
            label="Edit Totalizer Start"
            checked={editable}
            onChange={(event) => setEditable(event.currentTarget.checked)}
          />
          <Select
            label="Fuel Site"
            data={fuelSites || []}
            placeholder="Select a fuel site"
            value={formData.fuelSite}
            onChange={(value) => handleChange('fuelSite', value)}
          />
          <Select
            label="Fuel Type"
            data={fuelTypeOptions}
            placeholder="Select fuel type"
            value={formData.fuelType}
            onChange={(value) => handleChange('fuelType', value)}
          />
          <TextInput
            label="EQ License or Description"
            placeholder="Enter EQ License or Description"
            value={formData.eqLicense}
            onChange={(event) => handleChange('eqLicense', event.currentTarget.value)}
          />
          <TextInput
            label="Name/Initials"
            placeholder="Enter name or initials"
            value={formData.name}
            onChange={(event) => handleChange('name', event.currentTarget.value)}
          />
          <NumberInput
            label="Odometer"
            placeholder="Enter odometer value"
            value={formData.odometer}
            onChange={(value) => handleChange('odometer', value)}
          />
          <NumberInput
            label="Gallons Pumped"
            placeholder="0.0"
            value={formData.gallonsPumped}
            precision={1}
            onChange={(value) => handleChange('gallonsPumped', value)}
          />
          <NumberInput
            label="Totalizer End"
            placeholder="0.0"
            value={formData.totalizerEnd}
            precision={1}
            onChange={(value) => handleChange('totalizerEnd', value)}
          />
          <Select
            label="EXP. Category"
            data={expCategoryOptions}
            placeholder="Select a category"
            required
            value={formData.expCategory}
            onChange={(value) => handleChange('expCategory', value)}
          />
          <TextInput
            label="Project or Unit"
            placeholder="Recommended"
            value={formData.projectOrUnit}
            onChange={(event) => handleChange('projectOrUnit', event.currentTarget.value)}
          />
          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default FuelForm;