<template>
    <div class="invoice_wrap mx-auto max-w-[700px]">
        <div style="display: flex;justify-content: center;margin-bottom: 50px;">
            <v-btn @click="print" color="green" class="text_bg_fave">Print</v-btn>
        </div>

        <div class="mt-1" id="invoiceContent">
            <thead>
                <tr>
                    <th colspan="6">
                        <div class="relative mb-5 flex items-center justify-center gap-5">
                            <div>
                                <img style="width: 100px" :src="info.ImagePath" alt="SK" />
                            </div>
                            <div class="text-center">
                                <h2 class="font-serif text-4xl font-bold uppercase black-heading-color">S.K matchinaries</h2>
                                <h2 class="font-serif text-4xl font-bold uppercase red-heading-color">S.K Auto house</h2>
                            </div>
                        </div>

                        <div class="text-center">
                            <div class="mb-2 blue-heading-bg font-bold blue-heading-color">All types of China Diesel Engine and Power Tiller, Original Parts Importer and Dealer.</div>

                            <div class="whitespace-nowrap text-[15px]">Hafiz Market, 99, Nawabpur Road, Dhaka-1100, Bangladesh. Phone : 01776273730, 01716-485188,</div>
                            <div class="text-[#d32d49]">01722-123123, 01931-094581, AC-01811252508, TE-02-47115207</div>
                            <div class="text-blue-500">E-mail: kamalsk99@yahoo.com</div>
                            <div class="mt-3 text-right">Date: --------------------</div>
                        </div>
                    </th>
                </tr>
            </thead>
            <table class="mt-2 w-full bordered-table">
                <tbody>
                    <tr class="border border-gray-400">
                        <th class="border border-gray-400 text-center">SL</th>
                        <th class="border border-gray-400 text-center" colspan="2">Details</th>
                        <th class="border border-gray-400 text-center">Quantity</th>
                        <th class="border border-gray-400 text-center">Price</th>
                        <th class="border border-gray-400 text-right">Total</th>
                    </tr>
                    <template v-for="ind in 5">
                        <tr v-for="(detail, ind) in sale.sale_details" :key="ind">
                            <td class="text-center">{{ ind + 1 }}</td>
                            <td colspan="2" class="text-center">{{ detail.product != null ? detail.product.name : '' }}</td>
                            <td class="text-center">
                                {{ detail.quantity }}
                                <template v-if="detail.product.unit">
                                    {{ lodash.get(detail, 'product.unit.name') }}
                                </template>
                            </td>
                            <td class="text-center" width="20%">{{ detail.sale_rate }}</td>
                            <td class="text-right" width="20%">{{ detail.total }}</td>
                        </tr>
                    </template>
                    <tr>
                        <td colspan="5" class="text-right p3" style="paddign">Sub total</td>
                        <td class="text-right p3">
                            {{ sale.sub_total }}
                        </td>
                    </tr>
                    <tr v-if="Number(sale.vat) > 0">
                        <td colspan="5" class="text-right p3">Vat</td>
                        <td class="text-right p3">
                            {{ sale.vat }}
                        </td>
                    </tr>
                    <tr v-if="Number(sale.discount) > 0">
                        <td colspan="5" class="text-right p3">Discount</td>
                        <td class="text-right p3">
                            {{ sale.discount }}
                        </td>
                    </tr>
                    <tr v-if="Number(sale.transport) > 0">
                        <td colspan="5" class="text-right p3">Transport Cost</td>
                        <td class="text-right p3">
                            {{ sale.transport }}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5" class="text-right p3">Total Amount</td>
                        <td class="text-right p3">
                            {{ sale.total }}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5" class="text-right p3">Paid Amount</td>
                        <td class="text-right p3">
                            {{ sale.paid }}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5" class="text-right p3">Due Amount</td>
                        <td class="text-right p3">
                            {{ sale.due }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <tfoot>
                <tr>
                    <th colspan="6">
                        <div style="font-size: 13px;">
                            <strong class="b-text" style="font-weight:bold;"> In Words: </strong>
                            <span class="normal-text">
                                {{ convertNumberToWords(sale.total) }}
                            </span>
                        </div>
                        <div class="flex items-center justify-between" style="margin-top:20px">
                            <img :src="`${$store.state.hostName}/bootom-logos-lt.png`" style="max-width:75%;" alt="Some" />
                            <span class="font-bold text-[#24298d]">S.K MATCHINARIES</span>
                        </div>
                        <div class="block h-2 blue-bg"></div>
                    </th>
                </tr>
            </tfoot>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { invoiceStyle } from '../composable/usePrint';
export default {
    props: ['saleId'],

    data() {
        return {
            sale: {},
            style: null,
            info: {}
        }
    },
    filters: {
        formatDateTime(dt, format) {
            return dt == '' || dt == null ? '' : moment(dt).format(format);
        }
    },
    async created() {
        // this.setStyle();
        this.getSales();
        this.getCompanyProfile();
        let image = await this.$store.getters['companyProfile/company'].image;
        let ImagePath = `${this.$store.state.hostName}/${image}`;
        let companyName = this.$store.getters['companyProfile/company'].company_name;
        let address = this.$store.getters['companyProfile/company'].address;
        let contactUs = this.$store.getters['companyProfile/company'].contact_us;
        let email = this.$store.getters['companyProfile/company'].email;
        this.info = {
            image,
            ImagePath,
            companyName,
            address,
            contactUs,
            email
        }
        console.log(this.info);
    },
    methods: {
        getCompanyProfile() {
            this.$store.dispatch('companyProfile/getCompanyProfile')
        },

        async getSales() {
            await this.$store.dispatch('sale/getSales', { id: this.saleId });
            this.sale = await this.$store.getters['sale/sales'][0];
        },
        setStyle() {

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
        async print() {
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
                    ${invoiceStyle}
                    </style>
                </head>
                <body>
                    ${invoiceContent}
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
        }
    }
}
</script>

<style scoped>
*,
::before,
::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
}

::before,
::after {
    --tw-content: '';
}

html {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -moz-tab-size: 4;
    tab-size: 4;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-feature-settings: normal;
    font-variation-settings: normal;
}

body {
    margin: 0;
    line-height: inherit;
}

hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
}

abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: inherit;
    font-weight: inherit;
}

a {
    color: inherit;
    text-decoration: inherit;
}

b,
strong {
    font-weight: bolder;
}

code,
kbd,
samp,
pre {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 1em;
}

small {
    font-size: 80%;
}

sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}

sub {
    bottom: -0.25em;
}

sup {
    top: -0.5em;
}

/* table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
} */

button,
input,
optgroup,
select,
textarea {
    font-family: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
}

button,
select {
    text-transform: none;
}

button,
[type='button'],
[type='reset'],
[type='submit'] {
    -webkit-appearance: button;
    background-color: transparent;
    background-image: none;
}

:-moz-focusring {
    outline: auto;
}

:-moz-ui-invalid {
    box-shadow: none;
}

progress {
    vertical-align: baseline;
}

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
    height: auto;
}

[type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
}

::-webkit-search-decoration {
    -webkit-appearance: none;
}

::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
}

summary {
    display: list-item;
}

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
    margin: 0;
}

fieldset {
    margin: 0;
    padding: 0;
}

legend {
    padding: 0;
}

ol,
ul,
menu {
    list-style: none;
    margin: 0;
    padding: 0;
}

textarea {
    resize: vertical;
}

input::placeholder,
textarea::placeholder {
    opacity: 1;
    color: #9ca3af;
}

button,
[role="button"] {
    cursor: pointer;
}

:disabled {
    cursor: default;
}

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
    display: block;
    vertical-align: middle;
}

img,
video {
    max-width: 100%;
    height: auto;
}

[hidden] {
    display: none;
}

*,
::before,
::after {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-scroll-snap-strictness: proximity;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
}

::backdrop {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-scroll-snap-strictness: proximity;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
}

.relative {
    position: relative;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}

.mb-2 {
    margin-bottom: 0.5rem;
}

.mb-5 {
    margin-bottom: 1.25rem;
}

.mt-1 {
    margin-top: 0.25rem;
}

.mt-2 {
    margin-top: 0.5rem;
}

.mt-3 {
    margin-top: 0.75rem;
}

.block {
    display: block;
}

.inline-block {
    display: inline-block;
}

.flex {
    display: flex;
}

.table {
    display: table;
}

.h-2 {
    height: 0.5rem;
}

.w-\[120px\] {
    width: 120px;
}

.w-\[75\%\] {
    width: 75%;
}

.w-\[80px\] {
    width: 80px;
}

.w-full {
    width: 100%;
}

.max-w-\[700px\] {
    max-width: 700px;
}

.items-center {
    align-items: center;
}

.justify-center {
    justify-content: center;
}

.justify-between {
    justify-content: space-between;
}

.gap-5 {
    gap: 1.25rem;
}

.whitespace-nowrap {
    white-space: nowrap;
}

.rounded-md {
    border-radius: 0.375rem;
}

.border {
    border-width: 1px;
}

.border-2 {
    border-width: 2px;
}

.border-\[\#24298d\] {
    --tw-border-opacity: 1;
    border-color: rgb(36 41 141 / var(--tw-border-opacity));
}

.border-gray-400 {
    --tw-border-opacity: 1;
    border-color: rgb(156 163 175 / var(--tw-border-opacity));
}

.bg-\[\#24298d\] {
    --tw-bg-opacity: 1;
    background-color: rgb(36 41 141 / var(--tw-bg-opacity));
}

.bg-\[\#24298d\]\/20 {
    background-color: rgb(36 41 141 / 0.2);
}

.px-1 {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
}

.py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
}

.py-px {
    padding-top: 1px;
    padding-bottom: 1px;
}

.text-center {
    text-align: center;
}

.text-right {
    text-align: right;
}

.font-serif {
    font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}

.text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
}

.text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
}

.text-\[15px\] {
    font-size: 15px;
}

.font-bold {
    font-weight: 700;
}

.uppercase {
    text-transform: uppercase;
}

.text-\[\#24298d\] {
    --tw-text-opacity: 1;
    color: rgb(36 41 141 / var(--tw-text-opacity));
}

.text-\[\#d32d49\] {
    --tw-text-opacity: 1;
    color: rgb(211 45 73 / var(--tw-text-opacity));
}

.text-black {
    --tw-text-opacity: 1;
    color: rgb(0 0 0 / var(--tw-text-opacity));
}

.text-blue-500 {
    --tw-text-opacity: 1;
    color: rgb(59 130 246 / var(--tw-text-opacity));
}

.text-white {
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
}

.text-yellow-300 {
    --tw-text-opacity: 1;
    color: rgb(253 224 71 / var(--tw-text-opacity));
}

.black-heading-color {
    color: #24298d;
}

.red-heading-color {
    color: #d32d49;
}

.blue-heading-color {
    color: #24298d;
}

.blue-heading-bg {
    background: rgba(36, 41, 141, 0.2);
}

.blue-bg {
    background: #24298d;
}

.bordered-table {
    border-collapse: collapse;
    width: 100%;
}

.bordered-table th,
.bordered-table td {
    border: 1px solid black;
    padding: 3px;
    text-align: left;
}

.bordered-table thead th {
    background-color: #f2f2f2;
}

.bordered-table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}
</style>