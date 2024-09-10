import { ethers, network } from "hardhat";
import { expect } from "chai";
import { deployerConfiguration, getDeployParameters } from "./utils";
import fs from "fs";
import path from "path";

export async function changeNFTUrl() {
  const deployer = await deployerConfiguration();
  console.log("deployer: ", await deployer.getAddress());

  const contractName = "AstraGenesisNFT";
  const nftContract = await ethers.getContractAt(contractName, '0xB8Af4Fa4FEABaa02A09d146E4F871eA4a0a41C04', deployer);
}

changeNFTUrl()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    // exit the script
    process.exit();
  });
