<template>
    <v-container fluid class="white rounded shadow1">
        <v-row no-gutters>
            <v-col cols="12">
                <v-form class="custom-form" @submit.prevent="getSaleRecord">
                    <v-row dense class="flex_align_center flex_wrap">
                        <v-col cols="auto" md="2">
                            <v-row no-gutters style="margin-top: 3px;color: #000;" class="flex_align_center">
                                <v-col cols="3">Type</v-col>
                                <v-col cols="9">
                                    <v-combobox 
                                        v-model="searchType"
                                        dense
                                        outlined
                                        hide-details
                                        :items="['All', 'By Customer', 'By Employee']"
                                    >
                                    </v-combobox>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="auto" md="3"  v-if="searchType == 'By Customer'">
                            <v-row no-gutters style="margin-top: 3px;color: #000; align-items: center;">
                                <v-col cols="4">Customer</v-col>
                                <v-col cols="8">
                                    <v-combobox 
                                        dense
                                        outlined
                                        hide-details
                                        v-model="customer"
                                        @focus="$store.dispatch('customer/getCustomers')"
                                        :items="$store.getters['customer/customers']"
                                        :loading="$store.getters['customer/loading']"
                                        item-text="display_text"
                                        item-value="id"
                                    >
                                    </v-combobox>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="auto" md="3"  v-if="searchType == 'By Employee'">
                            <v-row no-gutters style="margin-top: 3px;color: #000;" class="flex_align_center">
                                <v-col cols="4">Employee</v-col>
                                <v-col cols="8">
                                    <v-combobox 
                                        dense
                                        outlined
                                        hide-details
                                        v-model="employee"
                                        @focus="$store.dispatch('employee/getEmployees')"
                                        :items="$store.getters['employee/employees']"
                                        item-text="display_text"
                                        item-value="id"
                                    >
                                    </v-combobox>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="auto" md="5">
                            <v-row no-gutters>
                                <v-col cols="auto" md="6">
                                    <v-row no-gutters style="margin-top: 3px;color: #000;">
                                        <v-col cols="4">Date From</v-col>
                                        <v-col cols="8">
                                            <v-menu>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model="sale.dateFrom"
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    >
                                                    <v-icon slot="prepend-inner">mdi-calendar-month</v-icon>
                                                    </v-text-field>
                                                </template>
                                                <v-date-picker v-model="sale.dateFrom"></v-date-picker>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="auto" md="6">
                                    <v-row class="pl-3" no-gutters style="margin-top: 3px;color: #000;">
                                        <v-col cols="4">Date To</v-col>
                                        <v-col cols="8">
                                            <v-menu>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model="sale.dateTo"
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    >
                                                    <v-icon slot="prepend-inner">mdi-calendar-month</v-icon>
                                                    </v-text-field>
                                                </template>
                                                <v-date-picker v-model="sale.dateTo"></v-date-picker>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="1">
                            <v-btn type="submit" class="text_bg_fave" :loading="loading">Search</v-btn>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                </v-form>
            </v-col>
        </v-row>
        <v-row dense v-if="show">
            <v-col cols="12">
                <v-btn height="26px" v-on:click.prevent="print">Print</v-btn>
            </v-col>
            <v-col cols="12">
                <v-data-table
                    class="custom-data-table elevation-1"
                    dense
                    show-expand
                    :headers="saleHeaders"
                    :loading="$store.getters['sale/loadingSale']"
                    :items="$store.getters['sale/sales']"
                    :search="searchSale"
                    :itemsPerPage="15"
                >
                    <template v-slot:top>
                        <v-toolbar dense color="white" :elevation="0" class="mt-4">
                            <v-toolbar-title class="subtitle-2">Sale Report</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-form class="custom-form">
                                <v-text-field
                                    outlined
                                    dense
                                    hide-details
                                    placeholder="Search sale"
                                    append-icon="mdi-magnify"
                                    style="width:300px;"
                                    v-model="searchSale"
                                >
                                </v-text-field>
                            </v-form>
                        </v-toolbar>
                    </template>
                    <v-divider></v-divider>
                    <template v-slot:[`item.action`]="{ item }">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon
                                    small
                                    @click="$router.push(`/sale-invoice/${item.id}`)"
                                    color="success"
                                    v-on="on"
                                    target="_blank"
                                >
                                    mdi-file
                                </v-icon>
                            </template>
                            <span>Invoice</span>
                        </v-tooltip>
                        <v-tooltip bottom v-if="userType == 'super_admin' || userType == 'admin'">
                            <template v-slot:activator="{ on }">
                                <v-icon
                                    small
                                    @click="$router.push(`/sale/${item.id}`)"
                                    color="primary"
                                    v-on="on"
                                    >mdi-circle-edit-outline</v-icon
                                >
                            </template>
                            <span>Edit</span>
                        </v-tooltip>
                        <v-tooltip bottom v-if="userType == 'super_admin' || userType == 'admin'">
                            <template v-slot:activator="{ on }">
                                <v-icon
                                    small
                                    @click="saleId = item.id;$refs.confirmDialog.dialog = true"
                                    color="error"
                                    v-on="on"
                                    >mdi-delete-circle-outline</v-icon
                                >
                            </template>
                            <span>Delete</span>
                        </v-tooltip>
                    </template>

                    <template slot="body.append">
                        <tr class="pink--text">
                            <th class="title" colspan="4">Totals of all({{ lodash.size($store.getters['sale/sales']) }}) record</th>
                            <th class="title">{{ Number(sumField('sub_total', $store.getters['sale/sales'])).toFixed(2) }}</th>
                            <th class="title">{{ Number(sumField('total', $store.getters['sale/sales'])).toFixed(2) }}</th>
                            <th class="title">{{ Number(getTotalPaid($store.getters['sale/sales'], lodash)).toFixed(2) }}</th>
                            <!-- <th class="title">{{ Number(sumField('discount', $store.getters['sale/sales'])).toFixed(2) }}</th> -->
                            <th class="title">{{ Number(sumField('due', $store.getters['sale/sales'])).toFixed(2) }}</th>
                        </tr>
                    </template>

                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <table class="details__table">
                                <tr>
                                    <th>SL No.</th>
                                    <th>Product Id</th>
                                    <th>Product Name</th>
                                    <th>Purchase Rate</th>
                                    <th>Sale Rate</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                                <tr v-for="(detail, i) in item.sale_details" :key="i">
                                    <td>{{ i + 1 }}</td>
                                    <td>{{ lodash.get(detail, 'product.code') }}</td>
                                    <td>{{ lodash.get(detail, 'product.name') }}</td>
                                    <td>{{ detail.purchase_rate }}</td>
                                    <td>{{ detail.sale_rate }}</td>
                                    <td>{{ detail.quantity }}</td>
                                    <td>{{ detail.total }}</td>
                                </tr>
                            </table>
                        </td>
                    </template>
                </v-data-table>

                <confirm-dialog ref="confirmDialog" @confirm="deleteSale"></confirm-dialog>
            </v-col>
        </v-row>
        <div v-else class="no_result">
            <div class="img"></div>
        </div>
        
        <div id="printTable" style="display: none;">
            <table class="bordered-table">
                <tr>
                    <th>SL</th>
                    <th>Date</th>
                    <th>Invoice</th>
                    <th>Customer Name</th>
                    <th>Sub Total</th>
                    <th>Discount</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Due</th>
                </tr>
                <tr v-for="(item, index) in $store.getters['sale/sales']" :key="index">
                    <td>{{ item.sl }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.invoice }}</td>
                    <td>{{ lodash.get(item, 'customer.name') }}</td>
                    <td style="text-align: right;">{{ item.sub_total }}</td>
                    <td style="text-align: right;">{{ item.discount }}</td>
                    <td style="text-align: right;">{{ item.total }}</td>
                    <td style="text-align: right;">{{ item.paid }}</td>
                    <td style="text-align: right;">{{ item.due }}</td>
                </tr>
                <tr class="pink--text">
                    <th class="title" style="text-align: right;" colspan="4">Totals</th>
                    <th class="title" style="text-align: right;">{{ Number(sumField('sub_total', $store.getters['sale/sales'])).toFixed(2) }}</th>
                    <th class="title" style="text-align: right;">{{ Number(sumField('discount', $store.getters['sale/sales'])).toFixed(2) }}</th>
                    <th class="title" style="text-align: right;">{{ Number(sumField('total', $store.getters['sale/sales'])).toFixed(2) }}</th>
                    <th class="title" style="text-align: right;">{{ Number(getTotalPaid($store.getters['sale/sales'], lodash)).toFixed(2) }}</th>
                    <th class="title" style="text-align: right;">{{ Number(sumField('due', $store.getters['sale/sales'])).toFixed(2) }}</th>
                </tr>
            </table>
        </div>
    </v-container>
