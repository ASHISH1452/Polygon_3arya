import { ethers } from "hardhat";
import { task } from "hardhat/config";
import { CircomCircuitConfig } from "hardhat-circom";
const fs = require("fs");

const CONFIG_PATH = process.env.BASE_PATH + "/circuits.config.json";
const DIR_PATH = process.env.BASE_PATH + "/circuits/";

// Update the CircomCircuitConfig interface with additional parameters
interface ExtendedCircomCircuitConfig extends CircomCircuitConfig {
  author: string;
  description: string;
  // Add more parameters specific to your circuit
  // e.g., constraintOrder: number, trustedSetupParticipants: string[], etc.
}

task("newcircuit", "Generate config for a new circuit")
  .addParam("name", "Name of the circuit")
  .addParam("author", "Author of the circuit")
  .addParam("description", "Description of the circuit")
  .setAction(async (taskArgs, {}) => {

    let circuitsConfig: ExtendedCircomCircuitConfig[] = [];

    // check if file exists
    if (fs.existsSync(CONFIG_PATH)) {
      circuitsConfig = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
    }

    // try creating a directory
    try {
      if (!fs.existsSync(DIR_PATH + taskArgs.name)) {
        // create file
        fs.mkdirSync(DIR_PATH + taskArgs.name);
      }
    } catch (err) {
      console.error(err);
    }

    // create input and circuit files
    fs.closeSync(fs.openSync(DIR_PATH + taskArgs.name + "/input.json", 'w'))
    fs.closeSync(fs.openSync(DIR_PATH + taskArgs.name + "/circuit.circom", 'w'))

    // create a new circuit config with additional parameters
    const circuitConfig: ExtendedCircomCircuitConfig = {
      name: taskArgs.name,
      version: 2,
      protocol: "groth16",
      circuit: taskArgs.name + "/circuit.circom",
      input: taskArgs.name + "/input.json",
      wasm: taskArgs.name + "/out/circuit.wasm",
      zkey: taskArgs.name + "/out/" + taskArgs.name + ".zkey",
      vkey: taskArgs.name + "/out/" + taskArgs.name + ".vkey",
      r1cs: taskArgs.name + "/out/" + taskArgs.name + ".r1cs",
      beacon: "0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f",
      // Assign values to the additional parameters
      author: taskArgs.author,
      description: taskArgs.description,
      // Add more parameter assignments here based on your requirements
    };

    // add circuit config to array
    circuitsConfig.push(circuitConfig);

    // write to file
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(circuitsConfig, null, 2));
});
