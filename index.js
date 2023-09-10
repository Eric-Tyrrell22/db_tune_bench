const { stepGeneratorFactory } = require("./utils");
const { createDockerFile }     = require("./docker");
const { spawnSync } = require("child_process");
const fs = require("fs");

const { steps } = require("./postgres/steps");

(async() => {
  const sg = stepGeneratorFactory(steps);
  let count = 0;

  for await ( let current_steps of sg ) {
    count += 1;
    await createDockerFile( current_steps );

    spawnSync("docker", ["build", ".", `--tag=pgb:0.1.${count}`], {
      PATH: process.env.PATH,
      stdio: "inherit",
      env: process.env
    });

    await spawnSync("docker", ["run", "-v" , "./benches:/home/postgres/benches", "-it", `pgb:0.1.${count}`], {
      PATH: process.env.PATH,
      stdio: "inherit",
      env: process.env
    });

    fs.mkdirSync(`./benches/${count}`);
    spawnSync("cp", ["benches/current_bench/*", `benches/${count}/`], {
      shell: true
    });
    spawnSync("cp", ["Dockerfile", `benches/${count}/`], {
      shell: true
    });
    fs.writeFileSync( `benches/${count}/steps`, JSON.stringify( steps, null, 2 ) );
  }
})();
