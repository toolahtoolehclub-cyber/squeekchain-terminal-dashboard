const { ethers } = require("ethers");
const chalk = require("chalk");

const RPC_URL = 'https://ethereum-sepolia-rpc.publicnode.com';
const SQK_TOKEN_ADDRESS = '0x810239d271e80a86023f4f315943acbd65b59281';
const provider = new ethers.JsonRpcProvider(RPC_URL);

async function runDashboard(address) {
    console.clear();
    console.log(chalk.bgMagenta.black.bold(`\n  🐹 SQUEekCHAIN TERMINAL DASHBOARD v2.0  \n`));
    console.log(chalk.cyan(`🔗 Network: `) + chalk.white(`Sepolia Testnet (11155111)`));
    console.log(chalk.cyan(`👛 Wallet:  `) + chalk.white(address));
    console.log(chalk.gray(`--------------------------------------------------`));

    try {
        const balance = await provider.getBalance(address);
        const feeData = await provider.getFeeData();
        const blockNumber = await provider.getBlockNumber();

        const erc20Abi = ["function balanceOf(address owner) view returns (uint256)"];
        const sqkContract = new ethers.Contract(SQK_TOKEN_ADDRESS, erc20Abi, provider);
        let sqkBalance = 0n;
        try { sqkBalance = await sqkContract.balanceOf(address); } catch (e) {}

        console.log(chalk.yellow(`📦 Block Number : `) + chalk.white(blockNumber));
        console.log(chalk.yellow(`⛽ Gas Price    : `) + chalk.white(ethers.formatUnits(feeData.gasPrice, "gwei") + " Gwei"));
        console.log(chalk.green(`💰 Sepolia ETH  : `) + chalk.white(ethers.formatEther(balance) + " ETH"));
        console.log(chalk.blue(`🪙 SQK Balance  : `) + chalk.white(ethers.formatUnits(sqkBalance, 18) + " SQK"));
        
        console.log(chalk.gray(`--------------------------------------------------`));
        console.log(chalk.bgGreen.black(`  ✅ STATUS: READY TO BUILD ON SQUEekCHAIN  `));
        console.log(chalk.gray(`--------------------------------------------------\n`));

    } catch (error) {
        console.error(chalk.red(`\n❌ Error: Gagal mengambil data.`));
    }
}

const walletAddress = process.argv[2];
if (!walletAddress || !ethers.isAddress(walletAddress)) {
    console.log(chalk.red("❌ Masukkan alamat wallet yang valid. Contoh: node index.js 0x123..."));
} else {
    runDashboard(walletAddress);
}
