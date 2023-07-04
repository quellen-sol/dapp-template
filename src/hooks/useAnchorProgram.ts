import { Address, AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { ConfirmOptions } from "@solana/web3.js";
import { useMemo } from "react";

export const useAnchorProgram = <T extends Idl = Idl>(
  idl: T,
  programId: Address,
  confirmOptions?: ConfirmOptions,
): Program<T> | null => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const provider = useMemo(() => {
    if (!wallet) {
      return null;
    }
    return new AnchorProvider(
      connection,
      wallet,
      confirmOptions ?? {
        commitment: "confirmed",
      },
    );
  }, [connection, wallet, confirmOptions]);

  const program = useMemo(() => {
    if (!provider) {
      return null;
    }
    return new Program(idl, programId, provider);
  }, [provider, idl, programId]);

  return program;
};
