<template>
  <div>
    <Header></Header>
    <div class="contents">
      <Navigation v-if="($route.path !== '/login')"></Navigation>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Header from "./components/layout/Header.vue";
import Navigation from "./components/layout/Navigation.vue";

export default {
  components: {
    Header,
    Navigation,
  },
  data() {
    return {
      isShow: true,
    };
  },
};
</script>



