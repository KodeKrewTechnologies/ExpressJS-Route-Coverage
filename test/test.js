const assert = require("assert");
const { spawn } = require("child_process");
const fs = require("fs");

const { logRegisteredRoutes } = require("../index");
const { app } = require("./sample-app");

// Utility function to run a script and capture the output and exit code.
function run_script(command, args, callback) {
    var child = spawn(command, args, { shell: true });

    var scriptOutput = "";

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function (data) {
        data = data.toString();
        scriptOutput += data;
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);

        data = data.toString();
        scriptOutput += data;
    });

    child.on('close', function (code) {
        callback(scriptOutput, code);
    });
}

const _routes = [
    'GET / => ',
    'GET /a => GET Route from a.',
    'POST /a => Post Route to a.',
    'GET /a/1/2 => ',
    'GET /b => ',
    'GET /c => '
];

describe("Get all registered route on sample-app", () => {
    describe("Programatic route listing", () => {
        it("should return all the expected routes as an array.", (done) => {
            assert(logRegisteredRoutes(app), _routes);
            done()
        });
    });
    describe("CLI route listing", () => {
        it("should print all the expected routes in the console.", (done) => {
            run_script("erc", ["-p", "test/sample-app.js", "-v", "app", "-o", "print"], function (output, exit_code) {
                assert.equal(exit_code, 0);
                assert.equal(output, `GET\t/\nGET\t/a => GET\nPOST\t/a => Post\nGET\t/a/1/2\nGET\t/b\nGET\t/c\n`);
                done();
            });
        });
        it("should write all the expected routes into a JSON file.", (done) => {
            run_script("erc", ["-p", "test/sample-app.js", "-v", "app", "-o", "json", "-f", "test/routes.json"], function (output, exit_code) {
                assert.equal(exit_code, 0);
                if (fs.existsSync("test/routes.json")) {
                    const routes = JSON.parse(fs.readFileSync("test/routes.json")).routes;
                    assert.deepStrictEqual(routes.toString(", "), _routes.toString(", "))
                }
                else throw ("routes.json not found.");
                fs.rmSync("test/routes.json");
                done();
            });
        });
    });
});