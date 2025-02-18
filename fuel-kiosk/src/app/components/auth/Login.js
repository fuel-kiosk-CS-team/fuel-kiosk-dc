'use client'

// This component assumes internet connection


import React, { useState, useEffect } from 'react';
import { PasswordInput, Select, Button } from '@mantine/core';
import {loginHandle} from '@/src/lib/actions'
import { useSession } from 'next-auth/react';
import useNetworkStatus from '@/src/hooks/networkStatus';
import { useRouter } from 'next/navigation';




export function Login(){
    const [password, setPassword] = useState('');
    const [siteData, setSiteData] = useState([]);
    const [selectedSite, setSelectedSite] = useState(null);
    const [error, setError] = useState(null);

    // const router = useRouter();
    const { data: session } = useSession(); // NextAuth session
    // const router = useRouter();

    // // Check for an existing offline session
    // useEffect(() => {
    //     const checkOfflineSession = async () => {
    //         const offlineSession = await getSessionOffline();
    //         if (offlineSession) {
    //             router.push("/input-form");
    //         }
    //     };
    //     checkOfflineSession();
    // }, [router]);

    // Load site data from localStorage or API
    useEffect(() => {
        const loadData = async () => {
            const localData = localStorage.getItem('siteData');

            if (localData) {
                setSiteData(JSON.parse(localData));
            } else {
                try {
                    const response = await fetch('/api/sites');
                    if (response.ok) {
                        const data = await response.json();
                        setSiteData(data);
                        localStorage.setItem('siteData', JSON.stringify(data)); 
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

    // const sites = [
    //     { value: 'site-1', label: 'ADMIN--FUEL SITE ADMINISTRATOR', route: '/admin'},
    //     { value: 'site-2', label: 'CBARC-M--COLUMBIA BASIN AG RESEARCH-MOR' },
    //     { value: 'site-3', label: 'CBARC-P--COLUMBIA BASIN AG RESEARCH-PEN' },
    //     { value: 'site-4', label: 'COAREC--CENTRAL OREGON AG RES EXT' },
    //     { value: 'site-5', label: 'DAIRY--CORVALLIS' },
    //     { value: 'site-6', label: 'EOARC-B--EASTERN OREGON AG RESEARCH' },
    //     { value: 'site-7', label: 'EOARC-U--EASTERN OREGON AG RESEARCH' },
    //     { value: 'site-8', label: 'HAREC--HERMISTON AG RESEARCH STATION' },
    //     { value: 'site-9', label: 'KBREC--KLAMATH BASIN EXPERIMENT STA' },
    //     { value: 'site-10', label: 'MES--MALHEUR EXPERIMENT STATION' },
    //     { value: 'site-11', label: 'NWREC--NORTH WILLAMETTE RES EXTEN CTR' },
    //     { value: 'site-12', label: 'SOREC--SOUTHERN OREGON RES EXT CTR' },
    // ];

    // setSiteData(sites)
    // useEffect(setSiteData(sites))

    // Handle login
    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);

        if (!selectedSite) {
            setError("Please select a fuel site!");
            return;
        }
        
        const siteObject = siteData.find(site => site.value === selectedSite)
        const siteName = siteObject.label

        if (password.trim() === '') {
            setError("Please enter a password!");
            return;
        }

        const result = loginHandle({
            siteName, 
            password
        });
    
        if (result?.ok) {
            console.log("result: ", result)
            router.push(result.url)
        } else if (result?.error) {
            setError("Login failed: " , result.error);
        } 


    };

    return (
        <form onSubmit={handleSubmit}>
            <Select
                label="Bulk Fuel Site"
                placeholder="Select:"
                data={siteData}
                value={selectedSite}
                onChange={setSelectedSite}
                // onChange={(value) => setSelectedSite(value)} // Store the label directly
            />
            <PasswordInput 
                required
                label="Login Password"
                placeholder="Your password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button
                type="submit"
                mt="md"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            >
                Login
            </Button>
        </form>
    );
}