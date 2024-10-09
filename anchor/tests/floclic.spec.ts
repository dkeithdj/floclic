import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Floclic} from '../target/types/floclic'
import '@types/jest';

describe('floclic', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Floclic as Program<Floclic>

  const floclicKeypair = Keypair.generate()

  it('Initialize Floclic', async () => {
    await program.methods
      .initialize()
      .accounts({
        floclic: floclicKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([floclicKeypair])
      .rpc()

    const currentCount = await program.account.floclic.fetch(floclicKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Floclic', async () => {
    await program.methods.increment().accounts({ floclic: floclicKeypair.publicKey }).rpc()

    const currentCount = await program.account.floclic.fetch(floclicKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Floclic Again', async () => {
    await program.methods.increment().accounts({ floclic: floclicKeypair.publicKey }).rpc()

    const currentCount = await program.account.floclic.fetch(floclicKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Floclic', async () => {
    await program.methods.decrement().accounts({ floclic: floclicKeypair.publicKey }).rpc()

    const currentCount = await program.account.floclic.fetch(floclicKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set floclic value', async () => {
    await program.methods.set(42).accounts({ floclic: floclicKeypair.publicKey }).rpc()

    const currentCount = await program.account.floclic.fetch(floclicKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the floclic account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        floclic: floclicKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.floclic.fetchNullable(floclicKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
