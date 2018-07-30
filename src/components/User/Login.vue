<template>
    <div>
        <Hero :message="hero.message" :title="hero.title"></Hero>
        {{user}} <br>
        {{userData}}
        <section class="section">

            <div class="columns is-mobile">
                <div class="column is-half is-offset-one-quarter">
                    <h1 class="title" style="text-align: left">Trader Log In</h1>

                    <b-field label="Trader Id"
                             message="This username is available">
                        <b-input maxlength="30" v-model="user.id" required></b-input>
                    </b-field>

                    <b-field label="Password" >
                        <b-input type="password"
                                 password-reveal
                                 maxlength="30"
                                 v-model="user.password"
                                 required
                        >
                        </b-input>
                    </b-field>
                </div>

            </div>
            <div class="columns is-mobile">
                <div class="column is-half is-offset-8">
                    <button class="button is-primary is-right"  autofocus @click="logIn" slot="trigger">Log In</button>
                </div>
            </div>
        </section>
    </div></template>
<script>
    import Hero from '../Hero';

    export default {
        components:{
            Hero
        },
        data() {
            return {
                hero:{
                    title:"Welcome to DB Trading",
                    message:"Please Login for continuing seeing your trade history and managing your limits ...",
                },
                user:{} //we will use this temperary varible and use computed property for rendering data.
            }
        },

        methods:{
          logIn(){
              console.log("trying to login....");
              if(this.$store.dispatch('logIn',this.user)){
                  this.$router.push("/dashboard")
              }
          }
        },

        computed:{ //we will use computed properties to get userdata from state.
            userData(){
                return this.$store.getters.getUser;
            }
        },

        //created() and mounted() both are being called everytime we change route to this url
        mounted(){
            // console.log("mounted");
            // console.log(this.$store.getters.isLoggedIn);
            if(this.$store.getters.isLoggedIn){
                console.log("logged in");
                this.$router.push("/dashboard");
                //if loggedIn, then update our user object with state
                // this.updateUser();
                //and go to dashboard
            }else{
                console.log("not Logged in");
            }
        },
    }
</script>

<style scoped>
    .section{
        text-align: left;
    }

</style>