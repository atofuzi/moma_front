<template>
  <div>
    <!-- 売掛帳テーブル -->
    <div class="container-fuild">
      <div class="col-10">
        <GeneralPurPoseBookTable
          v-for="(accountsReceivableData,
          tableIndex) in accountsReceivableDataLists"
          :key="tableIndex"
          :tableData="accountsReceivableData"
          :isTableLoading="isTableLoading"
        ></GeneralPurPoseBookTable>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralPurPoseBookTable from "@/components/parts/record/tables/GeneralPurPoseBookTableComponent.vue";
import { getReceivableBook } from "@/api/record.js";
export default {
  props: {
    accountMonth: Date,
  },
  components: {
    GeneralPurPoseBookTable,
  },
  data() {
    return {
      accountsReceivableDataLists: [],
      isTableLoading: true,
    };
  },
  created() {
    console.log("売掛帳データ取得開始");
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
      getReceivableBook(this.accountMonth)
        .then((response) => {
          console.log(response);
          this.accountsReceivableDataLists = response.data;
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