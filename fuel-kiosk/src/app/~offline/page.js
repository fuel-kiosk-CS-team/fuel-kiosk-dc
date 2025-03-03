// Backup for if there is no internet connection


// TEMPORARY:
'use client'
// app/page.jsx
import React from 'react';
import FuelForm from '../components/form-backup/FuelForm';

async function fetchFuelData() {
  // Example of fetching previousMax and fuelSites from an API
  return (123.45, ['Site A', 'Site B', 'Site C'])
  try{
    const response = await fetch('/api/fuel-data'); // Adjust endpoint as needed
    if (response.ok) {
        const data = await response.json();
        return data;
    } else{
        return (123.45, ['Site A', 'Site B', 'Site C'])



    }

  } catch(error) {
    console.error("Error fetching fuel data", error)
  }
  return (123.45, ['Site A', 'Site B', 'Site C'])

}

export default async function Page() {
  // Fetch data (mock example)
  const { previousMax, fuelSites } = await fetchFuelData();

  const handleFormSubmit = (formData) => {
    // Example: send formData to your backend
    fetch('/api/submit-fuel-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        alert('Data submitted successfully!');
      } else {
        alert('Failed to submit data');
      }
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <FuelForm
        previousMax={previousMax} // Example: 123.45
        fuelSites={fuelSites} // Example: ["Site A", "Site B"]
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
