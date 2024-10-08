import { Web3 } from "web3";
import { MulticallPlugin } from "@rudra-xyz/web3-plugin-multicall";

import { maciWrapperAbi } from "./abi.js";

const makeCalls = async () => {
  try {
    const rpcUrl = "https://sepolia.era.zksync.dev";
    const web3 = new Web3(rpcUrl);
    web3.registerPlugin(new MulticallPlugin());

    if (!maciWrapperAbi || !maciWrapperAbi.abi || !maciWrapperAbi.address) {
      throw new Error("Invalid ABI or address in maciWrapperAbi");
    }

    const maci = new web3.eth.Contract(
      maciWrapperAbi?.abi,
      maciWrapperAbi?.address
    );

    try {
      const coordinatorPubKey = await maci.methods.coordinatorPubKey().call();
      console.log("coordinatorPubKey:", coordinatorPubKey);
    } catch (error) {
      console.error("Error calling coordinatorPubKey:", error);
    }

    try {
      const nextPollId = await maci.methods.nextPollId().call();
      console.log("nextPollId:", nextPollId);
    } catch (error) {
      console.error("Error calling nextPollId:", error);
    }

    try {
      // Use BigInt directly since Web3.js should handle it as a uint256
      const fetchPolls = await maci.methods.fetchPolls(
        web3.utils.toBigInt(1),
        web3.utils.toBigInt(10),
        true,
      ).call();
      console.log("Polls:", fetchPolls);
    } catch (error) {
      console.log("An error occurred fetching poll:", error);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

makeCalls().catch(console.error);
