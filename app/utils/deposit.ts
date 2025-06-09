import { ethers } from "ethers";
import { joinQuiz } from "../api/join";

type EthAddress = `0x${string}`;
type DepositLevel = "rookie" | "pro" | "expert";

// Level-based deposit amounts
const DEPOSIT_AMOUNTS: Record<DepositLevel, number> = {
    rookie: 10,
    pro: 20,
    expert: 50
} as const;

// Consolidated ERC-20 ABI
const ERC20_ABI = [
    "function transfer(address to, uint256 amount) returns (bool)",
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)"
] as const;

// Environment variable validation
const getRequiredEnvVar = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
};

// MetaMask-specific provider detection
function getMetaMaskProvider() {
    if (typeof window === 'undefined') {
        throw new Error('Window object not available');
    }

    if (!window.ethereum) {
        throw new Error('MetaMask is not installed. Please install MetaMask extension.');
    }

    // Handle multiple wallets scenario
    if (window.ethereum.providers) {
        const metaMaskProvider = window.ethereum.providers.find(
            (provider: any) => provider.isMetaMask
        );

        if (!metaMaskProvider) {
            throw new Error('MetaMask not found among installed wallets');
        }

        return metaMaskProvider;
    }

    // Single wallet scenario
    if (window.ethereum.isMetaMask) {
        return window.ethereum;
    }

    if (!window.ethereum.isPhantom) {
        return window.ethereum;
    }

    throw new Error('MetaMask not detected. Please make sure MetaMask is installed and enabled.');
}

interface DepositResult {
    success: boolean;
    txHash?: string;
    blockNumber?: number;
    error?: string;
}

interface TokenInfo {
    decimals: number;
    symbol: string;
    balance: bigint;
}

// Utility function to get token information
export async function getTokenInfo(
    tokenAddress: EthAddress,
    userAddress: EthAddress
): Promise<TokenInfo> {
    try {
        const metaMaskProvider = getMetaMaskProvider();
        const provider = new ethers.BrowserProvider(metaMaskProvider);
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

        const [decimals, symbol, balance] = await Promise.all([
            tokenContract.decimals(),
            tokenContract.symbol(),
            tokenContract.balanceOf(userAddress)
        ]);

        return {
            decimals: Number(decimals),
            symbol: symbol,
            balance: balance
        };
    } catch (error: any) {
        throw new Error(`Failed to get token info: ${error.message}`);
    }
}

// Main deposit utility function
export async function depositTokens(level: DepositLevel, address: EthAddress | undefined, id: string): Promise<DepositResult> {
    try {
        // Validate environment variables
        const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as EthAddress;
        const contractAddress = process.env.NEXT_PUBLIC_CLAIM_CONTRACT as EthAddress;

        // Get deposit amount for level
        const amount = DEPOSIT_AMOUNTS[level];
        if (!amount) {
            throw new Error(`Invalid deposit level: ${level}. Valid levels: ${Object.keys(DEPOSIT_AMOUNTS).join(', ')}`);
        }

        // Get MetaMask provider specifically
        const metaMaskProvider = getMetaMaskProvider();
        console.log('🦊 Using MetaMask provider');

        // Setup provider and signer with MetaMask
        const provider = new ethers.BrowserProvider(metaMaskProvider);

        // Ensure we're connected to MetaMask
        const accounts = await provider.send("eth_requestAccounts", []);
        if (!accounts || accounts.length === 0) {
            throw new Error('No MetaMask accounts connected. Please connect your MetaMask wallet.');
        }

        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log(`🔗 Connected to MetaMask account: ${userAddress}`);

        // Get token information
        const tokenInfo = await getTokenInfo(tokenAddress, userAddress as EthAddress);
        const parsedAmount = ethers.parseUnits(amount.toString(), tokenInfo.decimals);

        // Check user's balance before transfer
        if (tokenInfo.balance < parsedAmount) {
            const formattedBalance = ethers.formatUnits(tokenInfo.balance, tokenInfo.decimals);
            throw new Error(`Insufficient ${tokenInfo.symbol} balance. Required: ${amount}, Available: ${formattedBalance}`);
        }

        // Create contract instance
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);

        // Execute transfer
        console.log(`🚀 Initiating ${level} deposit of ${amount} ${tokenInfo.symbol} via MetaMask...`);
        const tx = await tokenContract.transfer(contractAddress, parsedAmount);
        console.log(`📤 Transaction submitted: ${tx.hash}`);

        // Wait for confirmation
        const receipt = await tx.wait();
        console.log(`✅ Transaction confirmed in block ${receipt?.blockNumber}`);
        const isJoined = await joinQuiz(address, id);
        return {success: isJoined};

    } catch (error: any) {
        let errorMessage = "Unknown error occurred";

        // Handle specific error types
        if (error.code === 4001) {
            errorMessage = "Transaction rejected by user";
        } else if (error.code === -32002) {
            errorMessage = "MetaMask request pending. Please check MetaMask.";
        } else if (error.code === -32603) {
            errorMessage = "Internal MetaMask error";
        } else {
            errorMessage = error?.reason || error?.message || errorMessage;
        }

        console.error("❌ Deposit failed:", errorMessage);

        return {
            success: false,
            error: errorMessage
        };
    }
}

