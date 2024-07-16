# internsip_project
Dish Management Dashboard
This project is a full-stack application designed to manage and display dish information. It features a dashboard for creating, viewing, and toggling the published status of dishes. The application utilizes a MySQL database, a Node.js/Express backend, and a React.js frontend, with real-time updates implemented using WebSockets.

Features
Database Schema: Stores dish information, including:

dish_id (unique identifier)
dish_name (string)
image_url (string)
is_published (boolean)

API Endpoints:
Fetch all dishes from the database.
Toggle the published status of a dish.

Frontend Dashboard:
Built with React.js, displaying all dishes with their details.
Button to toggle the published status, updating both the UI and the backend seamlessly.
Real-Time Updates: Utilizes WebSockets to ensure the dashboard reflects real-time changes made directly in the backend.

Tech Stack
Frontend: React.js
Backend: Node.js with Express
Database: MySQL
Real-Time Communication: WebSockets

Installation
Clone the repository.
Set up the MySQL database and populate it with the provided JSON data.
Run the backend and frontend servers to start the application.
