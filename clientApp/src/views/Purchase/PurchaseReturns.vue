<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col cols="12">
                <v-form class="custom-form white rounded shadow1 py-3 px-1" @submit.prevent="getPurchaseReturns">
                    <v-row dense justify="center" align="center">
                        <v-col cols="2">
                            <v-row no-gutters style="margin-top: 3px;color: #000;" align="center">
                                <v-col cols="3">Type</v-col>
                                <v-col cols="9">
                                    <v-combobox 
                                        v-model="searchType"
                                        dense
                                        outlined
                                        hide-details
                                        :items="['All', 'By Supplier']"
                                    >
                                    </v-combobox>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="3"  v-if="searchType == 'By Supplier'">
                            <v-row no-gutters style="margin-top: 3px;color: #000;" align="center">
                                <v-col cols="4">Supplier</v-col>
                                <v-col cols="8">
                                    <v-combobox 
                                        dense
                                        outlined
                                        hide-details
                                        v-model="supplier"
                                        @focus="$store.dispatch('supplier/getSuppliers')"
                                        :items="$store.getters['supplier/suppliers']"
                                        :loading="$store.getters['supplier/loading']"
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
                                    <v-row no-gutters style="margin-top: 3px;color: #000;" align="center">
                                        <v-col cols="4">Date From</v-col>
                                        <v-col cols="8">
                                            <v-menu>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model="purchase.dateFrom"
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    >
                                                    <v-icon slot="prepend-inner">mdi-calendar-month</v-icon>
                                                    </v-text-field>
                                                </template>
                                                <v-date-picker v-model="purchase.dateFrom"></v-date-picker>
                                            </v-menu>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="6">
                                    <v-row class="pl-3" no-gutters style="margin-top: 3px;color: #000;" align="center">
                                        <v-col cols="4">Date To</v-col>
                                        <v-col cols="8">
                                            <v-menu>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model="purchase.dateTo"
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    >
                                                    <v-icon slot="prepend-inner">mdi-calendar-month</v-icon>
                                                    </v-text-field>
                                                </template>
                                                <v-date-picker v-model="purchase.dateTo"></v-date-picker>
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
                </v-form>
                <v-divider></v-divider>
            </v-col>
        </v-row>
        <v-row dense v-if="show">
            <v-col cols="12" style="display:none">
                <v-btn height="26px" v-on:click.prevent="print">Print</v-btn>
            </v-col>
            <v-col cols="12" id="invoiceContent">
                <v-data-table
                    class="custom-data-table elevation-1"
                    dense
                    show-expand
                    :headers="purchaseHeaders"
                    :loading="$store.getters['purchase/loadingPurchase']"
                    :items="$store.getters['purchase/purchaseReturns']"
                    :search="searchPurchase"
                >
                    <template v-slot:top>
                        <v-toolbar color="white" :elevation="1">
                            <v-toolbar-title class="subtitle-2">
                                Purchase Return List
                                
                            </v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-form class="custom-form">
                                <v-text-field
                                    outlined
                                    dense
                                    hide-details
                                    placeholder="Search purchase"
                                    append-icon="mdi-magnify"
                                    style="width:300px;"
                                    v-model="searchPurchase"
                                >
                                </v-text-field>
                            </v-form>
                            <v-btn @click="print">Print</v-btn>
                        </v-toolbar>
                    </template>

                    <template slot="body.append">
                        <tr class="pink--text">
                            <th class="title" colspan="3" style="text-align: right;">
                                Total of all ({{ lodash.size($store.getters['purchase/purchaseReturns']) }}) record
                            </th>
                            <th class="title">
                                {{ Number(lodash.sumBy($store.getters['purchase/purchaseReturns'], item => +item.total)).toFixed(2) }}
                            </th>
                            <th class="title"></th>
                            <th class="title"></th>
                        </tr>
                    </template>
                    
                    <template v-slot:[`item.action`]="{ item }">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-icon
                                    small
                                    @click="$router.push(`/purchase-return-invoice/${item.id}`)"
                                    color="success"
                                    v-on="on"
                                    target="_blank"
                                >
                                    mdi-file
                                </v-icon>
                            </template>
                            <span>Invoice</span>
                        </v-tooltip>
                        <!-- <v-tooltip bottom v-if="userType == 'super_admin' || userType == 'admin'">
                            <template v-slot:activator="{ on }">
                                <v-icon
                                    small
                                    @click="$router.push(`/purchase-return/${item.id}`)"
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
                                    @click="purchaseId = item.id;$refs.confirmDialog.dialog = true"
                                    color="error"
                                    v-on="on"
                                    >mdi-delete-circle-outline</v-icon
                                >
                            </template>
                            <span>Delete</span>
                        </v-tooltip> -->
                    </template>

                    <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                            <table class="details__table">
                                <tr>
                                    <th>SL No.</th>
                                    <th>Product Id</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                </tr>
                                <tr v-for="(detail, i) in item.return_details" :key="i">
                                    <td width="5%">{{ i + 1 }}</td>
                                    <td>{{ detail.product.code }}</td>
                                    <td>{{ detail.product.name }}</td>
                                    <td>{{ detail.quantity }}</td>
                                    <td>{{ detail.return_amount }}</td>
                                </tr>
                            </table>
                        </td>
                    </template>
                </v-data-table>

                <confirm-dialog ref="confirmDialog" @confirm="deletePurchase"></confirm-dialog>
            </v-col>
        </v-row>
        <v-col cols="12" v-else class="white shadow1">
            <div class="no_result">
                <div class="img"></div>
            </div>
        </v-col>

        
        <div id="printTable" style="display: none;">
            <table class="bordered-table">
                <tr>
                    <th style="max-width: 70px;">SL</th>
                    <th style="text-align: left;">Date</th>
                    <th style="text-align: left;">Invoice</th>
                    <th style="text-align: right;">Total</th>
                    <th style="text-align: center;">Note</th>
                </tr>
                <tr v-for="(item, index) in $store.getters['purchase/purchaseReturns']" :key="index">
                    <td style="text-align: center;">{{ item.sl }}</td>
                    <td style="text-align: center;">{{ item.date }}</td>
                    <td style="text-align: center;">{{ item.invoice }}</td>
                    <td style="text-align: center;">{{ item.note }}</td>
                    <td style="text-align: right;">{{ Number(item.total).toFixed(2) }}</td>
                </tr>
                <tr style="background: #eee;color: coral;">
                    <td colspan="4" style="text-align: right;">Total</td>
                    <td style="text-align: right;">
                        {{ Number(lodash.sumBy($store.getters['purchase/purchaseReturns'], item => +item.total)).toFixed(2) }}
                    </td>
                </tr>
            </table>
        </div>

    </v-container>
