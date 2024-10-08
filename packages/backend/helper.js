import { Web3 } from "web3";
import { maciWrapperAbi } from "./abi.js";
import pkg from '@prisma/client';
import pollAbi from "./pollAbi.js";
import { Keypair, PCommand, PrivKey, PubKey } from 'maci-domainobjs';
import { genRandomSalt } from 'maci-crypto';
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

const rpcUrl = "https://arb-sepolia.g.alchemy.com/v2/oz1_zSD4-iKkLZV_uzpLVaSWJ9kLXghf";

const contract = maciWrapperAbi.MACIWrapper;
const web3 = new Web3(rpcUrl);




export default async function getUser(vinNumber) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                vinNumber: vinNumber
            }
        });
        return user
    } catch (error) {
        console.log(error);

    }
}


export const getKeypairAndStateIndex = async (vinNumber) => {
    const user = await getUser(vinNumber);
    // 99445566

    const maci = new web3.eth.Contract(
        contract?.abi,
        contract?.address
    )
    try {
        const keypair = await maci.methods.addressToPubKey(user.address).call()
        // console.log(`Keypair generated`, keypair);
        const stateIndex = await maci.methods.voterToStateIndex(user.address).call();
        return { keypair: keypair, stateIndex: stateIndex }
    } catch (error) {
        console.log(`An error occured: `, error);
    }
}

export const getDecrytedAccount = async (vinNumber, password) => {
    try {
        const user = await getUser(vinNumber);
        const decryptedAccount = await web3.eth.accounts.decrypt(JSON.parse(user.privkey), password)
        // return decryptedAccount;
        const account = web3.eth.accounts.privateKeyToAccount(decryptedAccount.privateKey);

        web3.eth.accounts.wallet.add(account);
        const message = `Login To ElectroChain`;
        const signature = account.sign(message);
        // console.log('Signature:', signature);

        // Create UserKeyPair (ensure Keypair and PrivKey are correctly imported)
        const userKeyPair = new Keypair(new PrivKey(account.privateKey));
        // console.log(`Constructed Keypair: `, userKeyPair);
        return { userKeyPair: userKeyPair, account: account };
    } catch (error) {
        console.log(error);

    }
}

// await getDecrytedAccount('998878', '93ba040b').catch(console.error)
// await getKeypairAndStateIndex('998878')
export const getCoordinatorPubKey = async (address) => {
    const poll = new web3.eth.Contract(
        pollAbi,
        address
    )
    try {
        const coordinatorKey = await poll.methods.coordinatorPubKey().call();
        console.log(coordinatorKey);
        const coordinatorKey_ = new PubKey([
            BigInt((coordinatorKey)[0].toString()),
            BigInt((coordinatorKey)[1].toString()),
        ]);

        console.log(coordinatorKey_);

        return coordinatorKey_;

    } catch (error) {
        console.log(`An error occured: `, error);

    }
}

export function getMessageAndEncKeyPair(
    stateIndex,
    pollIndex,
    candidateIndex,
    weight,
    nonce,
    coordinatorPubKey,
    keypair
) {
    const command = new PCommand(
        stateIndex,
        keypair.pubKey,
        candidateIndex,
        weight,
        nonce,
        pollIndex,
        genRandomSalt()
    );

    const signature = command.sign(keypair.privKey);

    const encKeyPair = new Keypair();

    const message = command.encrypt(
        signature,
        Keypair.genEcdhSharedKey(encKeyPair.privKey, coordinatorPubKey)
    );

    return { message, encKeyPair };
}

// getKeypairAndStateIndex().catch(console.error)
// getCoordinatorPubKey('0x4bBa18252e1426235Ef6be9D41BBA9F7D5E50aA0').catch(console.error);