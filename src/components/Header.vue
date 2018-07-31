<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">

      <router-link to="/">
        <a class="navbar-item" href="/">
          <span class="title" :class="{'is-primary':!isAdminSite,'is-info':isAdminSite}">Deutsche bank</span>
        </a>
      </router-link>
      <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu">

      <div class="navbar-end">

        <div class="navbar-item">


          <!--if any of the admin and user is not logged in -->
          <div v-if="!isLoggedIn && !isAdminLoggedIn" class="field is-grouped">
            <p class="control">
              <router-link  to="/">
                <a class="bd-tw-button button">
                  <span>Trader Login</span>
                </a>
              </router-link>
            </p>
            <p class="control">
              <router-link to="/compliance">
                <a class="button" :class="{'is-primary':!isAdminSite,'is-info':isAdminSite}">
                  <span>Compliance Login</span>
                </a>
              </router-link>
            </p>
          </div>

          <!--if logged in as user-->
          <div v-else-if="isLoggedIn" class="field is-grouped">
            <p class="control">
                <a class="bd-tw-button button" @click="logOut">
                  <span> Trader Logout</span>
                </a>
            </p>
          </div>

          <!--if admin is logged in-->
          <div v-else class="field is-grouped">
            <p class="control">
                <a class="bd-tw-button button" @click="adminLogOut">
                  <span> Compliance Logout</span>
                </a>
            </p>
          </div>
          <!--<div v-else class="field is-grouped">-->
            <!--<div class="navbar-start">-->
              <!--<div class="navbar-item has-dropdown is-hoverable">-->
                <!--<a class="navbar-link" href="/documentation/overview/start/">-->
                  <!--Limits-->
                <!--</a>-->
                <!--<div class="navbar-dropdown is-boxed">-->
                  <!--<a class="navbar-item" href="/documentation/overview/start/">-->
                    <!--Overview-->
                  <!--</a>-->
                  <!--<a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">-->
                    <!--Modifiers-->
                  <!--</a>-->
                  <!--<a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">-->
                    <!--Columns-->
                  <!--</a>-->
                  <!--<a class="navbar-item" href="https://bulma.io/documentation/layout/container/">-->
                    <!--Layout-->
                  <!--</a>-->
                  <!--<a class="navbar-item" href="https://bulma.io/documentation/form/general/">-->
                    <!--Form-->
                  <!--</a>-->
                  <!--<hr class="navbar-divider">-->
                  <!--<a class="navbar-item" href="https://bulma.io/documentation/elements/box/">-->
                    <!--Elements-->
                  <!--</a>-->
                  <!--<a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">-->
                    <!--Components-->
                  <!--</a>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->

            <!--<p class="control">-->
              <!--<a class="button is-primary" @click="logOut">-->
                <!--<span>Sign out</span>-->
              <!--</a>-->
            <!--</p>-->
          <!--</div>-->

        </div>
      </div>
    </div>
  </nav>
</template>

<script>
    export default {
        name: "Header",
        user:{},
        mounted(){

        },
        computed:{
            isLoggedIn(){
                return this.$store.getters.isLoggedIn;
            },
            userData(){
                return this.$store.getters.getUser;
            },
            isAdminLoggedIn(){
                return this.$store.getters.isAdminLoggedIn;
            },
            adminData(){
                return this.$store.getters.getAdmin;
            },
            isAdminSite(){

                  let matchregex=new RegExp(/.*compliance.*/).exec(this.$route.fullPath);
                  if(matchregex==undefined){
                      console.log("do not match");
                      return false;
                  }
                  console.log("matched");
                  return true;

            }
        },
        methods:{
            logOut(){
                console.log("trying to logout....");
                if(this.$store.dispatch('logOut')){
                    this.$router.push("/");
                }else{
                    console.log("Couldn't able to logout..");

                }
            },
            adminLogOut(){
                console.log("admin trying to logout....");
                if(this.$store.dispatch('adminLogOut')){
                    this.$router.push("/compliance");
                }else{
                    console.log("admin Couldn't able to logout..");

                }
            }
        }
    }
</script>

<style scoped>

  .user-class{
    color:#7957d5;
    font-weight: bolder;
  }
  .user-button{
    background-color:#7957d5;
    color:white;
  }
  .admin-class{
    color:rgb(0,103,158);
    font-weight: bolder;
  }
  .admin-button{
    background-color:rgb(0,103,158);
    color:white;
  }

  .control{
    font-weight: bold;
  }
</style>