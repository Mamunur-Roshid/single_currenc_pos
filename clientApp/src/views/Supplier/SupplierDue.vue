<template>
    <v-container fluid class="shadow1 white rounded">
        <v-form class="custom-form" @submit.prevent="getSupplierDue">
            <v-row dense justify="center">
                <v-col cols="4">
                    <v-row no-gutters style="margin-top: 3px;color: #000;align-items: center;">
                        <v-col cols="3">Supplier</v-col>
                        <v-col cols="9">
                            <v-combobox 
                                dense
                                outlined
                                hide-details
                                v-model="supplier"
                                :items="supplier_list"
                                :loading="$store.getters['supplier/loadingSuppliers']"
                                item-text="display_text"
                                item-value="id"
                            >
                            </v-combobox>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="1" class="d-flex align-center">
                    <v-btn type="submit" color="text_bg_fave" :loading="loading">Search</v-btn>
                </v-col>
            </v-row>
            <v-divider></v-divider>
        </v-form>

        <v-row dense v-if="$store.getters['supplier/supplierDue'].length != 0">
            <v-col cols="12">
                <v-btn @click.prevent="print" >Print</v-btn>
            </v-col>

            <v-col cols="12">
                <v-simple-table class="custom-table mt-5">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>Sl</th>
                                <th>Supplier Id</th>
                                <th>Supplier Name</th>
                                <th>Phone</th>
                                <th>Org. Name</th>
                                <th>Org. Phone</th>
                                <th>Address</th>
                                <th>Due</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(supplier , sl) in $store.getters['supplier/supplierDue']" :key="sl">
                                <td class="text-center">{{ sl + 1 }}</td>
                                <td class="text-center">{{ supplier.code }}</td>
                                <td class="text-center">{{ supplier.name }}</td>
                                <td class="text-center">{{ supplier.phone }}</td>
                                <td class="text-center">{{ supplier.org_name }}</td>
                                <td class="text-center">{{ supplier.org_phone }}</td>
                                <td class="text-center">{{ supplier.address }}</td>
                                <td class="text-right">{{ supplier.due }}</td>
                            </tr>
                            <tr>
                                <td class="text-right" colspan="7"><strong>Total Due</strong></td>
                                <td class="text-right"><strong>{{ $store.getters['supplier/supplierDue'].reduce((p, c) => {return +p + +c.due}, 0).toFixed(2) }}</strong></td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
        <div v-else class="no_result">
            <div class="img"></div>
        </div>

        <div v-if="!lodash.isEmpty($store.getters['supplier/supplierDue'])" id="printContent" style="display: none;">
            <table class="bordered-table">
                <thead>
                    <tr>
                        <th>Sl</th>
                        <th>Supplier Id</th>
                        <th>Supplier Name</th>
                        <th>Phone</th>
                        <th>Org. Name</th>
                        <th>Org. Phone</th>
                        <th>Address</th>
                        <th>Due</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(supplier , sl) in $store.getters['supplier/supplierDue']" :key="sl">
                        <td class="text-center">{{ sl + 1 }}</td>
                        <td class="text-center">{{ supplier.code }}</td>
                        <td class="text-center">{{ supplier.name }}</td>
                        <td class="text-center">{{ supplier.phone }}</td>
                        <td class="text-center">{{ supplier.org_name }}</td>
                        <td class="text-center">{{ supplier.org_phone }}</td>
                        <td class="text-center">{{ supplier.address }}</td>
                        <td class="text-right">{{ supplier.due }}</td>
                    </tr>
                    <tr>
                        <td class="text-right" colspan="7"><strong>Total Due</strong></td>
                        <td class="text-right"><strong>{{ $store.getters['supplier/supplierDue'].reduce((p, c) => {return +p + +c.due}, 0).toFixed(2) }}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </v-container>
</template>

<script>
import useConfig from '../../composable/useConfig'
import { styles, invoiceHeader } from '../../composable/usePrint'
const { hostName } = useConfig()
export default {
    name: 'SupplierDue',

    data: () => ({
        supplier: null,
        supplierId: null,
        loading: false,
        supplier_list: []
    }),

    watch: {
        supplier(supplier) {
            if(supplier == undefined) return
            this.supplierId = supplier.id
            if (supplier == 'All') {
                this.supplier = null;
            }
        }
    },

    async created() {
        await this.$store.dispatch('supplier/getSuppliers')
        await this.$store.dispatch('companyProfile/getCompanyProfile')
        let list = this.$store.getters['supplier/suppliers'];
        list.unshift({
            id: null,
            display_text: 'All',
        })
        this.supplier_list = list

        this.getSupplierDue()
    },

    methods: {
        async getSupplierDue() {
            this.loading = true
            await this.$store.dispatch('supplier/getSupplierDue', {supplierId: this.supplierId})
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
                                <div class="col-xs-12">
                                    <div>
                                        ${invoiceHeader(ImagePath)}
                                    </div>
                                    <div style="text-align:center;font-weight:bold;padding-bottom:10px;">
                                        Supplier Due List
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