#!/usr/bin/env bash

pg_ctl -D ~/data -l ~/logfile start

pgbench -c 5 -C -j 5 -T 20 > ~/bench_1

