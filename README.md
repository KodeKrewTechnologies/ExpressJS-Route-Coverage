# ExpressJS-Route-Coverage
    An express JS plugin to print registered routes of an expressJS app.
    
This project is inspired by the following [Stack Overflow Answer](https://stackoverflow.com/a/46397967/6072570).

![Made with love in India](https://madewithlove.now.sh/in?heart=true&template=for-the-badge) `&& ` ![javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

![npm](https://img.shields.io/npm/dw/expressjs-route-coverage?style=for-the-badge)
[![code-sandbox](https://img.shields.io/badge/Codesandbox-000000?style=for-the-badge&logo=CodeSandbox&logoColor=white)](https://codesandbox.io/p/sandbox/billowing-violet-x2vit4)

## Installation

### CLI
    # On your terminal, run the following command:
    npm i -g expressjs-route-coverage

### ExpressJS application development plugin
    # On your terminal, run the following command:
    npm i -D expressjs-route-coverage
    # Add the following script to your `package.json` file:
    "scripts": {
        "log-routes": "erc -p <path> -v <variable> -o <output> -f <output-file>"
    }

> A good way is to add it before the mocha command in your `package.json` file.
```
    "scripts": {
        "test": "erc -p <path> -v <variable> -o <output> -f <output-file> && mocha",
    }
```

### ExpressJS application middleware plugin
    # On your terminal, run the following command:
    npm i expressjs-route-coverage


## Usage

### CLI
```
  _____   ____     ____ 
 | ____| |  _ \   / ___|
 |  _|   | |_) | | |    
 | |___  |  _ <  | |___ 
 |_____| |_| \_\  \____|
                        

Usage: erc -p <path>  -v <variable> -o <output> -f <output-file>
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                                                                          │
│   An express JS plugin to print registered routes of an expressJS app.   │
│                                                                          │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘


Options:
      --version      Show version number                               [boolean]
  -p, --path         Path to ExpressJS App file
  -v, --variable     Variable name of ExpressJS App                     [string]
  -o, --output       Output type path                                   [string]
  -f, --output-file  Output file path
      --help         Show help                                         [boolean]
```
> Example

    erc -p ../my-express-api/app.js -v app -o json -f ../my-express-api/routes.json
    
    # or
    
    npm run log-routes -p ../my-express-api/app.js -v app -o json -f ../my-express-api/routes.json

### ExpressJS application plugin
    In your ExpressJS application, add the following code at the end of the file:
```
    const express = require('express');
    const { logRegisteredRoutes } = require('expressjs-route-coverage');
    .
    .

    const app = express();
    .
    .
    .
    console.log(logRegisteredRoutes(app));
```


Developed by [Trishant Pahwa](https://trishantpahwa.me) at [KodeKrew Technologies](https://kodekrew.com).