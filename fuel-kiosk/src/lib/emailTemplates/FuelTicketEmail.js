import React from "react";

export function FuelTicketEmail({
    datetime_Insert,
    ftk_date,
    loc_code,
    fuel_type,
    totalizer_start,
    eq_no,
    pid_info,
    odometer,
    qty_fuel,
    totalizer_end,
    acct_code,
    business_purpose,
    totalizer_update

}) {
    return (
        <html>
            <head>
                <style type="text/css">
                    {`
                        body { font-family: Arial, Helvetica, sans-serif; }
                        table { border-collapse: collapse; width: 100%; }
                        td { border: 1px solid black; padding: 5px; }
                        b { font-size: 16px; }
                    `}
                </style>
            </head>
            <body>
                <table>
                    <tr><td colSpan="2"><b>Fuel Site Entry Log</b></td></tr>
                    <tr><td>Date/Time Insert:</td><td>{datetime_Insert}</td></tr>
                    <tr><td>Date:</td><td>{ftk_date}</td></tr>
                    <tr><td>Totalizer Start:</td><td>{totalizer_start}</td></tr>
                    <tr><td>Fuel Site:</td><td>{loc_code}</td></tr>
                    <tr><td>Fuel Type:</td><td>{fuel_type}</td></tr>
                    <tr><td>Veh ID:</td><td>{eq_no}</td></tr>
                    <tr><td>PID Info:</td><td>{pid_info}</td></tr>
                    <tr><td>Odometer:</td><td>{odometer}</td></tr>
                    <tr><td>Gallons Pumped:</td><td>{qty_fuel}</td></tr>
                    <tr><td>Totalizer End:</td><td>{totalizer_end}</td></tr>
                    <tr><td>Index-Activity:</td><td>{acct_code}</td></tr>
                    <tr><td>Business Purpose:</td><td>{business_purpose}</td></tr>
                    <tr><td>Totalizer Update:</td><td>{totalizer_update}</td></tr>
                </table>
                <p>Thank You,<br />
                    Motor Pool<br /><br />
                    (541) 737-4141 Phone<br />
                    <a href="mailto:motorpool@oregonstate.edu">motorpool@oregonstate.edu</a>
                </p>
            </body>
        </html>
    );
}
