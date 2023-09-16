const {steps: setup_steps} = require("./setup");
const {steps: compile_steps} = require("./compile_step");
const {steps: configure_steps} = require("./configure_step");
const {steps: run_steps} = require("./run_step");

module.exports = {
  steps: [...setup_steps, ...compile_steps, ...configure_steps, ...run_steps],
};
