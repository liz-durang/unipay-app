import { createContext, useState, useEffect } from "react";
import { SorobanClient } from "@stellar/soroban-client";

export const StellarContext = createContext();

export const StellarProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const rpcUrl = import.meta.env.VITE_RPC_URL;
  const contractId = import.meta.env.VITE_CONTRACT_ID;

  useEffect(() => {
    // Conectar a Stellar en el montaje del componente
    const connectWallet = async () => {
        try {
          const connected = await isConnected();
          console.log("Freighter connected:", connected);
          if (!connected) {
            throw new Error("Freighter wallet not detected.");
          }
      
          const key = await getPublicKey();
          console.log("Public Key:", key);
          setPublicKey(key);
          setError(null);
        } catch (err) {
          console.error("Freighter Error:", err);
          setError(err.message || "Error connecting to Freighter");
        }
      };
      
    connectWallet();
  }, []);

  return (
    <StellarContext.Provider value={{ account, contractId, rpcUrl }}>
      {children}
    </StellarContext.Provider>
  );
};
