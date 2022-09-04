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
  
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    let txn;
    // We only have three characters.
    // an NFT w/ the character at index 2 of our array.
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

    console.log("Boooooooom! Done!");
  }
  
  const runMain = async() => {
    
      try{
          await main();
          process.exit(0);
  
      }catch(err){
          console.log(err);
          process.exit(1);
      }
  }
  
  runMain();