<template>
  <div>
    <!-- 預金出納帳テーブル -->
    <div class="container-fuild">
      <div class="col-10">
        <DepositBookTable
          v-for="(depositBookData, tableIndex) in depositBookDataLists"
          :key="tableIndex"
          :depositBookData="depositBookData"
          :isTableLoading="isTableLoading"
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
      isTableLoading: true,
    };
  },
  watch: {
    accountMonth: function () {
      console.log("日付選択されました" + this.accountDate);
      this.get();
    },
  },
  created() {
    console.log("預金出納帳データ取得開始");
    this.get();
  },
  methods: {
    get: function () {
      this.isTableLoading = true;
      getDepositBook(this.accountMonth)
        .then((response) => {
          console.log(response.data);
          this.depositBookDataLists = response.data;
          this.isTableLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.isTableLoading = false;
        });
    },
  },
};
</script>

<style>
</style>