<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">

      <router-link to="/">
        <a class="navbar-item" href="/">
          <span class="title">Deutsche bank</span>      <!--<img src="http://allvectorlogo.com/img/2017/03/deutsche-bank-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">-->
        </a>
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

          <div v-if="!isLoggedIn" class="field is-grouped">
            <p class="control">
              <router-link  to="/">
                <a class="bd-tw-button button">
                  <span>Trader Login</span>
                </a>
              </router-link>
            </p>
            <p class="control">
              <router-link to="/compliance">
                <a class="button is-primary">
                  <span>Compliance Login</span>
                </a>
              </router-link>
            </p>
          </div>
          <div v-else class="field is-grouped">
            <div class="navbar-start">
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" href="/documentation/overview/start/">
                  Limits
                </a>
                <div class="navbar-dropdown is-boxed">
                  <a class="navbar-item" href="/documentation/overview/start/">
                    Overview
                  </a>
                  <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
                    Modifiers
                  </a>
                  <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
                    Columns
                  </a>
                  <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
                    Layout
                  </a>
                  <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
                    Form
                  </a>
                  <hr class="navbar-divider">
                  <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
                    Elements
                  </a>
                  <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
                    Components
                  </a>
                </div>
              </div>
            </div>

            <p class="control">
              <router-link to="/compliance">
                <a class="button is-primary">
                  <span>Logged Out</span>
                </a>
              </router-link>
            </p>
          </div>
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
            }
        }
    }
</script>

<style scoped>
  .title{
    color:#7957d5;
    font-weight: bolder;
  }
  .control{
    font-weight: bold;
  }
</style>