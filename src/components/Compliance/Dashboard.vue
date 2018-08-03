<template>
    <div>
        <Hero message="Following table contains Flagged Trade, you have to verify the trade..." title="Compliance Dashboard"></Hero>
        <!--flaged ORDERS-->
        <section class="container" style="margin-top: 2em">
            <h1 class="title" style="text-align: left">Flagged Trade History
                <span class="tag is-danger" style="font-size:0.5em">Variance Limit Exceed</span>
            </h1>
            <b-table :data="flaggedOrdersData"  paginated
                     per-page="12" :columns="flaggedOrdersColumns"></b-table>
        </section>

        <!--ALL ORDERS-->
        <section class="container" style="margin-top: 2em">
            <h1 class="title" style="text-align: left">All Trade History
                <span class="tag is-warning" style="font-size:0.5em">Sorted Chronologically</span>

            </h1>
            <b-table :data="ordersData"  paginated
                     per-page="12" :columns="ordersColumns"></b-table>
        </section>
    </div>
</template>

<script>
    import Hero from "../Hero";
    import axios from 'axios';
    import notification from "../../services/notification";
    export default {
        components:{Hero},
        data() {
            return {
                admin:{},
                ordersData: [],
                ordersColumns: [
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
                flaggedOrdersData: [],
                flaggedOrdersColumns: [
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

            }
        },
        methods: {
            /*
             * Load async data
             */
            loadAsyncData() {
                notification(this,"Fetching data...");

                this.loading=true;


                //todo update url for flagged orders
                axios.get("/flagged")
                    .then(({data})=>{
                        console.log(data);
                        this.flaggedOrdersData=data;
                    })
                    .catch(error=>{
                        notification(this,"Could not able to fetch Orders data...")
                        console.log(error);
                    });
                axios.get("/orders")
                    .then(({data})=>{
                        console.log(data);
                        this.ordersData=data;
                    })
                    .catch(error=>{
                        notification(this,"Could not able to fetch Orders data...")
                        console.log(error);
                    });



            },

            /*
             * Type style in relation to the value
             */
            type(value) {
                const number = parseFloat(value)
                if (number < 6) {
                    return 'is-danger'
                } else if (number >= 6 && number < 8) {
                    return 'is-warning'
                } else if (number >= 8) {
                    return 'is-success'
                }
            }
        },
        filters: {
            /**
             * Filter to truncate string, accepts a length parameter
             */
            truncate(value, length) {
                return value.length > length
                    ? value.substr(0, length) + '...'
                    : value
            }
        },
        created() {
            this.loadAsyncData();
            //if not loggedin then go back to login page
            if (!this.$store.getters.isAdminLoggedIn) {
                //and go to dashboard
                this.$router.push("/compliance");
            } else {
                console.log("Admin Logged in");
            }
        }
    }

</script>

<style scoped>

</style>