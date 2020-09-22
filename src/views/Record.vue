<template>
  <div>
    <h2>帳票確認</h2>
    <DatePicker v-model="date" minimum-view="month" format="yyyy年MM月" :language="ja"></DatePicker>
    <div class="container-fuild">
      <div class="row record-tab">
        <div
          class="col record-tab-item"
          :class="{'record-tab-item__active': $route.path === item.url }"
          v-for="(item,index) in recordItems"
          :key="index"
        >
          <router-link :to="item.url" exact>
            <p>{{item.title}}</p>
          </router-link>
        </div>
      </div>
      <div class="record-view-area">
        <router-view :date="date"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vuejs-datepicker";
import { ja } from "vuejs-datepicker/dist/locale";

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      recordItems: [
        { title: "仕訳帳", url: "/record/journal-book" },
        { title: "現金出納帳", url: "/record/chash-book" },
        { title: "預金出納帳", url: "/record/deposit-book" },
        { title: "売掛帳", url: "/record/receivable-book" },
        { title: "買掛帳", url: "/record/payable-book" },
        { title: "経費帳", url: "/record/expenses-book" },
        { title: "総勘定元帳", url: "/record/total-accout-book" },
      ],
      date: new Date(),
      ja: ja,
    };
  },
};
</script>