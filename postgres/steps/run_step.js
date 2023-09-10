const steps = [
  "mkdir ~/benches",
  // This is to workaround docker not supporting attaching a volume to a user.
  {
    type: "meta",
    user: "root"
  },
  "chown postgres ~/benches",
  {
    type: "meta",
    user: "postgres"
  },
  {
    type: "meta",
    command: "~/run_and_bench.sh"
  }
];

module.exports = {
  steps
};
