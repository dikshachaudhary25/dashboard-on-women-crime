const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const router = express.Router();
const app = express();
app.use(cors());
// MySQL database connection configuration
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Diksha25.",
  database: "women_crime",
};

// Endpoint to fetch data from the database
router.get("/sumtc", async (req, res) => {
  try {
    // Establish a connection to the MySQL database
    const connection = await pool.getConnection();
    // Perform a query to fetch data from the database
    const [result] = await connection.execute(
      "SELECT SUM(total_cases_for_trial) AS total FROM women_crime_data"
    );
    // Close the database connection
    connection.release();
    //Store the result
    const sum = result[0].total;
    // Send the fetched data as a response
    res.json({ sum });
  } catch (error) {
    console.error("Error fetching sum:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/sump_ar", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "SELECT SUM(persons_arrested) AS totalp_ar FROM women_crime_data"
    );
    connection.release();
    const sum = result[0].totalp_ar;
    res.json({ sum });
  } catch (error) {
    console.error("Error fetching sum:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/sump_cv", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "SELECT SUM(persons_convicted) AS totalp_cv FROM women_crime_data"
    );
    connection.release();

    const sum = result[0].totalp_cv;
    res.json({ sum });
  } catch (error) {
    console.error("Error fetching sum:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/sump_aq", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      "SELECT SUM(persons_acquitted) AS totalp_aq FROM women_crime_data"
    );
    connection.release();

    const sum = result[0].totalp_aq;
    res.json({ sum });
  } catch (error) {
    console.error("Error fetching sum:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/TvsA", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(
      "SELECT area_name, SUM(total_cases_for_trial) AS total_cases_sum FROM women_crime_data GROUP BY area_name"
    );
    connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/PCVvsYear", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(
      "SELECT year , SUM(persons_convicted) AS total_people_convicted FROM women_crime.women_crime_data GROUP BY year order by year asc"
    );
    connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/TCvsYear", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(
      "SELECT year , SUM(total_cases_for_trial) AS total_cases_sum1 FROM women_crime.women_crime_data GROUP BY year order by year asc"
    );
    connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/ParvsYear", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(
      "SELECT year , SUM(persons_arrested) AS persons_arrested_sum FROM women_crime.women_crime_data GROUP BY year order by year asc"
    );
    connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/trialrate", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query (
  "SELECT area_name, ROUND(AVG(trial_completion_rate) * 100, 2) AS trial_completion_rate FROM (SELECT area_name, (Persons_Trial_Completed / Persons_under_Trial_at_Year_beginning) AS trial_completion_rate FROM women_crime.women_crime_data GROUP BY area_name, Persons_Trial_Completed, Persons_under_Trial_at_Year_beginning) AS subquery GROUP BY area_name");
    connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/area", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(
      "SELECT distinct area_name FROM women_crime.women_crime_data order by area_name asc"
    );
    connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/totalcrimes", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(
      'SELECT group_name , SUM(total_persons_under_trial) AS total_people FROM women_crime.women_crime_data GROUP BY group_name order by group_name asc'
    );
    connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/arrestrate", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.query(
      "SELECT area_name, (SUM(persons_arrested) / SUM(total_cases_for_trial)) * 100 AS arrest_rate FROM women_crime.women_crime_data GROUP BY area_name"
    );
    connection.end();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});



module.exports = router;
