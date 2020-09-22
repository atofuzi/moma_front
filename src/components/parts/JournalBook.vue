<template>
  <div>
    <div class="popup" v-if="pupupActive">
      <JournalEditer
        :journalData="journalData"
        :banks="banks"
        :journalSubjects="journalSubjects"
        :suppliers="suppliers"
        v-on:reload="reloadTable($event)"
      ></JournalEditer>
    </div>
    <div class="popup-cover show-pupup-cover" v-if="pupupActive" @click="popupClose"></div>
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
          <tbody>
            <tr
              v-for="(journalData, index) in journalDataLists"
              :key="index"
              @click="journalEdit(index)"
              class="table-row"
            >
              <th>{{journalData.accountDate}}</th>
              <th
                :class="{'text-right':journalData.journalType === credit}"
                colspan="2"
              >{{ '('+journalData.accountSubject+')'+journalData.summary }}</th>
              <th class="text-center">{{journalData.gentianNumber}}</th>
              <th
                class="text-right"
              >{{ (journalData.journalType === debit)? journalData.amount: "" }}</th>
              <th
                class="text-right"
              >{{ (journalData.journalType === credit)? journalData.amount: "" }}</th>
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
//import ExpensesBook from "@/components/parts/ExpensesBook";
export default {
  props: {
    date: Date,
  },
  components: {
    //ExpensesBook,
    JournalEditer,
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
    };
  },
  created() {
    console.log("仕訳帳クリエイト");
    getJournalBook(this.date)
      .then((response) => {
        console.log(response);
        this.journalDataLists = response.data;
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
    date: function () {
      console.log("日付選択されました" + this.date);
      getJournalBook(this.date)
        .then((response) => {
          console.log(response);
          this.journalDataLists = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  methods: {
    journalEdit: function (index) {
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
      getJournalBook(this.date)
        .then((response) => {
          console.log(response);
          this.journalDataLists = response.data;
          this.pupupActive = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>