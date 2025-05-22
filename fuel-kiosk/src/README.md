# src directory overview
## app directory
The app directory holds the majority of code for the assignment, within it are multiple directories and files. 

The layout of this directory is most easily explained by Next.js via their documentation on the App Router (NOT the Pages Router). Their documentation and explanation of the routing system can be found here: 

    https://nextjs.org/docs/app/building-your-application/routing.

In short, if you're having trouble with a specific page, try to find the directory that has the same name as the web path to that page.


---


One subdirectory that is unique and may be confusing is sites, it contains a subdirectory of its own: 

    app/sites/[loc_code]

How this works is every site has it's own page, but it uses the same template just with slightly different information (site name, previous fuel data, etc.). 

## lib directory
### Automated Emails
This directory does a few things, first it has our ability to email (email.js) and has the templates for said emails (lib/emailTemplates/*.js). These can be edited as needed, but make sure to keep correct syntactical structure and ensure they still work with the email.js file.

### Prisma
It also initializes our use of prisma throughout the project. For more information about prisma please refer to their documentation (https://www.prisma.io/docs). Our schema for the database can also be found in /src/prisma/

### Authenticity & Saved Login
The session.js file saves user sessions when a valid and complete login is provided while the device has internet connection. So essentially, user login/logout is primarily handled here (backend), for how to actually use it within the project see fuel-kiosk/src/app/api/auth.

## middleware.js
This handles user cookies, this is what actually restores sessions, it is encouraged to readup on what Next.js says about middleware, it should cover the basics of what's going on: 

    https://nextjs.org/docs/app/building-your-application/routing/middleware