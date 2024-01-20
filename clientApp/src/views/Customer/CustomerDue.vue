<template>
    <v-container fluid class="shadow1_important rounded white">
        <v-form class="custom-form" @submit.prevent="getcustomerDue">
            <v-row justify="center" align="center">
                <v-col cols="4">
                    <v-row no-gutters style="margin-top: 3px;color: #000;align-items: center;">
                        <v-col cols="3">Customer</v-col>
                        <v-col cols="9">
                            <v-combobox 
                                dense
                                outlined
                                hide-details
                                v-model="customer"
                                @focus="$store.dispatch('customer/getCustomers')"
                                :items="customers"
                                :loading="$store.getters['customer/loadingCustomers']"
                                item-text="display_text"
                                item-value="id"
                            >
                            </v-combobox>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="1">
                    <v-btn type="submit" class="text_bg_fave" :loading="loading">Search</v-btn>
                </v-col>
            </v-row>
            <v-divider></v-divider>
        </v-form>

        <v-row v-if="$store.getters['customer/customerDue'].length != 0">
            <v-col cols="12">
                <v-btn @click.prevent="print" >Print</v-btn>
            </v-col>

            <v-col cols="12" id="invoiceContent">
                <v-simple-table class="custom-table">
                    <v-data-table
                        class="custom-data-table white shadow1 rounded py-4 px-3"
                        :headers="customerHeaders"
                        :items="$store.getters['customer/customerDue']"
                        :loading="$store.getters['product/loadingProducts']"
                        loading-text="Loading... Please wait"
                    >
                        
                    </v-data-table>
                    <!-- <template v-slot:default>
                        <thead>
                            <tr>
                                <th>Sl</th>
                                <th>Customer Id</th>
                                <th>Customer Name</th>
                                <th>Phone</th>
                                <th>Org. Name</th>
                                <th>Org. Phone</th>
                                <th>Address</th>
                                <th>Due</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(customer , sl) in $store.getters['customer/customerDue']" :key="sl">
                                <td class="text-center">{{ sl + 1 }}</td>
                                <td class="text-center">{{ customer.code }}</td>
                                <td class="text-center">{{ customer.name }}</td>
                                <td class="text-center">{{ customer.phone }}</td>
                                <td class="text-center">{{ customer.org_name }}</td>
                                <td class="text-center">{{ customer.org_phone }}</td>
                                <td class="text-center">{{ customer.address }}</td>
                                <td class="text-right">{{ customer.due }}</td>
                            </tr>
                            <tr>
                                <td class="text-right" colspan="7"><strong>Total Due</strong></td>
                                <td class="text-right"><strong>{{ $store.getters['customer/customerDue'].reduce((p, c) => {return +p + +c.due}, 0).toFixed(2) }}</strong></td>
                            </tr>
                        </tbody>
                    </template> -->
                </v-simple-table>
            </v-col>
        </v-row>
        <div v-else class="no_result">
            <div class="img"></div>
        </div>

        <div id="printContent" style="display: none;">
            <table class="bordered-table">
                <thead>
                    <tr>
                        <th style="text-align: center;">Sl</th>
                        <th style="text-align: center;">Customer Id</th>
                        <th style="text-align: center;">Customer Name</th>
                        <th style="text-align: center;">Phone</th>
                        <th style="text-align: center;">Org. Name</th>
                        <th style="text-align: center;">Org. Phone</th>
                        <th style="text-align: center;">Address</th>
                        <th style="text-align: right;">Due</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(customer , sl) in $store.getters['customer/customerDue']" :key="sl">
                        <td style="text-align: center;">{{ sl + 1 }}</td>
                        <td style="text-align: center;">{{ customer.code }}</td>
                        <td style="text-align: center;">{{ customer.name }}</td>
                        <td style="text-align: center;">{{ customer.phone }}</td>
                        <td style="text-align: center;">{{ customer.org_name }}</td>
                        <td style="text-align: center;">{{ customer.org_phone }}</td>
                        <td style="text-align: center;">{{ customer.address }}</td>
                        <td style="text-align: right;">{{ customer.due }}</td>
                    </tr>
                    <tr>
                        <td class="text-right" colspan="7"><strong>Total Due</strong></td>
                        <td class="text-right"><strong>{{ Number($store.getters['customer/customerDue'].reduce((p, c) => {return +p + +c.due}, 0)).toFixed(2) }}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>

    </v-container>
