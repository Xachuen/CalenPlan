# CalenPlan  
A collaborative calendar application for easy event management and real-time updates among friends.  
  
## Overview
CalenPlan is a web-based calendar application that allows users to create, manage, and share events in a 6x7 grid layout, resembling a standard monthly calendar. Users can add event names, times, descriptions, and even specify a location using the integrated MapBox API. Built with React, Node.js, and MongoDB, CalenPlan also uses Clerk for user authentication and provides real-time collaboration features among friends.

## Features
- Event Creation: Users can create events with a name, time, description, and location using MapBox for address search.
- Real-Time Updates: Events are updated in real-time across users' calendars using socket communication.
- User Authentication: Integrated Clerk for secure user sign-up and login.
- Friend Collaboration: Users can add friends and invite them to join shared calendars.
- Visual Indicators: A (!) icon shows up on a calendar day to indicate new events.
- Grid-Based Interface: 6x7 grid layout representing a standard monthly calendar view.
## Technologies Used
- Frontend: React, HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: Clerk
- Location Search: MapBox API
- Real-Time Communication: Sockets (Socket.io)

## Installation

### Prerequisites
- Node.js
- npm or yarn
- MongoDB

### Setup Instructions
1. **Clone the Repository**
   ```sh
   git clone https://github.com/xachuen/CalenPlan.git
   cd CalenPlan
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```
   or, if using Yarn:
   ```sh
   yarn install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add the following:
   ```
    VITE_CLERK_PUBLISHABLE_KEY=//Create a clerk account for this.
    CLERK_PUBLISHABLE_KEY=//Create a clerk account for this. Should be the same as ^^^.
    CLERK_SECRET_KEY=//Create a clerk account for this.
    VITE_SERVER_URL=//This is your backend URL.
    VITE_MAPBOX_KEY=//Create a MapBox account for this.
    DATABASE_URL=//Create and use your MONGODB database URL.
   ```

4. **Run the Application**
   - To run both the backend and frontend, use:
     ```sh
     npm run backend
     npm run dev
     ```
   - `npm run backend` starts the backend server, and `npm run dev` starts the frontend development server.

5. **Access the Application**
   Visit `http://localhost:3000` in your browser.
