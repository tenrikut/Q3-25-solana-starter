import wallet from "../turbin3-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));
// Your metadata URI:  https://gateway.irys.xyz/FexEJSC2RAbrX4T2CQCzYNV3eQk7z5pPEnqxMQgqfdK4
(async () => {
  try {
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

    const image =
      " https://gateway.irys.xyz/DLKKdCtEEu7cRTDXRjzz4myyVSWJfMAcCSS9gAtNDczN"; //URL of the image created in nft_image
    const metadata = {
      name: "Timur",
      symbol: "Tengrikut",
      description: "Timur - great leader in Turkistan",
      image,
      attributes: [{ trait_type: "rarity", value: "legendary" }],
      properties: {
        files: [
          {
            type: "image/jpg",
            uri: "image",
          },
        ],
      },
      creators: [],
    };
    const myUri = await umi.uploader.uploadJson(metadata);
    console.log("Your metadata URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
