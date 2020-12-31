<template>
  <div>
    <!-- 預金出納帳テーブル -->
    <div class="container-fuild">
      <div class="col-10">
        <CashBookTable
          :cashBookData="cashBookData"
          :isTableLoading="isTableLoading"
        ></CashBookTable>
      </div>
    </div>
  </div>
</template>

<script>
import CashBookTable from "@/components/parts/record/tables/CashBookTableComponent.vue";
import { getCashBook } from "@/api/record.js";
export default {
  props: {
    accountMonth: Date,
  },
  components: {
    CashBookTable,
  },
  data() {
    return {
      cashBookData: {},
      isTableLoading: true,
    };
  },
  watch: {
    accountMonth: function () {
      this.get();
    },
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      this.isTableLoading = true;
      getCashBook(this.accountMonth)
        .then((response) => {
          console.log(response.data);
          this.cashBookData = response.data;
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