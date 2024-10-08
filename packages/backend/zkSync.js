import { Web3 } from "web3";
import { SmartAccount, types, Web3ZKsyncL2, ZKsyncPlugin } from "web3-plugin-zksync";

async function main() {
    const rpcUrl = "https://sepolia.era.zksync.dev";
    const web3 = new Web3(rpcUrl);
    web3.registerPlugin(new ZKsyncPlugin(Web3ZKsyncL2.initWithDefaultProvider(types.Network.Sepolia)));
    const zksync = web3.ZKsync;


    const account = web3.eth.accounts.create();

    console.log('Address:', account.address);
    console.log('Private Key:', account.privateKey);
    
    const privKey = account.privateKey;
    const address = account.address;

    const password = 'my-password';
    const encryptedAccount = await web3.eth.accounts.encrypt(account.privateKey, password);

    console.log(`Encrypted JSON: `, JSON.stringify( encryptedAccount));
    
    const decryptedAccount = await web3.eth.accounts.decrypt(encryptedAccount, password)

    console.log(decryptedAccount);
    

    console.log(`Decrypted Address:`, ( decryptedAccount).address);
    console.log(`Decrypted Private Key:`, ( decryptedAccount).privateKey);
    
    

    if (!privKey || !address) {
        return;
    }
    
    const smartAccount = new SmartAccount(
        { address: address, secret: privKey},
        zksync.L2,
    );
    console.log("Smart account balance:", await smartAccount.getBalance());
    console.log("Smart account address:", smartAccount.address);
    
    

}


main()
    .then(() => console.log("✅ Script executed successfully"))
    .catch((error) => console.error(`❌ Error executing script: ${error}`));
