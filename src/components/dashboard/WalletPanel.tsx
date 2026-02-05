import React from "react";
import { WalletState } from "../../types/socialWall";

export default function WalletPanel({ wallet }: { wallet: WalletState }) {
  return (
    <div className="wallet-panel">
      <h3>Mi Wallet</h3>
      <p>TAMV-T: {wallet.balanceTamv}</p>
      <p>TGN: {wallet.balanceTgn}</p>
      <p>Staked TGN: {wallet.stakedTgn}</p>
    </div>
  );
}
