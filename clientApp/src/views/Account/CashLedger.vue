<template>
    <v-container fluid class="white shadow1 rounded">
         <v-row no-gutters>
            <v-col cols="12">
                <v-form class="custom-form" @submit.prevent="getCashLedger">
                    <v-row dense>
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
                            <v-btn type="submit" dark color="text_bg_fave" :loading="loading">Search</v-btn>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                </v-form>
            </v-col>
        </v-row>
        <v-row class="py-2">
            <v-col cols="12">
                <v-btn @click.prevent="print">Print</v-btn>
            </v-col>
            <v-col cols="12" id="">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>Serial</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th style="text-align: right;">Cash In</th>
                                <th style="text-align: right;">Cash Out</th>
                                <th style="text-align: right;">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td class="text-left"><strong>Opening Balance</strong></td>
                                <td colspan="2"></td>
                                <td style="text-align: right;"><strong>{{ Number($store.getters['cashTransaction/openingBalance']).toFixed(2) }}</strong></td>
                            </tr>
                            <tr v-for="(ledger, ind) in $store.getters['cashTransaction/ledgers']" :key="ind">
                                <td style="text-align: center;">{{ ind + 1}}</td>
                                <td style="text-align: center;">{{ ledger.date}}</td>
                                <td style="text-align: center;">{{ ledger.description}}</td>
                                <td style="text-align: right;">{{ Number(ledger.cash_in).toFixed(2) }}</td>
                                <td style="text-align: right;">{{ Number(ledger.cash_out).toFixed(2) }}</td>
                                <td style="text-align: right;">{{ Number(ledger.balance).toFixed(2) }}</td>
                            </tr>
                            <tr>
                                <td colspan="3">Total</td>
                                <td style="text-align: right;">{{ Number(lodash.sumBy($store.getters['cashTransaction/ledgers'], item => +item.cash_in)).toFixed(2) }}</td>
                                <td style="text-align: right;">{{ Number(lodash.sumBy($store.getters['cashTransaction/ledgers'], item => +item.cash_out)).toFixed(2) }}</td>
                                <td style="text-align: right;">
                                    {{ 
                                       Number(
                                            +lodash.get(lodash.last($store.getters['cashTransaction/ledgers']), 'balance') || Number($store.getters['cashTransaction/openingBalance']).toFixed(2)
                                        ).toFixed(2)
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>

        <div id="invoiceContent" style="display: none;">
            <table class="bordered-table">
                <thead>
                    <tr>
                        <th style="text-align: center;">Serial</th>
                        <th style="text-align: center;white-space: nowrap;">Date</th>
                        <th style="text-align: center;">Description</th>
                        <th style="text-align: right;">Cash In</th>
                        <th style="text-align: right;">Cash Out</th>
                        <th style="text-align: right;">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td style="text-align: center;"><strong>Opening Balance</strong></td>
                        <td style="text-align: right;" colspan="2"></td>
                        <td style="text-align: right;"><strong>{{ Number($store.getters['cashTransaction/openingBalance']).toFixed(2) }}</strong></td>
                    </tr>
                    <tr v-for="(ledger, ind) in $store.getters['cashTransaction/ledgers']" :key="ind">
                        <td style="text-align: center;">{{ ind + 1}}</td>
                        <td style="text-align: center;white-space: nowrap;">{{ ledger.date }}</td>
                        <td style="text-align: center;" class="text-left">{{ ledger.description}}</td>
                        <td style="text-align: right;">{{ Number(ledger.cash_in).toFixed(2) }}</td>
                        <td style="text-align: right;">{{ Number(ledger.cash_out).toFixed(2) }}</td>
                        <td style="text-align: right;">{{ Number(ledger.balance).toFixed(2) }}</td>
                    </tr>
                    <tr>
                        <td style="text-align: right;" colspan="3">Total</td>
                        <td style="text-align: right;">{{ Number(lodash.sumBy($store.getters['cashTransaction/ledgers'], item => +item.cash_in)).toFixed(2) }}</td>
                        <td style="text-align: right;">{{ Number(lodash.sumBy($store.getters['cashTransaction/ledgers'], item => +item.cash_out)).toFixed(2) }}</td>
                        <td style="text-align: right;">
                            {{ 
                                Number(
                                    +lodash.get(lodash.last($store.getters['cashTransaction/ledgers']), 'balance') || Number($store.getters['cashTransaction/openingBalance']).toFixed(2)
                                ).toFixed(2) 
                            }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </v-container>
</template>

<script>
import { styles, invoiceHeader } from '../../composable/usePrint';
export default {
    name: 'CashLedger',

    data: () => ({
        filter: {
            dateFrom: new Date().toISOString().substr(0, 10),
            dateTo: new Date().toISOString().substr(0, 10),
        },
        loading: false
    }),
    async created(){
        await this.$store.dispatch('companyProfile/getCompanyProfile')
    },
    methods: {
        async getCashLedger() {
            this.loading = true;
            await this.$store.dispatch('cashTransaction/getCashLedgers', this.filter)
            this.loading = false;
        },
        async print(){
            let invoiceContent = document.querySelector('#invoiceContent').innerHTML;
            let printWindow = window.open('', 'PRINT', `width=${screen.width}, height=${screen.height}, left=0, top=0`);
            let image = await this.$store.getters['companyProfile/company'].image;
            let ImagePath = `${this.$store.state.hostName}/${image}`;
            let companyName = this.$store.getters['companyProfile/company'].company_name;
            let address = this.$store.getters['companyProfile/company'].address;
            let contactUs = this.$store.getters['companyProfile/company'].contact_us;
            let email = this.$store.getters['companyProfile/company'].email;
            printWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Bank Transactions</title>
                    <style>
                    ${styles}
                    </style>
                </head>
                <body>
                    <div>
                        <div class="custom-row">
                            <div class="col-xs-12">
                                ${invoiceHeader(ImagePath)}
                                <div class="invoice-title">
                                    Cash Ledger </br> From ${this.filter.dateFrom} To ${this.filter.dateTo} </br>
                                </div>
                            </div>
                        </div>
                        <div class="custom-row">
                            <div class="col-xs-12">
                                ${invoiceContent}
                            </div>
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
        // border: 1px solid #ccc;
        background: var(--theme_lighter);
        text-align: center;
        // height: 24px !important;
    }
    .v-data-table--dense > .v-data-table__wrapper > table > tbody > tr > td {
        // height: 20px !important;
        padding: 0px 5px !important;
        font-size: 12px !important;
        border: 1px solid #ccc !important;
        text-align: center;
    }
</style>