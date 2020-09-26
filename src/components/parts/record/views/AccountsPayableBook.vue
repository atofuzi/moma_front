<template>
  <div>
    <!-- 売掛帳テーブル -->
    <div class="container-fuild">
      <div class="col-10">
        <GeneralPurPoseBookTable
          v-for="(accountsPayableData, tableIndex) in accountsPayableDataLists"
          :key="tableIndex"
          :tableData="accountsPayableData"
        ></GeneralPurPoseBookTable>
      </div>
    </div>
  </div>
</template>

<script>
import GeneralPurPoseBookTable from "@/components/parts/record/tables/GeneralPurPoseBookTableComponent.vue";
export default {
  components: {
    GeneralPurPoseBookTable,
  },
  data() {
    return {
      accountsPayableDataLists: [
        {
          tableTitle: "水道光熱費",
          lastBalance: 0,
          totalBalance: 20000,
          items: [
            {
              id: 1,
              accountDate: "2020-09-13",
              summary: "アドセンス広告収入",
              journalType: 0,
              amount: 40000,
              balance: 40000,
            },
            {
              id: 2,
              accountDate: "2020-09-23",
              summary: "アドセンス広告収入振込",
              journalType: 1,
              amount: 20000,
              balance: 20000,
            },
          ],
        },
        {
          tableTitle: "楽天アフィリエイト",
          lastBalance: 0,
          totalBalance: 900000,
          items: [
            {
              id: 5,
              accountDate: "2020-09-15",
              summary: "楽天アフィリエイト広告収入",
              journalType: 0,
              amount: 1000000,
              balance: 1000000,
            },
            {
              id: 10,
              accountDate: "2020-09-27",
              summary: "楽天アフィリエイト広告収入振込",
              journalType: 1,
              amount: 100000,
              balance: 900000,
            },
          ],
        },
      ],
    };
  },
};
</script>