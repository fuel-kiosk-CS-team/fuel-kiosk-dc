// app/api/sites/route.js

import { NextResponse } from 'next/server';

// Enable revalidation for static output
export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
    // const fuelSites = [
    //     { value:    'ADMIN--FUEL SITE ADMINISTRATOR', route: '/admin'},
    //     { value:    'CBARC-M--COLUMBIA BASIN AG RESEARCH-MOR' },
    //     { value:    'CBARC-P--COLUMBIA BASIN AG RESEARCH-PEN' },
    //     { value:    'COAREC--CENTRAL OREGON AG RES EXT' },
    //     { value:    'DAIRY--CORVALLIS' },
    //     { value:    'EOARC-B--EASTERN OREGON AG RESEARCH' },
    //     { value:    'EOARC-U--EASTERN OREGON AG RESEARCH' },
    //     { value:    'HAREC--HERMISTON AG RESEARCH STATION' },
    //     { value:    'KBREC--KLAMATH BASIN EXPERIMENT STA' },
    //     { value:    'MES--MALHEUR EXPERIMENT STATION' },
    //     { value:    'NWREC--NORTH WILLAMETTE RES EXTEN CTR' },
    //     { value:    'SOREC--SOUTHERN OREGON RES EXT CTR' },
    // ];
    const fuelSites = [
        { value: 'site-1', label: 'ADMIN--FUEL SITE ADMINISTRATOR', route: '/admin'},
        { value: 'site-2', label: 'CBARC-M--COLUMBIA BASIN AG RESEARCH-MOR' },
        { value: 'site-3', label: 'CBARC-P--COLUMBIA BASIN AG RESEARCH-PEN' },
        { value: 'site-4', label: 'COAREC--CENTRAL OREGON AG RES EXT' },
        { value: 'site-5', label: 'DAIRY--CORVALLIS' },
        { value: 'site-6', label: 'EOARC-B--EASTERN OREGON AG RESEARCH' },
        { value: 'site-7', label: 'EOARC-U--EASTERN OREGON AG RESEARCH' },
        { value: 'site-8', label: 'HAREC--HERMISTON AG RESEARCH STATION' },
        { value: 'site-9', label: 'KBREC--KLAMATH BASIN EXPERIMENT STA' },
        { value: 'site-10', label: 'MES--MALHEUR EXPERIMENT STATION' },
        { value: 'site-11', label: 'NWREC--NORTH WILLAMETTE RES EXTEN CTR' },
        { value: 'site-12', label: 'SOREC--SOUTHERN OREGON RES EXT CTR' },
    ];

    return NextResponse.json(fuelSites);
}

// Below is the ColdFusion query code for autosuggestions:
/*
<cfquery name="lookup" datasource="proto">
	SELECT FTK_bulkfuel.pid_info, Count(distinct FTK_bulkfuel.pid_info) AS CountOfpid_info
	FROM FTK_bulkfuel
	WHERE (((FTK_bulkfuel.datetime_Insert)>'1/1/2024'))
	GROUP BY FTK_bulkfuel.pid_info, FTK_bulkfuel.loc_code
	HAVING (((FTK_bulkfuel.pid_info) Not Like 'admin') AND ((FTK_bulkfuel.loc_code)='dairy') AND ((Count(FTK_bulkfuel.pid_info)) Not Like 'ADMIN'));
</cfquery>
*/


// Below is the ColdFusion query code for logging in:
/*
<cfset variables.roles="">
<cfquery datasource="proto" name="motorpool_logins">
    select oper_oper_no from USR_MAIN
    where USR_userid = '#cflogin.name#'
    and disabled_reason = '#cflogin.password#'
</cfquery>


it was used as follows:

// Ensures user exists in USR_MAIN table base on USR_userid and disabled_reason
<cfif motorpool_logins.recordCount gt 0>
    // Appends oper_oper_no (operator number) from query result to variables.roles list
    <cfset variables.roles=ListAppend(variables.roles,'#motorpool_logins.oper_oper_no#')>
    // Sets cflogin.name to user's oper_oper_no
    <cfset cflogin.name=#motorpool_logins.oper_oper_no#>
</cfif>
// Checks if roles were assigned (at least one), continues login if so
<cfif ListLen(variables.roles) gt 0>
    // proceed with login - built-in ColdFusion tag for user auth, associates them with roles
    <cfloginuser name="#cflogin.name#" password="#cflogin.password#" roles="#variables.roles#">
<cfelse>
    <cfset login_message="<b>Password did not match for location selected. Please retry.</b>">
</cfif>


Basically, the motorpool_logins query checks if the provided username 
and password match a user in t he database. IF a valid user is found
the oper_oper_no is stored as their role and is used as their login name.
If the user has roles, they're logged in and I would assume gives access to rest of
*/

// Below is the ColdFusion query code for inserting new data into db:
/*
<cfquery name="AddRecord" datasource="proto">
    INSERT INTO FTK_bulkfuel ([datetime_insert],[ftk_date],[loc_code], [fuel_type], [totalizer_start], [eq_no], [pid_info], [odometer], [qty_fuel], [totalizer_end], [acct_code], [business_purpose], [totalizer_update])
    VALUES ('#datetime_insert#','#date_time#','#fuel_site#', '#fuel_type#', '#totalizer_start#', '#unit_identifier#', '#pid_info#', '#odometer#', '#qty_fuel#', '#totalizer_end#', '#acct_code#', '#business_purpose#', '#totalizer_update#')
    </cfquery>
<cfmail from="motorpool@oregonstate.edu" to="#email_addr#" subject="Fuel Ticket: #fuel_site#-#Unit_identifier#" type="html">

href link used for inserting:
https://apps.motorpool.oregonstate.edu/apps/motorpool
*/

// Below is the ColdFusion code that 

/*
<cfquery datasource="proto" name="locations">
    select LOC_loc_code, name, email_addr
    from LOC_MAIN 
    where (emsdba.LOC_MAIN.is_fuel_site = 'Y') 
    and loc_loc_code not in ('30','50')
    order by loc_loc_code;
</cfquery>


loc_loc_code is whatever the fuelsite name is before the --

for example, the loc_loc_code is ADMIN for ADMIN--FUEL SITE ADMINISTRATOR
the name is the remaining text
*/