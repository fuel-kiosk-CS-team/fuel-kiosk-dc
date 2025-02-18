"use client"

// Dashboard page
import LeadGrid from "./components/LeadGrid";
import {AdminPageButton} from "./components/AdminPageButton"
import {InputFormButton} from "./components/InputFormButton"
import { SignOutButton } from "../components/auth/SignOutButton";
import classes from "./dashboard.module.css";

export default function Dashboard(){
    

    return (
        <div>
            <main className={classes.main}>
                <LeadGrid
                    // Fuel Input Form Page
                    primaryContent={<InputFormButton/>}
                    // Admin Page
                    secondaryBottomLeftContent={<AdminPageButton/>}
                    // Sign out button
                    secondaryTopContent={<SignOutButton/>}
                />
            </main>
        </div>
    )
}