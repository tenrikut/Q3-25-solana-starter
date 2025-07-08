# Cluster1 - Solana Development Scripts

This directory contains TypeScript scripts for interacting with Solana blockchain, focusing on SPL tokens, NFTs, and vault operations. All scripts are configured to work with Solana Devnet.

## 🏗️ Directory Structure

```
cluster1/
├── spl_*.ts           # SPL Token operations
├── nft_*.ts           # NFT operations
├── vault_*.ts         # Vault operations
├── programs/          # Program interfaces
├── wallet/            # Wallet storage
├── repo.json          # Metadata configuration
├── Timur.jpg          # Sample image file
└── README.md          # This file
```

## 🪙 SPL Token Operations

### `spl_init.ts`

**Purpose**: Creates a new SPL token mint on Solana Devnet

- Creates a mint with 6 decimal places
- Sets the wallet as mint authority
- Returns mint address for use in other operations

**Usage**:

```bash
npx ts-node spl_init.ts
```

### `spl_mint.ts`

**Purpose**: Mints SPL tokens to a specified account

- Mints tokens to associated token accounts
- Handles token account creation if needed

**Usage**:

```bash
npx ts-node spl_mint.ts
```

### `spl_transfer.ts`

**Purpose**: Transfers SPL tokens between accounts

- Transfers 1 token (1,000,000 units with 6 decimals)
- Creates associated token accounts automatically
- Target recipient: `HvG8jN4UinWpd3WAnEhH56qMi9dq6w3Rg1uj3sEmQ7q7`

**Usage**:

```bash
npx ts-node spl_transfer.ts
```

### `spl_metadata.ts`

**Purpose**: Adds metadata to SPL tokens using Metaplex

- Creates token metadata with name, symbol, and description
- Uploads metadata to decentralized storage

## 🖼️ NFT Operations

### `nft_image.ts`

**Purpose**: Uploads NFT images to Irys decentralized storage

- Uploads `Timur.jpg` to Irys
- Returns IPFS URI for metadata usage
- Uses devnet Irys endpoint

**Usage**:

```bash
npx ts-node nft_image.ts
```

### `nft_metadata.ts`

**Purpose**: Creates and uploads NFT metadata

- Uses metadata from `repo.json`
- Uploads to Irys/IPFS
- Returns metadata URI for minting

**Usage**:

```bash
npx ts-node nft_metadata.ts
```

### `nft_mint.ts`

**Purpose**: Mints NFTs using Metaplex Token Metadata

- Creates NFT with name "Timur" and symbol "Kaghan"
- Sets 5% seller fee basis points
- Uses pre-uploaded metadata URI

**Usage**:

```bash
npx ts-node nft_mint.ts
```

## 🏦 Vault Operations (WBA Vault)

The vault scripts interact with the WBA (Web3 Builders Alliance) Vault program for secure asset storage.

### `vault_init.ts`

**Purpose**: Initializes a new vault account

- Creates vault state and authentication PDAs
- Sets up vault for deposits and withdrawals

### `vault_deposit.ts`

**Purpose**: Deposits SOL into the vault

- Transfers SOL to vault account
- Updates vault state

### `vault_deposit_spl.ts`

**Purpose**: Deposits SPL tokens into the vault

- Transfers SPL tokens to vault
- Handles token account management

### `vault_deposit_nft.ts`

**Purpose**: Deposits NFTs into the vault

- Transfers NFT ownership to vault
- Maintains NFT metadata associations

### `vault_withdraw.ts`

**Purpose**: Withdraws SOL from the vault

- Transfers SOL back to user
- Updates vault balances

### `vault_withdraw_spl.ts`

**Purpose**: Withdraws SPL tokens from the vault

- Returns SPL tokens to user account
- Manages token account operations

### `vault_withdraw_nft.ts`

**Purpose**: Withdraws NFTs from the vault

- Returns NFT ownership to user
- Preserves metadata and collection data

### `vault_close.ts`

**Purpose**: Closes vault and reclaims rent

- Empties vault contents
- Returns rent SOL to user

## 📁 Supporting Files

### `programs/wba_vault.ts`

Contains the TypeScript interface for the WBA Vault Anchor program:

- Program IDL (Interface Description Language)
- Type definitions for vault operations
- Account structures and instruction interfaces

### `repo.json`

Metadata configuration file for NFT operations:

```json
{
  "name": "Timur",
  "symbol": "Khan",
  "description": "Metadata for solana-starter repository content",
  "image": "https://gateway.pinata.cloud/ipfs/..."
}
```

### `wallet/`

Directory for storing wallet files (gitignored for security)

### `Timur.jpg`

Sample image file (72KB) used for NFT demonstrations

## 🔧 Prerequisites

1. **Wallet Setup**: Ensure `turbin3-wallet.json` exists in the parent directory
2. **Dependencies**: Install required packages from `package.json`
3. **Solana CLI**: Install Solana CLI for additional operations
4. **Devnet SOL**: Ensure wallet has sufficient devnet SOL for transactions

## 🚀 Quick Start

1. **Setup Environment**:

   ```bash
   cd ts/
   npm install
   ```

2. **Fund Wallet** (if needed):

   ```bash
   npx ts-node ../prereqs/airdrop.ts
   ```

3. **Create SPL Token**:

   ```bash
   npx ts-node cluster1/spl_init.ts
   npx ts-node cluster1/spl_mint.ts
   ```

4. **Create NFT**:

   ```bash
   npx ts-node cluster1/nft_image.ts
   npx ts-node cluster1/nft_metadata.ts
   npx ts-node cluster1/nft_mint.ts
   ```

5. **Use Vault**:
   ```bash
   npx ts-node cluster1/vault_init.ts
   npx ts-node cluster1/vault_deposit.ts
   ```

## 🔗 Useful Links

- **Solana Explorer**: https://explorer.solana.com/?cluster=devnet
- **Metaplex Docs**: https://docs.metaplex.com/
- **SPL Token Program**: https://spl.solana.com/token
- **Irys Documentation**: https://docs.irys.xyz/

## ⚠️ Important Notes

- All scripts are configured for **Devnet only**
- Keep your wallet file secure and never commit it to version control
- Some vault operations may require specific program deployment
- Check transaction signatures on Solana Explorer for verification
- Ensure sufficient SOL balance for transaction fees

## 🐛 Troubleshooting

**Common Issues**:

- `Insufficient funds`: Run airdrop script to get devnet SOL
- `Token account not found`: Scripts auto-create associated token accounts
- `Program not found`: Ensure correct program IDs and devnet deployment
- `Image upload fails`: Check file path and Irys endpoint availability

---

_This directory is part of the Q3 2025 Solana starter project for learning Solana development fundamentals._
