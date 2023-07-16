import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [metaMaskAddress, setMetaMaskAddress] = useState("");
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

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
    }
  }, [metaMaskAddress]);

  return (
    <div className="header bg-gray-800 border-b py-4 border-gray-900">
      <div className="custom-maxWidth flex justify-between">
        <Link to="/" className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24">
            <path
              fill="currentColor"
              d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"
            />
          </svg>
          Coiner
        </Link>

        <ul className="flex justify-between gap-5">
          <li>
            {isMetaMaskConnected ? (
              <span>{metaMaskAddress}</span>
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
}
