#!/usr/bin/env node
var Command = require("./lib/command");
var TaskError = require("./lib/errors/taskerror");
var TruffleError = require("truffle-error");
var pkg = require("./package.json");
var OS = require("os");

var command = new Command(require("./lib/commands"));

command.run(process.argv.slice(2), {logger: console}, function(err) {
  if (err) {
    if (err instanceof TaskError) {
      command.args
        .usage("Truffle v" + pkg.version + " - a development framework for Ethereum"
        + OS.EOL + OS.EOL
        + 'Usage: truffle <command> [options]')
        .epilog("See more at http://truffleframework.com/docs")
        .showHelp();
    } else {
      if (err instanceof TruffleError) {
        console.log(err.message);
      } else if (typeof err == "number") {
        // If a number is returned, exit with that number.
        process.exit(err);
      } else {
        // Bubble up all other unexpected errors.
        console.log(err.stack || err.toString());
      }
    }
    process.exit(1);
  }
});


    // // Check to see if we're working on a dapp meant for 0.2.x or older
    // if (fs.existsSync(path.join(working_dir, "config", "app.json"))) {
    //   console.log("Your dapp is meant for an older version of Truffle. Don't worry, there are two solutions!")
    //   console.log("");
    //   console.log("1) Upgrade your dapp using the followng instructions (it's easy):");
    //   console.log("   https://github.com/ConsenSys/truffle/wiki/Migrating-from-v0.2.x-to-v0.3.0");
    //   console.log("");
    //   console.log("   ( OR )")
    //   console.log("");
    //   console.log("2) Downgrade to Truffle 0.2.x");
    //   console.log("");
    //   console.log("Cheers! And file an issue if you run into trouble! https://github.com/ConsenSys/truffle/issues")
    //   process.exit();
    // }
