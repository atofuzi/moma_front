import axios from "../utils/api.js";
import { getDateFromTo } from "../utils/lib.js"

// 仕訳帳登録画面
// 利用会計科目データの取得
export function getJournalBook(date) {
    const dateFromTo = getDateFromTo(date);
    return axios.get('record_journal', { params: dateFromTo });
}