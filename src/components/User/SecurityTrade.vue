
<template>
    <div>
        <Hero message="Fill following information to continue" :title="capitalize(tradeType)+' '+security+' shares'"></Hero>
        <section class="section">

            <div class="columns is-mobile">
                <div class="column is-half is-offset-one-quarter">
                    <h1 class="title" style="text-align: left">{{capitalize(tradeType)}} Trade</h1>

                    <b-field label="Trader Id">
                        <b-input maxlength="30" required ></b-input>
                    </b-field>
                    <b-field label="Password" >
                        <b-input type="password"
                                 password-reveal
                                 maxlength="30"
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

    </div>
</template>

<script>
    import Hero from "@/components/Hero";
    export default {
        name: "SecurityBuy",
        data(){
            return{
                security:this.$route.params.security,
                currentPrice:NaN

            }
        },
        computed:{
            tradeType(){
                // console.log(this.$route.params);
                return this.$route.params.tradeType
            },
        },
        components:{
            Hero
        },
        methods:{
            capitalize(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        },
        created(){
            /*
            ¡todo continue from here, wehave to restrict access if not loggedin
             and then have to also make same thing for securitySell
             ask goutham about security api end for showing all security and providing them
             option to buy or sell
             */

            //todo uncomment these lines to limit this page to user only
            // //if not loggedin then go back to login page
            // if (!this.$store.getters.isLoggedIn) {
            //     notification(this,"Please login to continue to trading..");
            //     //and go to dashboard
            //     this.$router.push("/");
            // } else {
            //     console.log("Logged in");
            // }
        },
        mounted(){
            // setInterval(()=>{
            //     // axios.post("/")
            //
            // },5000);
        }

    }
</script>

<style scoped>

    .section{
        text-align: left;
    }
</style>