'use client'

import { LeadGrid } from "./components/leadgrid/LeadGrid";
import { Login } from "./components/login/Login";

import classes from "./app.module.css";

export default function Home() {
    return (
        <div>
            <main className={classes.main}>
                <LeadGrid
                    primaryContent={<Login/>}
                />
            </main>
        </div>
    );
}
