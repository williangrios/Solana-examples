const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

// creating a wallet
const wallet = new Keypair();

// retrieve wallets credentials
const publicKey = new PublicKey(wallet.publicKey);
const secretKey = wallet.secretKey;

console.log(`Public key ${publicKey}`);
console.log(`Private key ${secretKey}`);

const getWalletBalance = async () => {
  try {
    // cluserApiUrl provides URL of testnet or mainnet
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    // getting balance
    const balance = await connection.getBalance(publicKey);
    console.log(`Balance: ${balance}`);
  } catch (error) {
    console.error(error);
  }
};

const airdropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    // 1 SOL has 1 billion lamports
    const fromAirdropSignature = await connection.requestAirdrop(publicKey, 2);
    await connection.confirmTransaction(fromAirdropSignature);
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  await getWalletBalance();
  await airdropSol();
  await getWalletBalance();
};

main();
