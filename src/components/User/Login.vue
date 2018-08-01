<template>
    <div>
        <Hero :message="hero.message" :title="hero.title"></Hero>
        <!--{{user}} <br>-->
        <!--{{userData}}-->
        <section class="section">

            <div class="columns is-mobile">
                <div class="column is-half is-offset-one-quarter">
                    <h1 class="title" style="text-align: left">Trader Log In</h1>

                    <b-field label="Trader Id">
                        <b-input maxlength="30" required v-model="user.id"></b-input>
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
    import notification from "../../services/notification";

    export default {
        components: {
            Hero
        },
        data() {
            return {
                hero: {
                    title: "Welcome to DB Trading",
                    message: "Please Login for continuing seeing your trade history and managing your limits ...",
                },
                user: {
                    id:"DBBRO8",
                    password:"123"
                } //we will use this temperary varible and use computed property for rendering data.
            }
        },

        methods: {
            logIn() {
                console.log("trying to login....");
                this.$store.dispatch('logIn', this.user).then(response=>{
                    if(response.code==1) {
                        notification(this, "Success! logged in..");
                        this.$router.push("/dashboard");
                    }else if(response.code==0) {
                        notification(this, "Error! User not found, try again..");
                    }else{
                        notification(this, "Error! Wrong password for Trader Id..");

                    }

                }).catch(error=>{
                    console.log("ERROR"+error);
                    notification(this,"Couldn't able to login, try again...",'danger');
                });

            }
        },

        computed: { //we will use computed properties to get userdata from state.
            userData() {
                return this.$store.getters.getUser;
            }
        },

        //created() and mounted() both are being called everytime we change route to this url
        mounted() {
            // console.log("mounted");
            // console.log(this.$store.getters.isLoggedIn);
            if (this.$store.getters.isLoggedIn) {
                console.log("already logged in");
                this.$router.push("/dashboard");
                //if loggedIn, then update our user object with state
                // this.updateUser();
                //and go to dashboard
            } else {
                notification(this,'Please Login as trader to continue.');
            }
        }
    }
</script>

<style scoped>
    .section{
        text-align: left;
    }

</style>