import wallet from "../turbin3-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";

// Define our Mint address
const mint = publicKey("EnRMBTfcBJTVVqizebUVZGrDjGQRocyJSQmSuxRAPWkH");

// Create a UMI connection
const umi = createUmi("https://api.devnet.solana.com");
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
  try {
    let accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint: mint,
      mintAuthority: signer,
    };
    // 2eyBEcKZRymREU39ii5rqSf9uwdvvaUsKjw2ZYBq8PgNTSd4DZh9NTi6upe1imKPyybH1AnT3yU1brCeqQQ11JGc
    let data: DataV2Args = {
      name: "Timur",
      symbol: "Khan",
      uri: "https://gateway.pinata.cloud/ipfs/bafkreihod2wdicoptqx53rlrknmlbqpt6kwux2xj3o2akpxwmdfgaacfey",
      sellerFeeBasisPoints: 100,
      creators: null,
      collection: null,
      uses: null,
    };

    let args: CreateMetadataAccountV3InstructionArgs = {
      data,
      isMutable: true,
      collectionDetails: null,
    };

    let tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });

    let result = await tx.sendAndConfirm(umi);
    const signature = bs58.encode(result.signature);
    console.log(`Transaction signature: ${signature}`);
    console.log(
      `Transaction Explorer: https://explorer.solana.com/tx/${signature}?cluster=devnet`
    );
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
