# fuel-kiosk directory README.md

## How to start working on this project:

### Step 0
If you're not comfortable with JavaScript, or TypeScript, then we recommend you start learning that to begin with. JavaScript is the easiest and most applicable to this project since the majority of the files are written in JS, it's fairly intuitive and very quick to learn, the real trick comes with learning React.


___
### Step 1
If you don't know React, we highly recommend you learn it before you start to work on this project. Components are a big part of this project, so understanding that much is the bare minimum. You know how you learn best, so we won't make a direct recommendation for how to learn this.

___
### Step 2

The next big step is to learn how to read through this project. This will involve learning about Next.js, specifically you need to know how the App Router works (https://nextjs.org/docs/app/building-your-application/routing.). 

If you read through their documentation you should be mostly set, and with a semi-solid understanding of how React works you should catch on pretty quick if you relate the concepts you learn to the project.

___
#### Step 2.5
A small but **highly** recommended step is learning about and/or referencing Mantine (https://mantine.dev/guides/next/) which is a components module we use throughout the project. This is really just an quality of life step since they have highly customizable components and really great documentation on how to use them. The project is already configured to work with Mantine's core, dates, and hooks packages, but adding others would (and should) be fairly easy, if it even requires any changes at all.
___

### Step 3
From there we recommend understanding how to interact with the database, which means you'll need to learn about Prisma:
https://www.prisma.io/docs. If you don't know how basic database design works, then you should probably start there.
___

### Step 4
You'll also need to setup a .env file that has at least these declared:

    DATABASE_URL="[database link with password included]"

    SECRET_KEY="[something very secret]"

    NODE_ENV="pro"

Anything within [ ] needs to be replaced, for more information on environment variables, read this:
https://www.dreamhost.com/blog/environment-variables/
___

## Config Files

This section is for if you're confused about how the config files work and why there are so many of them. This is admittedly where things get fairly complicated and don't always have a direct guide. Right now, these config files are setup so you can use TypeScript or JavaScript for React. It is suggested you don't mess with these files too much, as all modules you should need for this project (whether to expand or maintain) should already be included and configured. 

## Testing - Cypress and Jest

To run tests use the following scripts:

    "test:unit-and-integration"

    "test:e2e"localhost:3000 cy:run"

    "test:watch"

    "cy:open"

    "cy:run"

More information as to what is actually going on when these scripts are ran can be found in the package.json, but they should be fairly straight forward.