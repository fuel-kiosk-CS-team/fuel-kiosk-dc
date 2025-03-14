import React from 'react';


export function UnexpectedFuelFlowEmail({
    fuel_site,
    timestamp,
}) {
    let localDate = new Date(timestamp);
    return (
        <html>
            <style type="text/css"> {`
                body { font-family: Arial, Helvetica, sans-serif;
            `}
            </style>
            <body>
                <p>There was unexpected fuel flow at {fuel_site} at time {localDate.toLocaleString()}.</p>
                <p>Please double check for any errors.</p>

                <p>Thank You,<br />
                Motor Pool<br /><br />
                (541) 737-4141  Phone<br />
                <a href="mailto:motorpool@oregonstate.edu">motorpool@oregonstate.edu</a></p>
            </body>
        </html>
    );
}
