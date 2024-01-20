<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12">
                <purchase-invoice :purchaseId="this.$route.params.id"></purchase-invoice>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import purchaseInvoice from "../../components/purchase-invoice.vue";

export default {
    name: 'PurchaseInvoice',

    components: {
		"purchase-invoice": purchaseInvoice,
    },
}
</script>
