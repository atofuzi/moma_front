
import _ from 'lodash';
// 変換するキーを取得
const mapKeysDeep = (data, callback) => {
    if (_.isArray(data)) {
        return data.map(innerData => mapKeysDeep(innerData, callback));
    } else if (_.isObject(data)) {
        return _.mapValues(_.mapKeys(data, callback), val =>
            mapKeysDeep(val, callback)
        );
    } else {
        return data;
    }
};

// キャメルケースへ変換
const mapKeysCamelCase = data =>
    mapKeysDeep(data, (_value, key) => _.camelCase(key));

// スネークケースへ変換 
const mapKeysSnakeCase = data =>
    mapKeysDeep(data, (_value, key) => _.snakeCase(key));

const getDateFromTo = (date) => {
    let year = date.getFullYear();
    // 月(from)
    let monthFrom = 1 + date.getMonth();
    // 月(to) １ヶ月分取得
    let monthTo = 2 + date.getMonth();

    monthFrom = ('0' + monthFrom).slice(-2);
    monthTo = ('0' + monthTo).slice(-2);

    let dateFrom = 'YYYY-MM-01';
    dateFrom = dateFrom.replace(/YYYY/g, year);
    dateFrom = dateFrom.replace(/MM/g, monthFrom);

    let dateTo = 'YYYY-MM-01';
    dateTo = dateTo.replace(/YYYY/g, year);
    dateTo = dateTo.replace(/MM/g, monthTo);

    const dateFromTo = {
        'dateFrom': dateFrom,
        'dateTo': dateTo
    }
    return dateFromTo;
}

const transformJournalDataToRequestData = (journalData) => {
    let requestData = {
        accountDate: "",
        debit: [],
        credit: []
    };
    requestData.accountDate = journalData.accountDate;

    Object.keys(journalData.debit).forEach(function (index) {
        let params = {};
        for (const key in journalData.debit[index]) {
            if (journalData.debit[index][key] !== "") {
                params[key] = journalData.debit[index][key];
            }
        }
        if (Object.keys(params).length) {
            requestData.debit.push(params);
        }
    });

    Object.keys(journalData.credit).forEach(function (index) {
        let params = {};
        for (const key in journalData.credit[index]) {
            if (journalData.credit[index][key] !== "") {
                params[key] = journalData.credit[index][key];
            }
        }
        if (Object.keys(params).length) {
            requestData.credit.push(params);
        }
    });
    return requestData;
}

export { mapKeysCamelCase, mapKeysSnakeCase, getDateFromTo, transformJournalDataToRequestData }