'use client'

// Import dashboard components and layout elements
import { LeadGrid } from "./components/dashboard/leadgrid/LeadGrid";
import { Login } from "./components/login/Login";
import {AdminPageButton} from "./components/dashboard/contents/AdminPageButton"
import {InputFormButton} from "./components/dashboard/contents/InputFormButton"
import {FuelFlowStatus} from "./components/dashboard/contents/FuelFlowStatus"

import classes from "./app.module.css";

// Home page component with dashboard layout
export default function Home() {
    return (
        <div>
            <main className={classes.main}>
                <LeadGrid
                    // Main login form in the center
                    primaryContent={<Login/>}
                    // Admin access button in bottom left
                    secondaryBottomLeftContent={<AdminPageButton/>}
                    // Fuel Input Form Page
                    secondaryTopContent={<InputFormButton/>}
                    // Real-time fuel flow status in bottom right
                    secondaryBottomRightContent={<FuelFlowStatus />}
                />
            </main>
        </div>
    );
}
