<template>
  <div>
    <!-- 買掛帳テーブル -->
    <div class="container-fuild">
      <div class="col-10">
        <GeneralPurPoseBookTable
          v-for="(accountsPayableData, tableIndex) in accountsPayableDataLists"
          :key="tableIndex"
          :tableData="accountsPayableData"
          :isTableLoading="isTableLoading"
        ></GeneralPurPoseBookTable>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralPurPoseBookTable from "@/components/parts/record/tables/GeneralPurPoseBookTableComponent.vue";
import { getPayableBook } from "@/api/record.js";
export default {
  props: {
    accountMonth: Date,
  },
  components: {
    GeneralPurPoseBookTable,
  },
  data() {
    return {
      accountsPayableDataLists: [],
      isTableLoading: true,
    };
  },
  created() {
    console.log("買掛帳データ取得開始");
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
      this.isTableLoading = true;
      getPayableBook(this.accountMonth)
        .then((response) => {
          console.log(response);
          this.accountsPayableDataLists = response.data;
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