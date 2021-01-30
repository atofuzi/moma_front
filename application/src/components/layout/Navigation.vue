<template>
  <div>
    <div class="container-fuild header-nav">
      <div class="row">
        <div class="col">
          <router-link to="/journal-register" active-class="link--active" exact>
            <p>仕訳帳に記入</p>
            <img src="@/assets/image/jouranalregister.jpg" />
          </router-link>
        </div>
        <div class="col">
          <router-link to="/record/journal-book" active-class="link--active" exact>
            <p>記録を見る</p>
            <img src="@/assets/image/recode.jpg" />
          </router-link>
        </div>
        <div class="col">
          <router-link to="/pl-bs" active-class="link--active" exact>
            <p>収益・資産状況</p>
            <img src="@/assets/image/pl-bs.jpg" />
          </router-link>
        </div>
        <div class="col">
          <router-link to="/save" active-class="link--active" exact>
            <p>書類を保存</p>
            <img src="@/assets/image/save.jpg" />
          </router-link>
        </div>
        <div class="col">
          <router-link to="/save" active-class="link--active" exact>
            <p>データの読み込み</p>
            <img src="@/assets/image/import.jpg" />
          </router-link>
        </div>
        <div class="col">
          <router-link to="/save" active-class="link--active" exact>
            <p>確定進行</p>
            <img src="@/assets/image/tax.jpg" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.link--active {
  color: #e37b89;
}
</style>
