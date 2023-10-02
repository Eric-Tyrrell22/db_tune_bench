const mongoose = require("../index");
const BenchmarkSettings = require("./benchmarkSettings"); // Importing the model

const BenchmarkSchema = new mongoose.Schema({
  benchmark_settings_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: BenchmarkSettings,
    required: true
  },
  results: mongoose.Schema.Types.Mixed,
  error: mongoose.Schema.Types.Mixed
});

const Benchmark = mongoose.model("Benchmark", BenchmarkSchema);

module.exports = Benchmark;
