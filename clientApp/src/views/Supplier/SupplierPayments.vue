<template>
    <v-container fluid class=" shadow1 rounded white">
        <v-form class="custom-form" @submit.prevent="getPayments">
            <v-row dense justify="center">
                <v-col cols="4">
                    <v-row no-gutters style="margin-top: 3px;color: #000;align-items: center;">
                        <v-col cols="3">Supplier</v-col>
                        <v-col cols="9">
                            <v-combobox 
                                dense
                                outlined
                                hide-details
                                v-model="customer"
                                @focus="$store.dispatch('supplier/getSuppliers')"
                                :items="$store.getters['supplier/suppliers']"
                                :loading="$store.getters['supplier/loadingSuppliers']"
                                item-text="display_text"
                                item-value="id"
                            >
                            </v-combobox>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="5">
                    <v-row no-gutters>
                        <v-col cols="6">
                            <v-row no-gutters style="margin-top: 3px;color: #000;align-items: center;">
                                <v-col cols="4">Date From</v-col>
                                <v-col cols="8">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                dense
                                                outlined
                                                hide-details
                                                v-model="filter.dateFrom"
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                            <v-icon slot="prepend-inner">mdi-calendar-month</v-icon>
                                            </v-text-field>
                                        </template>
                                        <v-date-picker v-model="filter.dateFrom"></v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <v-row class="pl-3" no-gutters style="margin-top: 3px;color: #000;align-items: center;">
                                <v-col cols="4">Date To</v-col>
                                <v-col cols="8">
                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                dense
                                                outlined
                                                hide-details
                                                v-model="filter.dateTo"
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                            <v-icon slot="prepend-inner">mdi-calendar-month</v-icon>
                                            </v-text-field>
                                        </template>
                                        <v-date-picker v-model="filter.dateTo"></v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="1" class="d-flex align-center">
                    <v-btn type="submit" color="text_bg_fave darken-2" :loading="loading">Search</v-btn>
                </v-col>
            </v-row>
            <v-divider></v-divider>

            <v-row v-if="show">
                <v-btn @click="print">Print</v-btn>
                <v-col cols="12">
                    <v-simple-table class="mt-4">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Tnx. Id</th>
                                    <th>Date</th>
                                    <th>Supplier Id</th>
                                    <th>Supplier Name</th>
                                    <th>Payment By</th>
                                    <th>Note</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(payment, ind) in $store.getters['supplier/payments']" :key="ind">
                                    <td class="text-center">{{ payment.sl }}</td>
                                    <td class="text-center">{{ payment.invoice }}</td>
                                    <td>{{ payment.date }}</td>
                                    <td>{{ payment.supplier.code }}</td>
                                    <td>{{ payment.supplier.name }}</td>
                                    <td>{{ payment.type }}</td>
                                    <td>{{ payment.note }}</td>
                                    <td class="text-right">{{ payment.amount }}</td>
                                </tr>
                                <tr>
                                    <td colspan="7" class="text-right"><strong>Total</strong></td>
                                    <td class="text-right"><strong>{{ total }}</strong></td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
            <div v-else class="no_result">
                <div class="img"></div>
            </div>
        </v-form>

        <div v-if="show" style="display: none;">
            <div id="printContent">
                <table class="bordered-table">
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Tnx. Id</th>
                            <th>Date</th>
                            <th>Supplier Id</th>
                            <th>Supplier Name</th>
                            <th>Payment By</th>
                            <th>Note</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(payment, ind) in $store.getters['supplier/payments']" :key="ind">
                            <td class="text-center">{{ payment.sl }}</td>
                            <td class="text-center">{{ payment.invoice }}</td>
                            <td>{{ payment.date }}</td>
                            <td>{{ payment.supplier.code }}</td>
                            <td>{{ payment.supplier.name }}</td>
                            <td>{{ payment.type }}</td>
                            <td>{{ payment.note }}</td>
                            <td class="text-right">{{ payment.amount }}</td>
                        </tr>
                        <tr>
                            <td colspan="7" class="text-right"><strong>Total</strong></td>
                            <td class="text-right"><strong>{{ total }}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    </v-container>
</template>

<script>
import useConfig from '../../composable/useConfig';
import { invoiceHeader, styles } from '../../composable/usePrint';
const { hostName } = useConfig()
export default {
    name: 'SupplierPayments',

    data: () => ({
        filter: {
            dateFrom: new Date().toISOString().substr(0, 10),
            dateTo: new Date().toISOString().substr(0, 10),
            supplierId: null
        },
        customer: null,
        loading: false,
        show: false,
    }),

    computed: {
        total() {
            return this.$store.getters['supplier/payments'].reduce((p, c) => { return +p + +c.amount}, 0).toFixed(2)
        }
    },
    async created() {
        await this.$store.dispatch('companyProfile/getCompanyProfile')
    },

    watch: {
        customer(customer) {
            if(customer == undefined) return;
            this.filter.supplierId = customer.id;
        }
    },

    methods: {
        async getPayments() {
            if(this.customer == null) {
                this.$store.dispatch('snackbar/error', 'Select a customer');
                return;
            }

            this.loading = true;

            await this.$store.dispatch('supplier/getSupplierPayments', this.filter)

            this.show = true;
            this.loading = false;
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
                                <div class="col-xs-12">
                                    <div>
                                        ${invoiceHeader(ImagePath)}
                                    </div>
                                    <div style="text-align:center;font-weight:bold;padding-bottom:10px;">
                                        Supplier Payments From ${this.filter.dateFrom} To ${this.filter.dateTo}
                                        ${this.customer ? 'By Supplier ' + this.customer.name : ''}
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
    }
}
</script>

<style lang="scss" scoped>
    .v-icon.v-icon {
       font-size: 18px !important;
       top: 3px !important;
    }
   .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
        font-size: 11px;
        padding: 0px 1px;
        // background: #061e95;
        // color: #fff;
        background: var(--theme_lighter);
        // border: 1px solid #ccc;
        text-align: center;
        // height: 24px !important;
   }
   .v-data-table--dense > .v-data-table__wrapper > table > tbody > tr > td {
        // height: 20px !important;
        padding: 0px 5px !important;
        font-size: 12px !important;
        border: 1px solid #ccc !important;
   }
</style>