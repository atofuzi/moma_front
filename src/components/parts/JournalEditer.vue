<template>
  <div>
    <h2>仕訳帳修正</h2>
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
    <button @click="editJournal()" class="btn btn-warning btn-sm">
      データを修正
    </button>
    <button @click="deleteJournal()" class="btn btn-danger btn-sm">
      データを削除
    </button>
    <div class="journal-input-area">
      <li v-for="(error, index) in errors" :key="index" class="text-danger">
        {{ error.message }}
      </li>
      <JournalInputTables
        v-for="(table, index) in journalTables"
        :accountDate="data.accountDate"
        :debit="data.debit[index]"
        :credit="data.credit[index]"
        :journalSubjects="journalSubjects"
        :banks="banks"
        :suppliers="suppliers"
        :key="table.id"
        :count="table.id"
        v-on:change="updateJournalData(table.id, $event)"
      ></JournalInputTables>
    </div>
  </div>
</template>

<script>
import JournalInputTables from "@/components/parts/JournalInputComponent";
import {
  /*   getAccountSubjects,
  getBankLists,
  getSupplierLists, */
  updateJournal,
  deleteJournal,
} from "@/api/journal.js";

export default {
  props: {
    journalData: Object,
    banks: Array,
    journalSubjects: Array,
    suppliers: Array,
  },
  data() {
    return {
      data: null,
      journalTables: [{ id: 0 }],
      nextTableId: 1,
      errors: [],
    };
  },
  components: {
    JournalInputTables,
  },
  created: function () {
    this.data = this.journalData;
    if (
      this.journalData.debit.length > 1 ||
      this.journalData.credit.length > 1
    ) {
      for (let i = 0; i < this.journalData.debit.length; i++) {
        this.journalTables.push({ id: this.nextTableId });
        this.nextTableId++;
      }
    }
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
    editJournal: function () {
      updateJournal(this.data)
        .then(() => {
          this.$emit("reload", "修正完了しました。");
        })
        .catch(() => {
          this.$emit("reload", "修正に失敗しました。");
        });
    },
    deleteJournal: function () {
      deleteJournal(this.data.ids)
        .then(() => {
          this.$emit("reload", "削除しました。");
        })
        .catch(() => {
          this.$emit("reload", "削除に失敗しました。");
        });
    },
  },
};
</script>