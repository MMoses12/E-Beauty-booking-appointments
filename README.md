# E-Beauty

E-Beauty is a web application designed to facilitate the scheduling of appointments for beauty salons and tattoo artists. It provides a user-friendly interface for clients to find and book services conveniently. This project uses a robust backend built with Node.js and Express.js with a databse made in PostgreSQL, and a reactive frontend developed with React.

## Features

- **Appointment Booking**: Users can schedule appointments with their preferred service providers.
- **Secure Authentication**: Utilizes JWT tokens for secure authentication processes.
- **Email Integration**: Incorporates emailjs to send one-time passwords (OTPs) to users, enhancing security by preventing bot scams.
- **Password Encryption**: Ensures user password security through encryption techniques.
- **Responsive Design**: Aesthetic and responsive user interface that caters to various devices, utilizing Tailwind CSS and Bootstrap for styling.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Security**: EmailJS, bcrypt

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Required tools:
node.js
npm
PostgreSQL

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repo <br/>
   ```bash
   git clone

2. Install NPM packages for both client and server <br/>
   ```bash
   cd e-beauty
   cd server
   npm install
   cd ../client
   npm install

3. Set up your PostgreSQL database <br/>
   Create a new database named 'ebeauty' <br/>
   Configure the connection settings in your server configuration files <br/>

4. Run the development server: <br/>
   ```bash
   cd server
   npm start
   ```

   Navigate to the client folder in another terminal window: <br/>
   ```bash
   cd client <br/>
   npm run watch <br/>
   ```

## Copyright
   © 2024 E-Beauty. All Rights Reserved.


   