</template>

<script>
import { invoiceHeader, styles } from '../../composable/usePrint';
import useConfig from '../../composable/useConfig';
const { hostName } = useConfig()
export default {
    name: 'customerDue',

    data: () => ({
        customerHeaders: [
            { text: 'Id', value: 'code' },
            { text: 'Name', value: 'name' },
            { text: 'Phone', value: 'phone' },
            { text: 'Org. Name', value: 'org_name' },
            { text: 'Org. Phone', value: 'org_phone' },
            { text: 'Address', value: 'address' },
            { text: 'Due', value: 'due' },
        ],
        customer: 'All',
        customerId: null,
        loading: false
    }),

    computed: {
        customers() {
            let customer = this.$store.getters['customer/customers'];
            customer.unshift({
                id: null,
                display_text: "All",
            })
            return customer;
        }, 

    },

    watch: {
        customer(customer) {
            if(customer == undefined) return
            this.customerId = customer.id
        }
    },

    async created() {
        this.setStyle();
        await this.$store.dispatch('companyProfile/getCompanyProfile')
        await this.getcustomerDue();
    },
    async mounted(){
    },

    methods: {
        async getcustomerDue() {
            this.loading = true
            await this.$store.dispatch('customer/getCustomerDue', {customerId: this.customerId})
            this.loading = false
        },

        async print(){
            let invoiceContent = document.querySelector('#printContent').innerHTML;
            let printWindow = window.open('', 'PRINT', `width=${screen.width}, height=${screen.height}, left=0, top=0`);
            let companyProfile = this.$store.getters['companyProfile/company']
            let companyImage = companyProfile != null ? this.$store.getters['companyProfile/company'].image : ''
            let ImagePath = companyImage ? hostName + '/' + companyImage : '';
            let companyName = '';
            let address = '';
            let contactUs = '';
            let email = '';
            printWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Investigation Payment Slip</title>
                    <style>
                        ${styles}
                    </style>
                </head>
                <body>
                    <div>
                        <div class="container">
                            <div class="custom-row">
                                <div>
                                    ${invoiceHeader(ImagePath)}
                                </div>
                                <div class="col-xs-12">
                                    <div style="text-align:center;font-weight:bold;padding-bottom:10px;">
                                        Customer Due List
                                    </div>
                                </div>
                            </div>
                            <table id="table" style="width:100%;">
                                <tbody>
                                    ${invoiceContent}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>
                                            <div style="width:100%;height:50px;">&nbsp;</div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>    
                    
                </body>
                </html>
            `);

            // let invoiceStyle = printWindow.document.createElement('style');
            // invoiceStyle.innerHTML = this.style.innerHTML;
            // printWindow.document.head.appendChild(invoiceStyle);
            printWindow.moveTo(0, 0);
            
            printWindow.focus();
            await new Promise(resolve => setTimeout(resolve, 1000));
            printWindow.print();
            printWindow.close();
        },

        setStyle(){
            this.style = document.createElement('style');
            this.style.innerHTML = `
                
                @media print {
                    .hide {
                        display: none
                    }
                    table {
                        caption-side: bottom;
                        border-collapse: collapse;
                        border-spacing: 10px;
                    }
                    td, th {
                        border: 1px solid #ddd;
                    }
                    td, th {
                        padding: 4px;
                    }
                    .v-data-footer {
                        display: none;
                    }
                }
                .cls {
                    clear: both;
                }
            `;
            document.head.appendChild(this.style);
        },
    }
}
</script>

<style lang="scss" scoped>
    .v-icon.v-icon {
       font-size: 18px !important;
       top: -3px !important;
   }
   .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
        font-size: 11px;
        padding: 3px 1px;
        // background: #061e95;
        // color: #fff;
        // border: 1px solid #ccc;
        background: var(--theme_lighter);
        text-align: center;
        // height: 24px !important;
   }
   .v-data-table--dense > .v-data-table__wrapper > table > tbody > tr > td {
        // height: 20px !important;
        padding: 1px 5px !important;
        font-size: 12px !important;
        border: 1PX solid #ccc !important;
   }

</style>