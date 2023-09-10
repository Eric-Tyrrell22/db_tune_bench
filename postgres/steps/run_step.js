const steps = [
  'su postgres',
  '/usr/local/pgsql/bin/pg_ctl -D /home/postgres/data/ -l logfile start'
];

module.exports = {
  steps
}
