<template>
    <v-container fluid class="white shadow1 rounded">
        <v-row>
            <v-col cols="12">
                <v-form class="custom-form" @submit.prevent="getProducts">
                    <v-row dense>
                        <v-col cols="3">
                            <v-row no-gutters style="color: #000;align-items: center;">
                                <v-col cols="4">Category</v-col>
                                <v-col cols="8">
                                    <v-combobox 
                                        dense
                                        outlined
                                        hide-details
                                        v-model="category"
                                        @focus="$store.dispatch('category/getCategories')"
                                        :items="$store.getters['category/categories']"
                                        :loading="$store.getters['category/loadingCategories']"
                                        item-text="name"
                                        item-value="id"
                                    >
                                    </v-combobox>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="2">
                            <v-row no-gutters style="color: #000;align-items: center;">
                                <v-col cols="4">Brand</v-col>
                                <v-col cols="8">
                                    <v-combobox 
                                        dense
                                        outlined
                                        hide-details
                                        v-model="brand"
                                        @focus="$store.dispatch('brand/getBrands')"
                                        :items="$store.getters['brand/brands']"
                                        :loading="$store.getters['category/loadingBrands']"
                                        item-text="name"
                                        item-value="id"
                                    >
                                    </v-combobox>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="1" style="color: #000;display: flex;align-items: center;">Sale Price</v-col>
                        <v-col cols="4">
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-range-slider
                                        v-model="rangeSlider.priceRange"
                                        :max="rangeSlider.max"
                                        :min="rangeSlider.min"
                                        hide-details
                                        class="align-center"
                                        @change="filterByPrice"
                                    >
                                        <template v-slot:prepend>
                                        <v-text-field
                                            :value="rangeSlider.priceRange[0]"
                                            class="mt-0 pt-0"
                                            hide-details
                                            single-line
                                            style="width: 60px"
                                            @change="$set(rangeSlider, 0, $event)"
                                        ></v-text-field>
                                        </template>
                                        <template v-slot:append>
                                        <v-text-field
                                            :value="rangeSlider.priceRange[1]"
                                            class="mt-0 pt-0"
                                            hide-details
                                            single-line
                                            style="width: 60px"
                                            @change="$set(rangeSlider, 1, $event)"
                                        ></v-text-field>
                                        </template>
                                    </v-range-slider>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="1">
                            <v-btn type="submit" dark color="text_bg_fave" :loading="loading">Search</v-btn>
                        </v-col>
                    </v-row>
                    <v-divider></v-divider>
                </v-form>
            </v-col>
        </v-row>

        <v-row no-gutters class="py-2">
            <v-col cols="12">
                <v-data-table
                    class="custom-data-table elevation-0" 
                    :headers="productHeaders"
                    :items="$store.getters['product/products']"
                    :search="searchProduct"
                    :loading="$store.getters['product/loadingProducts']" 
					loading-text="Loading... Please wait"
                >
                    <template v-slot:top>
                        <v-toolbar color="white" :elevation="0" class="px-2">
                            <v-toolbar-title class="subtitle-2">Product List</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-form class="custom-form">
                                <v-text-field
                                    outlined
                                    dense
                                    hide-details
                                    placeholder="Search Product"
                                    append-icon="mdi-magnify"
                                    style="width:300px;"
                                    v-model="searchProduct"
                                >
                                </v-text-field>
                            </v-form>
                        </v-toolbar>
                        <v-btn @click="print" v-if="$store.getters['product/products'].length">Print</v-btn>
                    </template>
                    <template v-slot:[`item.action`]="{ item }">
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-icon small @click="$router.push(`/barcode-generate/${item.id}`)" color="primary" v-on="on">mdi-barcode</v-icon>
							</template>
							<span>Barcode</span>
						</v-tooltip>
					</template>
                </v-data-table>
            </v-col>
        </v-row>
        <div id="printTable" style="display: none;">
        <!-- <div id="printTable" > -->
            <table class="bordered-table">
                <tr>
                    <th>SL</th>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Unit</th>
                    <th>Sale Rate</th>
                </tr>
                <tr v-for="(item, index) in $store.getters['product/products']" :key="index">
                    <td>{{ item.sl }}</td>
                    <td>{{ item.code }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ lodash.get(item, 'category.name') }}</td>
                    <td>{{ lodash.get(item, 'brand.name') }}</td>
                    <td>{{ lodash.get(item, 'unit.name') }}</td>
                    <td>{{ item.sale_rate }}</td>
                </tr>
            </table>
        </div>
    </v-container>
