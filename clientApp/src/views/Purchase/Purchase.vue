<template>
    <v-container fluid class="white rounded shadow1 py-2 mb-3">
        <v-row no-gutters class="pt-2">
            <v-col cols="12">
                <v-form ref="purchaseForm" class="custom-form" @submit.prevent="savePurchase">
                    <v-row dense>
                        <v-col cols="12" md="9">
                            <v-row dense>
                                <v-col cols="6">
                                    <v-card 
                                        height="100%"
                                        :elevation="0"
                                        class="white rounded"
                                    >
                                        <v-toolbar :elevation="0">
                                            <v-toolbar-title class="subtitle-1">Supplier Information</v-toolbar-title>
                                        </v-toolbar>

                                        <v-card-text class="py-1">
                                            <v-row align="center">
                                                <v-col cols="3" class="py-1 caption">Supplier</v-col>
                                                <v-col cols="8" class="py-0 pa-0 pl-3 pr-3">
                                                    <v-combobox 
                                                        dense
                                                        outlined
                                                        hide-details
                                                        @focus="$store.dispatch('supplier/getSuppliers')"
                                                        :items="$store.getters['supplier/suppliers']"
                                                        :loading="$store.getters['supplier/loadingSuppliers']"
                                                        item-text="display_text"
                                                        item-value="id"
                                                        v-model="supplier"
                                                    >
                                                    </v-combobox>
                                                </v-col>
                                                <v-col cols="1" class="py-0 pa-0" style="margin-left:-12px">
                                                    <v-btn to="/supplier" target="_blank" fab x-small depressed class="text_bg_fave">
                                                        <v-icon color="white">mdi-plus</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                            <v-row class="align-center">
                                                <v-col cols="3" class="py-1 caption">Phone</v-col>
                                                <v-col cols="9" class="py-0">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model="phone"
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row class="align-center">
                                                <v-col cols="3" class="py-1 caption">Address</v-col>
                                                <v-col cols="9" class="py-0">
                                                    <v-textarea
                                                        dense
                                                        outlined
                                                        hide-details
                                                        height="8vh"
                                                        v-model="address"
                                                        readonly
                                                    ></v-textarea>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                                <v-col cols="6">
                                    <v-card 
                                        :elevation="0"
                                        color="white"
                                    >
                                        <v-toolbar :elevation="0">
                                            <v-toolbar-title class="subtitle-1">Product Information</v-toolbar-title>
                                        </v-toolbar>

                                        <v-card-text class="py-1">
                                            <v-form ref="productForm" class="custom-form" @submit.prevent="addToCart">
                                                <v-row class="align-center">
                                                    <v-col cols="3" class="py-1 caption">Product</v-col>
                                                    <v-col cols="8" class="py-0 pa-0 pl-3 pr-3">
                                                        <v-combobox 
                                                            dense
                                                            outlined
                                                            hide-details
                                                            @focus="$store.dispatch('product/getProducts')"
                                                            :items="$store.getters['product/products']"
                                                            :loading="$store.getters['product/loadingProducts']"
                                                            item-text="display_text"
                                                            item-value="id"
                                                            v-model="product"
                                                            ref="product"
                                                        >
                                                        </v-combobox>
                                                    </v-col>
                                                    <v-col cols="1" class="py-0 pa-0" style="margin-left:-12px">
                                                        <v-btn  to="/product" target="_blank" fab x-small dark depressed class="text_bg_fave">
                                                            <v-icon color="white">mdi-plus</v-icon>
                                                        </v-btn>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="align-center">
                                                    <v-col cols="3" class="py-1 caption">Pur. Rate</v-col>
                                                    <v-col cols="4" class="py-0">
                                                        <v-text-field
                                                            dense
                                                            outlined
                                                            hide-details
                                                            type="number"
                                                            min="0"
                                                            :rules="[v => !!v]"
                                                            v-model.number="product.purchase_rate"
                                                            @input="productTotal"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2" class="py-0 pa-0 caption">Quantity</v-col>
                                                    <v-col cols="3" class="py-0 pa-0 pr-3">
                                                        <v-text-field
                                                            dense
                                                            outlined
                                                            hide-details
                                                            type="number"
                                                            min="0"
                                                            :rules="[v => !!v]"
                                                            v-model.number="product.quantity"
                                                            @input="productTotal"
                                                            ref="quantity"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row class="align-center">
                                                    <v-col cols="3" class="py-1 caption">Sale Rate</v-col>
                                                    <v-col cols="4" class="py-0">
                                                        <v-text-field
                                                            dense
                                                            outlined
                                                            hide-details
                                                            type="number"
                                                            min="0"
                                                            readonly
                                                            v-model="product.sale_rate"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="2" class="py-1 caption">Total</v-col>
                                                    <v-col cols="3" class="py-0 pa-0 pr-3">
                                                        <v-text-field
                                                            dense
                                                            outlined
                                                            hide-details
                                                            type="number"
                                                            min="0"
                                                            readonly
                                                            v-model="product.total"
                                                        ></v-text-field>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-spacer></v-spacer>
                                                    <div class="pr-3 mt-4">
                                                        <v-btn height="35px" type="submit" class="text_bg_fave">Add</v-btn>
                                                    </div>
                                                </v-row>
                                            </v-form>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="12">
                                    <v-card :elevation="0" class="px-0">
                                        <v-toolbar color="white" :elevation="0">
                                            <v-toolbar-title class="subtitle-1">Product Information</v-toolbar-title>
                                        </v-toolbar>
                                        <v-card-text class="py-1 pa-0 pl-1 pr-1">
                                            <v-simple-table dense>
                                                <template v-slot:default>
                                                    <thead>
                                                        <tr>
                                                            <th>SL</th>
                                                            <th>Product Id</th>
                                                            <th>Product Name</th>
                                                            <th>Pur. Rate</th>
                                                            <th>Quantity</th>
                                                            <th>Total</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(cart, ind) in cart" :key="ind">
                                                            <td class="text-center" style="width:5%">{{ind+1}}</td>
                                                            <td class="text-center" style="width: 13%">{{cart.code}}</td>
                                                            <td>{{cart.name}}</td>
                                                            <td class="text-right" style="width:12%">{{cart.purchase_rate}}</td>
                                                            <td class="text-right" style="width:10%">{{cart.quantity}}</td>
                                                            <td class="text-right" style="width:10%">{{ cart.total}}</td>
                                                            <td class="text-center" style="width:5%">
                                                                <v-icon small @click="editCart(ind)" color="primary">mdi-circle-edit-outline</v-icon>
                                                                <v-icon small @click="deleteCart(ind)"  v-if="editCartIndex != ind" color="error">mdi-delete-circle-outline</v-icon>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </template>
                                            </v-simple-table>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>

                        <v-col cols="12" md="3">
                            <v-row dense>
                                <v-col cols="12">
                                    <v-card 
                                        :elevation="0"
                                        color="white"
                                    >
                                        <v-toolbar :elevation="0">
                                            <v-toolbar-title class="subtitle-1">Invoice Information</v-toolbar-title>
                                        </v-toolbar>
                                        <v-card-text class="py-1 pa-0 pl-2 pr-2">
                                            <v-row no-gutters>
                                                <v-col cols="4" class="py-1 caption">Invoice</v-col>
                                                <v-col cols="8" class="py-0">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model="purchase.invoice"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="4" class="py-1 caption">Date</v-col>
                                                <v-col cols="8" class="py-0">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model="purchase.date"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="4" class="py-1 caption">Employee</v-col>
                                                <v-col cols="8" class="py-0">
                                                    <v-combobox 
                                                        dense
                                                        outlined
                                                        hide-details
                                                        @focus="$store.dispatch('employee/getEmployees')"
                                                        :items="$store.getters['employee/employees']"
                                                        :loading="$store.getters['employee/loadingEmployees']"
                                                        item-text="display_text"
                                                        item-value="id"
                                                        v-model="employee"
                                                    >
                                                    </v-combobox>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="4" class="py-1 caption">PO No</v-col>
                                                <v-col cols="8" class="py-0">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model="purchase.po_no"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="4" class="py-1 caption">PO Date</v-col>
                                                <v-col cols="8" class="py-0">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        v-model="purchase.po_date"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="4" class="py-1 caption">Sub Total</v-col>
                                                <v-col cols="8" class="py-0">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        type="number"
                                                        min="0"
                                                        readonly
                                                        v-model.number="purchase.sub_total"
                                                        @input="calculateTotal"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="4" class="py-1 caption">Vat</v-col>
                                                <v-col cols="3" class="py-0">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        type="number"
                                                        min="0"
                                                        v-model.number="vatPercent"
                                                        @input="calculateTotal"
                                                        id="vat"
                                                        
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="1"><span class="ml-1">%</span></v-col>
                                                <v-col cols="4" class="py-0">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        type="number"
                                                        min="0"
                                                        v-model.number="purchase.vat"
                                                        @input="calculateTotal"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="4" class="py-1 caption">Discount</v-col>
                                                <v-col cols="3" class="py-0">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        type="number"
                                                        min="0"
                                                        v-model.number="disPercent"
                                                        @input="calculateTotal"
                                                        id="discount"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="1" class="py-0"><span class="ml-1">%</span></v-col>
                                                <v-col cols="4" class="py-0">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        type="number"
                                                        min="0"
                                                        v-model.number="purchase.discount"
                                                        @input="calculateTotal"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="4" class="py-1 caption">Transport</v-col>
                                                <v-col cols="8" class="py-0">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        type="number"
                                                        min="0"
                                                        v-model.number="purchase.transport"
                                                        @input="calculateTotal"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="4" class="py-1 caption">Total</v-col>
                                                <v-col cols="8" class="py-0">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        type="number"
                                                        min="0"
                                                        v-model.number="purchase.total"
                                                        @input="calculateTotal"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="4" class="py-1 caption">Paid</v-col>
                                                <v-col cols="8" class="py-0">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        type="number"
                                                        min="0"
                                                        v-model.number="purchase.paid"
                                                        @input="calculateTotal"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="4" class="py-1 caption">Due</v-col>
                                                <v-col cols="4" class="py-0">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        readonly
                                                        v-model.number="purchase.due"
                                                        @input="calculateTotal"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="4" class="pl-2">
                                                    <v-text-field
                                                        dense
                                                        outlined
                                                        hide-details
                                                        readonly
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="4" class="py-1"></v-col>
                                                <v-col cols="4" class="py-1">
                                                    <v-btn type="submit" block class="text_bg_fave" :loading="loadingForSave">Save</v-btn>
                                                </v-col>
                                                <v-col cols="4" class="pl-2 py-1">
                                                    <v-btn  dark block color="deep-orange">Clear</v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import swal from 'sweetalert'
