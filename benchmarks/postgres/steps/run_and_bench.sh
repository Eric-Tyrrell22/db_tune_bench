#!/usr/bin/env bash

pg_ctl -D ~/data -l ~/logfile start
mkdir -p ~/benches/current_bench

pgbench -i -s 50

pgbench -c 5 -C -j 5 -T 2 > ~/benches/current_bench/bench_1

pgbench -c 10 -C -j 5 -T 2 > ~/benches/current_bench/bench_4
pgbench -c 25 -C -j 5 -T 2 > ~/benches/current_bench/bench_5
pgbench -c 50 -C -j 5 -T 2 > ~/benches/current_bench/bench_6
pgbench -c 75 -C -j  5 -T 2 > ~/benches/current_bench/bench_7
pgbench -c 100 -C -j  5 -T 2 > ~/benches/current_bench/bench_8

pgbench -c 10 -C -j 10 -T 2 > ~/benches/current_bench/bench_14
pgbench -c 25 -C -j 25 -T 2 > ~/benches/current_bench/bench_15
pgbench -c 50 -C -j 50 -T 2 > ~/benches/current_bench/bench_16
pgbench -c 75 -C -j 75 -T 2 > ~/benches/current_bench/bench_17
pgbench -c 100 -C -j 100 -T 2 > ~/benches/current_bench/bench_18

