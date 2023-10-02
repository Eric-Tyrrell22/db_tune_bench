const express = require("express");
const bodyParser = require("body-parser");
const Benchmark = require("../db/models/benchmark");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get("/benchmarks", async (req, res) => {
  try {
    const benchmarks = await Benchmark.find();
    res.json(benchmarks);
  } catch (error) {
    console.error("Error fetching benchmarks:", error);
    res.status(500).json({ error: "Failed to retrieve benchmarks" });
  }
});

app.get("/benchmarks/:id", async (req, res) => {
  try {
    const benchmark = await Benchmark.findById(req.params.id);
    if (benchmark) {
      res.json(benchmark);
    } else {
      res.status(404).json({ error: "Benchmark not found" });
    }
  } catch (error) {
    console.error("Error fetching benchmark:", error);
    res.status(500).json({ error: "Failed to retrieve benchmark" });
  }
});

app.post("/benchmarks", async (req, res) => {
  try {
    const { benchmark_id, results, error }= req.body;
    const benchmark = await Benchmark.create({ 
      benchmark_settings_id: benchmark_id,
      results,
      error
    });

    res.status(201).send(benchmark);
  } catch (err) {
    console.log( err );
    res.status(500).send({ error: "Failed to insert benchmark" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

