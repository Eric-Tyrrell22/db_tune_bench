const { stepGeneratorFactory } = require("./utils");
const { createDockerFile }     = require("./docker");
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const root_dir = path.resolve(__dirname, "..");

const bench = "postgres";
const benchmark_path = `${root_dir}/benchmarks/${bench}`;
const { steps } = require(`${benchmark_path}/steps`);

const artifact_dir = `${benchmark_path}/artifacts`;
const log_dir      = `${benchmark_path}/logs`;


// Kinda lazy, but I don't want to deal with these possibly existing.
try {
  fs.rmdirSync(artifact_dir, {
    recursive: true
  });
  fs.rmdirSync(log_dir, {
    recursive: true
  });
} catch (error) {
  console.error("unable to delete transient directories", error);
}

fs.mkdirSync(artifact_dir);
fs.mkdirSync(log_dir);


(async() => {
  const sg = stepGeneratorFactory(steps);
  let count = 0;

  for await ( let current_steps of sg ) {
    count += 1;
    const curr_artifact_dir = `${artifact_dir}/${count}`;

    fs.mkdirSync(curr_artifact_dir, {
      recursive: true
    });
    fs.writeFileSync( `${curr_artifact_dir}/steps`, JSON.stringify( current_steps, null, 2 ) );

    await createDockerFile( current_steps, `${curr_artifact_dir}/Dockerfile`);

    spawnSync("docker", ["build", ".", `--tag=pgb:0.1.${count}`], {
      PATH: process.env.PATH,
      stdio: "inherit",
      env: process.env
    });

    spawnSync("docker", ["run", "-v" , `${curr_artifact_dir}:/home/postgres/benches`, "-it", `pgb:0.1.${count}`], {
      PATH: process.env.PATH,
      stdio: "inherit",
      env: process.env
    });
  }
})();
