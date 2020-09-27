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
// 総勘定元帳データの取得
export function getTotalAccountBook(date) {
    const dateFromTo = getDateFromTo(date);
    return axios.get('record_total_account', { params: dateFromTo });
}