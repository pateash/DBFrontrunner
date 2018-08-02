<template>
    <div>
        <Hero message="Following table contains trade information" title="Trader Dashboard"></Hero>
        <!--SECURITIES-->
        <section class="container" style="margin-top: 2em">
            <h1 class="title" style="text-align: left">Trade Security</h1>

            <b-table
                    :data="securityData"
                    :loading="loading"
            >

                <template slot-scope="props">
                    <b-table-column field="issnno" label="ISSN No." sortable>
                        {{ props.row.isinno }}
                    </b-table-column>
                    <b-table-column field="companyname" label="Company Name" sortable>
                        {{ props.row.companyname }}
                    </b-table-column>
                    <b-table-column field="sector" label="Sector" sortable>
                        {{ props.row.sector }}
                    </b-table-column>

                    <b-table-column field="symbol" label="Trade Symbol" sortable>
                        {{ props.row.symbol }}
                    </b-table-column>
                    <b-table-column field="marketlot" label="Market Lot" sortable>
                        {{ props.row.marketlot }}
                    </b-table-column>
                    <b-table-column field="pricevariantlimit" label="Price Variant Limit" sortable>
                        {{ props.row.pricevariantlimit }}
                    </b-table-column>

                    <b-table-column  label="Buy Trade">
                        <a class="tag is-primary" style="font-size:1em" @click="trade('B',props.row.symbol)">
                            &nbsp;&nbsp;&nbsp;Buy&nbsp;&nbsp;&nbsp;
                        </a>
                    </b-table-column>
                    <b-table-column  label="Sell Trade">
                        <a class="tag is-info" style="font-size:1em" @click="trade('S')">
                            &nbsp;&nbsp;&nbsp;Sell&nbsp;&nbsp;&nbsp;
                        </a>
                    </b-table-column>


                </template>
            </b-table>
        </section>



        <section class="container" style="margin-top: 2em">
            <h1 class="title" style="text-align: left">Trade History</h1>
            <b-table :data="orderData" :columns="orderColumns"></b-table>
        </section>
    </div>
</template>

<script>
    import Hero from "../Hero";
    import notification from "../../services/notification";
    export default {
        components:{Hero},
        data() {
            return {
                user:{},
                loading:false,
                orderData: [],
                orderColumns: [
                    {
                        field: "clientname",
                        label: 'Client Name',
                    },
                    {
                        field: 'security',
                        label: 'Security Name',
                    },
                    {
                        field: 'isinno',
                        label: 'ISIN no.',
                    },
                    {
                        field: 'tradedate',
                        label: 'Trading Data',
                    },
                    {
                        field: 'quantity',
                        label: 'Quantity',
                        centered: true
                    },
                    {
                        field: 'tradetype',
                        label: 'Trade Type',
                    },
                    {
                        field: 'limitprice',
                        label: 'Limit Price',
                    },
                    {
                        field: 'direction',
                        label: "Direction",
                    },
                    {
                        field: 'value',
                        label: "Value",
                    },

                ],
                securityData:[],
                securityColumns:[
                    {
                        field: "companyname",
                        label: 'Company Name',
                    },
                    {
                        field: "sector",
                        label: 'Sector',
                    },
                    {
                        field: "symbol",
                        label: 'Trade Symbol',
                    },
                    {
                        field: "issnno",
                        label: 'ISIN no.',
                    },
                    {
                        field: "marketlot",
                        label: 'Market Lot',
                    },
                    {
                        field: "pricevariantlimit",
                        label: 'Price Variant Limit',
                    },

                ]
            }
        },

        methods: {
            /*
             * Load async data
             */
            trade(direction,symbol){
              if(direction=="B"){
                this.$router.push("/orders/"+symbol+"/buy")
              } else
                  this.$router.push("/orders/"+symbol+"/sell")

            },
            loadAsyncData() {
                notification(this,"Fetching data...");


                this.loading=true;
                //todo: start from here by asking goutham about the end points of getting securities
                this.$store.dispatch('getSecurities',this.$store.getters.getUser)
                    .then(data=>{
                        console.clear();
                        console.log(data);
                        this.securityData=data;
                    })
                    .catch(error=>{

                    });


                this.$store.dispatch('getOrders',this.$store.getters.getUser)
                    .then(data=>{
                        this.orderData=data;
                    })
                    .catch(error=>{

                    });

                this.loading=false;
            },
        },
        filters: {
            /**
             * Filter to truncate string, accepts a length parameter
             */
            truncate(value, length) {
                return value.length > length
                    ? value.substr(0, length) + '...'
                    : value
            },
        },

        created() {
            this.loadAsyncData();
            //if not loggedin then go back to login page
            if (!this.$store.getters.isLoggedIn) {
                notification(this,"Please login to continue to dashboard..");
                //and go to dashboard
                this.$router.push("/");
            } else {
                console.log("Logged in");
            }
        }
    }

</script>

<style scoped>
    a:hover{
        text-decoration: none;
    }
</style>