import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    IconLogout,
    IconMapPin2
} from '@tabler/icons-react';
import { Group } from '@mantine/core';

import classes from './NavbarSimple.module.css';

export function NavbarSimple({ setPage }) {
    const router = useRouter();

    const [active, setActive] = useState('');
    const [siteData, setSiteData] = useState([]);

    // Temporary example of how we can get site data - currently using localStorage (likely to be removed or changed soon) or an API call
    useEffect(() => {
        const loadData = async () => {
            const localData = localStorage.getItem('siteData');

            if (localData) {
                let jsonData = JSON.parse(localData);
                // Parse and use local data if available
                setSiteData(jsonData);

                let firstSite = jsonData.filter(item => item.label !== 'ADMIN--FUEL SITE ADMINISTRATOR')[0].label;
                setActive(firstSite);
                setPage(firstSite)
            } else {
                // Otherwise, fetch from the server
                try {
                    const response = await fetch('/api/sites');
                    if (response.ok) {
                        const data = await response.json();
                        setSiteData(data);
                        setActive(data[0].label);
                        setPage(data[0].label);
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

    const links = siteData.filter(item => item.label !== 'ADMIN--FUEL SITE ADMINISTRATOR').map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href='#'
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
                setPage(item.label);
            }}
        >
            <IconMapPin2 className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    const logout = async () => {
        const response = await fetch('/api/auth/logout')

        if (response.ok) {
            router.push('/')
        }
    }

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group className={classes.header} justify="space-between">
                    Fuel Kiosk Admin Dashboard
                </Group>
                {links}
            </div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={logout}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}
