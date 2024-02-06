const express = require("express");
const mysql = require("mysql2/promise");
const apiRouter = require("./api");

const app = express();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Diksha25.",
  database: "women_crime",
  connectionLimit: 100,
});

// Add CORS headers before defining API routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/api/women_crime", (req, res) => {
  res.json(women_crime_data);
});

app.use(express.static("diksha_app"));

app.use("/api", apiRouter);

app.get("/TvsA", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT area_name, SUM(total_cases_for_trial) AS total_cases_sum FROM women_crime_data GROUP BY area_name"
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/sumtc", async (req, res) => {
  try {
    // Acquire a connection from the pool
    const connection = await pool.getConnection();

    // Execute the query to calculate the sum
    const [rows] = await connection.execute(
      "SELECT SUM(total_cases_for_trial) AS total_sumtc FROM women_crime_data"
    );

    // Get the sum value from the result
    const sum = rows[0].total_sumtc;

    // Release the connection back to the pool
    connection.release();

    // Send the sum value as the response
    res.json({ sum });
  } catch (error) {
    console.error("Error fetching sum:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/sump_ar", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT SUM(persons_arrested) AS total_sump_ar FROM women_crime_data"
    );
    const sum = rows[0].total_sump_ar;
    connection.release();
    res.json({ sum });
  } catch (error) {
    console.error("Error fetching sum:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/sump_cv", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT SUM(persons_convicted) AS total_sump_cv FROM women_crime_data"
    );
    const sum = rows[0].total_sump_cv;
    connection.release();
    res.json({ sum });
  } catch (error) {
    console.error("Error fetching sum:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/sump_aq", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT SUM(persons_acquitted) AS total_sump_aq FROM women_crime_data"
    );    
    const sum = rows[0].total_sump_aq;    
    connection.release();    
    res.json({ sum });
  } catch (error) {
    console.error("Error fetching sum:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/PCVvsYear", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT year , SUM(persons_convicted) AS total_people_convicted FROM women_crime.women_crime_data GROUP BY year order by year asc"
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/TCvsYear", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT year , SUM(total_cases_for_trial) AS total_cases_sum FROM women_crime.women_crime_data GROUP BY year order by year asc"
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/ParvsYear", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT year , SUM(persons_arrested) AS persons_arrested_sum FROM women_crime.women_crime_data GROUP BY year order by year asc"
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/trialrate", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT area_name, ROUND(AVG(trial_completion_rate) * 100, 2) AS trial_completion_rate FROM (SELECT area_name, (Persons_Trial_Completed / Persons_under_Trial_at_Year_beginning) AS trial_completion_rate FROM women_crime.women_crime_data GROUP BY area_name, Persons_Trial_Completed, Persons_under_Trial_at_Year_beginning) AS subquery GROUP BY area_name");

    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/area", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT distinct area_name FROM women_crime.women_crime_data order by area_name asc"
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/totalcrimes", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      'SELECT group_name , SUM(total_persons_under_trial) AS total_people FROM women_crime.women_crime_data GROUP BY group_name order by group_name asc'
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/arrestrate", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      "SELECT area_name, (SUM(persons_arrested) / SUM(total_cases_for_trial)) * 100 AS arrest_rate FROM women_crime.women_crime_data GROUP BY area_name"
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
