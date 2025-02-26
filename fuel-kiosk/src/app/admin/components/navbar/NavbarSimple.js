import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    IconLogout,
    IconMapPin2,
    IconClipboardText
} from '@tabler/icons-react';
import { Group } from '@mantine/core';

import classes from './NavbarSimple.module.css';

export function NavbarSimple({ setSite }) {
    const router = useRouter();

    const [active, setActive] = useState('');
    const [siteData, setSiteData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const localData = localStorage.getItem('siteData');

            if (localData) {
                let jsonData = JSON.parse(localData);
                // Parse and use local data if available
                setSiteData(jsonData);

                let firstSite = jsonData.filter(item => item.LOC_loc_code !== 'ADMIN')[0];
                setActive(firstSite);
                setSite(firstSite)
            } else {
                // Otherwise, fetch from the server
                try {
                    const response = await fetch('/api/sites');
                    if (response.ok) {
                        const data = await response.json();

                        setSiteData(data);
                        setActive(data[0]);
                        setSite(data[0]);

                        localStorage.setItem('siteData', JSON.stringify(data));
                    } else {
                        alert("Failed to fetch data from server.");
                    }
                } catch (error) {
                    alert("Error fetching site data:", error);
                }
            }
        };
        loadData();
    }, []);

    const links = siteData.filter(item => item.LOC_loc_code !== 'ADMIN').map((item) => (
        <a
            className={classes.link}
            data-active={item.LOC_loc_code === active.LOC_loc_code || undefined}
            href='#'
            key={`${item.LOC_loc_code}--${item.name}`}
            onClick={(event) => {
                event.preventDefault();

                setActive(item);
                setSite(item);
            }}
        >
            <IconMapPin2 className={classes.linkIcon} stroke={1.5} />
            <span>{item.LOC_loc_code}--{item.name}</span>
        </a>
    ));

    const logout = async () => {
        try {
            const response = await fetch('/api/auth/logout');

            if (!response.ok) {
                throw new Error("Logout failed");
            }
        } catch (error) {
            alert(error.message || "Error logging out");
        } finally {
            router.push('/');
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
                <a href="" className={classes.link} onClick={() => router.push('/transactions?loc_code=ADMIN')}>
                    <IconClipboardText className={classes.linkIcon} stroke={1.5} />
                    <span>Transaction Logs</span>
                </a>
                <a href="#" className={classes.link} onClick={logout}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}
