<template>
    <v-container fluid>
        <v-row no-gutters class="white rounded shadow1 py-2 mb-3">
            <v-col cols="12">
                <v-form class="custom-form" @submit.prevent="getStock">
                    <v-row dense justify="center">
                        <v-col cols="2">
                            <v-row no-gutters style="margin-top: 3px;color: #000;align-items: center;">
                                <v-col cols="3">Type</v-col>
                                <v-col cols="9">
                                    <v-combobox v-model="searchType" dense outlined hide-details :items="['Total Stock', 'Current Stock', 'By Product', 'By Category', 'By Brand']">
                                    </v-combobox>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="3" v-if="searchType == 'By Category'">
                            <v-row no-gutters style="margin-top: 3px;color: #000;">
                                <v-col cols="4">Category</v-col>
                                <v-col cols="8">
                                    <v-combobox dense outlined hide-details v-model="category" @focus="$store.dispatch('category/getCategories')" :items="$store.getters['category/categories']" :loading="$store.getters['category/loadingCategories']" item-text="name" item-value="id">
                                    </v-combobox>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="3" v-if="searchType == 'By Brand'">
                            <v-row no-gutters style="margin-top: 3px;color: #000;">
                                <v-col cols="4">Brand</v-col>
                                <v-col cols="8">
                                    <v-combobox dense outlined hide-details v-model="brand" @focus="$store.dispatch('brand/getBrands')" :items="$store.getters['brand/brands']" :loading="$store.getters['brand/loadingBrands']" item-text="name" item-value="id">
                                    </v-combobox>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="3" v-if="searchType == 'By Product'">
                            <v-row no-gutters style="margin-top: 3px;color: #000;">
                                <v-col cols="4">Product</v-col>
                                <v-col cols="8">
                                    <v-combobox dense outlined hide-details v-model="product" @focus="$store.dispatch('product/getProducts')" :items="$store.getters['product/products']" :loading="$store.getters['product/loadingProducts']" item-text="display_text" item-value="id">
                                    </v-combobox>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="1" class="d-flex align-center">
                            <v-btn type="submit" dark class="text_bg_fave" :loading="loading">Search</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
        <v-row no-gutters v-if="stocks.length">
            <v-col cols="12">
                <v-btn height="26px" @click.prevent="print" class="mb-2">Print</v-btn>
            </v-col>
        </v-row>
        <div id="printContent">
            <v-row no-gutters v-if="stocks.length">
                <v-col cols="12" v-if="searchType == 'Current Stock'">
                    <v-simple-table dense>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Product Id</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Purchase Rate</th>
                                    <th>Current Quantity</th>
                                    <th>Stock Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(stock, sl) in stocks" :key="sl">
                                    <td class="text-center">{{ sl + 1 }}</td>
                                    <td class="text-center">{{ lodash.get(stock, 'product.code') }}</td>
                                    <td class="text-center">{{ lodash.get(stock, 'product.name') }}</td>
                                    <td class="text-center">{{ lodash.get(stock, 'product.category.name') }}</td>
                                    <td class="text-center">{{ lodash.get(stock, 'product.brand.name') }}</td>
                                    <td class="text-right">{{ lodash.get(stock, 'product.purchase_rate') }}</td>
                                    <td class="text-right">{{ stock.current_quantity }}</td>
                                    <td class="text-right">{{ Number(stock.stock_value).toFixed(2) }}</td>
                                </tr>
                                <tr>
                                    <td colspan="5" class="text-right"><strong>Total</strong></td>
                                    <td class="text-right" style="text-align: right;"><strong>{{ lodash.sumBy(stocks, item => +item.product.purchase_rate) }}</strong></td>
                                    <td class="text-right"><strong>{{ totalQuantity }}</strong></td>
                                    <td class="text-right"><strong>{{ Number(totalStockValue).toFixed(2) }}</strong></td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>

                <v-col cols="12" v-if="searchType != 'Current Stock'">
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Product Id</th>
                                    <th>Product Name</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Purchase Rate</th>
                                    <th>Pur. Quantity</th>
                                    <th>Pur. Return</th>
                                    <th>Sale Quantity</th>
                                    <th>Sale Return</th>
                                    <th>Damage Quantity</th>
                                    <th>Current Quantity</th>
                                    <th>Stock Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, sl) in stocks" :key="sl">
                                    <td class="text-center">{{ sl + 1 }}</td>
                                    <td class="text-center">{{ lodash.get(product, 'code') }}</td>
                                    <td class="text-center">{{ lodash.get(product, 'name') }}</td>
                                    <td class="text-center">{{ lodash.get(product, 'category.name') }}</td>
                                    <td class="text-center">{{ lodash.get(product, 'brand.name') }}</td>
                                    <td class="text-right" style="text-align: right;">{{ lodash.get(product, 'purchase_rate') }}</td>
                                    <td class="text-right" style="text-align: right;">{{ lodash.get(product, 'purchase_quantity') }}</td>
                                    <td class="text-right" style="text-align: right;">{{ lodash.get(product, 'purchaes_return') }}</td>
                                    <td class="text-right" style="text-align: right;">{{ lodash.get(product, 'sale_quantity') }}</td>
                                    <td class="text-right" style="text-align: right;">{{ lodash.get(product, 'sale_return') }}</td>
                                    <td class="text-right" style="text-align: right;">{{ lodash.get(product, 'damage_quantity') }}</td>
                                    <td class="text-right" style="text-align: right;">{{ lodash.get(product, 'current_quantity') }}</td>
                                    <td class="text-right" style="text-align: right;">{{ Number(lodash.get(product,'stock_value')).toFixed(2) }}</td>
                                </tr>

                                <tr>
                                    <td colspan="5" class="text-right"><strong>Total</strong></td>
                                    <td class="text-right" style="text-align: right;">
                                        <strong>{{ lodash.sumBy(stocks, item => +item.purchase_rate) }}</strong>
                                    </td>
                                    <td class="text-right" style="text-align: right;">
                                        <strong>{{ lodash.sumBy(stocks, item => +item.purchase_quantity) }}</strong>
                                    </td>
                                    <td class="text-right" style="text-align: right;">
                                        <strong>{{ lodash.sumBy(stocks, item => +item.purchaes_return) }}</strong>
                                    </td>
                                    <td class="text-right" style="text-align: right;">
                                        <strong>{{ lodash.sumBy(stocks, item => +item.sale_quantity) }}</strong>
                                    </td>
                                    <td class="text-right" style="text-align: right;">
                                        <strong>{{ lodash.sumBy(stocks, item => +item.sale_return) }}</strong>
                                    </td>
                                    <td class="text-right" style="text-align: right;">
                                        <strong>{{ lodash.sumBy(stocks, item => +item.damage_quantity) }}</strong>
                                    </td>
                                    <td class="text-right"><strong>{{ totalQuantity }}</strong></td>
                                    <td class="text-right"><strong>{{ Number(totalStockValue).toFixed(2) }}</strong></td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
            <div class="white shadow1 rounded" v-else>
                <div class="no_result">
                    <div class="img"></div>
                </div>
            </div>
        </div>

        <div id="printTable" v-if="stocks.length && !loading" style="display: none;">
            <div cols="12" v-if="searchType == 'Current Stock'">
                <table class="bordered-table">
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th style="text-align: right;">Purchase Rate</th>
                            <th style="text-align: right;">Current Quantity</th>
                            <th style="text-align: right;">Stock Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(stock, sl) in stocks" :key="sl">
                            <td class="text-center">{{ sl + 1 }}</td>
                            <td class="text-center">{{ stock.product.code }}</td>
                            <td class="text-center">{{ stock.product.name }}</td>
                            <td class="text-center">{{ stock.product.category.name }}</td>
                            <td class="text-center">{{ stock.product.brand.name }}</td>
                            <td class="text-center" style="text-align: right;">{{ stock.product.purchase_rate }}</td>
                            <td class="text-right" style="text-align: right;">{{ stock.current_quantity }}</td>
                            <td class="text-right" style="text-align: right;">{{ Number(stock.stock_value).toFixed(2) }}</td>
                        </tr>
                        <tr>
                            <td colspan="5" class="text-right" style="text-align: right;"><strong>Total</strong></td>
                            <td class="text-right" style="text-align: right;"><strong>{{ lodash.sumBy(stocks, item => +item.product.purchase_rate) }}</strong></td>
                            <td class="text-right" style="text-align: right;"><strong>{{ totalQuantity }}</strong></td>
                            <td class="text-right" style="text-align: right;"><strong>{{ Number(totalStockValue).toFixed(2) }}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="searchType != 'Current Stock'">
                <table class="bordered-table">
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Product Id</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <!-- <th>Brand</th> -->
                            <th class="text-right" style="text-align: right;">Purchase Rate</th>
                            <th class="text-right" style="text-align: right;">Pur. Quantity</th>
                            <th class="text-right" style="text-align: right;">Pur. Return</th>
                            <th class="text-right" style="text-align: right;">Sale Quantity</th>
                            <th class="text-right" style="text-align: right;">Sale Return</th>
                            <th class="text-right" style="text-align: right;">Damage Quantity</th>
                            <th class="text-right" style="text-align: right;">Current Quantity</th>
                            <th class="text-right" style="text-align: right;">Stock Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product, sl) in stocks" :key="sl">
                            <td class="text-center">{{ sl + 1 }}</td>
                            <td class="text-center">{{ product.code }}</td>
                            <td class="text-center">{{ product.name }}</td>
                            <td class="text-center">{{ product.category.name }}</td>
                            <!-- <td class="text-center">{{ product.brand.name }}</td> -->
                            <td class="text-right" style="text-align: right;">{{ product.purchase_rate }}</td>
                            <td class="text-right" style="text-align: right;">{{ product.purchase_quantity }}</td>
                            <td class="text-right" style="text-align: right;">{{ product.purchaes_return }}</td>
                            <td class="text-right" style="text-align: right;">{{ product.sale_quantity }}</td>
                            <td class="text-right" style="text-align: right;">{{ product.sale_return }}</td>
                            <td class="text-right" style="text-align: right;">{{ product.damage_quantity }}</td>
                            <td class="text-right" style="text-align: right;">{{ product.current_quantity }}</td>
                            <td class="text-right" style="text-align: right;">{{ Number(product.stock_value).toFixed(2) }}</td>
                        </tr>

                        <tr>
                            <td colspan="4" class="text-right"><strong>Total</strong></td>
                            <td class="text-right" style="text-align: right;">
                                <strong>{{ lodash.sumBy(stocks, item => +item.purchase_rate) }}</strong>
                            </td>
                            <td class="text-right" style="text-align: right;">
                                <strong>{{ lodash.sumBy(stocks, item => +item.purchase_quantity) }}</strong>
                            </td>
                            <td class="text-right" style="text-align: right;">
                                <strong>{{ lodash.sumBy(stocks, item => +item.purchaes_return) }}</strong>
                            </td>
                            <td class="text-right" style="text-align: right;">
                                <strong>{{ lodash.sumBy(stocks, item => +item.sale_quantity) }}</strong>
                            </td>
                            <td class="text-right" style="text-align: right;">
                                <strong>{{ lodash.sumBy(stocks, item => +item.sale_return) }}</strong>
                            </td>
                            <td class="text-right" style="text-align: right;">
                                <strong>{{ lodash.sumBy(stocks, item => +item.damage_quantity) }}</strong>
                            </td>
                            <td class="text-right"><strong>{{ totalQuantity }}</strong></td>
                            <td class="text-right"><strong>{{ Number(totalStockValue).toFixed(2) }}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </v-container>
