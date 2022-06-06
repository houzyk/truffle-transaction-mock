import React, { Component, useEffect, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

const App = () => {
  const [storageValue, setStorageValue] = useState(0);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(async () => {
    try {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];

      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      setWeb3(web3);
      setAccounts(accounts);
      setContract(instance);
      await runExample();
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  }, []);

  const runExample = async () => {
    await contract.methods.set(5).send({ from: accounts[0] });
    const response = await contract.methods.get().call();
    setStorageValue(response);
  };

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }

  return (
    <>
    </>
  );
}

export default App;
