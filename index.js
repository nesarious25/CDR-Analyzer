const { connection } = require("./connect");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/get-data/:choice", (req, res) => {
  const { choice } = req.params;
  let sqlQuery = "";

  switch (choice) {
    case "called":
      const calledNumber = req.query.phoneNumber;
      if (!calledNumber) {
        res.status(400).send("Please provide a 'phoneNumber' parameter");
        return;
      }
      sqlQuery = "SELECT `caller`,`called` FROM cdr WHERE called = ?";
      connection.query(sqlQuery, [calledNumber], (err, result) => {
        if (err) {
          res.status(500).send("Error fetching data");
        } else {
          res.json(result);
        }
      });
      return;
    case "caller":
      const callerNumber = req.query.phoneNumber;
      if (!callerNumber) {
        res.status(400).send("Please provide a 'phoneNumber' parameter");
        return;
      }
      sqlQuery = "SELECT * FROM cdr WHERE caller = ?";
      connection.query(sqlQuery, [callerNumber], (err, result) => {
        if (err) {
          res.status(500).send("Error fetching data");
        } else {
          res.json(result);
        }
      });
      return;

    case "calldate":
      const { startDate, endDate } = req.query;
      if (!startDate || !endDate) {
        res
          .status(400)
          .send("Please provide 'startDate' and 'endDate' parameters");
        return;
      }
      sqlQuery = `
        SELECT * 
        FROM cdr 
        WHERE DATE(calldate) >= ? AND DATE(callend) <= ?
      `;
      connection.query(sqlQuery, [startDate, endDate], (err, result) => {
        if (err) {
          res.status(500).send("Error fetching data");
        } else {
          res.json(result);
        }
      });
      return;

    default:
      res.status(400).send("Invalid choice");
      return;
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
