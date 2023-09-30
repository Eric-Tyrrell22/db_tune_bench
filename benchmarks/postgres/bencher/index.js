const sequelize = require("./src/db");
const User = require("./src/models/user");
const seed = require("./src/seed");
const benchmark = require("./src/benchmarks/find_first_user");

(async() => {
  try {
    await sequelize.authenticate();
    await seed();
    const results = await benchmark();
    console.log(JSON.stringify( results, null, 2 ));
    console.log(await User.count());
    await sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
