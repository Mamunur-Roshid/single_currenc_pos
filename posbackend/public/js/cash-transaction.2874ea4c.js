(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["cash-transaction"],{"2a38":function(t,e,n){},"2b5d":function(t,e,n){"use strict";n("7db0"),n("c975"),n("fb6a"),n("a434"),n("b0c0"),n("d3b7"),n("25f0"),n("8a79");var a=n("5530"),s=(n("2bfd"),n("b974")),i=(n("4de4"),n("d81d"),n("45fc"),n("498a"),n("8654")),o=n("d9f7"),r=n("80d2"),c=Object(a["a"])(Object(a["a"])({},s["b"]),{},{offsetY:!0,offsetOverflow:!0,transition:!1}),l=s["a"].extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(t,e,n){return n.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:s["a"].options.props.menuProps.type,default:function(){return c}},noFilter:Boolean,searchInput:{type:String,default:void 0}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var t=this;return this.selectedItems.map((function(e){return t.getValue(e)}))},hasDisplayedItems:function(){var t=this;return this.hideSelected?this.filteredItems.some((function(e){return!t.hasItem(e)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var t=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(e){var n=Object(r["s"])(e,t.itemText),a=null!=n?String(n):"";return t.filter(e,String(t.internalSearch),a)}))},internalSearch:{get:function(){return this.lazySearch},set:function(t){this.lazySearch=t,this.$emit("update:search-input",t)}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var t=s["a"].options.computed.$_menuProps.call(this);return t.contentClass="v-autocomplete__content ".concat(t.contentClass||"").trim(),Object(a["a"])(Object(a["a"])({},c),t)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var t=this;return this.multiple?null:this.selectedItems.find((function(e){return t.valueComparator(t.getValue(e),t.getValue(t.internalValue))}))},listData:function(){var t=s["a"].options.computed.listData.call(this);return t.props=Object(a["a"])(Object(a["a"])({},t.props),{},{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),t}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(t){t?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.updateSelf())},isMenuActive:function(t){!t&&this.hasSlot&&(this.lazySearch=void 0)},items:function(t,e){e&&e.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!t.length||this.activateMenu()},searchInput:function(t){this.lazySearch=t},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},destroyed:function(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged:function(t,e){var n=this;t!==e&&(this.setMenuIndex(-1),this.$nextTick((function(){n.internalSearch&&(1===t.length||n.autoSelectFirst)&&(n.$refs.menu.getTiles(),n.setMenuIndex(0))})))},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(t){this.searchIsDirty||(this.multiple&&t===r["z"].left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&t===r["z"].right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:t!==r["z"].backspace&&t!==r["z"].delete||this.deleteCurrentItem())},deleteCurrentItem:function(){var t=this.selectedIndex,e=this.selectedItems[t];if(this.isInteractive&&!this.getDisabled(e)){var n=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===n){var a=this.selectedItems.length,s=t!==a-1?t:t-1,i=this.selectedItems[s];i?this.selectItem(e):this.setValue(this.multiple?[]:void 0),this.selectedIndex=s}else this.selectedIndex=n}},clearableCallback:function(){this.internalSearch=void 0,s["a"].options.methods.clearableCallback.call(this)},genInput:function(){var t=i["a"].options.methods.genInput.call(this);return t.data=Object(o["a"])(t.data,{attrs:{"aria-activedescendant":Object(r["q"])(this.$refs.menu,"activeTile.id"),autocomplete:Object(r["q"])(t.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),t},genInputSlot:function(){var t=s["a"].options.methods.genInputSlot.call(this);return t.data.attrs.role="combobox",t},genSelections:function(){return this.hasSlot||this.multiple?s["a"].options.methods.genSelections.call(this):[]},onClick:function(t){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(t.target)||this.activateMenu())},onInput:function(t){if(!(this.selectedIndex>-1)&&t.target){var e=t.target,n=e.value;e.value&&this.activateMenu(),this.internalSearch=n,this.badInput=e.validity&&e.validity.badInput}},onKeyDown:function(t){var e=t.keyCode;s["a"].options.methods.onKeyDown.call(this,t),this.changeSelectedIndex(e)},onSpaceDown:function(t){},onTabDown:function(t){s["a"].options.methods.onTabDown.call(this,t),this.updateSelf()},onUpDown:function(t){t.preventDefault(),this.activateMenu()},selectItem:function(t){s["a"].options.methods.selectItem.call(this,t),this.setSearch()},setSelectedItems:function(){s["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var t=this;this.$nextTick((function(){t.multiple&&t.internalSearch&&t.isMenuActive||(t.internalSearch=!t.selectedItems.length||t.multiple||t.hasSlot?null:t.getText(t.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(t){return this.selectedValues.indexOf(this.getValue(t))>-1},onCopy:function(t){if(-1!==this.selectedIndex){var e=this.selectedItems[this.selectedIndex],n=this.getText(e);t.clipboardData.setData("text/plain",n),t.clipboardData.setData("text/vnd.vuetify.autocomplete.item+plain",n),t.preventDefault()}}}});e["a"]=l.extend({name:"v-combobox",props:{delimiters:{type:Array,default:function(){return[]}},returnObject:{type:Boolean,default:!0}},data:function(){return{editingIndex:-1}},computed:{computedCounterValue:function(){return this.multiple?this.selectedItems.length:(this.internalSearch||"").toString().length},hasSlot:function(){return s["a"].options.computed.hasSlot.call(this)||this.multiple},isAnyValueAllowed:function(){return!0},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!!this.$slots["no-data"]&&!this.hideNoData)}},methods:{onInternalSearchChanged:function(t){if(t&&this.multiple&&this.delimiters.length){var e=this.delimiters.find((function(e){return t.endsWith(e)}));null!=e&&(this.internalSearch=t.slice(0,t.length-e.length),this.updateTags())}this.updateMenuDimensions()},genInput:function(){var t=l.options.methods.genInput.call(this);return delete t.data.attrs.name,t.data.on.paste=this.onPaste,t},genChipSelection:function(t,e){var n=this,i=s["a"].options.methods.genChipSelection.call(this,t,e);return this.multiple&&(i.componentOptions.listeners=Object(a["a"])(Object(a["a"])({},i.componentOptions.listeners),{},{dblclick:function(){n.editingIndex=e,n.internalSearch=n.getText(t),n.selectedIndex=-1}})),i},onChipInput:function(t){s["a"].options.methods.onChipInput.call(this,t),this.editingIndex=-1},onEnterDown:function(t){t.preventDefault(),this.getMenuIndex()>-1||this.$nextTick(this.updateSelf)},onFilteredItemsChanged:function(t,e){this.autoSelectFirst&&l.options.methods.onFilteredItemsChanged.call(this,t,e)},onKeyDown:function(t){var e=t.keyCode;s["a"].options.methods.onKeyDown.call(this,t),this.multiple&&e===r["z"].left&&0===this.$refs.input.selectionStart?this.updateSelf():e===r["z"].enter&&this.onEnterDown(t),this.changeSelectedIndex(e)},onTabDown:function(t){if(this.multiple&&this.internalSearch&&-1===this.getMenuIndex())return t.preventDefault(),t.stopPropagation(),this.updateTags();l.options.methods.onTabDown.call(this,t)},selectItem:function(t){this.editingIndex>-1?this.updateEditing():l.options.methods.selectItem.call(this,t)},setSelectedItems:function(){null==this.internalValue||""===this.internalValue?this.selectedItems=[]:this.selectedItems=this.multiple?this.internalValue:[this.internalValue]},setValue:function(t){var e;s["a"].options.methods.setValue.call(this,null!=(e=t)?e:this.internalSearch)},updateEditing:function(){var t=this.internalValue.slice();t[this.editingIndex]=this.internalSearch,this.setValue(t),this.editingIndex=-1},updateCombobox:function(){var t=Boolean(this.$scopedSlots.selection)||this.hasChips;t&&!this.searchIsDirty||(this.internalSearch!==this.getText(this.internalValue)&&this.setValue(),t&&(this.internalSearch=void 0))},updateSelf:function(){this.multiple?this.updateTags():this.updateCombobox()},updateTags:function(){var t=this.getMenuIndex();if(!(t<0)||this.searchIsDirty){if(this.editingIndex>-1)return this.updateEditing();var e=this.selectedItems.indexOf(this.internalSearch);if(e>-1){var n=this.internalValue.slice();n.splice(e,1),this.setValue(n)}if(t>-1)return this.internalSearch=null;this.selectItem(this.internalSearch),this.internalSearch=null}},onPaste:function(t){if(this.multiple&&!this.searchIsDirty){var e=t.clipboardData.getData("text/vnd.vuetify.autocomplete.item+plain");e&&-1===this.findExistingIndex(e)&&(t.preventDefault(),s["a"].options.methods.selectItem.call(this,e))}}}})},"2bfd":function(t,e,n){},"3a2f":function(t,e,n){"use strict";n("a9e3");var a=n("ade3"),s=(n("9734"),n("4ad4")),i=n("a9ad"),o=n("16b7"),r=n("b848"),c=n("75eb"),l=n("f573"),h=n("f2e7"),u=n("80d2"),d=n("d9bd"),f=n("58df");e["a"]=Object(f["a"])(i["a"],o["a"],r["a"],c["a"],l["a"],h["a"]).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,n=t.content,a=!this.bottom&&!this.left&&!this.top&&!this.right,s=!1!==this.attach?e.offsetLeft:e.left,i=0;return this.top||this.bottom||a?i=s+e.width/2-n.width/2:(this.left||this.right)&&(i=s+(this.right?e.width:-n.width)+(this.right?10:-10)),this.nudgeLeft&&(i-=parseInt(this.nudgeLeft)),this.nudgeRight&&(i+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(i,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,n=t.content,a=!1!==this.attach?e.offsetTop:e.top,s=0;return this.top||this.bottom?s=a+(this.bottom?e.height:-n.height)+(this.bottom?10:-10):(this.left||this.right)&&(s=a+e.height/2-n.height/2),this.nudgeTop&&(s-=parseInt(this.nudgeTop)),this.nudgeBottom&&(s+=parseInt(this.nudgeBottom)),"".concat(this.calcYOverflow(s+this.pageYOffset),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(u["h"])(this.maxWidth),minWidth:Object(u["h"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(u["u"])(this,"activator",!0)&&Object(d["b"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=s["a"].options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===u["z"].esc&&(t.getActivator(e),t.runDelay("close"))},e},genTransition:function(){var t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(a["a"])(t,this.contentClass,!0),Object(a["a"])(t,"menuable__content__active",this.isActive),Object(a["a"])(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}})},9276:function(t,e,n){"use strict";var a=n("f1d3"),s=n.n(a);s.a},9734:function(t,e,n){},a776:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{fluid:""}},[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"12"}},[n("v-form",{ref:"cashTransactionForm",staticClass:"custom-form",on:{submit:function(e){return e.preventDefault(),t.saveCashTransaction(e)}}},[n("v-card",{attrs:{color:"white shadow1 rounded mb-4"}},[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"12"}},[n("v-toolbar",{staticStyle:{"border-bottom":"1px solid #ddd !important"},attrs:{elevation:0}},[n("v-toolbar-title",{staticClass:"subtitle-1"},[t._v("Cash Transaction Entry")])],1),n("v-card-text",{staticClass:"py-0 mt-1"},[n("v-row",{attrs:{justify:"center"}},[n("v-col",{attrs:{cols:"4"}},[n("v-row",{staticClass:"mb-1 align-center",attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"3"}},[t._v("Tnx. ID")]),n("v-col",{attrs:{cols:"9"}},[n("v-text-field",{attrs:{dense:"",outlined:"","hide-details":"",readonly:""},model:{value:t.cashTransaction.code,callback:function(e){t.$set(t.cashTransaction,"code",e)},expression:"cashTransaction.code"}})],1)],1),n("v-row",{staticClass:"mb-1 align-center",attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"3"}},[t._v("Tnx. Type")]),n("v-col",{attrs:{cols:"9"}},[n("v-combobox",{attrs:{dense:"",outlined:"","hide-details":"",rules:[function(t){return!!t}],"item-text":"account_name","item-value":"id",items:["Cash Receive","Cash Payment"]},model:{value:t.cashTransaction.type,callback:function(e){t.$set(t.cashTransaction,"type",e)},expression:"cashTransaction.type"}})],1)],1),n("v-row",{staticClass:"mb-1 align-center",attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"3"}},[t._v("Account")]),n("v-col",{attrs:{cols:"9"}},[n("v-combobox",{attrs:{dense:"",outlined:"","hide-details":"",loading:t.$store.getters["expense/loadingExpense"],items:t.$store.getters["expense/expenses"],rules:[function(t){return!!t}],"item-text":"name","item-value":"id"},on:{focus:function(e){return t.$store.dispatch("expense/getExpenses")}},model:{value:t.selectedAccount,callback:function(e){t.selectedAccount=e},expression:"selectedAccount"}})],1)],1)],1),n("v-col",{attrs:{cols:"4"}},[n("v-row",{staticClass:"mb-1 align-center",attrs:{"no-gutters":""}},[n("v-col",{staticClass:"text-right pr-2",attrs:{cols:"3"}},[t._v("Tnx. Date")]),n("v-col",{attrs:{cols:"9"}},[n("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":0,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,s=e.attrs;return[n("v-text-field",t._g(t._b({attrs:{dense:"",outlined:"","hide-details":"",autocomplete:"off"},model:{value:t.cashTransaction.date,callback:function(e){t.$set(t.cashTransaction,"date",e)},expression:"cashTransaction.date"}},"v-text-field",s,!1),a),[n("v-icon",{attrs:{slot:"prepend-inner"},slot:"prepend-inner"},[t._v("mdi-calendar-month")])],1)]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[n("v-date-picker",{on:{input:function(e){t.menu=!1},change:t.getTransactions},model:{value:t.cashTransaction.date,callback:function(e){t.$set(t.cashTransaction,"date",e)},expression:"cashTransaction.date"}})],1)],1)],1),n("v-row",{staticClass:"mb-1 align-center",attrs:{"no-gutters":""}},[n("v-col",{staticClass:"text-right pr-2",attrs:{cols:"3"}},[t._v("Description")]),n("v-col",{attrs:{cols:"9"}},[n("v-text-field",{attrs:{dense:"",outlined:"","hide-details":""},model:{value:t.cashTransaction.note,callback:function(e){t.$set(t.cashTransaction,"note","string"===typeof e?e.trim():e)},expression:"cashTransaction.note"}})],1)],1),n("v-row",{staticClass:"mb-1 align-center",attrs:{"no-gutters":""}},[n("v-col",{staticClass:"text-right pr-2",attrs:{cols:"3"}},[t._v("Amount")]),n("v-col",{attrs:{cols:"9"}},[n("v-text-field",{attrs:{dense:"",outlined:"","hide-details":"",rules:[function(t){return!!t}]},model:{value:t.cashTransaction.amount,callback:function(e){t.$set(t.cashTransaction,"amount",t._n(e))},expression:"cashTransaction.amount"}})],1)],1),n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"3"}}),n("v-col",{attrs:{cols:"9"}},[n("v-row",{attrs:{"no-gutters":""}},[n("v-col",{staticClass:"pr-1",attrs:{cols:"6"}},[n("v-btn",{attrs:{type:"submit",loading:t.logading,dark:"",block:"",color:"text_bg_fave"}},[t._v("Save")])],1),n("v-col",{attrs:{cols:"6"}},[n("v-btn",{attrs:{dark:"",block:"",color:"deep-orange"},on:{click:t.resetForm}},[t._v("Clear")])],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)],1),n("v-row",{staticClass:"mt-1",attrs:{dense:""}},[n("v-col",{staticClass:"pb-0 shadow1 rounded white",attrs:{cols:"12"}},[n("v-data-table",{staticClass:"custom-data-table",attrs:{headers:t.transactionHeaders,loading:t.$store.getters["cashTransaction/loadingTransaction"],items:t.$store.getters["cashTransaction/transactions"],search:t.searchCashTransactions},scopedSlots:t._u([{key:"top",fn:function(){return[n("v-toolbar",{attrs:{dense:"",color:"white",elevation:0}},[n("v-toolbar-title",{staticClass:"subtitle-1"},[t._v("Cash Transaction List")]),n("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),n("v-form",{staticClass:"custom-form"},[n("v-text-field",{staticStyle:{width:"300px"},attrs:{outlined:"",dense:"","hide-details":"",placeholder:"Search Cash Transaction","append-icon":"mdi-magnify"},model:{value:t.searchCashTransactions,callback:function(e){t.searchCashTransactions=e},expression:"searchCashTransactions"}})],1)],1)]},proxy:!0},"super_admin"==t.userType||"admin"==t.userType?{key:"item.action",fn:function(e){var a=e.item;return[n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on;return[n("v-icon",t._g({attrs:{small:"",color:"primary"},on:{click:function(e){return t.editCashTransaction(a)}}},s),[t._v("mdi-circle-edit-outline")])]}}],null,!0)},[n("span",[t._v("Edit")])]),n("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on;return[n("v-icon",t._g({attrs:{small:"",color:"error"},on:{click:function(e){t.deleteId=a.id,t.$refs.confirmDialog.dialog=!0}}},s),[t._v("mdi-delete-circle-outline")])]}}],null,!0)},[n("span",[t._v("Delete")])])]}}:null],null,!0)})],1)],1),n("delete-confirm",{ref:"confirmDialog",on:{confirm:t.deleteCashTransaction}})],1)},s=[],i=(n("d81d"),n("fb6a"),n("b64b"),n("96cf"),n("1da1")),o=n("b49a"),r={name:"CashTransaction",components:{"delete-confirm":o["a"]},data:function(){return{transactionHeaders:[{text:"Tnx. ID",value:"code"},{text:"Account Name",value:"expense.name"},{text:"Date",value:"date"},{text:"Description",value:"note"},{text:"Received Amount",value:"received_amount"},{text:"Paid Amount",value:"paid_amount"},{text:"Saved By",value:"added_by.name"},{text:"Action",value:"action"}],searchCashTransactions:"",cashTransaction:{id:null,code:"",type:"",account_id:null,amount:0,date:(new Date).toISOString().slice(0,10),note:""},selectedAccount:null,logading:!1,deleteId:null,menu:!1,userType:""}},watch:{selectedAccount:function(t){void 0!=t&&(this.cashTransaction.account_id=t.id)}},created:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("cashTransaction/generateTransactionCode");case 2:return t.cashTransaction.code=e.sent,e.next=5,t.getTransactions();case 5:n=JSON.parse(localStorage.getItem("userData")),t.userType=n.userType;case 7:case"end":return e.stop()}}),e)})))()},methods:{getTransactions:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n={dateFrom:t.cashTransaction.date,dateTo:t.cashTransaction.date},e.next=3,t.$store.dispatch("cashTransaction/getTransactions",n);case 3:case"end":return e.stop()}}),e)})))()},saveCashTransaction:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.$refs.cashTransactionForm.validate()){e.next=2;break}return e.abrupt("return");case 2:return t.logading=!0,e.next=5,t.$store.dispatch("cashTransaction/saveTransaction",t.cashTransaction);case 5:if(n=e.sent,!n){e.next=10;break}return e.next=9,t.getTransactions();case 9:t.resetForm();case 10:t.logading=!1;case 11:case"end":return e.stop()}}),e)})))()},editCashTransaction:function(t){var e=this;Object.keys(this.cashTransaction).map((function(n){return e.cashTransaction[n]=t[n]})),this.selectedAccount=t.expense,"Cash Receive"==t.type&&(this.cashTransaction.amount=t.received_amount),"Cash Payment"==t.type&&(this.cashTransaction.amount=t.paid_amount)},deleteCashTransaction:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("cashTransaction/deleteTransaction",t.deleteId);case 2:return e.next=4,t.getTransactions();case 4:t.$refs.confirmDialog.dialog=!1;case 5:case"end":return e.stop()}}),e)})))()},resetForm:function(){this.selectedAccount=null,this.cashTransaction.type="",this.cashTransaction.amount=0,this.cashTransaction.date=(new Date).toISOString().slice(0,10),this.cashTransaction.note="",this.$refs.cashTransactionForm.resetValidation()}}},c=r,l=(n("ddec"),n("2877")),h=n("6544"),u=n.n(h),d=n("8336"),f=n("b0af"),p=n("99d9"),m=n("62ad"),v=n("2b5d"),g=n("a523"),b=n("8fea"),x=n("2e4b"),I=n("ce7e"),T=n("4bd4"),y=n("132d"),S=n("e449"),C=n("0fd9"),w=n("8654"),D=n("71d9"),_=n("2a7f"),k=n("3a2f"),V=Object(l["a"])(c,a,s,!1,null,"20ebe2d2",null);e["default"]=V.exports;u()(V,{VBtn:d["a"],VCard:f["a"],VCardText:p["b"],VCol:m["a"],VCombobox:v["a"],VContainer:g["a"],VDataTable:b["a"],VDatePicker:x["a"],VDivider:I["a"],VForm:T["a"],VIcon:y["a"],VMenu:S["a"],VRow:C["a"],VTextField:w["a"],VToolbar:D["a"],VToolbarTitle:_["a"],VTooltip:k["a"]})},b49a:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-dialog",{attrs:{"max-width":"320",light:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card",{staticClass:"text-center"},[n("div",{staticClass:"pt-5"},[n("v-icon",{staticClass:"cust-icon",attrs:{"x-large":"",color:"red",dark:""}},[t._v(" mdi-alert ")])],1),n("v-card-title",{staticClass:"justify-center py-0"},[n("h4",[t._v("Confirmation !")])]),n("v-card-text",{staticClass:"py-0"},[t._v("Are you sure to "+t._s(t.text)+"?")]),n("v-card-actions",{staticClass:"justify-center"},[n("v-btn",{attrs:{color:"primary",dark:""},on:{click:function(e){return t.$emit("confirm")}}},[t._v("Yes")]),n("v-btn",{attrs:{color:"error",dark:""},on:{click:function(e){t.dialog=!1}}},[t._v("No")])],1)],1)],1)},s=[],i={data:function(){return{dialog:!1,text:"delete"}}},o=i,r=(n("9276"),n("2877")),c=n("6544"),l=n.n(c),h=n("8336"),u=n("b0af"),d=n("99d9"),f=n("169a"),p=n("132d"),m=Object(r["a"])(o,a,s,!1,null,null,null);e["a"]=m.exports;l()(m,{VBtn:h["a"],VCard:u["a"],VCardActions:d["a"],VCardText:d["b"],VCardTitle:d["c"],VDialog:f["a"],VIcon:p["a"]})},ddec:function(t,e,n){"use strict";var a=n("2a38"),s=n.n(a);s.a},f1d3:function(t,e,n){}}]);
//# sourceMappingURL=cash-transaction.2874ea4c.js.map