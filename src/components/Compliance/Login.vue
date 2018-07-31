<template>
    <div>
        <Hero :message="hero.message" :title="hero.title"></Hero>

        {{admin}} <br>
        {{adminData}}
        <section class="section">
            <div class="columns is-mobile">
                <div class="column is-half is-offset-one-quarter">
                    <h1 class="title" style="text-align: left">Compliance Log In</h1>


                    <b-field label="Compliance Manager Id"
                             type="is-success"
                             message="This username is available">
                        <b-input v-model='admin.id' maxlength="30"></b-input>
                    </b-field>

                    <b-field label="Password">
                        <b-input type="password"
                                 v-model="admin.password"
                                 password-reveal>
                        </b-input>
                    </b-field>
                </div>
            </div>
            <div class="columns is-mobile">
                <div class="column is-half is-offset-8">
                    <button class="button is-info is-right" slot="trigger" @click="logIn">Log In</button>

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
                    title:"Welcome to DB Compliance",
                    message:"Please Login for Managing issues...",
                },
                admin: {} //we will use this temperary varible and use computed property for rendering data.

            }
        },
        methods: {
            logIn() {
                console.log("admin trying to login....");
                this.$store.dispatch('adminLogIn', this.admin).then(resp=>{
                    console.log("responce is"+resp);
                    this.$router.push("/compliance/dashboard");
                }).catch(error=>{
                    console.log(error);
                    console.log("couldn't able to login");
                });

            }
        },
         computed: { //we will use computed properties to get admindata from state.
            adminData() {
                return this.$store.getters.getAdmin;
            }
        },

        //created() and mounted() both are being called everytime we change route to this url
        mounted() {
            // console.log("mounted");
            // console.log(this.$store.getters.isLoggedIn);
            if (this.$store.getters.isAdminLoggedIn) {
                console.log("already logged in");
                this.$router.push("/compliance/dashboard");
                //if loggedIn, then update our admin object with state
                //and go to dashboard
            } else {
                console.log("not Logged in showing form");
            }
        }
    }
</script>

<style scoped>
    .section{
        text-align: left;
    }

</style>