</template>

<script>
import useConfig from '../../composable/useConfig';
import { invoiceHeader } from '../../composable/usePrint';
const { hostName } = useConfig()
export default {
    name: 'ProductList',

    data: () => ({
        productHeaders: [
            { text: 'SL', value: 'sl' },
            { text: 'Product Id', value: 'code' },
            { text: 'Product Name', value: 'name' },
            { text: 'Category', value: 'category.name' },
            { text: 'Brand', value: 'brand.name' },
            { text: 'Unit', value: 'unit.name' },
            // { text: 'Purchase Rate', value: 'purchase_rate' },
            { text: 'Sale Rate', value: 'sale_rate' },
            { text: 'Action', value: 'action' },
        ],
        searchProduct: '',
        category: null,
        brand: null,
        loading: false,
        rangeSlider: {
            min: 0,
            max: 100000,
            priceRange: [100, 100000],
        },
    }),

    async created() {
        await this.getProducts()
    },

    methods: {
        async getProducts() {
            this.loading = true;
            let filter = {
                categoryId: this.category == null ? null : this.category.id,
                brandId: this.brand == null ? null : this.brand.id
            }

            await this.$store.dispatch('product/getProducts', filter)

            this.loading = false;
        },

        async filterByPrice() {
            this.loadingProducts = true;
            await this.$store.dispatch('product/getProducts', {price: this.rangeSlider.priceRange});
            this.loadingProducts = false;
        },

        async print() {
            let invoiceContent = document.querySelector('#printTable').innerHTML;
            let printWindow = window.open('', 'PRINT', `width=${screen.width}, height=${screen.height}, left=0, top=0`);
            let companyProfile = this.$store.getters['companyProfile/company']
            let companyImage = companyProfile != null ? this.$store.getters['companyProfile/company'].image : ''
            let ImagePath = companyImage ? hostName + '/' + companyImage : '';
            let byTxt = '';
            if(this.category) {
                byTxt += ' By Category: ' + this.category.name;
            }
            if(this.brand) {
                byTxt += ' By Brand: ' + this.brand.name;
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
                    ${this.setStyle()}
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
                                                    Product List ${byTxt ? byTxt : ''}
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

            printWindow.moveTo(0, 0);

            printWindow.focus();
            await new Promise(resolve => setTimeout(resolve, 1000));
            printWindow.print();
            printWindow.close();
        },

        setStyle() {
            return `
            body {
                font-family: Arial,sans-serif;
            }
            .bordered-table {
                border-collapse: collapse;
                width: 100%;
                }

                .bordered-table th,
                .bordered-table td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
                }

                .bordered-table thead th {
                background-color: #f2f2f2;
                }

                .bordered-table tbody tr:nth-child(even) {
                background-color: #f9f9f9;
                }
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
                .paid-text {
                    padding:30px 0px;
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
                @media print {
                    .hide {
                        display: none
                    }
                    .v-data-table > .v-data-table__wrapper > table {
                        width: 100%;
                        border-spacing: 0;
                    }
                    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
                        font-size: 13px;
                        padding: 0px 1px;
                        color: #000;
                        border: 1px solid #ccc;
                        text-align: center;
                        height: 24px !important;
                    }
                    .v-data-table--dense > .v-data-table__wrapper > table > tbody > tr > td {
                        height: 20px !important;
                        padding: 0px 5px !important;
                        font-size: 12px !important;
                        border: 1px solid #ccc !important;
                    }
                }
                .cls {
                    clear: both;
                }
            `;
        },

    }
}
</script>

<style lang="scss">
    .v-treeview-node__root {
        // min-height: 35px !important;
        padding-left: 0px !important;
        position: relative;
    }
</style>
