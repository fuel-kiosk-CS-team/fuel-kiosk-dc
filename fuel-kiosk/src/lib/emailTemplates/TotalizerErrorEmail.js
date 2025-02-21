import React from 'react';


export function TotalizerErrorEmail({
    fuel_site,
    fuel_type,
}) {
    return (
        <html>
            <style type="text/css"> {`
                body { font-family: Arial, Helvetica, sans-serif;
            `}
            </style>
            <body>
                <p>There is a user generated flag for beginning totalizer reading at {fuel_site} for {fuel_type}.</p>
                <p>The user will be prompted to enter a corrected totalizer starting number.</p>

                <p>Thank You,<br />
                Motor Pool<br /><br />
                (541) 737-4141  Phone<br />
                <a href="mailto:motorpool@oregonstate.edu">motorpool@oregonstate.edu</a></p>
            </body>
        </html>
    );
}
