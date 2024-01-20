<template>
    <v-container fluid>
        <v-form class="custom-form white py-3 px-2 shadow1 rounded">
            <v-row dense justify="center" align="center">
                <v-col cols="1">Invoice No</v-col>
                <v-col cols="2">
                    <v-combobox 
                        dense
                        outlined
                        hide-details
                        v-model="purchase"
                        @focus="$store.dispatch('purchase/getInvoices')"
                        :items="$store.getters['purchase/invoices']"
                        :loading="$store.getters['purchase/loadingPurchase']"
                        item-text="invoice"
                        item-value="id"
                    >
                    </v-combobox>
                </v-col>
            </v-row>
        </v-form>
        <v-divider></v-divider>
        <v-row justify="center">
            <v-col cols="12">
                <purchase-invoice :purchaseId="purchaseId"  v-if="showInvoice"></purchase-invoice>
                <div class="white shadow1 rounded" v-else>
                    <div class="no_result">
                        <div class="img"></div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import purchaseInvoice from "../../components/purchase-invoice.vue";

export default {
    name: 'PurInvoice',

    components: {
		"purchase-invoice": purchaseInvoice,
    },

    data: () => ({
        purchase: null,
        purchaseId: null,
        showInvoice: false
    }),

    watch: {
        async purchase(purchase) {
            if(purchase == undefined) return;
            this.purchaseId = purchase.id;
            this.viewInvoice();
        }
    },

    methods: {
        async viewInvoice(){
            this.showInvoice = false;
            await new Promise(r => setTimeout(r, 500));
            this.showInvoice = true;
      }
    }
}
</script>

<style scoped>

</style>
