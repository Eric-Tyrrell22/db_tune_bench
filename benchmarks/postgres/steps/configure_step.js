const possible_params = {
  /*  connections & auth */
  listen_addresses: ["'*'"],
  max_connections: [ 100, 500 ],
  tcp_keepalives_idle:     [ 0 ], // 0 is OS default
  tcp_keepalives_interval: [ 0 ], // 0 is OS default
  tcp_keepalives_count:    [ 0 ],
  tcp_user_timeout:        [ 0 ],
  client_connection_check_interval: [ 0 ], //  0 is disabled
  // Gonna ignore the ssl stuff for now.
  /* Resource Consumption */
  /************* Memory *****************/
  shared_buffers: ["128MB"],
  huge_pages: ["off"],
  huge_page_size: [0],
  temp_buffers: ["8MB"],
  //max_prepared_transactions
  work_mem: ["4MB"],
  hash_mem_multiplier: [2],
  maintenance_work_mem: ["64MB"],
  autovacuum_work_mem: [-1], // -1 uses maintenance_work_mem instead
  logical_decoding_work_mem: ["64MB"],
  max_stack_depth: ["2MB"],
  //shared_memory_type  platform specific
  //dynamic_shared_memory_type
  min_dynamic_shared_memory: [0], // None,
  /************* DISK *****************/
  temp_file_limit: [-1], // no limit
  /************* Kernel Resource Usage *****************/
  max_files_per_process: [1000],
  /*************  Cost-based Vacuum Delay *****************/
  vacuum_cost_delay: [0], // 0 is disabled
  vacuum_cost_page_hit: [1], // this one seems sketch
  vacuum_cost_page_miss: [2],
  vacuum_cost_page_dirty: [20],
  vacuum_cost_limit: [200],
  /************* Background Writer *****************/
  bgwriter_delay: ["200ms"],
  bgwriter_lru_maxpages: [100],
  bgwriter_lru_multiplier: [2.0],
  bgwriter_flush_after: ["512kB"], // 0 - 2 MB
  /*************  Asynchronous Behavior *****************/
  backend_flush_after: [0],
  effective_io_concurrency: [1],
  maintenance_io_concurrency: [10],
  max_worker_processes: [8],
  max_parallel_workers_per_gather: [2],
  max_parallel_maintenance_workers: [2],
  max_parallel_workers: [8],
  //parallel_leader_participation: [], //default is on
  old_snapshot_threshold: [-1], // disabled
  /*************  WAL *****************/
  wal_level: ["replica"],
  // fysnc not worth testing
  synchronous_commit: ["on"], // Sacrifice durability for performance
  // wal_sync_method interesting, but not enough info on the config page
  wal_compression: ["off"],
  wal_buffers: [-1], // -1 is autotuned based on shared_buffer
  wal_writer_delay: ["200ms"],
  wal_writer_flush_after: ["1MB"],
  commit_delay: [0], // behaves differently before pg 9.3
  commit_siblings: [5],
};

const steps = [
  {
    type: "file",
    filename: "postgresql.conf",
    destination: "/home/postgres/data",
    possible_params
  }
];

steps; 

module.exports = {
  steps
};
