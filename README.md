# COVID-19 Dashboard

-- Overview --
This project is a real-time COVID-19 dashboard that provides visual analytics and statistics about the global COVID-19 pandemic. The dashboard features interactive charts, summary cards, and detailed statistics to help users understand the impact of COVID-19 across different regions and countries.

-- Dataset --
The project uses a custom MySQL database (covid19.sql) that contains COVID-19 statistics including:
- Confirmed cases
- Deaths
- Recovered cases
- Active cases
- Country-wise data
- Regional distribution

-- Installation Instructions --

Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- XAMPP (for local development)

Backend Setup
1. Navigate to the backend directory:
      bash
   cd backend

2. Install dependencies:
      bash
   npm install

3. Import the database:
   - Open XAMPP Control Panel
   - Start Apache and MySQL services
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Create a new database named covid19
   - Import the covid19.sql file from the backend directory

4. Configure database connection:
   - Open backend/db.js
   - Update the database credentials if needed:
        javascript
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'covid19'

5. Start the backend server:
      bash
   node server.js
   
   The server will run on http://localhost:3000

Frontend Setup
1. Navigate to the frontend directory:
      bash
   cd frontend

2. Open index.html in your web browser or serve it using a local server

-- Dependencies --

Backend Dependencies
- express: ^4.17.1
- cors: ^2.8.5
- mysql2: ^2.3.0

Frontend Dependencies
- Bootstrap 5.3.0
- Chart.js
- Font Awesome 6.0.0

-- API Endpoints --

The backend provides the following REST API endpoints:

1. GET /api/global-trends - Get global COVID-19 trends
2. GET /api/top-countries - Get top affected countries
3. GET /api/region-distribution - Get regional distribution
4. GET /api/recovery-vs-death - Get recovery vs death rates
5. GET /api/countries - Get all countries
6. GET /api/statistics - Get all statistics
7. GET /api/country-stats/:id - Get stats for a specific country

Use the base URL: http://localhost:3000/api