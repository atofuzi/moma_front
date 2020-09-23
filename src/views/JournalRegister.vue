<template>
  <div>
    <h2>仕訳帳登録</h2>
    <button v-on:click="add" class="btn btn-outline-dark btn-white btn-sm">
      テーブル追加
    </button>
    <button
      v-if="nextTableId > 1"
      @click="tableDelete"
      class="btn btn-outline-dark btn-white btn-sm"
    >
      テーブル削除
    </button>
    <div class="container-fuild">
      <div class="col-7 journal-input-area">
        <li v-for="(error, index) in errors" :key="index" class="text-danger">
          {{ error.message }}
        </li>
        <JournalInputComponent
          v-for="(table, index) in journalTables"
          :accountDate="data.accountDate"
          :debit="data.debit[index]"
          :credit="data.credit[index]"
          :journalSubjects="journalSubjects"
          :gentians="gentians"
          :banks="banks"
          :suppliers="suppliers"
          :key="table.id"
          :count="table.id"
          v-on:change="updateJournalData(table.id, $event)"
        ></JournalInputComponent>
      </div>
      <button @click="register()" class="btn btn-dark btn-sm">
        データを登録
      </button>
    </div>
  </div>
</template>

<script>
import JournalInputComponent from "@/components/parts/JournalInputComponent";
import {
  getAccountSubjects,
  getBankLists,
  getSupplierLists,
  registerJournal,
} from "@/api/journal.js";

export default {
  data() {
    return {
      data: {
        accountDate: "",
        debit: [
          {
            accountSubjectId: "",
            amount: "",
            summary: "",
            addInfoId: "",
          },
        ],
        credit: [
          {
            accountSubjectId: "",
            amount: "",
            summary: "",
            addInfoId: "",
          },
        ],
      },
      journalTables: [{ id: 0 }],
      nextTableId: 1,
      journalSubjects: [],
      gentians: [],
      banks: [],
      suppliers: [],
      errors: [],
    };
  },
  components: {
    JournalInputComponent,
  },
  created: function () {
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
        console.log("銀行リスト取得失敗");
      });
  },
  methods: {
    add: function () {
      this.journalTables.push({ id: this.nextTableId });
      this.data.debit.push({
        accountSubjectId: "",
        amount: "",
        summary: "",
        addInfoId: "",
      });
      this.data.credit.push({
        accountSubjectId: "",
        amount: "",
        summary: "",
        addInfoId: "",
      });
      this.nextTableId++;
    },
    tableDelete: function () {
      this.journalTables.pop();
      this.data.debit.pop();
      this.data.credit.pop();
      this.nextTableId--;
    },
    updateJournalData: function (index, inputData) {
      if (
        (inputData.key === "amount" ||
          inputData.key === "accountSubjectId" ||
          inputData.key === "addInfoId") &&
        inputData.value !== ""
      ) {
        this.data[inputData.type][index][inputData.key] = Number(
          inputData.value
        );
      } else if (inputData.key === "accountDate") {
        this.data.accountDate = inputData.value;
      } else {
        this.data[inputData.type][index][inputData.key] = inputData.value;
      }
    },
    register: function () {
      console.log("会計データ登録");

      registerJournal(this.data)
        .then((response) => {
          console.log(response);
          console.log("会計データ登録成功");
          this.reset();
        })
        .catch((error) => {
          console.log("会計データ登録失敗");
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    reset: function () {
      this.data = null;
      this.journalTables = [];
      this.data = {
        accountDate: "",
        debit: [
          {
            accountSubjectId: "",
            amount: "",
            summary: "",
            addInfoId: "",
          },
        ],
        credit: [
          {
            accountSubjectId: "",
            amount: "",
            summary: "",
            addInfoId: "",
          },
        ],
      };
      this.journalTables.push({ id: 0 });
      this.nextTableId = 1;

      // this.$router.go({ path: this.$router.currentRoute.path, force: true });
    },
  },
};
</script>