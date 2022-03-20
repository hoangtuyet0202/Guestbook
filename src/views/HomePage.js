import React from 'react';
import TransactionHistory from '../components/transactionHistory/transactionHistory';
import TotalBalance from '../components/totalBalance/totalBalance';
import AddTransaction from '../components/addTransaction/addTransaction';
import '../index.css'
import '../App.css'
const Homepage = ({transactions,addTransactionHandler, removeTransactionHandler }) => {
    return (
        <div className="App">
        <h2>Expense Tracker</h2>

        <div className="container left">
          <TotalBalance transactions={transactions} />

          <AddTransaction
            addTransactionHandler={addTransactionHandler}
          />
        </div>
        <div className="container right">
          <TransactionHistory
            transactions={transactions}
            removeTransactionHandler={removeTransactionHandler}
          />
        </div>
      </div>
    );
}

export default Homepage;
