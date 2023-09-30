#!/usr/bin/env bash

#export PGPASSWORD=barbell
mkdir -p ~/benches

until pg_isready -h "postgres" -U "postgres"; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

pgbench -h postgres -i -s 5

pgbench -h postgres -c 5 -j 5 -T 30 > ~/benches/bench_1

pgbench -h postgres -c 10 -j 5 -T 30 > ~/benches/bench_4
pgbench -h postgres -c 25 -j 5 -T 30 > ~/benches/bench_5
pgbench -h postgres -c 50 -j 5 -T 30 > ~/benches/bench_6
pgbench -h postgres -c 75 -j 5 -T 30 > ~/benches/bench_7
pgbench -h postgres -c 100 -j 5 -T 30 > ~/benches/bench_8

#pgbench -h postgres -c 10 -j 10 -T 300 > ~/benches/bench_14
#pgbench -h postgres -c 25 -j 25 -T 2 > ~/benches/bench_15
#pgbench -h postgres -c 50 -j 50 -T 2 > ~/benches/bench_16
#pgbench -h postgres -c 75 -j 75 -T 2 > ~/benches/bench_17
#pgbench -h postgres -c 100 -j 100 -T 2 > ~/benches/bench_18
