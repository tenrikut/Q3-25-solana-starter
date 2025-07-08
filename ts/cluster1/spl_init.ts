import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import wallet from "../turbin3-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

(async () => {
  try {
    // Start here
    const mint = await createMint(
      // Mint created: EnRMBTfcBJTVVqizebUVZGrDjGQRocyJSQmSuxRAPWkH
      connection,
      keypair,
      keypair.publicKey,
      null,
      6
    );
    console.log(`Mint created: ${mint.toBase58()}`);
    console.log(
      `Mint Explorer: https://explorer.solana.com/address/${mint.toBase58()}?cluster=devnet`
    );
  } catch (error) {
    console.log(`Oops, something went wrong: ${error}`);
  }
})();
