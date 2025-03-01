const axios = require("axios");
require("dotenv").config();

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const urlParams = new URLSearchParams(window.location.search);
const WALLET_ADDRESS = urlParams.get("wallet");

async function fetchTransactions() {
    try {
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${WALLET_ADDRESS}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
        const response = await axios.get(url);
        const transactions = response.data.result;

        if (!transactions || transactions.length === 0) {
            console.log("No transactions found.");
            return;
        }

        let totalGasUsed = 0;
        let totalGasCost = 0;

        transactions.forEach((tx) => {
            const gasUsed = parseInt(tx.gasUsed);
            const gasPrice = parseInt(tx.gasPrice);

            totalGasUsed += gasUsed;
            totalGasCost += gasUsed * gasPrice;
        });

        output.innerHTML = `
        <h2>🚀 Wallet Transaction Summary:</h2>
        <p>🔹 <strong>Total Transactions:</strong> ${data.totalTransactions}</p>
        <p>⛽ <strong>Total Gas Used:</strong> ${data.totalGasUsed.toLocaleString()} units</p>
        <p>💰 <strong>Total Gas Cost:</strong> ${(data.totalGasCost / 1e18).toFixed(6)} ETH</p>
    `;
    } catch (error) {
        output.innerHTML = "<p style='color:red;'>Error fetching transactions!</p>";
    }
}

fetchTransactions();
