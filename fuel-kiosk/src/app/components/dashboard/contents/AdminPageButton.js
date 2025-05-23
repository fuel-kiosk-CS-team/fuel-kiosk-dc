// Import UI components and icons
import { Button , ActionIcon} from "@mantine/core";
import Link from "next/link";
import { IconShieldLock } from "@tabler/icons-react";

// Button component for admin page navigation
export function AdminPageButton() {
    return (
      // Container with centered content
      <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* Link wrapper with full dimensions */}
        <Link href="/admin" passHref style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" , textDecoration: "none" }}>
            {/* Styled button with icon */}
            <ActionIcon style={{ height: "100%", width:"100%"}} radius="md" variant="light" color="rgb(201, 201, 201)">
                <div style={{fontSize: "20pt"}}>
                  Admin Page 
                </div>
                <IconShieldLock size={32} />
            </ActionIcon>
        </Link>
      </div>
    );
}
  