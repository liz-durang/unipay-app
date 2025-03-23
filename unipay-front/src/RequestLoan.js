import { useContext, useState } from "react";
import { StellarContext } from "../context/StellarContext";
import { SorobanClient } from "@stellar/soroban-client";

const RequestLoan = () => {
  const { account, contractId, rpcUrl } = useContext(StellarContext);
  const [amount, setAmount] = useState(100);
  const [message, setMessage] = useState("");

  const requestLoan = async () => {
    try {
      if (!account) {
        setMessage("Por favor conecta tu wallet primero.");
        return;
      }

      const server = new SorobanClient.Server(rpcUrl);
      const contract = new SorobanClient.Contract(contractId);

      const transaction = new SorobanClient.TransactionBuilder(account, {
        fee: "100",
        networkPassphrase: SorobanClient.Networks.TESTNET,
      })
        .addOperation(
          contract.call("request_loan", {
            borrower: account,
            amount: amount.toString(),
          })
        )
        .setTimeout(30)
        .build();

      // Aquí deberías firmar y enviar la transacción con la billetera del usuario
      setMessage("Solicitud enviada con éxito.");
    } catch (error) {
      console.error("Error al solicitar préstamo:", error);
      setMessage("Error en la transacción.");
    }
  };

  return (
    <div>
      <h2>Solicitar Préstamo</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={requestLoan}>Solicitar</button>
      <p>{message}</p>
    </div>
  );
};

export default RequestLoan;
