# Fuel Kiosk Data Collection

### A Progressive Web App for Accurate Fuel Tracking

---


This repository, and it's contents, were used in and are the result of the 2024-2025 Senior Software Engineering Capstone Project (CS 461-463) at Oregon State University for and with the OSU Transportation Services.

---


## Team Members and Contact:

- Riley Rice (riceri@oregonstate.edu) - Scrum Master/Lead developer
- Judah Jackson (jacksjud@oregonstate.edu) - Meeting Coordinator/Developer
- Ryan Muriset (murisetr@oregonstate.edu) - Documentation Lead/Developer
- Michael Blakeman (blakemam@oregonstate.edu) - Developer
- Ryan Reed (reedrya@oregonstate.edu) - Developer
- Vi Vuong (vuongv@oregonstate.edu) - ECE Coordinator/Developer

---

## Project Overview:

### Login Page

![Site Login Page](./login-page.png)


The initial entry point to the app where users authenticate with their credentials. This page ensures only authorized personnel can access the system and is optimized for both desktop and kiosk screen sizes.

---

### Fuel Site Selection Page

![Site Page](./site-page.png)


Once logged in, users are presented with a simple interface to select the fuel site they are operating from. This screen is the main hub for kiosk interaction and supports offline operation with cached site data.

---

### Fuel Entry Page

![Site Entry Page](./entry-view.png)


The core data entry form used to log fuel transactions. Users input relevant details such as vehicle ID, fuel type, and gallons dispensed. The form is streamlined for fast, efficient input on a touchscreen device.

---


## What? Who? Why?

### Problem Statement

OSU’s mobile fueling stations service agricultural and transportation equipment across multiple remote sites, but fuel usage is currently tracked using handwritten paper logs. These logs are often incomplete or lost, leading to unreliable fuel records. Frequent power outages and limited internet connectivity further complicate reporting, resulting in failed submissions or missing transaction data. Additionally, there are discrepancies between reported stolen fuel and authorized but untracked usage. The existing fuel kiosk web interface was also built exclusively for one type of screen, causing usability issues on other devices.

### Target Audience

This project primarily benefits OSU’s Transportation and Agricultural Centers, specifically the administrators and personnel responsible for managing mobile fueling stations. It also supports field workers by simplifying and securing the fuel logging process, regardless of device or internet availability.

### Core Features and Benefits

- Cross-device Progressive Web App (PWA) with a responsive interface
- Full offline support: data is stored locally and synced when connectivity returns
- Secure user authentication with cached login support
- Administrator panel for monitoring kiosk statuses and reviewing fuel logs
- Improved usability beyond kiosk screens (phones, tablets, laptops)
- Enhanced accuracy and reliability of transaction tracking

### Comparison with Existing Solutions

The previous system relied heavily on manual data entry and a kiosk-only interface, which introduced inefficiencies, usability limitations, and a high risk of data loss. Our solution modernizes the process with a robust, offline-first digital platform that supports centralized monitoring, better accountability, and smoother user experience across all devices and network conditions.


## Technical Implementation

### Key Technologies Used

- **React & Next.js** – Core framework for the Progressive Web App (PWA)
- **Mantine** – UI component library used for styling and layout
- **MySQL** – Relational database for long-term storage of fuel transaction data
- **IndexedDB / Local Storage** – Browser-based storage for offline support
- **Next.js API Routes** – Server-side logic for syncing data with the database
- **Secure HTTPS Connections** – Ensures all data transmission is encrypted
- **Touchscreen Hardware** – Kiosk interface for field usage

### Architecture Overview

The system is designed as a hybrid online/offline architecture with synchronization logic for handling unreliable network environments. Below is the flowchart that outlines the complete lifecycle of data from local input to centralized storage:

![Fuel Kiosk System Flowchart](./flowchart.png)

**High-Level Flow:**

1. **Frontend PWA**: Built with React and Next.js, the app runs on touchscreen hardware and supports full offline capability.
2. **Local Storage & Caching**: All data is temporarily stored in the browser’s local storage or IndexedDB. It’s also encrypted to ensure secure local handling.
3. **Sync Engine**: When connectivity is available, the app syncs data to the central server using background processes.
4. **Backend API (Next.js)**: Handles data validation, syncing, and storage to the MySQL database.
5. **Database**: Centralized storage for all fuel logs and kiosk metadata, designed for scalability across multiple sites.
6. **Admin Panel**: Allows privileged users to monitor kiosk activity and audit fuel usage.

### Development Challenges and Solutions

- **Challenge**: Handling network outages and offline scenarios  
  **Solution**: We implemented robust local data storage with automatic sync once online.

- **Challenge**: Ensuring responsive UI across devices  
  **Solution**: Used Mantine components and media queries for adaptive design.

- **Challenge**: Secure data handling in a browser environment  
  **Solution**: All local data is encrypted and transmitted over secure HTTPS connections.

- **Challenge**: Providing administrative oversight across distributed sites  
  **Solution**: Built an admin dashboard to track kiosk health, sync status, and fuel logs remotely.

---

## Access and Usage

### Setup Instructions

#### 1. Clone the Repository:

```bash
git clone https://github.com/fuel-kiosk-CS-team/fuel-kiosk-dc.git
cd fuel-kiosk-dc
```

#### 2. Install dependencies:

```bash
npm install
```

#### 3. Create .env file in fuel-kiosk directory and add your database connection string:

```bash
DATABASE_URL="mysql://username:password@host:port/database"
```

#### 4. FOR DEVELOPERS: Start the development server:

```bash
npm run dev
```

#### 4. FOR USERS: Build and Start:

```bash
npm run build
npm run start
```
