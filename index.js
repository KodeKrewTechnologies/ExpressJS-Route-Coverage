const registeredRoutes = require("./plugin");

module.exports = {
  logRegisteredRoutes: (app) => {
    return registeredRoutes(app);
  },
};
