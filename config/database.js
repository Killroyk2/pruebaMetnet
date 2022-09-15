//variables para el pool de conexiones

module.exports = {
  hrPool: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectString: process.env.DBC,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};
