const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. Global trends (Line Chart)
router.get('/global-trends', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT date, SUM(confirmed) AS confirmed, SUM(deaths) AS deaths, SUM(recovered) AS recovered
      FROM statistics GROUP BY date ORDER BY date
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching global trends' });
  }
});

// 2. Top affected countries (Bar Chart)
router.get('/top-countries', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.name, SUM(s.confirmed) AS confirmed
      FROM statistics s JOIN countries c ON s.country_id = c.id
      GROUP BY c.name ORDER BY confirmed DESC LIMIT 5
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching top countries' });
  }
});

// 3. Regional distribution (Pie Chart)
router.get('/region-distribution', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.region, SUM(s.confirmed) AS confirmed
      FROM statistics s JOIN countries c ON s.country_id = c.id
      GROUP BY c.region
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching region distribution' });
  }
});

// 4. Recovery vs Death (Radar Chart)
router.get('/recovery-vs-death', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.name, SUM(s.recovered) AS recovered, SUM(s.deaths) AS deaths
      FROM statistics s JOIN countries c ON s.country_id = c.id
      GROUP BY c.name
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching recovery vs death' });
  }
});

// 5. All countries
router.get('/countries', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM countries');
  res.json(rows);
});

// 6. All statistics
router.get('/statistics', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM statistics');
  res.json(rows);
});

// 7. Stats for a specific country
router.get('/country-stats/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM statistics WHERE country_id = ?', [req.params.id]);
  res.json(rows);
});

// Summary endpoint for total numbers
router.get('/summary', async (req, res) => {
  try {
    console.log('Fetching summary data from database...');
    const [rows] = await db.query(`
      SELECT 
        COALESCE(SUM(confirmed), 0) as confirmed,
        COALESCE(SUM(deaths), 0) as deaths,
        COALESCE(SUM(recovered), 0) as recovered,
        COALESCE(SUM(confirmed) - SUM(recovered) - SUM(deaths), 0) as active
      FROM statistics
    `);
    console.log('Summary data:', rows[0]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error in summary endpoint:', err);
    res.status(500).json({ error: 'Error fetching summary data' });
  }
});

module.exports = router;
