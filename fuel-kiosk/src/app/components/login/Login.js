'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect} from 'react';
import { PasswordInput, Select, Button } from '@mantine/core';
// import TooltipFocus from '../components/form/TooltipFocus.js';
// import { db, posts } from '@/lib/db'

export function Login(){

    const [password, setPassword] = useState('');
    const [siteData, setSiteData] = useState([]);
    const [selectedSite, setSelectedSite] = useState(null);

    const router = useRouter();

    // Temporary example of how we can get site data - currently using localStorage (likely to be removed or changed soon) or an API call
    useEffect(() => {
        const loadData = async () => {
            const localData = localStorage.getItem('siteData');

            if (localData) {
                // Parse and use local data if available
                setSiteData(JSON.parse(localData));
            } else {
                // Otherwise, fetch from the server
                try {
                    const response = await fetch('/api/sites');
                    if (response.ok) {
                        const data = await response.json();
                        setSiteData(data);
                        localStorage.setItem('siteData', JSON.stringify(data)); // Cache data locally
                    } else {
                        console.error("Failed to fetch data from server.");
                    }
                } catch (error) {
                    console.error("Error fetching site data:", error);
                }
            }
        };
        loadData();
    }, []);


    // Temporary handle function for submitting login information - basic checks
    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate basic requirements of password and selection
        if(!selectedSite){
            alert("Please select a fuel site!");
            return;
        }

        if(password.trim() === '') {
            alert("Please enter a password!");
            return;
        }

        const selectedFuelSite = siteData.find(site => site.value === selectedSite);
        if (!selectedFuelSite) {
          alert("Selected fuel site not found!");
          return;
        }
      
        const route = selectedFuelSite.route || `/sites/${selectedFuelSite.value}`;
        router.push(route);
    }

    return (
        <form
            onSubmit={handleSubmit}

        >
            {/* Bulk Fuel Site Selection */}
            <Select
                label="Bulk Fuel Site"
                placeholder="Select:"
                data={siteData}
                value={selectedSite}
                onChange={setSelectedSite}

            />

            <PasswordInput required
                label="Login Password"
                placeholder="Your password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
            />
            <Button
                type="submit"
                mt="md"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            >
                Login
            </Button>
        </form>
    )
}
