import { Button , ActionIcon} from "@mantine/core";
import Link from "next/link";
import { IconShieldLock } from "@tabler/icons-react";

export function AdminPageButton() {
    return (
      <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Link href="/admin" passHref style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" , textDecoration: "none" }}>
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
  