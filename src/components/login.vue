<template>
  <div class="login-view flex-box flex-column">
    <div class="container flex-item flex-box flex-column">
      <div class="flex-item flex-box flex-middle">
        <div class="jumbotron">
          <h1 class="display-4">{{title}}</h1>
          <div class="auth-modal" v-if="email_not_sent">
              <div class='login-form'>
                <div class="login-form-item login-email">
                  <b-form-group
                      id="fieldset-1"
                      label="Ваш Email"
                      label-for="input-1"
                    >
                      <b-form-input 
                        id="input-1" 
                        v-model="login"
                        trim></b-form-input>
                    </b-form-group>
                </div>
                <div class="login-form-item login-name">
                  <b-form-group
                      id="fieldset-3"
                      v-if="isNew" 
                      label="Ваше Имя"
                      label-for="input-3"
                    >
                      <b-form-input 
                        id="input-3" 
                        v-model="name" 
                        trim></b-form-input>
                    </b-form-group>
                </div>
                <b-button 
                  style="width:100%" 
                  v-if="first_stage"
                  @click="checkLogin" 
                  variant="outline-success">
                    Далее
                </b-button>
                <div v-if="registered" class="login-form-item login-password">
                    <b-form-group
                      id="fieldset-2"
                      label="Ваш Пароль"
                      label-for="input-2"
                    >
                      <b-form-input 
                      v-model="password" 
                      trim></b-form-input>
                    </b-form-group>
                </div>

              <b-button 
                v-if="registered" 
                style="width:100%" 
                @click="loginEmail" 
                variant="outline-success">
                  Войти
              </b-button>

              <b-button 
                v-if="registered" 
                style="width:100%;margin-top:10px;" 
                @click="resetPassword" 
                variant="outline-primary">
                  Восстановить пароль
              </b-button>

              <b-button 
                v-if="isNew" 
                style="width:100%" 
                @click="registerEmail" 
                variant="outline-success">
                  Зарегистрироваться
              </b-button>
              </div>
            </div>
            <div class="auth-modal" slot="body" v-if="email_sent">
              <h2>Вам отправлен email</h2>
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    props:["app"],
    methods:{
      checkLogin() {
        const {login, password} = this
        const app = this.app.app.app || this.app.app || this.app
        this.first_stage = false
        app.auth.checkLogin(login).then((data)=>{
          if(data.registered) return this.registered = true
          this.isNew = true;
        })

      },
      loginEmail() {
        const {login, password} = this
        const app = this.app.app.app || this.app.app || this.app
        app.auth.processLogin({type:"email", login, password})
        .then((_data)=>{
          // this.hideModal()
          this.$router.push('/admin/home')
        })
        .catch(err=>{
          console.error("===== login error ======");
          console.error(err);
        })
      },
      registerEmail() {
        const {login, name} = this
        const app = this.app.app.app || this.app.app || this.app
        app
        .auth
        .register({login, name})
        .then((data)=>{
          this.email_not_sent = false;
          this.email_sent = true;
        })
        .catch(err=>{
          console.error(err);
        })
      },
      resetPassword() {

        const app = this.app.app.app || this.app.app || this.app
        const {login} = this
        app
        .auth
        .resetPassword({login})
        .then((data)=>{
          this.email_not_sent = false;
          this.email_sent = true;
        })
        .catch(err=>{
          console.error(err);
        })
      },
      hideModal() {
        this.login = "";
        this.name = "";
        this.password = "";
        this.registered = false;
        this.first_stage = true;
        this.isNew = false;
        this.enabled = false;
        this.email_not_sent = true;
        this.email_sent = false;
      },
      loginFacebook() {
        this.enabled = false;
        this.showPromiseResolve({type:"fb"})
      },
      checkAuth() {
        const app = this.app.app.app || this.app.app || this.app
        // console.info("appp auth", app.auth)
        if(app.auth.auth != null 
          && app.auth.auth.name != null 
          && app.auth.auth.name != "") this.$router.push('/admin/home')
      }
    },
    data() {
      setTimeout(this.checkAuth, 1000)
      return {
        title:"Войти",
        login:'',
        password:'',
        registered:false,
        first_stage:true,
        isNew:false,
        email_sent:false,
        email_not_sent:true,
        enabled:false
      }
    }
  }

</script>


<style>
.login-view h1 {
  font-size:36px;
  font-weight:bold;
}
.hero-img {
  width: 300px;
  float: left;
  margin-right: 15px;
}
.flex-hero p {
  text-align:center;
  color:black;
}
.flex-hero p.hero-details {
  width:300px;
  font-size:18px;
  font-weight:bold;
}
.login-view {
  font-size: 16px;;
  color: black;
}
</style>
