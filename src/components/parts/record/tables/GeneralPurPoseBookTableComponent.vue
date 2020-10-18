<template>
  <div>
    <table
      class="table table-sm table-bordered record-table"
      :class="activeClass"
    >
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
          <th>借方</th>
          <th>貸方</th>
          <th>残高</th>
        </tr>
      </thead>
      <!-- 会計データ読み込みのアイコン -->
      <tbody v-if="isTableLoading">
        <tr>
          <th colspan="7">
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
          <th class="text-right">{{ tableData.lastBalance | numberFormat }}</th>
        </tr>
        <tr v-for="(item, itemIndex) in tableData.items" :key="itemIndex">
          <th>{{ transformDate(item.accountDate) }}</th>
          <th colspan="2">{{ item.summary }}</th>
          <!--
            bsPLType,journalType
            0,0 => amountを借方に表示 
            0,1 => amountを貸方に表示
            1,0 => amountを借方に表示
            1,1 => amountを貸方に表意
          -->
          <th class="text-right">
            {{
              (tableData.bsPlType === 0 && item.journalType === 0) ||
              (tableData.bsPlType === 1 && item.journalType === 0)
                ? item.amount
                : "" | numberFormat
            }}
          </th>
          <th class="text-right">
            {{
              (tableData.bsPlType === 0 && item.journalType === 1) ||
              (tableData.bsPlType === 1 && item.journalType === 1)
                ? item.amount
                : "" | numberFormat
            }}
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
import { VueLoading } from "vue-loading-template";
import { transformDate } from "@/utils/lib.js";
export default {
  props: {
    tableData: Object,
    isTableLoading: Boolean,
    activeClass: {
      type: String,
      default: "",
    },
  },
  components: {
    VueLoading,
  },
  data() {
    return {
      transformDate: transformDate,
    };
  },
};
</script>

<style>
</style>