<template>
    <v-container fluid>
        <v-row no-gutters>
            <v-col cols="12">
                <v-form ref="productForm" @submit.prevent="saveProduct" class="custom-form">
                    <v-card :elevation="1" color="white">
                        <v-row no-gutters>
                            <v-col cols="12">
                                <v-toolbar color="white" :elevation="1">
                                    <v-toolbar-title class="subtitle-3">Product Entry</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text class="py-5 mt-1">
                                    <v-row dense justify="center">
                                        <v-col cols="5">
                                            <v-row no-gutters class="mb-1">
                                                <v-col cols="3">Product Id</v-col>
                                                <v-col cols="8">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        :rules="[v => !!v]"
                                                        v-model.trim="product.code"
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters class="mb-1">
                                                <v-col cols="3">Barcode / Qr code</v-col>
                                                <v-col cols="8">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model.trim="product.barcode"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters class="mb-1">
                                                <v-col cols="3">Product Name</v-col>
                                                <v-col cols="8">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        :rules="[v => !!v]"
                                                        v-model.trim="product.name"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <!-- <v-row no-gutters class="mb-1">
                                                <v-col cols="3">Pact Size</v-col>
                                                <v-col cols="8">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model.trim="product.pack_size"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row> -->
                                            <v-row no-gutters>
                                                <v-col cols="3">Category</v-col>
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
                                                <v-col cols="1">
                                                    <div class="ml-2">
                                                        <category-dialog :icon="true" ref="categoryDialog"></category-dialog>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="3">Brand</v-col>
                                                <v-col cols="8">
                                                    <v-combobox
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model="brand"
                                                        @focus="$store.dispatch('brand/getBrands')"
                                                        :items="$store.getters['brand/brands']"
                                                        :loading="$store.getters['brand/loadingBrands']"
                                                        item-text="name"
                                                        item-value="id"
                                                    >
                                                    </v-combobox>
                                                </v-col>
                                                <v-col cols="1">
                                                    <div class="ml-2">
                                                        <brand-dialog :icon="true" ref="brandDialog"></brand-dialog>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="3">Unit</v-col>
                                                <v-col cols="8">
                                                    <v-combobox
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model="unit"
                                                        @focus="$store.dispatch('unit/getUnits')"
                                                        :items="$store.getters['unit/units']"
                                                        :loading="$store.getters['unit/loadingUnits']"
                                                        item-text="name"
                                                        item-value="id"
                                                    >
                                                    </v-combobox>
                                                </v-col>
                                                <v-col cols="1">
                                                    <div class="ml-2">
                                                        <unit-dialog :icon="true" ref="unitDialog"></unit-dialog>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                        </v-col>

                                        <v-col cols="5">
                                            <v-row no-gutters class="mb-1">
                                                <v-col cols="3" class="text-right pr-2">Purchase Rate</v-col>
                                                <v-col cols="8">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        :rules="[v => !!v]"
                                                        v-model.trim="product.purchase_rate"
                                                        type="number"
                                                        min="0"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters class="mb-1">
                                                <v-col cols="3" class="text-right pr-2">Sale Rate</v-col>
                                                <v-col cols="8">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        :rules="[v => !!v]"
                                                        v-model.trim="product.sale_rate"
                                                        type="number"
                                                        min="0"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters class="mb-1">
                                                <v-col cols="3" class="text-right pr-2">Wholesale Rate</v-col>
                                                <v-col cols="8">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        :rules="[v => !!v]"
                                                        v-model.trim="product.wholesale_rate"
                                                        type="number"
                                                        min="0"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters class="mb-1">
                                                <v-col cols="3" class="text-right pr-2">Low stock qty</v-col>
                                                <v-col cols="8">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model.trim="product.low_stock_qty"
                                                        type="number"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="3"></v-col>
                                                <v-col cols="8">
                                                    <v-row no-gutters>
                                                        <v-col cols="6">
                                                            <v-btn type="submit" :loading="waitingForSave" height="30px" dark block color="light-blue darken-2">Save</v-btn>
                                                        </v-col>
                                                        <v-col cols="6" class="pl-1">
                                                            <v-btn @click="resetForm" height="30px" dark block color="deep-orange">Clear</v-btn>
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
                    class="custom-data-table elevation-1"
                    dense
                    :headers="productHeaders"
                    :items="$store.getters['product/products']"
                    :search="searchProduct"
                    :loading="$store.getters['product/loadingProducts']" 
					loading-text="Loading... Please wait"
                >
                    <template v-slot:top>
                        <v-toolbar dense color="white" :elevation="1">
                            <v-toolbar-title class="subtitle-3">Product List</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-form class="custom-form">
                                <v-text-field
                                    outlined
                                    dense
                                    hide-details
                                    placeholder="Search Product"
                                    append-icon="mdi-magnify"
                                    style="max-width:300px;"
                                    v-model="searchProduct"
                                >
                                </v-text-field>
                            </v-form>
                        </v-toolbar>
                    </template>
                    <template v-slot:[`item.action`]="{ item }" v-if="userType == 'super_admin' || userType == 'admin'">
                        <v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-icon small @click="$router.push(`/barcode-generate/${item.id}`)" color="primary" v-on="on">mdi-barcode</v-icon>
							</template>
							<span>Barcode</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-icon small @click="editProduct(item)" color="primary" v-on="on">mdi-circle-edit-outline</v-icon>
							</template>
							<span>Edit</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on }">
								<v-icon small @click="productId = item.id;$refs.confirmDialog.dialog = true" color="error" v-on="on">mdi-delete-circle-outline</v-icon>
							</template>
							<span>Delete</span>
						</v-tooltip>
					</template>
                </v-data-table>
            </v-col>
        </v-row>

        <delete-confirm ref="confirmDialog" @confirm="deleteProduct"></delete-confirm>

    </v-container>
