import { useEffect, useState } from "react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import {
  resolveToWalletAddress,
  getParsedNftAccountsByOwner,
} from "@nfteyez/sol-rayz";

function useNFTs(walletAddress) {
  const [nftList, setNftList] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const publicAddress = await resolveToWalletAddress({
          text: walletAddress,
        });

        const connection = new Connection(clusterApiUrl("devnet"));
        const nftArray = await getParsedNftAccountsByOwner({
          publicAddress,
          connection,
        });

        const nftWithImages = await Promise.all(
          nftArray.map(async (nft) => {
            try {
              const response = await fetch(nft.data.uri);
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }

              const nftJson = await response.json();
              if (nftJson.image) {
                return {
                  ...nft,
                  image: nftJson.image,
                };
              } else {
                throw new Error("JSON does not contain the 'image' property");
              }
            } catch (error) {
              console.error("Error fetching NFT data:", error);
              return nft;
            }
          })
        );

        setNftList(nftWithImages);
      } catch (error) {
        console.log("Error al buscar NFTs", error.message);
      }
    };

    fetchNFTs();
  }, [walletAddress]);

  return nftList;
}

export default useNFTs;
