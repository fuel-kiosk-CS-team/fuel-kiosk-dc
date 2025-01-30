'use client'

import { LeadGrid } from "./components/leadgrid/LeadGrid";
import { Login } from "./components/login/Login";

export default function Home() {
    return (
        <div>
            <main style={{ width: "70dvw" }}>
                <LeadGrid
                    primaryContent={<Login/>}
                />
            </main>
        </div>
    );
}
