<template>
  <div>
    <table class="table table-sm table-bordered record-table">
      <thead class="book-title">
        <tr>
          <th colspan="6">
            {{ tableData.tableTitle }}
          </th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th>日付</th>
          <th colspan="2">摘要</th>
          <th>入金額</th>
          <th>出金額</th>
          <th>残高</th>
        </tr>
      </thead>
      <!-- 会計データ読み込みのアイコン -->
      <tbody>
        <tr>
          <th></th>
          <th colspan="2" class="text-right">先月繰越</th>
          <th></th>
          <th></th>
          <th class="text-right">{{ tableData.lastBalance | numberFormat }}</th>
        </tr>
        <tr v-for="(item, itemIndex) in tableData.items" :key="itemIndex">
          <th>{{ item.accountDate }}</th>
          <th colspan="2">{{ item.summary }}</th>
          <th class="text-right">
            {{ item.journalType === 0 ? item.amount : "" | numberFormat }}
          </th>
          <th class="text-right">
            {{ item.journalType === 1 ? item.amount : "" | numberFormat }}
          </th>
          <th class="text-right">{{ item.balance | numberFormat }}</th>
        </tr>
        <tr height="34px">
          <th></th>
          <th colspan="2">&nbsp;</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <th></th>
          <th colspan="2" class="text-right">当月繰越</th>
          <th></th>
          <th></th>
          <th class="text-right">
            {{ tableData.totalBalance | numberFormat }}
          </th>
        </tr>
      </tbody>
    </table>
    <br />
  </div>
</template>

<script>
export default {
  props: {
    tableData: Object,
  },
};
</script>

<style>
</style>