</template>

<script>
import confirmDialog from "../../components/confirm-dialog.component";
import categoryDialog from "../../components/category-dialog.component";
import brandDialog from "../../components/brand-dialog.component";
import unitDialog from "../../components/unit-dialog.component";

export default {
    name: '',
    components: {
        'delete-confirm': confirmDialog,
        "category-dialog": categoryDialog,
        "brand-dialog": brandDialog,
        "unit-dialog": unitDialog,
    },
    data: ()=> ({
        productHeaders: [
            { text: 'SL', value: 'sl' },
            { text: 'Product Id', value: 'code' },
            { text: 'Barcode / QR code', value: 'barcode' },
            { text: 'Product Name', value: 'name' },
            { text: 'Category', value: 'category.name' },
            { text: 'Brand', value: 'brand.name' },
            // { text: 'Pack Size', value: 'pack_size' },
            { text: 'Unit', value: 'unit.name' },
            { text: 'Purchase Rate', value: 'purchase_rate' },
            { text: 'Sale Rate', value: 'sale_rate' },
            { text: 'Action', value: 'action' },
        ],
        searchProduct: '',
        product: {
            id: null,
            code: '',
            name: '',
            pack_size: '',
            category_id: null,
            brand_id: null,
            unit_id: null,
            purchase_rate: '',
            sale_rate: '',
            wholesale_rate: '',
            low_stock_qty: '',
        },
        category: null,
        brand: null,
        unit: null,
        waitingForSave: false,
        productId: null,
        userType: ''
    }),
    watch: {
        category(category) {
            if(category == undefined) return
            this.product.category_id = category.id;
        },

        brand(brand) {
            if(brand == undefined) return
            this.product.brand_id = brand.id;
        },

        unit(unit) {
            if(unit == undefined) return
            this.product.unit_id = unit.id;
        }
    },
    async created() {
        this.product.code = await this.$store.dispatch('product/generateProductCode');
        await this.$store.dispatch('product/getProducts');
        let userData = JSON.parse(localStorage.getItem('userData'))
		this.userType = userData.userType;
    },
    methods: {
        async saveProduct() {
            if(!this.validateProduct()) {
                return;
            }
     
            this.waitingForSave = true
            let success = await this.$store.dispatch('product/saveProduct', this.product);

            if(success) {
                this.resetForm();
            }

            this.waitingForSave = false
        },

        editProduct(product) {
            Object.keys(this.product).forEach(key => {
                this.product[key] = product[key];
            })

            this.category = product.category;
            this.brand = product.brand;
            this.unit = product.unit;

        },

        deleteProduct() {
            this.$store.dispatch('product/deleteProduct', this.productId);
            this.$refs.confirmDialog.dialog = false;
        },

        validateProduct() {
            let isValid = true;
            
            this.$refs.productForm.validate();

            this.$refs.productForm.inputs.forEach(input => {
                if(input.hasError) isValid = false;
            })

            if(!isValid) return;

            if(this.product.category_id == null) {
                this.$store.dispatch('snackbar/error', 'Select a category');
                isValid = false; 
                return isValid;
            }

            if(this.product.brand_id == null) {
                this.$store.dispatch('snackbar/error', 'Select a brand');
                isValid = false; 
                return isValid;
            }

            if(this.product.unit_id == null) {
                this.$store.dispatch('snackbar/error', 'Select an unit');
                isValid = false; 
                return isValid;
            }

            return isValid;
        },

        async resetForm() {
            Object.keys(this.product).map(k => this.product[k] = '');
            this.$refs.productForm.resetValidation();
            this.product.id = null;
            this.category = null;
            this.brand = null;
            this.unit = null;
            this.product.code = await this.$store.dispatch('product/generateProductCode');
        },
    }
}
</script>

<style lang="scss" scoped>
    .v-icon.v-icon {
       font-size: 18px !important;
       top: -3px !important;
    }
    .v-icon.v-icon[data-v-1f38b4e5] {
        font-size: 14px !important;
        top: 0px !important; 
    }
</style>
