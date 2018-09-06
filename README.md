# Venu

A full-stack web application (designed for mobile responsiveness) that offers a single platform for venues of all sorts to publish and share a highly-customizable collection of marketing information. Patrons are then able to view this information, find a venue of interest, and optionally check-in for social sharing. The current version is deployed on Heroku, check it out! URL: (https://infinite-coast-11399.herokuapp.com/)

## Built With

Node
Express
React
Redux
Sagas
PostgreSQL
Material-UI
Google Maps
react-google-maps
google-maps-react

## Getting Started

### Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

### Installing

1. Download this project
2. Open folder in a code editor
3. In Terminal, run `npm install`
4. Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    for improved security, replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6`. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
5. Start postgres if not running already by using `brew services start postgresql`
6. Run `npm run server`
7. Run `npm run client`
8. Navigate to `localhost:3000`

### Create database and table

Create a new database called `venu` and create the tables from the database.sql file
