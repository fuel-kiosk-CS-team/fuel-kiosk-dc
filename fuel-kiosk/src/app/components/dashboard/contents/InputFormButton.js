import { Button , ActionIcon} from "@mantine/core";
import Link from "next/link";
import { IconFileText } from "@tabler/icons-react";

export function InputFormButton() {
    return (
      <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Link href="/input-form" passHref style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" , textDecoration: "none" }}>
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
