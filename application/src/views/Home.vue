<template>
  <div>
    <h2>お知らせ</h2>
    <h2>直近の入力データ</h2>
    <h2>毎月発生する固定費一覧</h2>
    <h2>仕訳の基礎</h2>
  </div>
</template>

<script>
export default {
  methods: {
    toJournalRegister() {
      this.$router.push({ path: "journal/register" });
    },
  },
};
</script>