import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue"
import JournalRegister from "../views/JournalRegister.vue"
import Login from "../views/Login.vue"
import Record from "../views/Record.vue"
import JournalBook from "../components/parts/JournalBook.vue"
import ExpensesBook from "../components/parts/ExpensesBook.vue"
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
                }
            ]
        }
    ]
})