<template>
    <v-container fluid>
        <v-row dense justify="center">
            <v-col cols="9">
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-btn height="26px" @click.prevent="print" class="mb-2">Print</v-btn>
                    </v-col>
                </v-row>

                <div id="invoiceContent">
                    <v-row no-gutters>
                        <v-col cols="12">
                            <div class="invoice-title"> Sale Return Invoice </div>
                        </v-col>
                    </v-row>

                    <!-- <v-row dense>
                        <v-col cols="7">
                            <table class="table">
                                <tr>
                                    <td>Customer Id</td>
                                    <td style="padding:1px 5px">:</td>
                                    <td>{{ lodash.get(saleReturn, 'sale.customer.code') }}</td>
                                </tr>
                                <tr>
                                    <td>Customer Name</td>
                                    <td style="padding:1px 5px">:</td>
                                    <td>{{ lodash.get(saleReturn, 'sale.customer.name') }}</td>
                                </tr>
                                <tr>
                                    <td>Mobile</td>
                                    <td style="padding:1px 5px">:</td>
                                    <td>{{ lodash.get(saleReturn, 'sale.customer.phone') }}</td>
                                </tr>
                            </table>
                        </v-col>
                        <v-col cols="5">
                            <table class="table" style="float:right">
                                <tr>
                                    <td>Invoice No</td>
                                    <td style="padding:1px 5px">:</td>
                                    <td>{{ saleReturn ? saleReturn.invoice : '' }}</td>
                                </tr>
                                <tr>
                                    <td>Sale Date</td>
                                    <td style="padding:1px 5px">:</td>
                                    <td>{{ lodash.get(saleReturn, 'sale.date') }}</td>
                                </tr>
                                <tr>
                                    <td>Return Date</td>
                                    <td style="padding:1px 5px">:</td>
                                    <td>{{ lodash.get(saleReturn, 'date') }}</td>
                                </tr>
                            </table>
                        </v-col>
                    </v-row> -->
                    <v-row no-gutters>
                        <v-col cols="12">
                            <table class="invoice-details" border="1px solid #ccc;">
                                <tbody>
                                    <tr>
                                        <th colspan="3" style="text-align: left;padding:10px">
                                            <div>
                                                Invoice No:{{ lodash.get(saleReturn, 'invoice') }} 
                                            </div>
                                            <div>
                                                Sale Date: {{ lodash.get(saleReturn, 'sale.date') }}
                                            </div>
                                            <div>
                                                Return Date: {{ lodash.get(saleReturn, 'date') }}
                                            </div>
                                        </th>
                                        <th colspan="3" style="text-align: left;padding:10px">
                                            <div>
                                                Customer Id:{{ lodash.get(saleReturn, 'sale.customer.code') }} 
                                            </div>
                                            <div>
                                                Customer Name: {{ lodash.get(saleReturn, 'sale.customer.name') }}
                                            </div>
                                            <div>
                                                Customer Address: {{ lodash.get(saleReturn, 'sale.customer.address') }}
                                            </div>
                                            <div>
                                                Phone: {{ lodash.get(saleReturn, 'sale.customer.phone') }}
                                            </div>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th style="width: 50px;">Sl</th>
                                        <th colspan="2">Description</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th style="text-align: right;">Amount</th>
                                    </tr>
                                    <tr v-for="(sale, sl) in saleReturn ? saleReturn.return_details : []" :key="sl">
                                        <td class="text-center" style="width: 50px;">{{ sl + 1 }}</td>
                                        <td colspan="2" class="text-center">{{ sale.product.code }} {{ sale.product.name }}</td>
                                        <td class="text-center">{{ sale.quantity }}</td>
                                        <td class="text-center">{{ lodash.get(sale, 'return_rate') }}</td>
                                        <td style="text-align: right;">{{ sale.return_amount }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="5" style="text-align: right;">Total Amount</td>
                                        <td style="text-align: right;"><strong>{{ saleReturn ? saleReturn.total : 0.00 }}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <p> <strong>In Word:</strong> {{ convertNumberToWords(saleReturn.total) }}</p>
                        </v-col>
                        <v-col cols="12" v-if="lodash.get(saleReturn, 'note')">
                            <p> <strong>Note:</strong> {{ lodash.get(saleReturn, 'note') }}</p>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { invoiceHeader } from '../../composable/usePrint'
export default {
    name: 'SaleReturnInvoice',

    data: () => ({
        saleReturn: {}
    }),

    async created() {
        await this.$store.dispatch('sale/getSaleReturns', {id: this.$route.params.id})
        this.saleReturn = this.$store.getters['sale/saleReturns'][0]
        this.setStyle();
        await this.$store.dispatch('companyProfile/getCompanyProfile')
    },

    methods: {
        async print(){
            let invoiceContent = document.querySelector('#invoiceContent').innerHTML;
            let printWindow = window.open('', 'PRINT', `width=${screen.width}, height=${screen.height}, left=0, top=0`);
            // let image = await this.$store.getters['companyProfile/company'].image;
            // let ImagePath = `${this.$store.state.hostName}/${image}`;
            // let companyName = this.$store.getters['companyProfile/company'].company_name;
            // let address = this.$store.getters['companyProfile/company'].address;
            // let contactUs = this.$store.getters['companyProfile/company'].contact_us;
            // let email = this.$store.getters['companyProfile/company'].email;
            printWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Investigation Payment Slip</title>
                    <style>
                    </style>
                </head>
                <body>
                    <div>
                        <div class="container">
                            <table style="width:100%;">
                                <thead>
                                    ${invoiceHeader('https://pos.skmachineriesbd.com/images/8752f49c-104f-4abf-b014-7d201c0693b1.png')}
                                </thead>
                                <tbody>
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
            
            let invoiceStyle = printWindow.document.createElement('style');
            invoiceStyle.innerHTML = this.style.innerHTML;
            printWindow.document.head.appendChild(invoiceStyle);
            printWindow.moveTo(0, 0);
            
            printWindow.focus();
            await new Promise(resolve => setTimeout(resolve, 1000));
            printWindow.print();
            printWindow.close();
        },

        setStyle(){
            this.style = document.createElement('style');
            this.style.innerHTML = `
                .custom-row {
                    width: 100%;
                    display: block;
                }
                .print-btn a{
                    background: #CFD8DC;
                    display: inline-block;
                    padding: 3px 13px;
                    border-radius: 5px;
                    color: #000 !important;
                }
                .print-btn a:hover {
                    background: #B0BEC5;
                }
                .invoice-title {
                    text-align: center;
                    font-weight: bold;
                    font-size: 15px;
                    margin-bottom: 15px;
                    padding: 5px;
                    border-top: 1px dotted #454545;
                    border-bottom: 1px dotted #454545;
                }
                .col-xs-12 {
                    width: 100%;
                }
                .col-xs-10 {
                    width: 80%;
                    float: left;
                }
                .col-xs-9 {
                    width: 70%;
                    float: left;
                }
                .col-xs-7 {
                    width: 60%;
                    float: left;
                }
                .col-xs-6 {
                    width: 50%;
                    float: left;
                }
                .col-xs-5 {
                    width: 40%;
                    float: left;
                }
                .col-xs-4 {
                    width: 35%;
                    float: left;
                }
                .col-xs-3 {
                    width: 30%;
                    float: left;
                }
                .col-xs-2 {
                    width: 20%;
                    float: left;
                }
                .b-text {
                    font-weight: 500;
                    font-size: 15px;
                }
                .normal-text {
                    font-size: 14px;
                    margin: 0px;
                }
                .invoice-details {
                    width: 100%;
                    border-collapse: collapse;
                    border:1px solid #ccc;
                }
                .invoice-details thead {
                    font-weight: 500;
                    text-align:center;
                }
                .invoice-details tbody td{
                    padding: 0px 5px;
                }
                .text-center {
                    text-align: center;
                }
                .text-right {
                    text-align: right;
                }
                .line {
                    border-bottom: 1px solid #ccc;
                    margin-top: 15px;
                    margin-bottom: 15px;
                }
                .mt-60 {
                    margin-top: 60px;
                }
                .mr-20 {
                    margin-right: 20px;
                }
                .ml-20 {
                    margin-left: 20px;
                }
                .ft-fiext {
                    position: fixed;
                    bottom: 0;
                }
                .cls {
                    clear: both;
                }
            `;
            document.head.appendChild(this.style);
        },
        convertNumberToWords(amountToWord) {
            var words = new Array();
            words[0] = '';
            words[1] = 'One';
            words[2] = 'Two';
            words[3] = 'Three';
            words[4] = 'Four';
            words[5] = 'Five';
            words[6] = 'Six';
            words[7] = 'Seven';
            words[8] = 'Eight';
            words[9] = 'Nine';
            words[10] = 'Ten';
            words[11] = 'Eleven';
            words[12] = 'Twelve';
            words[13] = 'Thirteen';
            words[14] = 'Fourteen';
            words[15] = 'Fifteen';
            words[16] = 'Sixteen';
            words[17] = 'Seventeen';
            words[18] = 'Eighteen';
            words[19] = 'Nineteen';
            words[20] = 'Twenty';
            words[30] = 'Thirty';
            words[40] = 'Forty';
            words[50] = 'Fifty';
            words[60] = 'Sixty';
            words[70] = 'Seventy';
            words[80] = 'Eighty';
            words[90] = 'Ninety';
            let amount = amountToWord == null ? '0.00' : amountToWord.toString();
            var atemp = amount.split(".");
            var number = atemp[0].split(",").join("");
            var n_length = number.length;
            var words_string = "";
            if (n_length <= 9) {
                var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
                var received_n_array = new Array();
                for (var i = 0; i < n_length; i++) {
                    received_n_array[i] = number.substr(i, 1);
                }
                for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
                    n_array[i] = received_n_array[j];
                }
                for (var i = 0, j = 1; i < 9; i++, j++) {
                    if (i == 0 || i == 2 || i == 4 || i == 7) {
                        if (n_array[i] == 1) {
                            n_array[j] = 10 + parseInt(n_array[j]);
                            n_array[i] = 0;
                        }
                    }
                }
                let value = "";
                for (var i = 0; i < 9; i++) {
                    if (i == 0 || i == 2 || i == 4 || i == 7) {
                        value = n_array[i] * 10;
                    } else {
                        value = n_array[i];
                    }
                    if (value != 0) {
                        words_string += words[value] + " ";
                    }
                    if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                        words_string += "Crores ";
                    }
                    if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                        words_string += "Lakhs ";
                    }
                    if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                        words_string += "Thousand ";
                    }
                    if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                        words_string += "Hundred and ";
                    } else if (i == 6 && value != 0) {
                        words_string += "Hundred ";
                    }
                }
                words_string = words_string.split("  ").join(" ");
            }

            if (String(words_string).length > 0) {
                return words_string + ' TK Only';
            } else {
                return 'Zero' + ' TK Only';
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .invoice-title {
        text-align: center;
        font-weight: bold;
        font-size: 15px;
        margin-bottom: 15px;
        padding: 5px;
        border-top: 1px dotted #454545;
        border-bottom: 1px dotted #454545;
    }
    .table tr td:first-child {
        font-weight: bold;
    }
</style>