</template>

<script>
import useConfig from '../../composable/useConfig'
import { styles, invoiceHeader } from '../../composable/usePrint'
import _ from 'lodash'
const { hostName } = useConfig()
export default {
    name: 'Stock',

    data: () => ({
        searchType: '',
        category: null,
        brand: null,
        product: null,
        loading: false,
        stocks: [],
    }),

    watch: {
        searchType(type) {
            // this.$store
            this.stocks = []
            // this.$store.commit('setStock', [])
        }
    },

    computed: {
        totalQuantity() {
            return this.stocks.reduce((p, c) => { return +p + +c.current_quantity }, 0)
        },
        totalStockValue() {
            return this.stocks.reduce((p, c) => { return +p + +c.stock_value }, 0)
        },
    },

    async created() {
        // context.commit('setStock', stock);
        // this.getCompanyProfile();
        await this.getStock()
    },

    methods: {
        getCompanyProfile() {
            // this.$store.dispatch('companyProfile/getCompanyProfile')
        },

        async getStock() {
            if (this.searchType != 'By Category') {
                this.category = null;
            }
            if (this.searchType != 'By Brand') {
                this.brand = null;
            }
            if (this.searchType != 'By Product') {
                this.product = null;
            }

            let filter = {
                productId: this.product == null ? null : this.product.id,
                categoryId: this.category == null ? null : this.category.id,
                brandId: this.brand == null ? null : this.brand.id
            }

            this.loading = true;

            if (this.searchType == 'Current Stock') {
                await this.$store.dispatch('product/getCurrentStock');
            } else {
                await this.$store.dispatch('product/getTotalStock', filter);
            }

            this.loading = false
            let stocks = this.$store.getters['product/stock'];
            if (_.isArray(stocks)) {
                this.stocks = stocks;
            } else {
                this.stocks = [...Object.values(stocks)]
            }
        },

        async print() {
            let invoiceContent = document.querySelector('#printTable').innerHTML;
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
                                                    Stock Record
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
    top: -3px !important;
}

.theme--light.v-data-table>.v-data-table__wrapper>table>thead>tr:last-child>th {
    // font-size: 11px;
    padding: 0px 1px;
    background: var(--theme_lighter);
    color: var(--theme_deep_dark);
    border: 1px solid #ccc;
    text-align: center;
    height: 40px !important;
}
table tr td {
    border: 1px solid #ccc;
}

.v-data-table--dense>.v-data-table__wrapper>table>tbody>tr>td {
    height: 40px !important;
    // padding: 0px 5px !important;
    // font-size: 12px !important;
    // border: 1px solid #ccc !important;
}
</style>