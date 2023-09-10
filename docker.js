const fs = require('fs');

function handleMetaStep( step ) {
  if( step.workdir ) {
    return `WORKDIR ${step.workdir}`;
  }

  if( step.copy ) {
    return `COPY ${step.copy.src} ${step.copy.dest}`;
  }

  if( step.user ) {
    return `USER ${step.user}`;
  }

  if( step.env ) {
    return `ENV ${step.env}`;
  }

  return step;
}

async function createDockerFile( steps, options ) {
  const run_steps = steps.map( step => {
    if( step?.type === 'meta' ) {
      return handleMetaStep( step );
    }
    
    return `RUN ${step}`;
  });
  const content = [
    'from debian:stable',
    '\n',
    ...run_steps
  ].join('\n');
  await fs.writeFileSync('Dockerfile', content);
}

module.exports = {
  createDockerFile
}
