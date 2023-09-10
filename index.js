const { stepGeneratorFactory } = require("./utils");
const { createDockerFile }     = require("./docker");

const { steps } = require("./postgres/steps");

(async() => {
  const sg = stepGeneratorFactory(steps);
  for await ( let current_steps of sg ) {
    await createDockerFile( current_steps);
  }
})();
