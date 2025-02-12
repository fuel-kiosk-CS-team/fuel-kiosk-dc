// 'use client';

// import { useRouter } from 'next/navigation';
// import React, { useState, useEffect} from 'react';
// import { PasswordInput, Select, Button } from '@mantine/core';
// // import TooltipFocus from '../components/form/TooltipFocus.js';
// // import { db, posts } from '@/lib/db'
// // import { signIn, signOut, useSession } from "next-auth/react";
// // import { saveSessionOffline, getSessionOffline } from "@/lib/storage";

// export function Login(){

//     const [password, setPassword] = useState('');
//     const [siteData, setSiteData] = useState([]);
//     const [selectedSite, setSelectedSite] = useState(null);

//     const router = useRouter();

//     // Temporary example of how we can get site data - currently using localStorage (likely to be removed or changed soon) or an API call
//     useEffect(() => {
//         const loadData = async () => {
//             const localData = localStorage.getItem('siteData');

//             if (localData) {
//                 // Parse and use local data if available
//                 setSiteData(JSON.parse(localData));
//             } else {
//                 // Otherwise, fetch from the server
//                 try {
//                     const response = await fetch('/api/sites');
//                     if (response.ok) {
//                         const data = await response.json();
//                         setSiteData(data);
//                         localStorage.setItem('siteData', JSON.stringify(data)); // Cache data locally
//                     } else {
//                         console.error("Failed to fetch data from server.");
//                     }
//                 } catch (error) {
//                     console.error("Error fetching site data:", error);
//                 }
//             }
//         };
//         loadData();
//     }, []);


//     // Temporary handle function for submitting login information - basic checks
//     // I think we're going to want this to validate the login information is correct
//     // so basically authenticate, then we'll just use the selectedFuelSite val to navigate to input-form ?
//     // This way we can reduce the hydration errors.
//     // Also think input form should just leave the date/datetime to server once it's submitted.
//     const handleSubmit = (event) => {
//         event.preventDefault();

//         // Validate basic requirements of password and selection
//         if(!selectedSite){
//             alert("Please select a fuel site!");
//             return;
//         }

//         if(password.trim() === '') {
//             alert("Please enter a password!");
//             return;
//         }

//         const selectedFuelSite = siteData.find(site => site.value === selectedSite)
//         if (selectedFuelSite.route) {
//             router.push(selectedFuelSite.route)
//         }
//     }

//     return (
//         <form
//             onSubmit={handleSubmit}

//         >
//             {/* Bulk Fuel Site Selection */}
//             <Select
//                 label="Bulk Fuel Site"
//                 placeholder="Select:"
//                 data={siteData}
//                 value={selectedSite}
//                 onChange={setSelectedSite}

//             />

//             <PasswordInput required
//                 label="Login Password"
//                 placeholder="Your password"
//                 value={password}
//                 onChange={(event) => setPassword(event.currentTarget.value)}
//             />
//             <Button
//                 type="submit"
//                 mt="md"
//                 variant="gradient"
//                 gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
//             >
//                 Login
//             </Button>
//         </form>
//     )
// }


'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { PasswordInput, Select, Button } from '@mantine/core';
import { signIn, useSession } from "next-auth/react";
import { saveSessionOffline, getSessionOffline } from "@/src/lib/storage";

export function Login() {
    const [password, setPassword] = useState('');
    const [siteData, setSiteData] = useState([]);
    const [selectedSite, setSelectedSite] = useState(null);
    const [error, setError] = useState(null);

    const { data: session } = useSession(); // NextAuth session
    const router = useRouter();

    // Check for an existing offline session
    useEffect(() => {
        const checkOfflineSession = async () => {
            const offlineSession = await getSessionOffline();
            if (offlineSession) {
                router.push("/input-form");
            }
        };
        checkOfflineSession();
    }, [router]);

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

    // Handle login
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
    
        if (!selectedSite) {
            setError("Please select a fuel site!");
            return;
        }
    
        if (password.trim() === '') {
            setError("Please enter a password!");
            return;
        }
    
        const result = await signIn("credentials", {
            redirect: false,
            // Pass the selected site as the username - can change if we do users, but then we will need to change /src/app/api/auth/[...nextauth]/route.js
            selectedSite, 
            password
        });
    
        if (result?.error) {
            setError(result.error);
        } else {
            await saveSessionOffline({ site: selectedSite });
            // We can change this to go elsewhere, can also redirect based on if admin here
            if(selectedSite === "ADMIN--FUEL SITE ADMINISTRATOR"){
                router.push("/admin")
            } else {
                router.push("/input-form");
            }
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