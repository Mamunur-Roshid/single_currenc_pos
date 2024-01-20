<template>
    <v-container fluid class="shadow1 rounded pb-4 white">
        <v-row no-gutters>
            <v-col cols="12">
                <v-data-table
                    class="custom-data-table"
					:headers="supplierHeaders"
					:items="$store.getters['supplier/suppliers']"
                    :loading="$store.getters['supplier/loadingSuppliers']"
					:items-per-page="15"
					:search="supplierSearch"
				>
					<template v-slot:top>
						<v-toolbar dense color="white" :elevation="0" class="custom-toolbar mb-2">
							<v-toolbar-title class="subtitle-2">Supplier List</v-toolbar-title>
							<v-divider class="mx-4" inset vertical></v-divider>
                            <v-form class="custom-form"> 
                                <v-text-field v-model="supplierSearch" dense single-line hide-details outlined placeholder="Search supplier" width="400" autocomplete="off" class="table-search" style="width:300px;">
                                    <v-icon slot="append">mdi-magnify</v-icon>
                                </v-text-field> 
                            </v-form>
						</v-toolbar>
                        <v-btn @click="print">Print</v-btn>
					</template>
				</v-data-table>
            </v-col>
        </v-row>

        <div v-if="!lodash.isEmpty($store.getters['supplier/suppliers'])" style="display: none;">
            <div cols="12" id="printContent">
                <table class="bordered-table">
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Supplier Id</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Org. Name</th>
                            <th>Org. Phone</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Credit Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(payment, ind) in $store.getters['supplier/suppliers']" :key="ind">
                            <td class="text-center">{{ payment.sl }}</td>
                            <td class="text-center">{{ payment.code }}</td>
                            <td class="text-center">{{ payment.student_name }}</td>
                            <td class="text-center">{{ payment.phone }}</td>
                            <td class="text-center">{{ payment.org_name }}</td>
                            <td class="text-center">{{ payment.org_phone }}</td>
                            <td class="text-center">{{ payment.address }}</td>
                            <td class="text-center">{{ payment.email }}</td>
                            <td class="text-center">{{ payment.credit_limit }}</td>
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
    name: 'Suppliers',

    data: ()=> ({
        supplierHeaders: [
            { text: 'Sl', value: 'sl' },
            { text: 'Supplier Id', value: 'code' },
            { text: 'Name', value: 'student_name' },
            { text: 'Mobile', value: 'phone' },
            { text: 'Org. Name', value: 'org_name' },
            { text: 'Org. Phone', value: 'org_phone' },
            { text: 'Address', value: 'address' },
            { text: 'E-mail', value: 'email' },
            { text: 'Credit Limit', value: 'credit_limit' },
        ],
        supplierSearch: '',
    }),

    async created() {
        await this.$store.dispatch('supplier/getSuppliers')
        await this.$store.dispatch('companyProfile/getCompanyProfile')
    },

    methods: {
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
                                        Supplier List
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
</style>
