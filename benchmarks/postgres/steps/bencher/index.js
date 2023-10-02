const sequelize = require("./src/db");
const axios = require("axios");
const seed = require("./src/seed");
const benchmark = require("./src/benchmarks/find_first_user");

const waitForDb = async (maxRetries = 10, delayInMillis = 10_000) => {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await sequelize.authenticate();
      console.log("Database is ready!");
      return true;
    } catch (err) {
      console.log( err );
      console.log("Database not ready, retrying...");
      retries++;
      if (retries >= maxRetries) {
        console.error("Max retries reached. Unable to connect to the database.");
        return false;
      }
      await new Promise(res => setTimeout(res, delayInMillis));
    }
  }
};

const run_benchmark = async() => {
  try {
    console.log( process.env.benchmark_id );
    await waitForDb();
    console.log("seeding");
    await seed();
    console.log("benching");
    const results = await benchmark({
      duration: 60
    });

    await axios.post("http://localhost:3000/benchmarks", {
      benchmark_id: process.env.benchmark_id,
      results,
      error: null
    });
    console.log(JSON.stringify( results, null, 2 ));
  } catch (error) {
    await axios.post("http://localhost:3000/benchmarks", {
      benchmark_id: process.env.benchmark_id,
      results: null,
      error: error
    });
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();

  }
};

run_benchmark();

module.exports = run_benchmark;
