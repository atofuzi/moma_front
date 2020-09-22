import axios from "axios";
import myAxios from "../utils/api.js";


export function getToken(param) {
    const url = 'http://localhost:8888/accounting_software/public/oauth/token';
    return axios.post(url, param);
}

export function getUser() {
    // ヘッダー情報設定
    myAxios.defaults.headers.common = {
        'Authorization': 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
        'X-Requested-With': 'XMLHttpRequest'
    }
    return myAxios.get('user');
}