import { u128, PersistentVector } from 'near-sdk-as'

@nearBindgen
export class Transaction {
    id: i32
    label: string
    amount: i32

    constructor(id: i32, label: string, amount: i32) {
        this.id = id;
        this.label = label;
        this.amount = amount;
    }
}
