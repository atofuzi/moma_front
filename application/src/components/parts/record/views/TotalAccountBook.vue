<template>
  <div>
    <!-- 売掛帳テーブル -->
    <div class="container-fuild">
      <div class="row">
        <div class="col-4">
          <GeneralPurPoseBookTable
            v-for="(accountsReceivableData, tableIndex) in assetsDataLists"
            :key="tableIndex"
            :tableData="accountsReceivableData"
            :isTableLoading="isTableLoading"
            :activeClass="bookName"
          ></GeneralPurPoseBookTable>
        </div>
        <div class="col-4">
          <GeneralPurPoseBookTable
            v-for="(liabilitiesCapitalData,
            tableIndex) in liabilitiesCapitalDataLists"
            :key="tableIndex"
            :tableData="liabilitiesCapitalData"
            :isTableLoading="isTableLoading"
            :activeClass="bookName"
          ></GeneralPurPoseBookTable>
        </div>
        <div class="col-4">
          <GeneralPurPoseBookTable
            v-for="earningsData in earningsDataLists"
            :key="earningsData.tableTitle"
            :tableData="earningsData"
            :isTableLoading="isTableLoading"
            :activeClass="bookName"
          ></GeneralPurPoseBookTable>
          <GeneralPurPoseBookTable
            v-for="costData in costDataLists"
            :key="costData.tableTitle"
            :tableData="costData"
            :isTableLoading="isTableLoading"
            :activeClass="bookName"
          ></GeneralPurPoseBookTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralPurPoseBookTable from "@/components/parts/record/tables/GeneralPurPoseBookTableComponent.vue";
import { GetTotalAccountBook } from "@/api/record.js";

export default {
  props: {
    accountMonth: Date,
  },
  components: {
    GeneralPurPoseBookTable,
  },
  data() {
    return {
      assetsDataLists: [],
      liabilitiesCapitalDataLists: [],
      costDataLists: [],
      earningsDataLists: [],
      isTableLoading: true,
      bookName: "total-account-book",
    };
  },
  created() {
    console.log("総勘定元帳データ取得開始");
    let getBook = new GetTotalAccountBook(this.accountMonth);
    this.get(getBook);
  },
  watch: {
    accountMonth: function () {
      console.log("日付選択されました");
      let getBook = new GetTotalAccountBook(this.accountMonth);
      this.get(getBook);
    },
  },
  methods: {
    get: function (getBook) {
      this.isTableLoading = true;
      getBook
        .assets()
        .then((response) => {
          console.log(response);
          this.assetsDataLists = response.data;
          this.isTableLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.isTableLoading = false;
        });
      getBook
        .liabilitiesCapital()
        .then((response) => {
          console.log(response);
          this.liabilitiesCapitalDataLists = response.data;
          this.isTableLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.isTableLoading = false;
        });
      getBook
        .cost()
        .then((response) => {
          console.log(response);
          this.costDataLists = response.data;
          this.isTableLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.isTableLoading = false;
        });
      getBook
        .earnings()
        .then((response) => {
          console.log(response);
          this.earningsDataLists = response.data;
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