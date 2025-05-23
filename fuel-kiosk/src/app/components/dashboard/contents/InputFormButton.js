// Import UI components and icons
import { Button , ActionIcon} from "@mantine/core";
import Link from "next/link";
import { IconFileText } from "@tabler/icons-react";

// Button component for fuel input form navigation
export function InputFormButton() {
    return (
      // Container with centered content
      <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* Link wrapper with full dimensions */}
        <Link href="/input-form" passHref style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" , textDecoration: "none" }}>
            {/* Styled button with icon */}
            <ActionIcon style={{ height: "100%", width:"100%"}} radius="md" variant="light" color="rgb(201, 201, 201)">
                <div style={{fontSize: "20pt"}}>
                  Fuel Input Form
                </div>
                <IconFileText size={32} />
            </ActionIcon>
        </Link>
      </div>
    );
}
