const User = require("../models/user");

const benchmark = async({
  duration = 60
}) => {
  const start = process.hrtime();
  let totalRequests = 0;

  let elapsedSeconds = 0;

  // Loop until elapsed time is less than 600 seconds (10 minutes)
  while (elapsedSeconds < duration) {
    const promises = [];

    // Create a batch of 100,000 requests
    for (let i = 0; i < 10_000; i++) {
      promises.push(User.findAll({limit: 1}));
    }

    await Promise.all(promises);

    totalRequests += promises.length;

    const currentDiff = process.hrtime(start);
    elapsedSeconds = currentDiff[0] + currentDiff[1] * 1e-9;
  }

  const rps = totalRequests / elapsedSeconds;

  return {
    totalTime: elapsedSeconds, // Time in seconds
    rps: rps
  };

};

module.exports = benchmark;
