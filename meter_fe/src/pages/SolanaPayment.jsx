
import React, { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SystemProgram, Transaction, PublicKey } from "@solana/web3.js";
import { API_ENDPOINTS } from '../constants/api_consts';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import solanaIcon from '../images/solana.png';
import LoadingIndicator from '../components/LoadingIndicator';
import { useLocation } from "react-router-dom";

function SolanaPaymentPage() {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [balance, setBalance] = useState(null);
    const [txSignature, setTxSignature] = useState();
    const [solRequired, setSolRequired] = useState();
    const [solRateInINR, setSolRateInINR] = useState();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    const { state } = useLocation();
    const { room, reading, fileName,prevReading } = state || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (!state || !room || !reading || !fileName) {
            navigate('/');
        }
    }, [state]);
    const unitsConsumed=reading-prevReading;
    const INR_AMOUNT = unitsConsumed * import.meta.env.VITE_PER_UNIT_RATE;
    const hostelWallet = new PublicKey("DNMG4eyJB8bQG2WK25ysmzpJYpw7yzNwe3gq3CoPogiq");

    const handleTransaction = async () => {
        if (!connection || !publicKey) return;
        if (balance < solRequired) {
            alert("Insufficient balance to complete this transaction.");
            return;
        }
        try {
            setLoading(true);
            setStatus("pending");
            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: hostelWallet,
                    lamports: BigInt(Math.floor(solRequired * 1e9)),
                })
            );
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = publicKey;
            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, "confirmed");
            setTxSignature(signature);
            setStatus("success");
            await axios.post(API_ENDPOINTS.CREATE_SOLANA_ORDER, {
                orderId: signature,
                roomNumber: room,
                reading,
                fileName,
                unitsConsumed,
                paymentStatus: "paid",
                paymentMethod: "solana",
                totalAmount: INR_AMOUNT,
                txSignature: signature,
            });
        } catch (err) {
            setStatus("failed");
            await axios.post(API_ENDPOINTS.CREATE_SOLANA_ORDER, {
                orderId: null,
                roomNumber: room,
                reading,
                fileName,
                paymentStatus: "failed",
                failureReason: err.message,
            });
        } finally {
            setLoading(false);
        }
    };

    function calculateSolRequired(amountInINR, solPrice) {
        setSolRequired(amountInINR / solPrice);
    }
    useEffect(() => {
    let timer;
    if (status === "success") {
        timer = setTimeout(() => {
            navigate('/');
        }, 5000); 
    }
    return () => clearTimeout(timer); 
}, [status]);


    useEffect(() => {
        const fetchSolPriceInInr = async () => {
            try {
                const res = await axios.get(API_ENDPOINTS.GET_CURRENT_SOL_RATE);
                const solPrice = res.data;
                setSolRateInINR(solPrice);
                calculateSolRequired(INR_AMOUNT, solPrice);
                setLastUpdated(new Date().toLocaleTimeString());
            } catch (e) {
                alert("Some err occured")
            }
        };
        fetchSolPriceInInr();
    }, []);

    useEffect(() => {
        async function fetchBalance() {
            if (publicKey) {
                const lamports = await connection.getBalance(publicKey);
                setBalance(lamports / 1e9);
            }
        }
        fetchBalance();
    }, [publicKey, connection]);

    return (
        <div className="page-container min-h-screen flex justify-center items-start bg-gradient-to-b from-gray-50 to-gray-100 py-10">
            <div className="w-full max-w-[600px] bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">
                <h1 className="text-center text-3xl font-extrabold mb-6 text-gray-900">Pay using Solana</h1>
                <div className="flex justify-center mb-8">
                    <WalletMultiButton className="bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-purple-700 transition-colors" />
                </div>
                {publicKey && (
                    <div className="border border-gray-200 rounded-2xl shadow-md p-6 mb-8 bg-gradient-to-r from-white to-gray-50">
                        <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">Transaction Summary</h2>
                        <div className="grid grid-cols-2 gap-y-4 text-gray-700 text-sm">
                            <span className="font-semibold">Room:</span> <span>{room}</span>
                            <span className="font-semibold">Reading:</span> <span>{reading} units</span>
                            <span className="font-semibold">Units Consumed:</span> <span>{unitsConsumed} units</span>
                            <span className="font-semibold">Total Amount:</span> <span>₹{INR_AMOUNT}</span>
                            <span className="font-semibold">Rate Of 1 SOL in INR :</span> <span>₹{solRateInINR}</span>
                            <span className="font-semibold">SOL Required:</span> <span>{solRequired?.toFixed(6)} SOL</span>
                            <span className="font-semibold">Your Balance:</span> <span>{balance !== null ? `${balance} SOL` : "Loading..."}</span>
                            <span className="font-semibold">Est. Tx Fee:</span> <span>~0.000005 SOL</span>
                            <span className="font-semibold">Network:</span> <span>Devnet</span>
                            {lastUpdated && <>
                                <span className="font-semibold">Rate Updated:</span>
                                <span>{lastUpdated}</span>
                            </>}
                        </div>
                    </div>
                )}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={handleTransaction}
                        disabled={loading || txSignature}
                        className="btn-primary flex items-center px-8 py-4 text-lg font-bold rounded-2xl shadow-xl disabled:opacity-50 hover:scale-105 transition-transform bg-purple-600 text-white hover:bg-purple-700"
                    >
                        {loading ? <LoadingIndicator /> : (
                            <span className="flex items-center">
                                <span className="mr-3">Pay using</span>
                                <img src={solanaIcon} alt="Solana" height={24} width={24} className="bg-white rounded-full" />
                            </span>
                        )}
                    </button>
                </div>
                {status === "pending" && <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl text-center mb-4 shadow-sm">Transaction pending… </div>}
                {status === "success" && txSignature && <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center mb-4 shadow-sm">
                 Transaction Successful! <br />
                    <a href={`https://explorer.solana.com/tx/${txSignature}?cluster=devnet`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View on Explorer</a>
                    <div className="mt-5 flex justify-center">
                        <button onClick={() => navigate('/')} className="btn-primary px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform bg-purple-600 text-white hover:bg-purple-700">Home</button>
                    </div>
                </div>}
                {status === "failed" && <div className="bg-red-100 text-red-700 p-4 rounded-xl text-center mb-4 shadow-sm">Transaction failed.Please try again.</div>}
            </div>
        </div>
    );
}

export default SolanaPaymentPage;