</template>

<script>
import confirmDialog from "../../components/confirm-dialog.component";
import useConfig from '../../composable/useConfig'
import { styles, invoiceHeader } from '../../composable/usePrint'
const { hostName } = useConfig()
export default {
    name: 'SaleRecord',

    components: {
		"confirm-dialog": confirmDialog,
    },

    data: ()=> ({
        searchType: null,
        sale: {
            customerId: null,
            employeeId: null,
            dateFrom: new Date().toISOString().substr(0, 10),
            dateTo: new Date().toISOString().substr(0, 10),
        },
        saleRecord: [],
        customer: null,
        employee: null,
        searchLoading: false,
        show: false,
        saleId: null,
        loading: false,
        
        saleHeaders: [
            { text: 'Sl', value: 'sl' },
            { text: 'Date', value: 'date' },
            { text: 'Invoice', value: 'invoice' },
            { text: 'Customer Name', value: 'customer.name' },
            { text: 'Sub Total', value: 'sub_total' },
            // { text: 'Vat', value: 'vat' },
            // { text: 'Discount', value: 'discount' },
            // { text: 'Transport', value: 'transport' },
            { text: 'Total', value: 'total' },
            { text: 'Paid', value: 'paid' },
            { text: 'Due', value: 'due' },
            { text: 'Action', value: 'action' },
            { text: 'Details', value: 'data-table-expand' },
        ],
        searchSale: '',
        userType: ''
    }),

    watch: {
        customer(customer) {
            if (customer == null) return
            this.sale.customerId = customer.id;
        },

        employee(employee) {
            if(employee == null) return
            this.sale.employeeId = employee.id;
        },  
        
    },

    computed: {
       
    },

    created() {
        // this.setStyle();
        let userData = JSON.parse(localStorage.getItem('userData'))
		this.userType = userData.userType;
        this.getSaleRecord();
    },

    methods: {
        getTotalPaid(sales, lodash){
            let total = 0;
            lodash.each(sales, sale => {
                total += +sale.paid
            })
            return total;
        },
        sumField(item_name, items=[]) {
            return items.reduce((a, b) => {
                let amount = 0;
                if (item_name == 'paid') {
                    amount = a + +b.payment?.amount || 0;
                } else {
                    amount = a + (Number(b[item_name]) || 0);
                }
                return amount;
            }, 0)
        },

        async getSaleRecord() {

            this.loading = true;

            await this.$store.dispatch('sale/getSales', this.sale);

            this.loading = false;
            
            this.show = true;
        },

        deleteSale() {
            this.$store.dispatch('sale/deleteSale', this.saleId);
            this.$refs.confirmDialog.dialog = false;
        },

        printInvoice(id) {
            this.$router.push(`/sale-invoice/${id}`);
        },

        async print(){
            let invoiceContent = document.querySelector('#printTable').innerHTML;
            let printWindow = window.open('', 'PRINT', `width=${screen.width}, height=${screen.height}, left=0, top=0`);
            let companyProfile = this.$store.getters['companyProfile/company']
            let companyImage = companyProfile != null ? this.$store.getters['companyProfile/company'].image : ''
            let ImagePath = companyImage ? hostName + '/' + companyImage : '';
            let byTxt = '';
            if (this.customer) {
                byTxt = `By Customer(${this.customer.name})`
            }
            if (this.employee) {
                byTxt = `By Employee(${this.employee.name})`
            }
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
                            <table style="width:100%;">
                                <thead>
                                    
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            ${invoiceHeader(ImagePath)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="custom-row">
                                                <div class="invoice-title">
                                                    Sale Record From 
                                                    <span style="color:red;">${this.sale.dateFrom}</span>
                                                    To
                                                    <span style="color:red;">${this.sale.dateTo}</span>
                                                    ${byTxt}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="custom-row">
                                                <div class="col-xs-12">
                                                    ${invoiceContent}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
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
        background: #607D8B;
        color: #fff;
        border: 1px solid #ccc;
        text-align: center;
        height: 24px !important;
   }
   .v-data-table--dense > .v-data-table__wrapper > table > tbody > tr > td {
        height: 20px !important;
        padding: 0px 5px !important;
        font-size: 12px !important;
        border: 1PX solid #ccc !important;
   }
</style>