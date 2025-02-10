import React from 'react';
import { Button } from '@mantine/core';
import styles from './FuelTypeSelector.module.css';

export function FuelTypeSelector({ onSelect, selectedType }) {
  const fuelTypes = [
    { id: 'UNL', label: 'UNL' },
    { id: 'DSL', label: 'DSL' },
    { id: 'DSL_OFF_ROAD', label: 'DSL OFF ROAD' },
    { id: 'CLEAR_GAS', label: 'CLEAR GAS' },
  ];

  return (
    <div className={styles.container}>
      {fuelTypes.map((type) => (
        <Button
          key={type.id}
          onClick={() => onSelect(type.id)}
          variant={selectedType === type.id ? 'filled' : 'outline'}
          className={styles.button}
        >
          {type.label}
        </Button>
      ))}
    </div>
  );
}