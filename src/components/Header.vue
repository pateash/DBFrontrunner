<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">

      <router-link to="/">
        <a class="navbar-item" href="/">
          <span class="title" :class="{'is-primary':!isAdminSite,'is-info':isAdminSite}">Deutsche bank</span>
        </a>
      </router-link>
      <div class="navbar-burger burger" :class="{'is-active':navActive}" data-target="navbarExampleTransparentExample" @click="toggleNavbar">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExampleTransparentExample" class="navbar-menu" :class="{'is-active':navActive}" >

      <div class="navbar-end">

        <div class="navbar-item">

          <p class="tag" :class="{'is-primary':!isAdminSite,'is-info':isAdminSite}" style="font-size:1.3em;">
            <span><b>{{$store.getters.getTime[0]}}:{{$store.getters.getTime[1]}} AM</b></span>
          </p>

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
            <p class="tag" style="font-size:1.3em;">
              <span> Hello, <b>{{$store.getters.getUser.name}}</b></span>
            </p>


            <p class="control">
              <a class="bd-tw-button button" @click="logOut">
                <span> Trader Logout</span>
              </a>
            </p>
          </div>

          <!--if admin is logged in-->
          <div v-else class="field is-grouped">
            <p class="tag" style="font-size:1.3em;">
              <span> Hello, <b>{{$store.getters.getAdmin.name}}</b></span>
            </p>
            <!---->
            <p class="control">
              <a class="bd-tw-button button" @click="adminLogOut">
                <span> Compliance Logout</span>
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>

<script>
    import notification from "../services/notification";

    export default {
        name: "Header",
        data(){
            return{
                navActive:false
            }
        },
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
            toggleNavbar(){
                this.navActive=!this.navActive;
            },
            logOut(){
                console.log("trying to logout....");
                if(this.$store.dispatch('logOut')){
                    notification(this,"Logging out...")
                    this.$router.push("/");
                }else{
                    notification(this,"Cound't able to logout, try again...")
                }
            },
            adminLogOut(){
                notification(this,"Logging out...")
                if(this.$store.dispatch('adminLogOut')){
                    this.$router.push("/compliance");
                }else{
                    console.log("Couldn't able to logout, try again..");

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

  .navbar-link{
    font-weight: bolder;
    font-size: 1.2em;
  }
  .control{
    font-weight: bold;
  }
  p{
    margin:0em 0.4em;
  }
</style>