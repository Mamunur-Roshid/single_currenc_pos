<template>
    <v-container fluid class="white shadow1 rounded py-5 pb-8 px-3">
        <v-row no-gutters>
            <v-col cols="12">
                <div style="display: flex;justify-content: space-between;">
                    <v-btn @click.prevent="print" class="mb-2" v-if="customers.length != 0">Print</v-btn>
                    <v-text-field
                        style="max-width: 400px;"
                        dense
                        outlined
                        hide-details
                        placeholder="Search Customer"
                        v-model="filterTxt"
                    ></v-text-field>
                </div>
            </v-col>
            <v-col cols="12">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th style="text-align: center;">Sl</th>
                                <th style="text-align: center;">Customer Id</th>
                                <th style="text-align: center;">Customer Name</th>
                                <th style="text-align: center;">Mobile</th>
                                <th style="text-align: center;">E-mail</th>
                                <th style="text-align: center;">Organization</th>
                                <th style="text-align: center;">Area</th>
                                <th style="text-align: center;">Address</th>
                                <th style="text-align: center;">Opening Balance</th>
                                <th style="text-align: right;">Credit Limit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(customer, ind) in customers" :key="ind">
                                <td style="text-align: center;">{{ ind + 1 }}</td>
                                <td style="text-align: center;">{{ customer.code }}</td>
                                <td style="text-align: center;">{{ customer.name }}</td>
                                <td style="text-align: center;">{{ customer.phone }}</td>
                                <td style="text-align: center;">{{ customer.email }}</td>
                                <td style="text-align: center;">{{ customer.org_name }}</td>
                                <td style="text-align: center;">{{ lodash.get(customer, 'area.name')}}</td>
                                <td style="text-align: center;">{{ customer.address }}</td>
                                <td style="text-align: center;">{{ customer.opening_balance }}</td>
                                <td style="text-align: right;">{{ customer.credit_limit }}</td>
                            </tr>
                            <tr v-if="customers.length == 0">
                                <td colspan="9" class="text-center">Customer information is not available</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
                <!-- <v-data-table
                        class="custom-data-table py-4 px-3"
                        :headers="customerHeaders"
                        :items="$store.getters['customer/customers']"
                        loading-text="Loading... Please wait"
                        @click:row="showDetails"
                    >
                        
                    </v-data-table> -->
            </v-col>
        </v-row>

        <div id="printContent" v-if="!lodash.isEmpty(customers)" style="display: none;">
            <table class="bordered-table">
                <thead>
                    <tr>
                        <th style="text-align: center;">Sl</th>
                        <th style="text-align: center;">Customer Id</th>
                        <th style="text-align: center;">Customer Name</th>
                        <th style="text-align: center;">Mobile</th>
                        <th style="text-align: center;">E-mail</th>
                        <th style="text-align: center;">Organization</th>
                        <th style="text-align: center;">Area</th>
                        <th style="text-align: center;">Address</th>
                        <th style="text-align: center;">Opening Balance</th>
                        <th style="text-align: right;">Credit Limit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(customer, ind) in customers" :key="ind">
                        <td style="text-align: center;">{{ ind + 1 }}</td>
                        <td style="text-align: center;">{{ customer.code }}</td>
                        <td style="text-align: center;">{{ customer.name }}</td>
                        <td style="text-align: center;">{{ customer.phone }}</td>
                        <td style="text-align: center;">{{ customer.email }}</td>
                        <td style="text-align: center;">{{ customer.org_name }}</td>
                        <td style="text-align: center;">{{ lodash.get(customer, 'area.name')}}</td>
                        <td style="text-align: center;">{{ customer.address }}</td>
                        <td style="text-align: center;">{{ customer.opening_balance }}</td>
                        <td style="text-align: right;">{{ customer.credit_limit }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </v-container>
</template>

<script>
import { styles, invoiceHeader } from '../../composable/usePrint';
import useConfig from '../../composable/useConfig';
import _ from 'lodash'

const { hostName } = useConfig()

export default {
    name: 'Customers',

    data() {
        return {
            customerHeaders: [
                { text: 'Customer Id', value: 'code' },
                { text: 'Customer Name', value: 'name' },
                { text: 'Mobile', value: 'phone' },
                { text: 'E-mail', value: 'email' },
                { text: 'Organization', value: 'org_name' },
                { text: 'Area', value: 'area.name' },
                { text: 'Address', value: 'address' },
                { text: 'Credit Limit', value: 'credit_limit' },
            ],
            filterTxt: '',
            customers: []
        }
    },
    watch: {
        filterTxt(text) {
            if (!text) {
                this.customers = this.$store.getters['customer/customers']
            }

            let rtn = _.filter(this.customers, item => {
                return item.name.includes(text);
            });

            this.customers = rtn;
        }
    },
    async created() {
        await this.getCompanyProfile();
        await this.$store.dispatch('customer/getCustomers');
        this.customers = this.$store.getters['customer/customers']
        this.setStyle()
    },

    methods: {
        getCompanyProfile() {
            this.$store.dispatch('companyProfile/getCompanyProfile')
        },

        async print() {
            let printContent = document.querySelector('#printContent').innerHTML;
            let printWindow = window.open('', 'PRINT', `width=${screen.width}, height=${screen.height}, left=0, top=0`);
            let companyProfile = this.$store.getters['companyProfile/company']
            let companyImage = companyProfile != null ? this.$store.getters['companyProfile/company'].image : ''
            let ImagePath = companyImage ? hostName + '/' + companyImage : '';
            printWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Customer List</title>
                    <style>
                    ${styles}
                    </style>
                </head>
                <body>
                    <div>
                        <div class="container">
                            <table style="width:100%;">
                                <thead>
                                    ${invoiceHeader(ImagePath)}
                                    <div class="col-xs-12">
                                        <div style="text-align:center;font-weight:bold;padding-bottom:10px;">
                                            Customer List
                                        </div>
                                    </div>
                                </thead>
                                <tbody>
                                    ${printContent}
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

        setStyle() {
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
                        font-family: Arial,sans-serif;
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

.theme--light.v-data-table>.v-data-table__wrapper>table>thead>tr:last-child>th {
    font-size: 11px;
    // padding: 0px 1px;
    // background: #061e95;
    // color: #fff;
    background: var(--theme_lighter);
    // border: 1px solid #ccc;
    text-align: center;
    // height: 24px !important;
}

.v-data-table--dense>.v-data-table__wrapper>table>tbody>tr>td {
    // height: 20px !important;
    // padding: 0px 5px !important;
    font-size: 12px !important;
    border: 1px solid #ccc !important;
}
</style>