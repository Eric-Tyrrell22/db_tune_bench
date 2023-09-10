const steps = [
  {
    type: "meta",
    copy: {
      src: "run_and_bench.sh",
      dest: "~/run_and_bench.sh"
    }
  },
  {
    type: "meta",
    command: "~/run_and_bench.sh"
  }
];

module.exports = {
  steps
};
