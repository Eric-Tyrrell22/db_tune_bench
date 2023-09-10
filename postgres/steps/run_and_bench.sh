#!/usr/bin/env bash

pg_ctl -D ~/data -l ~/logfile start
mkdir -p ~/benches/current_bench

pgbench -i
pgbench -c 5 -C -j 5 -T 20 > ~/benches/current_bench/bench_1


