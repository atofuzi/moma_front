<template>
  <div>
    <table class="table table-sm table-bordered record-table">
      <thead>
        <tr>
          <th>日付</th>
          <th colspan="2">摘要</th>
          <th>相手科目</th>
          <th>入金額</th>
          <th>出金額</th>
          <th>残高</th>
        </tr>
      </thead>
      <!-- 会計データ読み込みのアイコン -->
      <tbody v-if="isTableLoading">
        <tr>
          <th colspan="6">
            <VueLoading type="barsCylon" color="#c8c8c8"></VueLoading>
          </th>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <th></th>
          <th colspan="2" class="text-right">先月繰越</th>
          <th></th>
          <th></th>
          <th></th>
          <th class="text-right">{{ cashBookData.lastBalance }}</th>
        </tr>
        <tr v-for="(item, itemIndex) in cashBookData.items" :key="itemIndex">
          <th>{{ item.accountDate }}</th>
          <th colspan="2">{{ item.summary }}</th>
          <th>{{ item.targetAccountSubject }}</th>
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
          <th></th>
        </tr>
        <tr>
          <th></th>
          <th colspan="2" class="text-right">当月繰越</th>
          <th></th>
          <th></th>
          <th></th>
          <th class="text-right">
            {{ cashBookData.totalBalance | numberFormat }}
          </th>
        </tr>
      </tbody>
    </table>
    <br />
  </div>
</template>

<script>
import { VueLoading } from "vue-loading-template";
export default {
  props: {
    cashBookData: Object,
    isTableLoading: Boolean,
  },
  components: {
    VueLoading,
  },
};
</script>

<style>
</style>