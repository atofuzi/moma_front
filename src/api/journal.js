import myAxios from "../utils/api.js";
import axios from "../utils/api.js";
import { transformJournalDataToRequestData } from "../utils/lib.js"

// 仕訳帳登録画面
// 利用会計科目データの取得
export function getAccountSubjects() {
    return axios.get('use_account_subjects');
}

// 利用銀行リストの取得
export function getBankLists() {
    return axios.get('use_bank_lists');
}

// 取引先リストの取得
export function getSupplierLists() {
    return axios.get('use_supplier_lists');
}

// 仕訳データのデータの登録
export function registerJournal(journalData) {
    const requestData = transformJournalDataToRequestData(journalData);
    return axios.post('journal_register', requestData);
}

// 修正する仕訳データの取得

export function getJournalUnit(data) {
    return myAxios.get('journal_edit', { params: { unitNumber: data } })

}

// 修正後の仕訳データの登録
export function updateJournal(journalData) {
    console.log('修正データの送信')
    console.log(journalData)
    const requestData = transformJournalDataToRequestData(journalData);
    requestData['ids'] = journalData.ids;
    console.log(requestData)
    return axios.post('journal_update', requestData);
}

// 仕訳データの削除
export function deleteJournal(ids) {

    /*     function getIds(item) {
            Object.keys(item).forEach(function (index) {
                if (index == 'id') {
                    ids.push(item[index]);
                }
            })
        }
    
        journalData.debit.filter(getIds);
        journalData.credit.filter(getIds); */

    return axios.put('journal_delete', { ids: ids });
}
