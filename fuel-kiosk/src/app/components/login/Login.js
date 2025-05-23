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
                        const sites = await response.json();

                        setSiteData(sites);
                        localStorage.setItem('siteData', JSON.stringify(sites)); // Cache data locally
                    } else {
                        alert("Failed to fetch data from server.")
                    }
                } catch (error) {
                    alert("Error fetching site data:", error);
                }
            }
        };
        loadData();
    }, []);


    const validateInputs = (selectedSite, password, siteData) => {
        if (!selectedSite) {
            alert("Please select a fuel site!");
            return false;
        }

        if (!password.trim()) {
            alert("Please enter a password!");
            return false;
        }

        const selectedFuelSite = siteData.find(site => site.LOC_loc_code === selectedSite);
        if (!selectedFuelSite) {
            alert("Selected fuel site not found!");
            return false;
        }

        return selectedFuelSite;
    };

    // Temporary handle function for submitting login information - basic checks
    // I think we're going to want this to validate the login information is correct
    // so basically authenticate, then we'll just use the selectedFuelSite val to navigate to input-form ?
    // This way we can reduce the hydration errors.
    // Also think input form should just leave the date/datetime to server once it's submitted.
    const login = async (event) => {
        event.preventDefault();

        const selectedFuelSite = validateInputs(selectedSite, password, siteData);
        if (!selectedFuelSite) return;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: selectedFuelSite.LOC_loc_code, password })
            });

            if (!response.ok) {
                throw new Error("Authentication failed");
            }

            // send heartbeat after logging in
            await fetch('/api/heartbeat');

            const destination = selectedFuelSite.LOC_loc_code === 'ADMIN' ? "/admin" : `/sites/${selectedFuelSite.value}`;
            router.push(destination);
        } catch (error) {
            alert(error.message || "Failed to authenticate!");
        }
    };

    return (
        <form
            onSubmit={login}

        >
            {/* Bulk Fuel Site Selection */}
            <Select
                label="Bulk Fuel Site"
                placeholder="Select:"
                data={siteData.map(site => ({
                    value: site.LOC_loc_code,
                    label: `${site.LOC_loc_code}--${site.name}`,
                }))}
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
