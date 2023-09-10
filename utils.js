const fs = require("fs");

function constructCommand( command, params ) { 
  let cmd = command;

  Object.entries(params).forEach(([name, val]) => {
    if( val === null || val === undefined ) {
      return;
    }

    if(name.startsWith("--")) {
      cmd = `${cmd} ${name}=${val}`;
    } else {
      cmd = `${name}=${val} ${cmd}`;
    }
  });

  return cmd;
}

function* generateAllCombinations(obj) {
  function* helper(entries, prefix = {}) {
    if (entries.length === 0) {
      yield prefix;
    } else {
      const [currentKey, currentValues] = entries[0];
      const remainingEntries = entries.slice(1);
      for (const value of currentValues) {
        yield* helper(remainingEntries, {...prefix, [currentKey]: value});
      }
    }
  }
  yield* helper(Object.entries(obj));
}


function buildCommandCombos(step) {
  if( typeof step === "string" ) {
    return [step];
  }

  const {command, possible_params} = step;
  
  const param_combos = generateAllCombinations( possible_params );
  return param_combos.map( combo => {
    return constructCommand( command, combo);
  });
}

async function writeShellScript(commands, filename = "script.sh") {
  const content = [
    "#!/bin/bash",
    "set -e", // Exit on command failure
    ...commands
  ].join("\n");

  await fs.writeFileSync(filename, content);
  await fs.chmodSync(filename, 0o755); // Make the file executable
}

async function writeConfigFile( filename, params ) {
  const content = Object.entries(params).map( ([key,val]) => {
    return `${key} ${val}`;
  }).join("\n");
  await fs.writeFileSync(filename, content);
}

async function* handleWriteConfigFile( step ) {
  const comboGenerator = generateAllCombinations( step.possible_params );  
  for( const combo of comboGenerator ) {
    await writeConfigFile(step.filename, combo);
    yield {
      type: "meta",
      copy: {
        src: step.filename,
        dest: `/home/postgres/data/${step.filename}`
      }
    };
  }
}

function* handleBuildCommandCombos( step ) {
  const comboGenerator = generateAllCombinations( step.possible_params );  
  for( const combo of comboGenerator ) {
    yield constructCommand( step.command, combo );
  }
}

function* handleString( step ) {
  yield step;
}

function stepHandlerFactory( step ) {
  console.log( step );
  switch( step.type ) {
  case "command": return handleBuildCommandCombos;
  case "file":    return handleWriteConfigFile;
  default:        return handleString;
  }
}

async function* generateAllSteps(headGen, ...tailGens) {
  if (tailGens.length === 0) {
    for await (let h of headGen()) {
      yield [h];
    }
  } else {
    const remainder = generateAllSteps(...tailGens);
    for await (let r of remainder) {
      for await (let h of headGen()) {
        yield [h, ...r];
      }
    }
  }
}


function stepGeneratorFactory(steps) {
  const generatorsForSteps = steps.map( step => {
    return stepHandlerFactory(step).bind( null, step );
  });

  return generateAllSteps( ...generatorsForSteps );
}

module.exports = {
  generateAllCombinations,
  buildCommandCombos,
  writeShellScript,
  writeConfigFile,
  stepGeneratorFactory,
};

