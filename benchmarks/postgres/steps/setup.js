const VERSION = 15.3;
const filename = `postgresql-${VERSION}.tar.gz`;
const url = `https://ftp.postgresql.org/pub/source/v${VERSION}/postgresql-${VERSION}.tar.gz`;

module.exports = {
  steps: [
    "useradd -ms /bin/bash postgres",
    {
      type: "meta",
      workdir: "/home/postgres",
    },
    "echo \"deb http://deb.debian.org/debian/ bookworm main contrib non-free\" > /etc/apt/sources.list",
    "apt-get update && apt-get upgrade",
    "apt-get install -y curl gcc libreadline8 libreadline-dev openssl zlib1g zlib1g-dev make",
    `curl ${url} > ${filename}`,
    `tar xf ${filename}`,
  ]
};
