import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";

export const Header = ({ back }) => {
  const [metaMaskAddress, setMetaMaskAddress] = useState("");
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [ethBalance, setEthBalance] = useState("");

  const connectToMetaMask = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts", params: [] })
        .then((accounts) => {
          const address = accounts[0];
          setIsMetaMaskConnected(true);
          setMetaMaskAddress(address);
          console.log("MetaMask connected:", address);
        })
        .catch((error) => {
          console.log("Error connecting to MetaMask:", error);
        });
    } else {
      console.log("MetaMask extension not detected");
    }
  };

  useEffect(() => {
    if (metaMaskAddress) {
      setIsMetaMaskConnected(true);

      const web3 = new Web3(window.ethereum);
      const fetchBalance = async () => {
        try {
          const balance = await web3.eth.getBalance(metaMaskAddress);
          setEthBalance(web3.utils.fromWei(balance, "ether"));
        } catch (error) {
          console.log("Error fetching balance:", error);
        }
      };

      fetchBalance();
    }
  }, [metaMaskAddress]);

  return (
    <div className="header bg-gray-800 border-b py-4 border-gray-900">
      <div className="custom-maxWidth flex justify-between">
        {back ? (
          <Link to="/" className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="24"
            >
              <path
                fill="currentColor"
                d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"
              />
            </svg>
            Coiner
          </Link>
        ) : (
          <Link to="/">Coiner</Link>
        )}

        <ul className="flex justify-between gap-5">
          <li>
            {isMetaMaskConnected ? (
              <span>
                {metaMaskAddress} - ETH Balance: {ethBalance}
              </span>
            ) : (
              <button className="button" onClick={connectToMetaMask}>
                Connect MetaMask
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
