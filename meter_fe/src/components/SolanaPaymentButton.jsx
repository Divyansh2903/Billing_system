

// import React from 'react';
// import axios from 'axios';
// import { API_ENDPOINTS } from '../constants/api_consts';
// import solanaIcon from '../images/solana.png';
// import { WalletConnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';






// const SolanaPaymentButton = ({ roomNumber, reading, fileName ,handlePayment}) => {

//     const handlePayment = async () => {
//         try {
//             await axios.post(API_ENDPOINTS.CREATE_SOLANA_ORDER, {
//                 amount: 500,
//                 roomNumber: roomNumber,
//                 reading,
//                 fileName
//             });


//         } catch (error) {
//             console.error('Payment initiation failed:', error);
//         }
//     };

//     return (
//         // <WalletMultiButton className='mx-2'></WalletMultiButton>

//         <button
//             onClick={handlePayment}
//             class="btn-primary"
//         >
//             <p className='mr-2'>Pay Using</p>

//             <img src={solanaIcon} alt="Solana" height={20} width={20} className='bg-white' />
//         </button>
//     );
// };

// export default SolanaPaymentButton;
