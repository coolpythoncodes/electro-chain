import { Web3 } from "web3";
import { MulticallPlugin } from "@rudra-xyz/web3-plugin-multicall";
import https from "https";

import { maciWrapperAbi } from "./abi.js";
import { error } from "console";

// const ipfsUrl = "https://bafkreic3i2bmord6x6mcph523juvdndke6jpsaebotfhzejic3haf4rm6q.ipfs.nftstorage.link/";

const fetchIpfsMetada = (ipfsUrl) => {
  return new Promise((resolve, reject) => {
    const url = ipfsUrl;
    // console.log(`Url is given as`, url);

    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
          // console.log(JSON.parse(data));

        } catch (error) {
          reject(new Error('Error parsing IPFS metadata'));
        }
      });
    }).on('error', (error) => {
      reject(new Error('Error fetching IPFS metadata: ' + error.message));
    });
  });
};

// await fetchIpfsMetada();

const fetchOptionMetadata = async (optionUri) => {
  try {
    const metadata = await fetchIpfsMetada(optionUri);
    // console.log(metadata.President);
    return metadata.President || 'Unknown Candidate'
  } catch (error) {
    console.error(`Error fetching option metadata: ${optionUri}`, error);
    return 'Unknown Candidate';

  }
}
export const fetchPolls = async () => {
  try {
    const rpcUrl = "https://arb-sepolia.g.alchemy.com/v2/oz1_zSD4-iKkLZV_uzpLVaSWJ9kLXghf";
    const web3 = new Web3(rpcUrl);
    const contract = maciWrapperAbi.MACIWrapper;

    if (!contract || !contract.abi || !contract.address) {
      throw new Error("Invalid ABI or address in maciWrapperAbi");
    }

    const maci = new web3.eth.Contract(contract.abi, contract.address);

    try {
      const fetchedPolls = await maci.methods.fetchPolls(
        web3.utils.toBigInt(1),
        web3.utils.toBigInt(10),
        true
      ).call();

      console.log("Fetching Polls.....");

      const pollsWithMetadata = await Promise.all(fetchedPolls.map(async (poll) => {
        try {
          const optionsWithNames = await Promise.all(poll.options.map(async (op) => {
            const name = await fetchOptionMetadata(op);
            // console.log(name);
            return name; // Return the updated option with the name
          }));
          console.log(optionsWithNames);

          poll.options = optionsWithNames;
          return poll; // Return the updated poll
        } catch (error) {
          console.error(`Error processing poll: ${poll.name}`, error);
          return poll; // Return the original poll in case of an error
        }
      }));

      console.log(pollsWithMetadata);

      return pollsWithMetadata;

    } catch (error) {
      console.error("An error occurred fetching poll:", error);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};



await fetchPolls().catch(console.error);
