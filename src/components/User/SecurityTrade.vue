
<template>
    <div>
        <Hero message="Fill following information to continue" :title="capitalize(tradeType)+' '+security.symbol+' shares'"></Hero>

        <section class="section">

            <div class="columns is-mobile">
                <div class="column is-half is-offset-one-quarter">
                    <h1 class="title" style="text-align: left">Trade Information</h1>
                </div>
            </div>
            <div class="columns">
                <div class="column is-one-fifth is-offset-one-quarter">
                    <b-field label="Quantity">
                        <b-input maxlength="30" type="number" v-model="security.quantity" required></b-input>
                    </b-field>
                </div>
                <div class="column is-one-fifth ">
                    <b-field label="Price">
                        <b-input maxlength="30" required type="number" v-model="security.price"></b-input>
                    </b-field>

                </div>
            </div>

            <div class="columns is-mobile">
                <div class="column is-half is-offset-one-quarter">
                    <h1 class="title" style="text-align: left">Total Amount  &#8377;=</h1>
                    <h2 class="subtitle"> {{totalPrice}} </h2>
                </div>
            </div>
            <div class="columns is-mobile">
                <div class="column is-half is-offset-6">
                    <button class="button is-primary is-right"  autofocus  slot="trigger" @click="trade">{{capitalize($route.params.tradeType)}} Now</button>
                </div>
            </div>
             <!--<div class="columns is-mobile">-->
                <!--<div class="column is-half is-offset-8">-->
                    <!--<button class="button is-primary is-right"  autofocus @click="logIn" slot="trigger">Log In</button>-->
                <!--</div>-->
            <!--</div>-->
        </section>
    </div>
</template>

<script>
    import Hero from "@/components/Hero";
    export default {
        name: "SecurityBuy",
        data(){
            return{

                currentPrice:0,
                security:{
                    symbol: this.$route.params.security,
                    quantity:0,

                    price:0,
                    brokerid:this.$store.getters.getUser.id,
                    clientname:this.$store.getters.getUser.name,
                    direction:this.$route.params.tradeType[0].toUpperCase(),
                    isinno:"INEDB2808B"+(parseInt(Math.random()*1000000))
                },
            }
        },
        computed:{
            tradeType(){
                // console.log(this.$route.params);
                return this.$route.params.tradeType
            },
            totalPrice(){
                return this.security.price*this.security.quantity;
            }
        },
        components:{
            Hero
        },
        methods:{
            capitalize(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },
            trade(){

                //todo: do this request as soon as goutham changes price attribute it....
                axios.post("/users/orders/execute",this.security)
                    .then(response=>{
                        console.log(response);

                    })
                    .catch(error=>{
                        console.log(error);

                    });
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