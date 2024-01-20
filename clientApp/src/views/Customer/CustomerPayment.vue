<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col cols="12">
                <v-form class="custom-form" ref="customerPaymentForm" @submit.prevent="customerPayments">
                    <v-card color="white shadow1_important rounded mb-4 pb-4">
                        <v-row no-gutters>
                            <v-col cols="12">
                                <v-toolbar :elevation="0">
                                    <v-toolbar-title class="subtitle-1">Customer Payment Entry</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text class="py-0 mt-1">
                                    <v-row dense justify="center">
                                        <v-col cols="4">
                                            <v-row no-gutters class="mb-1">
                                                <v-col cols="3">P. Type</v-col>
                                                <v-col cols="9">
                                                    <v-combobox
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model="customerPayment.type"
                                                        :items="['Cash', 'Bank']"
                                                    >
                                                    </v-combobox>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters class="mb-1" v-if="customerPayment.type == 'Bank'">
                                                <v-col cols="3">Bank Acc.</v-col>
                                                <v-col cols="9">
                                                    <v-combobox
                                                        dense
                                                        outlined
                                                        hide-details
                                                        @focus="$store.dispatch('bankAccount/getBankAccounts')"
                                                        :loading="$store.getters['bankAccount/loadingBankAccount']"
                                                        :items="$store.getters['bankAccount/accounts']"
                                                        item-text="display_text"
                                                        item-value="id"
                                                        v-model="bank"
                                                    >
                                                    </v-combobox>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters class="mb-1">
                                                <v-col cols="3">Customer</v-col>
                                                <v-col cols="9">
                                                    <v-combobox 
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model="selectedCustomer"
                                                        @focus="$store.dispatch('customer/getCustomers')"
                                                        :items="$store.getters['customer/customers']"
                                                        :loading="$store.getters['customer/loading']"
                                                        item-text="display_text"
                                                        item-value="id"
                                                    >
                                                    </v-combobox>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters class="mb-1">
                                                <v-col cols="3">Due</v-col>
                                                <v-col cols="9">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        readonly
                                                        v-model="due"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-row no-gutters class="mb-1"> 
                                                <v-col cols="3" class="text-right pr-2">Date</v-col>
                                                <v-col cols="9">
                                                    <v-menu
                                                        v-model="menu"
                                                        :close-on-content-click="false"
                                                        :nudge-right="0"
                                                        transition="scale-transition"
                                                        offset-y
                                                        min-width="auto"
                                                    >
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field
                                                                dense
                                                                outlined
                                                                hide-details
                                                                v-model="customerPayment.date"
                                                                v-bind="attrs"
                                                                v-on="on"
                                                                autocomplete="off"
                                                                @change="getCustomerPayments"
                                                            >
                                                                <v-icon slot="prepend-inner">mdi-calendar-month</v-icon>
                                                            </v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                            v-model="customerPayment.date"
                                                            @input="menu = false"
                                                            @change="getCustomerPayments"
                                                        >
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters class="mb-1">
                                                <v-col cols="3" class="text-right pr-2">Description</v-col>
                                                <v-col cols="9">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model="customerPayment.note"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters class="mb-1">
                                                <v-col cols="3" class="text-right pr-2">Amount</v-col>
                                                <v-col cols="9">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model="customerPayment.amount"
                                                        :rules="[() => !!customerPayment.amount || 'Enter Amount']"
                                                        type="number"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="3"></v-col>
                                                <v-col cols="9">
                                                    <v-row no-gutters>
                                                         <v-col cols="6" class="pr-1">
                                                            <v-btn type="submit" dark block color="light-blue darken-2" :loading="saveLoading">Save</v-btn>
                                                        </v-col>
                                                        <v-col cols="6">
                                                            <v-btn type="reset" dark block color="deep-orange" @click="resetForm">Clear</v-btn>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
        <v-row dense class="mt-1">
            <v-col cols="12" class="pb-0">
                <v-data-table
                    class="custom-data-table shadow1_important rounded"
                    :headers="customerPaymentHeaders"
                    :items="$store.getters['customer/payments']"
                    :loading="$store.getters['customer/loading']"
                    :search="searchPayment"
                    loading-text="Loading... Please wait"
                >
                    <template v-slot:top>
                        <v-toolbar color="white" :elevation="0" style="border-bottom: 1px solid #ddd !important;">
                            <v-toolbar-title class="subtitle-2">Customer Payment List</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-form class="custom-form">
                                <v-text-field
                                    outlined
                                    dense
                                    hide-details
                                    placeholder="Search customer payment"
                                    append-icon="mdi-magnify"
                                    style="width:300px;"
                                    v-model="searchPayment"
                                >
                                </v-text-field>
                            </v-form>
                            <v-btn @click="print">Print</v-btn>
                        </v-toolbar>
                    </template>
                    <template v-slot:[`item.action`]="{ item }" v-if="userType == 'super_admin' || userType == 'admin'">
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-icon small @click="editCustomerPayment(item)" color="primary" v-on="on">mdi-circle-edit-outline</v-icon>
							</template>
							<span>Edit</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-icon small @click="paymentId = item.id;$refs.confirmDialog.dialog = true" color="error" v-on="on" >mdi-delete-circle-outline</v-icon>
							</template>
							<span>Delete</span>
						</v-tooltip>
					</template>
                </v-data-table>
                <confirm-dialog ref="confirmDialog" @confirm="deleteCustomerPayment"></confirm-dialog>
            </v-col>
        </v-row>

        <div id="printContent" style="display: none;">
            <table class="bordered-table">
                <thead>
                    <tr>
                        <th>Sl</th>
                        <th>Date</th>
                        <th>Payment By</th>
                        <th>Payment Type</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, ind) in $store.getters['customer/payments']" :key="ind">
                        <td class="text-center">{{ ind + 1 }}</td>
                        <td class="text-center">{{ item.date }}</td>
                        <td class="text-center">{{ lodash.get(item, 'customer.name') }}</td>
                        <td class="text-center">{{ item.type }}</td>
                        <td class="text-center">{{ item.amount }}</td>
                        <td class="text-center">{{ item.note }}</td>
                    </tr>
                    <tr>
                        <td colspan="4" style="text-align: right;">Total</td>
                        <td class="text-center">{{ lodash.sumBy($store.getters['customer/payments'], item => +item.amount) }}</td>
                        <td class="text-center"></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </v-container>
