import React from 'react';

export function DowntimeEmail({
    loc_code,
    last_timestamp,
}) {
    return (
        <html>
            <style type="text/css"> {`
                body { font-family: Arial, Helvetica, sans-serif;
            `}
            </style>
            <body>
                <p>There hasn't been a heartbeat from the {loc_code} fuel kiosk since {last_timestamp}. The following location may be experiencing technical difficulties.<br /><br />

                   Please check on the device promptly.
                </p>

                <p>Thank You,<br />
                Motor Pool<br /><br />
                (541) 737-4141  Phone<br />
                <a href="mailto:motorpool@oregonstate.edu">motorpool@oregonstate.edu</a></p>
            </body>
        </html>
    );
}
