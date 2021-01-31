<template>
  <div>
    <!-- 編集画面読み込みアイコン -->
    <ScreenLoading :isShow="isScreenLoading"></ScreenLoading>
    <!-- 編集画面のポップアップ -->
    <div class="popup" v-if="pupupActive">
      <JournalEditer
        :journalData="journalData"
        :banks="banks"
        :journalSubjects="journalSubjects"
        :suppliers="suppliers"
        v-on:reload="reloadTable($event)"
        v-on:closeLoading="closeLoading()"
      ></JournalEditer>
    </div>
    <div
      class="popup-cover show-pupup-cover"
      v-if="pupupActive"
      @click="popupClose"
    ></div>
    <!-- 会計データテーブル -->
    <div class="container-fuild">
      <div class="col-10">
        <table class="table table-sm table-bordered record-table">
          <thead>
            <tr>
              <th>日付</th>
              <th colspan="2">摘要</th>
              <th>元丁</th>
              <th>借方</th>
              <th>貸方</th>
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
            <tr
              v-for="(journalData, index) in journalDataLists"
              :key="index"
              @click="journalEdit(index)"
              class="table-row"
            >
              <th>{{ journalData.accountDate }}</th>
              <th
                :class="{ 'text-right': journalData.journalType === credit }"
                colspan="2"
              >
                {{
                  "(" + journalData.accountSubject + ")" + journalData.summary
                }}
              </th>
              <th class="text-center">{{ journalData.gentianNumber }}</th>
              <th class="text-right">
                {{
                  journalData.journalType === debit
                    ? journalData.amount
                    : 0 | numberFormat
                }}
              </th>
              <th class="text-right">
                {{
                  journalData.journalType === credit
                    ? journalData.amount
                    : 0 | numberFormat
                }}
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getJournalBook } from "@/api/record.js";
import JournalEditer from "@/components/parts/JournalEditer";
import {
  getAccountSubjects,
  getBankLists,
  getSupplierLists,
  getJournalUnit,
} from "@/api/journal.js";
import ScreenLoading from "@/components/utils/ScreenLoadingComponent.vue";
import { VueLoading } from "vue-loading-template";
export default {
  props: {
    accountMonth: Date,
  },
  components: {
    JournalEditer,
    ScreenLoading,
    VueLoading,
  },
  data() {
    return {
      journalDataLists: null,
      journalData: null,
      banks: [],
      journalSubjects: [],
      suppliers: [],
      credit: 1,
      debit: 0,
      pupupActive: false,
      isTableLoading: false,
      isScreenLoading: false,
    };
  },
  created() {
    console.log("仕訳帳クリエイト");
    this.isTableLoading = true;
    getJournalBook(this.accountMonth)
      .then((response) => {
        console.log(response);
        this.journalDataLists = response.data;
        this.isTableLoading = false;
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("会計科目情報取得");
    getAccountSubjects()
      .then((response) => {
        console.log(response);
        this.journalSubjects = response.data;
      })
      .catch((error) => {
        console.log(error);
        console.log("会計科目情報取得失敗");
      });

    console.log("銀行リスト取得");
    getBankLists()
      .then((response) => {
        console.log(response.data);
        this.banks = response.data;
      })
      .catch((error) => {
        console.log(error);
        console.log("銀行リスト取得失敗");
      });

    console.log("取引先リスト取得");
    getSupplierLists()
      .then((response) => {
        console.log(response.data);
        this.suppliers = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  watch: {
    accountMonth: function () {
      console.log("日付選択されました" + this.accountMonth);
      this.isTableLoading = true;
      getJournalBook(this.accountMonth)
        .then((response) => {
          console.log(response);
          this.journalDataLists = response.data;
          this.isTableLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  methods: {
    journalEdit: function (index) {
      this.isScreenLoading = true;
      getJournalUnit(this.journalDataLists[index]["unitNumber"])
        .then((response) => {
          console.log(response.data);
          this.journalData = response.data;
          this.pupupActive = true;
        })
        .catch((error) => {
          console.log(error);
          console.log("編集する会計データ取得失敗");
        });
    },
    popupClose: function () {
      this.pupupActive = false;
    },
    reloadTable: function (message) {
      window.alert(message);
      this.isTableLoading = true;
      getJournalBook(this.accountMonth)
        .then((response) => {
          console.log(response);
          this.journalDataLists = response.data;
          this.pupupActive = false;
          this.isTableLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeLoading: function () {
      console.log("発火しました");
      this.isScreenLoading = false;
    },
  },
};
</script>

<style>
</style>