</template>

<script>
import confirmDialog from '../../components/confirm-dialog.component.vue'
import useConfig from '../../composable/useConfig'
import { styles, invoiceHeader } from '../../composable/usePrint'

const { hostName } = useConfig()

export default {
    name: 'CustomerPayment',

    components: {
		"confirm-dialog": confirmDialog,
    },

    data: ()=> ({
        menu: false,
        selectedCustomer: null,
        saveLoading: false,
        paymentId: null,
        bank: null,
        customerPayment: {
            id: null,
            customer_id : null,
            account_id : null,
            type: '',
            note: '',
            date: new Date().toISOString().substr(0, 10),
            amount: 0.00,
        },
        due: 0,
        customerPaymentHeaders: [
            { text: 'Sl', value: 'sl' },
            { text: 'Date', value: 'date' },
            { text: 'Payment By', value: 'customer.name' },
            { text: 'Payment Type', value: 'type' },
            { text: 'Amount', value: 'amount' },
            { text: 'Description', value: 'note' },
            { text: 'Action', value: 'action' },
        ],
        searchPayment: '',
        userType: ''
    }),

    watch: {
        async selectedCustomer(customer) {
            if (customer == undefined) return
            this.customerPayment.customer_id = customer.id
            await this.$store.dispatch('customer/getCustomerDue', {customerId: customer.id });
            this.due = this.$store.getters['customer/customerDue'][0].due;
        },

        bank(bank) {
            if(bank == null) return;
            this.customerPayment.account_id = bank.id
        }
    },

    async created() {
        await this.getCustomerPayments();
        let userData = JSON.parse(localStorage.getItem('userData'))
		this.userType = userData.userType;
    },

    methods: {
        async getCustomerPayments() {
            let filer = {
                dateFrom: this.customerPayment.date,
                dateTo: this.customerPayment.date
            }
            await this.$store.dispatch('customer/getCustomerPayments', filer);
        },

        async customerPayments() {
            if(! this.validationForm()) {
                return;
            }

            if(this.customerPayment.type == '') {
                this.$store.dispatch('snackbar/error', "Select payment type");
                return;
            }

            if(this.customerPayment.customer_id == null) {
                this.$store.dispatch('snackbar/error', "Select customer");
                return;
            }

            if(this.customerPayment.amount == 0 || this.customerPayment.amount == null) {
                this.$store.dispatch('snackbar/error', "Payment amount is required");
                return;
            }

            if(this.customerPayment.type == 'Bank' && this.bank == null) {
                this.$store.dispatch('snackbar/error', "Select a bank");
                return;
            }
            
            this.saveLoading = true;

            let success = await this.$store.dispatch('customer/saveCustomerPayment', this.customerPayment);

            if(success) {
                this.resetForm();
                await this.getCustomerPayments();
            }
            this.saveLoading = false;
        },

        editCustomerPayment(payment) {
            Object.keys(this.customerPayment).forEach(key => this.customerPayment[key] = payment[key]);
            this.selectedCustomer = payment.customer;
            this.selectedCustomer.display_text = `${payment.customer.code} - ${payment.customer.name} - ${payment.customer.phone}`
            this.bank = payment.bank_account;
            
            if(payment.bank_account != null) {
                this.bank = payment.bank_account;
                this.bank.display_text = `${payment.bank_account.account_name} - ${payment.bank_account.account_number} - ${payment.bank_account.bank_name}`
            }
        },

        async deleteCustomerPayment () {
            await this.$store.dispatch('customer/deleteCustomerPayment', this.paymentId);
            await this.getCustomerPayments();
            this.$refs.confirmDialog.dialog = false;
        },

        validationForm() {
            let isValid = true;
            this.$refs.customerPaymentForm.validate();
            this.$refs.customerPaymentForm.inputs.forEach(input => {
                if(input.hasError) isValid = false;
            })

            return isValid;
        },

        resetForm() {
            this.$refs.customerPaymentForm.reset();
            this.$refs.customerPaymentForm.resetValidation();
            this.customerPayment.type = ''; 
            this.selectedCustomer = null;
            this.bank = null;
            this.customerPayment.id = null;
            this.customerPayment.date = new Date().toISOString().substr(0, 10);
        },

        async print() {
            let printContent = document.querySelector('#printContent').innerHTML;
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
                    <title>Customer List</title>
                    <style>
                    ${styles}
                    </style>
                </head>
                <body>
                    <div>
                        <div class="container">
                            <div style="text-align:center;">
                                Customer Payment
                            </div>
                            <table style="width:100%;">
                                <thead>
                                    ${invoiceHeader(ImagePath)}
                                </thead>
                                <tbody>
                                    ${printContent}
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
       top: 2px !important;
    }
    .v-icon.v-icon[data-v-1f38b4e5] {
        font-size: 14px !important;
        top: 0px !important; 
    }
    .v-messages {
        flex: 1 1 auto;
        font-size: 12px;
        min-height: 0px !important;
        max-height: 0px!important;
        min-width: 1px;
        position: relative;
    }
</style>
