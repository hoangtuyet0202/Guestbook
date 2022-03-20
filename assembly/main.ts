import { PersistentVector} from 'near-sdk-as'

import { Transaction } from './model'

let transactions = new PersistentVector<Transaction>("s")
let transactionLength = transactions.length

export function getTransactions(): Transaction[] {
    const result = new Array<Transaction>(transactionLength);
    for(let i: i32 = 0; i < transactionLength; i++) {
      result[i] = transactions[i];
    }
    return result;
}

export function addTransaction(label: string, amount: i32): void {
  let transaction = new Transaction(transactionLength, label, amount)
  transactions.push(transaction)
  transactionLength++
}

export function removeTransaction(_transactionId: i32): void {
  let transaction = transactions.swap_remove(_transactionId)
  transactionLength--
}