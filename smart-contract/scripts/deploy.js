const main = async () => {

  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');

  const gameContract = await gameContractFactory.deploy(
    ["Mark", "Bill", "Sandeep"],       
        ["https://cloudflare-ipfs.com/ipfs/QmeiK6oAy7iYi7E52Munony6FcsTY6SEctvTXKTMXVrmdi", 
        "https://cloudflare-ipfs.com/ipfs/QmaJ63eiSJsz94tL8NYeUcxSk9uzAXEd3bWjW9p6pbZaod",
        "https://cloudflare-ipfs.com/ipfs/QmTqWNhcpsB5efgUSe38BDYggks8FFbkmHTjx7nSB4ShuT"],
        [300, 200, 300],                    
        [20, 25, 50],
        "Elon Musk",
        "https://cloudflare-ipfs.com/ipfs/QmTCaLS7PKYQYBLqom6wGfiGLjnbZQ8zy8XLApckSusMTG",
        10000, 
        50 

  );

  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  txn = await gameContract.mintCharacterNFT(0);
  await txn.wait();
  console.log("Minted NFT #1");

  txn = await gameContract.mintCharacterNFT(1);
  await txn.wait();
  console.log("Minted NFT #2");

  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();
  console.log("Minted NFT #3");

  console.log("Done deploying and minting!");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();