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
const tmp_dir      = "./tmp";



// Kinda lazy, but I don't want to deal with these possibly existing.
try {
  fs.rmdirSync(artifact_dir, {
    recursive: true
  });
  fs.rmdirSync(tmp_dir, {
    recursive: true
  });
} catch (error) {
  console.error("unable to delete transient directories", error);
}

fs.mkdirSync(artifact_dir);
fs.mkdirSync(tmp_dir);



(async() => {
  const sg = stepGeneratorFactory(steps);

  for await ( let [ count, current_steps ] of sg ) {

    const curr_artifact_dir = `${artifact_dir}/${count}`;

    fs.mkdirSync(curr_artifact_dir, {
      recursive: true
    });

    fs.writeFileSync( `${tmp_dir}/steps`, JSON.stringify( current_steps, null, 2 ) );

    await createDockerFile( current_steps, `${tmp_dir}/Dockerfile`);

    spawnSync("docker", ["build", tmp_dir, `--tag=pgb:0.1.${count}`], {
      PATH: process.env.PATH,
      stdio: "inherit",
      env: process.env
    });

    spawnSync("docker", ["run", "-v" , `${tmp_dir}:/home/postgres/benches`, "-it", `pgb:0.1.${count}`], {
      PATH: process.env.PATH,
      stdio: "inherit",
      env: process.env
    });

    //cleanup
    fs.cpSync(tmp_dir, curr_artifact_dir, {
      recursive: true
    });
  }
})();
