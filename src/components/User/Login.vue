<template>
    <div>
        <Hero :message="hero.message" :title="hero.title"></Hero>
        <section class="section">

            <div class="columns is-mobile">
                <div class="column is-half is-offset-one-quarter">
                    <h1 class="title" style="text-align: left">Trader Log In</h1>


                    <b-field label="Trader Id"
                             type="is-success"
                             message="This username is available">
                        <b-input value="" maxlength="30"></b-input>
                    </b-field>

                    <b-field label="Password">
                        <b-input type="password"
                                 value="iwantmytreasure"
                                 password-reveal>
                        </b-input>
                    </b-field>
                </div>

            </div>
            <div class="columns is-mobile">
                <div class="column is-half is-offset-8">
                    <button class="button is-primary is-right" slot="trigger">Log In</button>

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
                user:{}
            }
        },

        //created() and mounted() both are being called everytime we change route to this url
        mounted(){
            // if(!this.$store.user.isLoggedIn('/user/isLogged')){
            //     console.log("not logged in");
            // }
            // console.log("mounted");
            // this.$store.dispatch('user/login',user);
            console.log(this.$store);

        },
    }
</script>

<style scoped>
    .section{
        text-align: left;
    }

</style>