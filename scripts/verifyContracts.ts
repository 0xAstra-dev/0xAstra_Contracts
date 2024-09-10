import hre, { ethers } from "hardhat";
import { getDeployParameters } from "./utils";

async function main(): Promise<void> {
  const deployParameters = await getDeployParameters();

  const opool = "0x1Ff4bf1E4EfE865c3F0e532ac0B2FE6876AA978a";
  if (opool) {
    console.log("Verify opool");
    try {
      await hre.run("verify:verify", {
        address: opool,
        constructorArguments: [
          'ASTRA GENESIS NFT',
    'ASTRA GENESIS NFT',
    '0xb1AC39A9078056Ae063618Ed9E2F54d04f8196eE',
    'https://bafybeicfduqocuogiak7g6aye3i7blvbim5jlkx6zjmnspd7fbvrgwhpfe.ipfs.dweb.link/',
    800,
    '0x4ea1eade3f387ec727e57108e0beeb2469f4ebf7159bfa2d972f0cc9df3d5491',
    '0x2a928a54d7ed1a81c31c5b8f82d0a4515febade6c0e87680812f9411a8911808',
        ],
      });
    } catch (error) {
      console.error(error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
