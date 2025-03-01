#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod floclic {
    use super::*;

  pub fn close(_ctx: Context<CloseFloclic>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.floclic.count = ctx.accounts.floclic.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.floclic.count = ctx.accounts.floclic.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeFloclic>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.floclic.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeFloclic<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Floclic::INIT_SPACE,
  payer = payer
  )]
  pub floclic: Account<'info, Floclic>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseFloclic<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub floclic: Account<'info, Floclic>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub floclic: Account<'info, Floclic>,
}

#[account]
#[derive(InitSpace)]
pub struct Floclic {
  count: u8,
}
