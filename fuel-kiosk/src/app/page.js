'use client'

import { Login } from "@/src/app/components/auth/Login";
import classes from "./app.module.css";
// import { SignOutButton } from "./components/auth/SignOutButton";
import React from 'react';

// import { auth } from "next-auth";


export default function Home() {

    // Otherwise, there is an internet connection and we can do normal authentication
    return (
        <div>
            <main className={classes.main}>
                {/* <LeadGrid
                    // Login
                    primaryContent={<Login/>}
                    // Admin Page
                    secondaryBottomLeftContent={<AdminPageButton/>}
                    // Fuel Input Form Page
                    secondaryTopContent={<InputFormButton/>}
                    
                /> */}
                {/* {isOnline? <Login/> : <offlineLogin/>} */}
                {/* <Login/> */}
                <Login/>
                {/* <SignOutButton/> */}
            </main>
        </div>
    );
}
