import 'regenerator-runtime/runtime'
import React, { useState, useEffect } from 'react'
import LoginPage from './views/LoginPage'
import HomePage from './views/HomePage'
import Big from 'big.js';

const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

export default function App({ contract, currentUser, nearConfig, wallet }) {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		// TODO: don't just fetch once; subscribe!
		contract.getTransactions().then(setTransactions);
		console.log('transactions', transactions)
	}, []);

	const addTransactionHandler = (transaction) => {
		contract.addTransaction(
			{ label: transaction.label, amount: transaction.amount },
			BOATLOAD_OF_GAS,
			Big('0').times(10 ** 24).toFixed()
		).then(() => {
			contract.getTransactions().then(transactions => {
				setTransactions(transactions);
			});
		});
	}

	const removeTransactionHandler = (id) => {
		contract.removeTransaction(
			{ _transactionId: id },
			BOATLOAD_OF_GAS,
			Big('0').times(10 ** 24).toFixed()
		).then(() => {
			contract.getTransactions().then(transactions => {
				setTransactions(transactions);
			});
		});
	}

	const signIn = () => {
		wallet.requestSignIn(
			{ contractId: nearConfig.contractName, methodNames: [contract.addTransaction.name] }, //contract requesting access
			'NEAR Guest Book', //optional name
			null, //optional URL to redirect to if the sign in was successful
			null //optional URL to redirect to if the sign in was NOT successful
		);
	};

	const signOut = () => {
		wallet.signOut();
		window.location.replace(window.location.origin + window.location.pathname);
	};

	if (!currentUser) {
		return (
			<LoginPage login={signIn} />
		)
	}



	return (
		<>
			<button className="link" style={{ float: 'right' }} onClick={signOut}>
				Sign out
			</button>
			<HomePage transactions={transactions} addTransactionHandler={addTransactionHandler} removeTransactionHandler={removeTransactionHandler} />
		</>
	)
}

