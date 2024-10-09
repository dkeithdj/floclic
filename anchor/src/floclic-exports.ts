// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import FloclicIDL from '../target/idl/floclic.json'
import type { Floclic } from '../target/types/floclic'

// Re-export the generated IDL and type
export { Floclic, FloclicIDL }

// The programId is imported from the program IDL.
export const FLOCLIC_PROGRAM_ID = new PublicKey(FloclicIDL.address)

// This is a helper function to get the Floclic Anchor program.
export function getFloclicProgram(provider: AnchorProvider) {
  return new Program(FloclicIDL as Floclic, provider)
}

// This is a helper function to get the program ID for the Floclic program depending on the cluster.
export function getFloclicProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Floclic program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return FLOCLIC_PROGRAM_ID
  }
}
