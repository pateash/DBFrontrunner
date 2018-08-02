<template>
    <div>
        <Hero message="Following table contains Flagged Trade, you have to verify the trade..." title="Compliance Dashboard"></Hero>
        <!--ORDERS-->
        <section class="container" style="margin-top: 2em">
            <h1 class="title" style="text-align: left">Trade History</h1>
            <b-table :data="orderData" :columns="orderColumns"></b-table>
        </section>
    </div>
</template>

<script>
    import Hero from "../Hero";
    import axios from 'axios';
    export default {
        components:{Hero},
        data() {
            return {
                admin:{},
                data: [],
                columns: [
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
               //todo complete this dashboard after asking goutham about the endpoint
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