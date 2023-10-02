// src/db/models/benchmarkSettings.js
const mongoose = require('../index');

const BenchmarkSettingsSchema = new mongoose.Schema({
	settings: mongoose.Schema.Types.Mixed
});

const BenchmarkSettings = mongoose.model('BenchmarkSettings', BenchmarkSettingsSchema);

module.exports = BenchmarkSettings;