// Utility function to check user's token balance
export async function checkTokenBalance(level: DepositLevel): Promise<{
    hasEnoughBalance: boolean;
    currentBalance: string;
    requiredAmount: number;
    symbol: string;
}> {
    try {
        const tokenAddress = getRequiredEnvVar("NEXT_PUBLIC_TOKEN_ADDRESS") as EthAddress;
        const metaMaskProvider = getMetaMaskProvider();
        const provider = new ethers.BrowserProvider(metaMaskProvider);
        const accounts = await provider.send("eth_requestAccounts", []);

        if (!accounts || accounts.length === 0) {
            throw new Error('No MetaMask accounts connected');
        }

        const userAddress = accounts[0] as EthAddress;
        const tokenInfo = await getTokenInfo(tokenAddress, userAddress);
        const requiredAmount = DEPOSIT_AMOUNTS[level];
        const parsedRequired = ethers.parseUnits(requiredAmount.toString(), tokenInfo.decimals);

        return {
            hasEnoughBalance: tokenInfo.balance >= parsedRequired,
            currentBalance: ethers.formatUnits(tokenInfo.balance, tokenInfo.decimals),
            requiredAmount,
            symbol: tokenInfo.symbol
        };
    } catch (error: any) {
        throw new Error(`Failed to check balance: ${error.message}`);
    }
}

// Utility function to check MetaMask connection
export async function checkMetaMaskConnection(): Promise<{
    isConnected: boolean;
    address?: string;
    error?: string;
}> {
    try {
        const metaMaskProvider = getMetaMaskProvider();
        const provider = new ethers.BrowserProvider(metaMaskProvider);
        const accounts = await provider.listAccounts();

        return {
            isConnected: accounts.length > 0,
            address: accounts[0]?.address
        };
    } catch (error: any) {
        return {
            isConnected: false,
            error: error.message
        };
    }
}

// Utility function to connect MetaMask
export async function connectMetaMask(): Promise<{
    success: boolean;
    address?: string;
    error?: string;
}> {
    try {
        const metaMaskProvider = getMetaMaskProvider();
        const provider = new ethers.BrowserProvider(metaMaskProvider);
        const accounts = await provider.send("eth_requestAccounts", []);

        return {
            success: accounts.length > 0,
            address: accounts[0]
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        };
    }
}

// Helper function to get deposit amount for a level
export function getDepositAmount(level: DepositLevel): number {
    return DEPOSIT_AMOUNTS[level];
}

// Helper function to get all available levels and amounts
export function getDepositLevels(): Array<{ level: DepositLevel; amount: number }> {
    return Object.entries(DEPOSIT_AMOUNTS).map(([level, amount]) => ({
        level: level as DepositLevel,
        amount
    }));
}

// Usage examples:

/*
// Basic usage
const result = await depositTokens('rookie');
if (result.success) {
    console.log('Deposit successful!', result.txHash);
} else {
    console.error('Deposit failed:', result.error);
}

// Check balance before deposit
const balanceCheck = await checkTokenBalance('pro');
if (balanceCheck.hasEnoughBalance) {
    const result = await depositTokens('pro');
} else {
    console.log(`Insufficient balance. Need ${balanceCheck.requiredAmount}, have ${balanceCheck.currentBalance}`);
}

// Check connection first
const connection = await checkMetaMaskConnection();
if (!connection.isConnected) {
    const connectResult = await connectMetaMask();
    if (connectResult.success) {
        // Now proceed with deposit
        const result = await depositTokens('expert');
    }
}
*/