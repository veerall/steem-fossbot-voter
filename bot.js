'use strict';

const
  lib = require("./lib.js");


// start bot iteration, this node script should be run as a job
console.log("calling initSteem...");
lib.initSteem();
if (lib.hasFatalError()) {
	console.log("initSteem failed!");
	lib.sendEmail("Voter bot", "initSteem failed, please see logs");
} else {
	console.log("calling runBot...");
	lib.runBot(function(msg) {
		console.log("runBot finished with message: "+JSON.stringify(msg));
		// #53, stop this process as it may stay alive indefinitely
    // #53, additionally, give 30 seconds to complete in case there are loose anonymous processes to finish
    setTimeout(function () {
      process.exit();
    }, 30000);
	}, {local: true});
}