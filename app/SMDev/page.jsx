"use client";

import useWallet from "@/hooks/useWallet";
import toast from "react-hot-toast";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useState } from "react";
import Fetch from "@/components/fetch";

const Page = () => {
  //WALLET
  const wallet = useWallet();

  const handleConnect = async () => {
    const msg = wallet.connected ? "Wallet Refreshed" : "Wallet Connected";
    try {
      await wallet.connect();
      toast.dismiss();
      toast.success(msg);
    } catch (error) {
      toast.error(error.message);
      if (!wallet.phantomIsInstalled) {
        setTimeout(() => {
          window.open("https://phantom.app/", "_blank");
        }, 1500);
      }
    }
  };

  const handleDisconnect = () => {
    wallet.disconnect();
    toast.dismiss();
    toast.success("Wallet disconnected");
  };

  //DATABASE

  const [name, setName] = useState("");

  const db = getFirestore(Fetch);
  const Users = collection(db, "users");
  const userId = wallet.connected ? wallet.publicKey : null;

  const [User, setUser] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = {
      User,
    };

    try {
      const userDocRef = doc(Users, userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        toast("nao nao", {
          icon: "🚫",
        });
      } else {
        await setDoc(userDocRef, user);
        setUser("");
        toast.success("Documento agregado con éxito");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="flex gap-8">
      {wallet.connected ? (
        <div>
          <div>
            <p>Tu wallet es:</p>
            <p className=" text-white font-bold">{wallet.publicKey}</p>
            <form
              onSubmit={handleFormSubmit}
              className="text-white text-4xl flex flex-col items-center"
            >
              <label htmlFor="nameInput" className="mb-4">
                Enter your name:
              </label>
              <input
                type="text"
                id="nameInput"
                value={name}
                onChange={(e) => {
                  handleNameChange(e);
                  setUser(e.target.value);
                }}
                required
                className="px-4 py-2 text-black text-4xl border border-gray-300 rounded-md mb-4"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white text-4xl rounded-lg"
              >
                Ok
              </button>
            </form>
          </div>
          <button
            className="rounded-md bg-blue-500 font-bold text-white p-8 hover:bg-blue-700 active:bg-blue-900"
            onClick={handleDisconnect}
          >
            Disconnect wallet
          </button>
        </div>
      ) : (
        <button
          className="rounded-md bg-blue-500 font-bold text-white p-8 hover:bg-blue-700 active:bg-blue-900"
          onClick={handleConnect}
        >
          Conectar wallet
        </button>
      )}
    </div>
  );
};

export default Page;