export default {
    name: 'Purchase',

    data: ()=> ({
        purchase: {
            id: null,
            invoice: '',
            date: new Date().toISOString().substr(0, 10),
            supplier_id: null,
            employee_id: null,
            po_no: '',
            po_date: new Date().toISOString().substr(0, 10),
            sub_total: 0,
            vat: 0,
            discount: 0,
            transport: 0,
            total: 0,
            paid: 0,
            due: 0,
        },
        vatPercent: 0.0,
        disPercent: 0.0,
        supplier: null,
        employee: null,
        phone: '',
        address: '',
        product: {
            id: '',
            code: '',
            display_text: 'Select product',
            name: '',
            purchase_rate: '',
            sale_rate: '',
            quantity: '',
            total: ''
        },
        cart: [],
        editCartIndex: null,
        modal: false,
        loadingForSave: false
    }),

    watch: {
        supplier(supplier) {
            if(supplier == undefined) return;
            this.purchase.supplier_id = supplier.id;
            this.phone = supplier.phone;
            this.address = supplier.address;
        },
        product(product) {
            if(product == undefined) return;
            this.product = product;
            if(product.id != '') {
                this.$refs.quantity.focus();
            }
        },
        employee(employee) {
            if(employee == undefined) return;
            this.purchase.employee_id = employee.id;
        }
    },

    async created() {
        this.purchase.invoice = await this.$store.dispatch('purchase/generatePurchaseCode');

        if (this.$route.params.id != undefined) {
            await this.$store.dispatch('purchase/getPurchases', {id: this.$route.params.id});
            await this.getPurchases();
        }
    },
    methods: {
        productTotal() {
            this.product.purchase_rate = this.product.purchase_rate == null || this.product.purchase_rate == '' ? 0: this.product.purchase_rate;
            this.product.quantity = this.product.quantity == null || this.product.quantity == '' ? 0: this.product.quantity;
            this.product.total = (+this.product.purchase_rate * +this.product.quantity).toFixed(2);
        },

        addToCart() {
            if (!this.$refs.productForm.validate()) return;

            if(this.product.id == '' || this.product.id == null) {
                this.$store.dispatch('snackbar/error', 'Select a product');
                return;
            }
            if(this.product.purchase_rate == 0 || this.product.purchase_rate == '' || this.product.purchase_rate == null) {
                this.$store.dispatch('snackbar/error', 'Purchase rate is required');
                return;
            }
            if(this.product.quantity == 0 || this.product.quantity == '' || this.product.quantity == null) {
                this.$store.dispatch('snackbar/error', 'Purchase quantity is required');
                return;
            }

            let product = {
                id: this.product.id,
                code: this.product.code,
                name: this.product.name,
                purchase_rate: this.product.purchase_rate,
                sale_rate: this.product.sale_rate,
                quantity: this.product.quantity,
                total: this.product.total,
                display_text: this.product.display_text
            }

            if(this.editCartIndex != null) {
                let editProduct = this.cart[this.editCartIndex];
                let checkIfExist = this.cart.findIndex(p => (p.id == product.id) && (p.id != editProduct.id));

                if (checkIfExist > -1) {
                    this.$store.dispatch("snackbar/error", "Product already existed in cart");
                    return;
                }

				this.cart[this.editCartIndex] = product;

            } else {
                let cartIndex = this.cart.findIndex(p => p.id == this.product.id)
                if(cartIndex > -1) {
                    this.$store.dispatch("snackbar/error", "Product already existed in cart");
                    return;
                }

                this.cart.unshift(product);
            }

            this.calculateTotal();
            this.clearProduct();
            this.$refs.product.focus();
        },

        editCart(index) {
            let cartProduct = this.cart[index];
            this.editCartIndex = index;
            this.product = cartProduct;
        },

        deleteCart(ind) {
            this.cart.splice(ind, 1);
            this.calculateTotal();
        },

        calculateTotal() {
            this.purchase.sub_total = this.cart.reduce((p, c) => {return +p + +c.total}, 0).toFixed(2);

            if(event.target.id == "vat") {
                this.purchase.vat = ((+this.purchase.sub_total * +this.vatPercent) / 100).toFixed(2);
            } else {
                this.vatPercent = ((+this.purchase.vat / +this.purchase.sub_total) * 100).toFixed(2);
            }

            if(event.target.id == "discount") {
                this.purchase.discount = ((+this.purchase.sub_total * +this.disPercent) / 100).toFixed(2);
            } else {
                this.disPercent = ((+this.purchase.discount / +this.purchase.sub_total) * 100).toFixed(2);
            }

            this.purchase.total = ((+this.purchase.sub_total + +this.purchase.vat + +this.purchase.transport) - +this.purchase.discount).toFixed(2);
            this.purchase.due = (this.purchase.total - +this.purchase.paid).toFixed(2);
        },

        clearProduct() {
            this.product = {
                id: '',
                display_text: 'Select product',
                name: '',
                purchase_rate: '',
                quantity: '',
                total: ''
            }
            this.editCartIndex = null;

            this.$refs.productForm.resetValidation()
        },

        async savePurchase() {
            if(!this.validatePurchase()) {
                return;
            }
     
            let data = {
                purchase: this.purchase,
                cart: this.cart
            }
            this.loadingForSave = true;

            let res = await this.$store.dispatch('purchase/savePurchase', data);
            if(res) {
                this.resetForm();
                if(res.isSuccess) {
                    this.resetForm();
                    swal({
                        title: 'Purchase success! Do you want to show invoice ?',
                        icon: 'success',
                        buttons: true
                    }).then(response => {
                        if (response) this.$router.push(`/purchase-invoice/${res.id}`)
                    })
                }
            }

            this.loadingForSave = false
        },

        validatePurchase() {
            let isValid = true;
            
            this.$refs.purchaseForm.validate();

            this.$refs.purchaseForm.inputs.forEach(input => {
                if(input.hasError) isValid = false;
            })

            if(!isValid) return;

            if(this.purchase.supplier_id == null) {
                this.$store.dispatch('snackbar/error', 'Select a supplier');
                isValid = false; 
                return isValid;
            }

            if(this.cart.length == 0) {
                this.$store.dispatch('snackbar/error', 'Cart is empty');
                isValid = false; 
                return isValid;
            }

            if(this.purchase.employee_id == null) {
                this.$store.dispatch('snackbar/error', 'Select an employee');
                isValid = false; 
                return isValid;
            }

            return isValid;
        },

        async resetForm() {
            this.cart = [];
            Object.keys(this.purchase).map(k => {
                if(typeof(this.purchase[key]) == "string"){
                    this.purchase[key] = '';
                } else if(typeof(this.purchase[key]) == "number"){
                    this.purchase[key] = 0;
                }
            });
            this.$refs.purchaseForm.resetValidation();
            this.purchase.id = null;
            this.address = '';
            this.phone = '';
            this.supplier = null;
            this.employee = null;
            this.purchase.date = new Date().toISOString().substr(0, 10),
            this.purchase.po_date = new Date().toISOString().substr(0, 10),
            this.purchase.invoice = await this.$store.dispatch('purchase/generatePurchaseCode');
        },

        async getPurchases() {
            let purchase = await this.$store.getters['purchase/purchases'][0]
            this.purchase.id = purchase.id;
            this.purchase.invoice = purchase.invoice;
            this.purchase.date = purchase.date;
            this.purchase.supplier_id = purchase.supplier_id;
            this.purchase.po_no = purchase.po_no;
            this.purchase.po_date = purchase.po_date;
            this.purchase.po_date = purchase.po_date;
            this.purchase.sub_total = purchase.sub_total;
            this.purchase.vat = purchase.vat;
            this.purchase.discount = purchase.discount;
            this.purchase.transport = purchase.transport;
            this.purchase.total = purchase.total;
            this.purchase.paid = purchase.paid;
            this.purchase.due = purchase.due;

            this.supplier = purchase?.supplier;
            this.supplier.display_text = `${purchase?.supplier.code} - ${purchase?.supplier.name} - ${purchase?.supplier.phone}`;
           
            this.employee = purchase?.employee;
            this.employee.display_text = `${purchase?.employee.emp_id} - ${purchase?.employee.name}`;

            purchase?.purchase_details.forEach(item => {
                this.cart.unshift({
                    id: item.product.id,
                    code: item.product.code,
                    name: item.product.name,
                    purchase_rate: item.purchase_rate,
                    sale_rate: item.sale_rate,
                    quantity: item.quantity,
                    total: item.total,
                    display_text: `${item.product.code} - ${item.product.name}`
                })
            });
        }
    }

}
</script>

<style lang="scss" scoped>
    .product-name {
        font-size: 12px;
        line-height: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
    .v-data-table--dense > .v-data-table__wrapper > table > tbody > tr > td {
        height: 18px !important;
        border: 1px solid #ccc;
    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
        color: #000 !important;
        font-weight: 600 !important;
        border: 1px solid #ccc !important;
        text-align: center;
        height: 25px !important;
        letter-spacing: 0.7px;
    }
    .caption {
        font-weight: 500 !important;
        color: #000 !important;
    }
    .container {
        padding: 2px 12px !important;
    }
</style>
