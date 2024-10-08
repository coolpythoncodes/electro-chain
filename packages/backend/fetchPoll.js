import { Web3 } from "web3";

import { maciWrapperAbi } from "./abi.js";

export const fetchPoll = async (pollid) => {
  try {
    const rpcUrl = "https://arb-sepolia.g.alchemy.com/v2/oz1_zSD4-iKkLZV_uzpLVaSWJ9kLXghf";
    const web3 = new Web3(rpcUrl);
    // console.log(maciWrapperAbi.MACIWrapper.abi);
    const contract = maciWrapperAbi.MACIWrapper

    if (!contract || !contract.abi || !contract.address) {
      throw new Error("Invalid ABI or address in maciWrapperAbi");
    }

    const maci = new web3.eth.Contract(
      contract?.abi,
      contract?.address
    );

    try {
      // Use BigInt directly since Web3.js should handle it as a uint256
      const fetchedPoll = await maci.methods.fetchPoll(
        web3.utils.toBigInt(pollid),
      ).call();
      console.log("Polls:", fetchedPoll);
      return fetchedPoll;
    } catch (error) {
      console.log("An error occurred fetching poll:", error);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

fetchPoll(2).catch(console.error);
