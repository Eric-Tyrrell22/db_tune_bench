/* configure options worth looking at.
  --with-blocksize=BLOCKSIZE
  --with-segsize=SEGSIZE
	--with-wal-blocksize=BLOCKSIZE
	-- with-icu // Not sure what icu does.
  -- with-uuid=LIB
	-- with-openssl
	--with-lz4
	--withzstd
	--withselinux
	--with-systemd
	--with-gnu-ld
 */

/*
	interesting configure Env flags
	CFLAGS
	LDLDFLAGS
	CXX
	CXXFLAGS
	CPP - C preprocessor, not c plus plus
	ICU_CFLAGS
	LZ4_CFLAGS
	ZSTD_CFLAGS
*/

const possible_configure_params = {
  // The default, 8 kilobytes, is suitable for most situations; but other values may be useful in special cases. The value must be a power of 2 between 1 and 32 (kilobytes).
  //'--with-blocksize': [1, 2, 4, 8, 16, 32]
  "--with-blocksize": [8, 16],
  //  It is recommended, though not absolutely required, that this value be a power of 2. Note that changing this value breaks on-disk database compatibility, meaning you cannot use pg_upgrade to upgrade to a build with a different segment size.
  //'--with-segsize': [1, 2, 3, 4, 8, 16, 19, 32]
  "--with-segsize": [1, 2, 4],
  //The value must be a power of 2 between 1 and 64 (kilobytes).
  "--with-wal-blocksize": [1, 2, 4],
  //'--with-wal-blocksize': [1, 2, 4, 8, 16, 32, 64]
};

const steps = [
  {
    type: "meta",
    workdir: "/home/postgres/postgresql-15.4",
  },
  { 
    type: "command",
    command: "./configure",
    possible_params: possible_configure_params
  },
  "make",
  "make install",
  "/sbin/ldconfig /usr/local/pgsql/lib",
  {
    type: "meta",
    user: "postgres"
  },
  {
    type: "meta",
    env: "LD_LIBRARY_PATH=/usr/local/pgsql/lib"
  },
  {
    type: "meta",
    env: "PATH=/usr/local/pgsql/bin:$PATH"
  },
  "initdb -D ~/data",
  {
    type: "meta",
    workdir: "/home/postgres",
  },
  {
    type: "meta",
    copy: {
      src: "benchmarks/postgres/steps/run_and_bench.sh",
      dest: "run_and_bench.sh"
    }
  },
];

module.exports = {
  steps
};
