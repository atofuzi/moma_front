import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue"
import JournalRegister from "../views/JournalRegister.vue"
import Login from "../views/Login.vue"
import Record from "../views/Record.vue"
import JournalBook from "../components/parts/record/views/JournalBook.vue"
import AccountsReceivableBook from "../components/parts/record/views/AccountsReceivableBook.vue"
import AccountsPayableBook from "../components/parts/record/views/AccountsPayableBook.vue"
import ExpensesBook from "../components/parts/record/views/ExpensesBook.vue"
import CashBook from "../components/parts/record/views/CashBook.vue"
import DepositBook from "../components/parts/record/views/DepositBook.vue"
import TotalAccountBook from "../components/parts/record/views/TotalAccountBook.vue"
Vue.use(Router);


export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            props: true
        },
        {
            path: '/journal-register',
            component: JournalRegister,
            props: true
        },
        {
            path: '/login',
            component: Login,
            props: true
        },
        {
            path: '/record',
            component: Record,
            props: true,
            children: [
                {
                    path: "journal-book",
                    component: JournalBook
                },
                {
                    path: "expenses-book",
                    component: ExpensesBook
                },
                {
                    path: "cash-book",
                    component: CashBook
                },
                {
                    path: "deposit-book",
                    component: DepositBook
                },
                {
                    path: "receivable-book",
                    component: AccountsReceivableBook
                },
                {
                    path: "payable-book",
                    component: AccountsPayableBook
                },
                {
                    path: "total-account-book",
                    component: TotalAccountBook
                }
            ]

        }
    ]
})