</template>

<script>
import confirmDialog from "../../components/confirm-dialog.component";
import { styles, invoiceHeader } from "../../composable/usePrint";
export default {
    name: 'PurchaseReturns',

    components: {
		"confirm-dialog": confirmDialog,
    },

    data: ()=> ({
        searchType: null,
        purchase: {
            supplierId: null,
            dateFrom: new Date().toISOString().substr(0, 10),
            dateTo: new Date().toISOString().substr(0, 10),
        },
        purchaseRecord: [],
        supplier: null,
        employee: null,
        searchLoading: false,
        show: false,
        purchaseId: null,
        loading: false,
        
        purchaseHeaders: [
            { text: 'Sl', value: 'sl' },
            { text: 'Date', value: 'date' },
            { text: 'Invoice', value: 'invoice' },
            { text: 'Total', value: 'total' },
            { text: 'Note', value: 'note' },
            { text: 'Action', value: 'action' },
            { text: 'Details', value: 'data-table-expand' },
        ],
        searchPurchase: '',
        userType: ''
    }),

    watch: {
        supplier(supplier) {
            if (supplier == null) return
            this.purchase.supplierId = supplier.id;
        },
    },

    async created() {
        await this.$store.dispatch('companyProfile/getCompanyProfile')
        let userData = JSON.parse(localStorage.getItem('userData'))
		this.userType = userData.userType;
    },

    methods: {
        async getPurchaseReturns() {

            this.loading = true;

            await this.$store.dispatch('purchase/getPurchaseReturns', this.purchase);

            this.loading = false;
            
            this.show = true;
        },

        deletePurchase() {
            this.$store.dispatch('purchase/deletePurchase', this.purchaseId);
            this.$refs.confirmDialog.dialog = false;
        },

        async print(){
            let invoiceContent = document.querySelector('#printTable').innerHTML;
            let printWindow = window.open('', 'PRINT', `width=${screen.width}, height=${screen.height}, left=0, top=0`);
            let companyProfile = this.$store.getters['companyProfile/company']
            let companyImage = companyProfile != null ? this.$store.getters['companyProfile/company'].image : ''
            let ImagePath = companyImage ? this.apiBasePath + '/' + companyImage : '';
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
                                    <tr>
                                        <td>
                                            <div class="custom-row">
                                                ${invoiceHeader(ImagePath)}
                                            </div>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="custom-row">
                                                <div class="invoice-title">
                                                    Purchase Return Record From <span style="color:red;">${this.purchase.dateFrom}</span> To <span style="color:red;">${this.purchase.dateTo}</span>
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
        // height: 24px !important;
   }
   .v-data-table--dense > .v-data-table__wrapper > table > tbody > tr > td {
        // height: 20px !important;
        padding: 0px 5px !important;
        font-size: 12px !important;
        border: 1PX solid #ccc !important;
   }
</style>