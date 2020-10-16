<template>
  <div>
    <!-- 売掛帳テーブル -->
    <div class="container-fuild">
      <div class="col-10">
        <GeneralPurPoseBookTable
          v-for="(expensesData, tableIndex) in expensesDataLists"
          :key="tableIndex"
          :tableData="expensesData"
        ></GeneralPurPoseBookTable>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralPurPoseBookTable from "@/components/parts/record/tables/GeneralPurPoseBookTableComponent.vue";
import { getExpensesBook } from "@/api/record.js";
export default {
  props: {
    accountMonth: Date,
  },
  components: {
    GeneralPurPoseBookTable,
  },
  data() {
    return {
      expensesDataLists: [],
    };
  },
  created() {
    console.log("経費帳データ取得開始");
    this.get();
  },
  watch: {
    accountMonth: function () {
      console.log("日付選択されました");
      this.get();
    },
  },
  methods: {
    get: function () {
      getExpensesBook(this.accountMonth)
        .then((response) => {
          console.log(response);
          this.expensesDataLists = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>