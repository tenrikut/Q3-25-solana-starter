import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import wallet from "../turbin3-wallet.json";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("EnRMBTfcBJTVVqizebUVZGrDjGQRocyJSQmSuxRAPWkH");

// Recipient address
const to = new PublicKey("HvG8jN4UinWpd3WAnEhH56qMi9dq6w3Rg1uj3sEmQ7q7");

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );
    console.log(`From Token Account: ${fromTokenAccount.address.toBase58()}`);

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      to
    );
    console.log(`To Token Account: ${toTokenAccount.address.toBase58()}`);

    // Transfer the new token to the "toTokenAccount" we just created
    const transferTx = await transfer(
      connection,
      keypair,
      fromTokenAccount.address,
      toTokenAccount.address,
      keypair,
      1_000_000n // 1 token (6 decimals)
    );
    console.log(`Transfer Transaction: ${transferTx}`);
    console.log(
      `Transfer Explorer: https://explorer.solana.com/tx/${transferTx}?cluster=devnet`
    );
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
