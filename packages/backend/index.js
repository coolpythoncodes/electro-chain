import express from "express";
import bodyParser from "body-parser";
import { Web3 } from "web3";
import { fetchPolls } from "./fetchPolls.js";
import getUser, { getCoordinatorPubKey, getDecrytedAccount, getKeypairAndStateIndex, getMessageAndEncKeyPair } from "./helper.js";
import pollAbi from "./pollAbi.js";

const app = express();
const PORT = 8000;

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const rpcUrl = "https://arbitrum-sepolia.blockpi.network/v1/rpc/public";
const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl, { timeout: 100000 }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const handleInitialRequest = () => "CON Welcome to ElectroChain. \nEnter Your VIN Number";

const handleMainMenu = (userName) => `CON Welcome ${userName.toLocaleUpperCase()}. \n1. Cast Vote \n2. View Results`;

const handlePollSelection = async () => {
    try {
        const fetchedPolls = await fetchPolls();
        return `CON Select Election. \n${fetchedPolls.map((poll, index) => `${index + 1}. ${poll.name}`).join('\n')}`;
    } catch (error) {
        console.error("Error in handlePollSelection:", error);
        return "CON An error occurred. Please try again later.";
    }
};

const handleCandidateSelection = async (pollIndex) => {
    const fetchedPolls = await fetchPolls();
    const poll = fetchedPolls[pollIndex - 1];
    return `CON Choose Candidate. \n${poll.options.map((option, index) => `${index + 1}. ${option}`).join('\n')}`;
};

// 99556677

const handleVoting = async (vin, pollIndex, candidateIndex, authCode) => {
    const fetchedPolls = await fetchPolls();
    const poll = fetchedPolls[pollIndex - 1];
    const address = poll?.pollContracts?.poll;

    const coordinatorPubKey = await getCoordinatorPubKey(address);
    const { userKeyPair, account } = await getDecrytedAccount(vin, authCode);
    const params = await getKeypairAndStateIndex(vin);

    try {
        // Get the current nonce for the user's account
        const nonce = await web3.eth.getTransactionCount(account.address);

        const votesToMessage = getMessageAndEncKeyPair(
            BigInt(params?.stateIndex),
            BigInt(pollIndex),
            BigInt(candidateIndex),
            BigInt(1), // Assuming weight is 1, adjust if needed
            BigInt(nonce),
            coordinatorPubKey,
            userKeyPair
        );

        const contract = new web3.eth.Contract(pollAbi, address);
        web3.eth.accounts.wallet.add(account);

        const receipt = await contract.methods.publishMessage(
            votesToMessage?.message.asContractParam(),
            votesToMessage?.encKeyPair.pubKey.asContractParam()
        ).send({
            from: account.address,
            gas: '2000000',
            nonce: nonce // Explicitly set the nonce in the transaction
        });

        console.log(`Transaction receipt:`, receipt);
        return "END Your vote has been submitted successfully";
    } catch (error) {
        console.error("Voting error:", error);
        if (String(error.cause?.errorName) === 'VotingPeriodOver') {
            return "END Voting Period Over";
        }
        return "END An Error Occurred. Please Try Again";
    }
};

const handleUSSDRequest = async (text, phoneNumber) => {
    if (!text) return handleInitialRequest();

    const steps = text.split("*");
    const vin = steps[0];
    const user = await getUser(vin);

    switch (steps.length) {
        case 1:
            return handleMainMenu(user.fullName);
        case 2:
            return steps[1] === "1" ? await handlePollSelection() : "END Coming Soon..";
        case 3:
            return handleCandidateSelection(parseInt(steps[2]));
        case 4:
            return "CON Enter Your Authcode";
        case 5:
            return handleVoting(vin, parseInt(steps[2]), parseInt(steps[3]), steps[4]);
        default:
            return "END Invalid Input";
    }
};

app.post("/", async (req, res) => {
    const { text, phoneNumber } = req.body;
    const response = await handleUSSDRequest(text, phoneNumber);
    res.send(response);
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));