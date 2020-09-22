<template>
  <div class="container">
    <div class="row">
      <div class="offset-4 col-md-4">
        <br />
        <h4>ログイン</h4>
        <br />
        <div class="form-group">
          <label>Email</label>
          <input type="text" class="form-control" v-model="data.username" />
          <div class="alert alert-danger" v-text="errors.email" v-if="errors.email"></div>
        </div>
        <div class="form-group">
          <label>パスワード</label>
          <input type="password" class="form-control" v-model="data.password" />
          <div class="alert alert-danger" v-text="errors.email" v-if="errors.email"></div>
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-dark btn-block" @click="login">ログイン</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getToken, getUser } from "@/api/login.js";
export default {
  name: "Login",
  data() {
    return {
      data: {
        username: "",
        password: "",
        grant_type: "password",
        client_id: 1,
        client_secret: "gjjfMazrUofJhluvGV9Vqr9Bd5HJgnrCm3y5c4FY",
        scop: "",
      },
      errors: {},
    };
  },
  methods: {
    login() {
      console.log("ログイン開始");
      console.log(this.data);
      getToken(this.data)
        .then((response) => {
          console.log(response.data.accessToken);
          localStorage.setItem("ACCESS_TOKEN", response.data.accessToken);
          getUser()
            .then((response) => {
              console.log(response);
              localStorage.setItem("USER_ID", response.data.id);
              localStorage.setItem("USER_NAME", response.data.name);
              this.$router.push("/");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
