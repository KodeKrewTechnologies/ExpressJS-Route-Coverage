function registeredRoutes(app) {
  const routes = app._router.stack.filter((route) => route.name === "bound dispatch").map((route) => route.route);
  return routes.map((route) => {
    let _method = Object.keys(route.methods)[0], _path = route.path, _description = ""
    if (_path.path) {
      _description = _path.description;
      _path = _path.path;
    }
    return `${_method.toUpperCase()} ${_path} => ${_description}`;
  });
}

module.exports = registeredRoutes;
