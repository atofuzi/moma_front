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
      depositBookDataLists: [],
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