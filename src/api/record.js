import axios from "../utils/api.js";
import { getDateFromTo } from "../utils/lib.js"

// 仕訳帳登録画面
// 表示する仕訳データの取得
export function getJournalBook(date) {
    const dateFromTo = getDateFromTo(date);
    return axios.get('record_journal', { params: dateFromTo });
}

// 現金出納帳画面
// 表示する現金出納帳データの取得
export function getCashBook(date) {
    const dateFromTo = getDateFromTo(date);
    return axios.get('record_cash', { params: dateFromTo });
}


// 預金出納帳画面
// 表示する預金出納帳データの取得
export function getDepositBook(date) {
    const dateFromTo = getDateFromTo(date);
    return axios.get('record_deposit', { params: dateFromTo });
}


// 売掛帳画面
// 表示する売掛帳データの取得
export function getReceivableBook(date) {
    const dateFromTo = getDateFromTo(date);
    return axios.get('record_receivable', { params: dateFromTo });
}


// 買掛帳画面
// 表示する買掛帳データの取得
export function getPayableBook(date) {
    const dateFromTo = getDateFromTo(date);
    return axios.get('record_payable', { params: dateFromTo });
}


// 経費帳
// 経費帳データの取得
export function getExpensesBook(date) {
    const dateFromTo = getDateFromTo(date);
    return axios.get('record_expenses', { params: dateFromTo });
}

// 総勘定元帳画面
export class GetTotalAccountBook {
    constructor(date) {
        this.date = date;
    }
    // 総勘定元帳(資産)データの取得
    assets() {
        console.log(this.data);
        const dateFromTo = getDateFromTo(this.date);
        return axios.get('record_total_assets', { params: dateFromTo });
    }
    // 総勘定元帳（負債・資本）データの取得
    liabilitiesCapital() {
        const dateFromTo = getDateFromTo(this.date);
        return axios.get('record_total_liabilities_capital', { params: dateFromTo });
    }
    // 総勘定元帳（経費・費用）データの取得
    cost() {
        const dateFromTo = getDateFromTo(this.date);
        return axios.get('record_total_cost', { params: dateFromTo });
    }
    // 総勘定元帳（収益）データの取得
    earnings() {
        const dateFromTo = getDateFromTo(this.date);
        return axios.get('record_total_earnings', { params: dateFromTo });
    }
    
}
