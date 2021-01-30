<template>
  <div>
    <!-- 編集画面読み込みアイコン -->
    <div v-show="isShow">
      <div class="screen-loading">
        <VueLoading
          type="spiningDubbles"
          class="screen-loading__item"
          color="#c8c8c8"
          :size="{ width: '100px', height: '100px' }"
        ></VueLoading>
      </div>
    </div>
  </div>
</template>

<script>
import { VueLoading } from "vue-loading-template";
export default {
  components: {
    VueLoading,
  },
  props: {
    isShow: Boolean,
  },
};
</script>
