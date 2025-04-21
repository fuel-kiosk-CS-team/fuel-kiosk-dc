'use client'

import { LeadGrid } from "./components/dashboard/leadgrid/LeadGrid";
import { Login } from "./components/login/Login";
import {AdminPageButton} from "./components/dashboard/contents/AdminPageButton"
import {InputFormButton} from "./components/dashboard/contents/InputFormButton"
import {FuelFlowStatus} from "./components/dashboard/contents/FuelFlowStatus"

import classes from "./app.module.css";

export default function Home() {
    return (
        <div>
            <main className={classes.main}>
                <LeadGrid
                    // Login
                    primaryContent={<Login/>}
                    // Admin Page
                    secondaryBottomLeftContent={<AdminPageButton/>}
                    // Fuel Input Form Page
                    secondaryTopContent={<InputFormButton/>}
                    // Fuel Flow Status
                    secondaryBottomRightContent={<FuelFlowStatus />}
                />
            </main>
        </div>
    );
}
