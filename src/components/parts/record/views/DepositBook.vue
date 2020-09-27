<template>
  <div>
    <!-- 預金出納帳テーブル -->
    <div class="container-fuild">
      <div class="col-10">
        <DepositBookTable
          v-for="(depositBookData, tableIndex) in depositBookDataLists"
          :key="tableIndex"
          :depositBookData="depositBookData"
        ></DepositBookTable>
      </div>
    </div>
  </div>
</template>

<script>
import DepositBookTable from "@/components/parts/record/tables/DepositBookTableComponent.vue";
import { getDepositBook } from "@/api/record.js";

export default {
  props: {
    accountMonth: Date,
  },
  components: {
    DepositBookTable,
  },
  data() {
    return {
      depositBookDataLists: [
        {
          bankName: "ゆうちょ銀行",
          depositKind: "普通預金",
          lastBalance: 0,
          totalBalance: 20000,
          items: [
            {
              id: 1,
              accountDate: "2020-09-13",
              summary: "アドセンスデポジット",
              targetAccountSubject: "雑収入",
              journalType: 0,
              amount: 40000,
              balance: 40000,
            },
            {
              id: 2,
              accountDate: "2020-09-23",
              summary: "イオンクレジット支払い",
              targetAccountSubject: "事業主貸",
              journalType: 1,
              amount: 20000,
              balance: 20000,
            },
          ],
        },
        {
          bankName: "八十二銀行",
          depositKind: "普通預金",
          lastBalance: 0,
          totalBalance: 900000,
          items: [
            {
              id: 5,
              accountDate: "2020-09-15",
              summary: "個人口座を事業口座へ",
              targetAccountSubject: "元入金",
              journalType: 0,
              amount: 1000000,
              balance: 1000000,
            },
            {
              id: 10,
              accountDate: "2020-09-27",
              summary: "ペイペイチャージ",
              targetAccountSubject: "事業主貸",
              journalType: 1,
              amount: 100000,
              balance: 900000,
            },
          ],
        },
      ],
    };
  },
  watch: {
    accountMonth: function () {
      console.log("日付選択されました" + this.accountDate);
      getDepositBook(this.accountMonth)
        .then((response) => {
          console.log(response.data);
          this.depositBookDataLists = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    console.log(this.accountMonth);
    getDepositBook(this.accountMonth)
      .then((response) => {
        console.log(response.data);
        this.depositBookDataLists = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
</style>