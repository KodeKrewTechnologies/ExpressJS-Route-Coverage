#! /usr/bin/env node
const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const figlet = require("figlet");
const path = require("path");
const fs = require("fs");
const registeredRoutes = require("../plugin");
const { exit } = require("process");

const usage = chalk.keyword("violet")(
  "\nUsage: erc -p <path>  -v <variable> -o <output> -f <output-file> \n" +
    boxen(
      chalk.green(
        "\n" +
          "An express JS plugin to print registered routes of an expressJS app." +
          "\n"
      ),
      { padding: 1, borderColor: "green", dimBorder: true }
    ) +
    "\n"
);

const options = yargs
  .usage(usage)
  .option("p", {
    alias: "path",
    describe: "Path to ExpressJS App file",
    type: "string",
    demandOption: false,
  })
  .option("v", {
    alias: "variable",
    describe: "Variable name of ExpressJS App",
    type: "string",
    demandOption: false,
  })
  .option("o", {
    alias: "output",
    describe: "Output type path",
    type: "string",
    demandOption: false,
  })
  .option("f", {
    alias: "output-file",
    describe: "Output file path",
    type: "string",
    demandOption: false,
  })
  .help(true).argv;

const argv = require("yargs/yargs")(process.argv.slice(2)).argv;

if (argv.path == null && argv.p == null) {
  console.log(
    chalk.yellow(figlet.textSync("ERC", { horizontalLayout: "full" }))
  );
  yargs.showHelp();
  return;
}

if (argv.v == null && argv.variable == null) {
  console.log(
    chalk.yellow(figlet.textSync("ERC", { horizontalLayout: "full" }))
  );
  yargs.showHelp();
  return;
}

let _path = argv.p || argv.path;
let _variable = argv.v || argv.variable;
let _output = argv.o || argv.output;
let _outputFile = argv.f || argv.outputFile;

setTimeout(() => exit(0), 100);
main();

async function main() {
  _path = path.resolve(_path);
  if (!fs.existsSync(_path)) {
    console.log(
      chalk.yellow(figlet.textSync("ERC", { horizontalLayout: "full" }))
    );
    yargs.showHelp();
    console.log(`\n\n${chalk.red("File not found")}\n${_path}\n`);
    return;
  }
  let app = null;
  const data = fs.readFileSync(_path, "utf8");
  if (data.includes("module.exports")) {
    const imports = require(_path);
    if (Object.keys(imports).filter((key) => key === _variable).length === 1) {
      app = imports[_variable];
    } else {
      console.log(chalk.red("Not exporting ExpressJS App variable properly."));
      return;
    }
  } else {
    const update = `${data}\nmodule.exports = {${_variable}: ${_variable}};`;
    const tempFileName = `${_path.substring(
      0,
      _path.lastIndexOf("/")
    )}/.temp.${Math.floor(Math.random() * 1000000)}.js`;
    const tempFile = fs.writeFileSync(tempFileName, update);
    const imports = require(path.resolve(tempFileName));
    app = imports[_variable];
    await fs.unlinkSync(tempFileName);
  }
  if (app == null) {
    console.log(chalk.red("Unable to link with Express App properly."));
    return;
  }
  const routes = registeredRoutes(app);
  if (_output) {
    switch (_output) {
      case "json":
        if (_outputFile) {
          const fs = require("fs");
          fs.writeFileSync(_outputFile, JSON.stringify({ routes }, null, 2));
        } else {
          console.log(JSON.stringify(routes, null, 2));
        }
        break;
      case "print":
        routes.map((route) => {
          const _route = route.split(" ");
          const method = _route[0];
          const description = _route.length > 4 ? _route[2] + " " + _route[3] : false;
          const __path = _route[1];
          if (method === "GET") {
            console.log(
              `${chalk.bgGrey(chalk.greenBright(method))}\t${chalk.whiteBright(
                __path
              )}${description ? " " + chalk.cyanBright(description) : ""}`
            );
          } else if (method === "POST") {
            console.log(
              `${chalk.bgGrey(chalk.blueBright(method))}\t${chalk.whiteBright(
                __path
              )}${description ? " " + chalk.cyanBright(description) : ""}`
            );
          } else if (method === "PUT") {
            console.log(
              `${chalk.bgGrey(chalk.yellowBright(method))}\t${chalk.whiteBright(
                __path
              )}${description ? " " + chalk.cyanBright(description) : ""}`
            );
          } else if (method === "PATCH") {
            console.log(
              `${chalk.bgGrey(
                chalk.magentaBright(method)
              )}\t${chalk.whiteBright(__path)}`
            );
          } else if (method === "DELETE") {
            console.log(
              `${chalk.bgGrey(chalk.redBright(method))}\t${chalk.whiteBright(
                __path
              )}${description ? " " + chalk.cyanBright(description) : ""}`
            );
          } else {
            console.log(
              `${chalk.bgGrey(chalk.grayBright(method))}\t${chalk.whiteBright(
                __path
              )}${description ? " " + chalk.cyanBright(description) : ""}`
            );
          }
        });
        break;
      default:
        console.log(chalk.red("Invalid output type"));
        break;
    }
  } else {
    routes.map((route) => {
      const _route = route.split(" ");
      const method = _route[0];
      const __path = _route[1];
      if (method === "GET") {
        console.log(
          `${chalk.bgGrey(chalk.greenBright(method))}\t${chalk.whiteBright(
            __path
          )}`
        );
      } else if (method === "POST") {
        console.log(
          `${chalk.bgGrey(chalk.blueBright(method))}\t${chalk.whiteBright(
            __path
          )}`
        );
      } else if (method === "PUT") {
        console.log(
          `${chalk.bgGrey(chalk.yellowBright(method))}\t${chalk.whiteBright(
            __path
          )}`
        );
      } else if (method === "PATCH") {
        console.log(
          `${chalk.bgGrey(chalk.magentaBright(method))}\t${chalk.whiteBright(
            __path
          )}`
        );
      } else if (method === "DELETE") {
        console.log(
          `${chalk.bgGrey(chalk.redBright(method))}\t${chalk.whiteBright(
            __path
          )}`
        );
      } else {
        console.log(
          `${chalk.bgGrey(chalk.grayBright(method))}\t${chalk.whiteBright(
            __path
          )}`
        );
      }
    });
  }
  return routes;
}
