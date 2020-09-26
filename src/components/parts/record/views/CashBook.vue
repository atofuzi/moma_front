<template>
  <div>
    <!-- 預金出納帳テーブル -->
    <div class="container-fuild">
      <div class="col-10">
        <CashBookTable
          v-for="(cashBookData, tableIndex) in cashBookDataLists"
          :key="tableIndex"
          :cashBookData="cashBookData"
        ></CashBookTable>
      </div>
    </div>
  </div>
</template>

<script>
import CashBookTable from "@/components/parts/record/tables/CashBookTableComponent.vue";
export default {
  components: {
    CashBookTable,
  },
  data() {
    return {
      cashBookDataLists: [
        {
          lastBalance: 0,
          totalBalance: 20000,
          items: [
            {
              id: 1,
              accountDate: "2020-09-13",
              summary: "アドセンスデポジット",
              targetAccountSubject: "普通預金",
              journalType: 0,
              amount: 40000,
              balance: 40000,
            },
            {
              id: 2,
              accountDate: "2020-09-23",
              summary: "イオンクレジット支払い",
              targetAccountSubject: "売上",
              journalType: 1,
              amount: 20000,
              balance: 20000,
            },
          ],
        },
      ],
    };
  },
};
</script>

<style>
</style>