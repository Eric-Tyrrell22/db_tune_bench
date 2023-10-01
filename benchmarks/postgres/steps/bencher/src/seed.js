const User = require("./models/user");
const { faker } = require("@faker-js/faker");


const userFaketory = async(count) => {
  const createFake = () => {
    return {
      first_name: faker.person.firstName()
    };
  };
  const fakes = faker.helpers.multiple(createFake, {
    count
  });
  await User.bulkCreate(fakes);
};


const seed = async() => {
  await User.sync({force: true });
  await userFaketory(100_000);
};

module.exports = seed;
