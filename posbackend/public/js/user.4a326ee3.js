(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user"],{1516:function(t,e,s){"use strict";var i=s("f1f2"),n=s.n(i);n.a},"2b5d":function(t,e,s){"use strict";s("7db0"),s("c975"),s("fb6a"),s("a434"),s("b0c0"),s("d3b7"),s("25f0"),s("8a79");var i=s("5530"),n=(s("2bfd"),s("b974")),a=(s("4de4"),s("d81d"),s("45fc"),s("498a"),s("8654")),r=s("d9f7"),o=s("80d2"),l=Object(i["a"])(Object(i["a"])({},n["b"]),{},{offsetY:!0,offsetOverflow:!0,transition:!1}),c=n["a"].extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(t,e,s){return s.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:n["a"].options.props.menuProps.type,default:function(){return l}},noFilter:Boolean,searchInput:{type:String,default:void 0}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return Object(i["a"])(Object(i["a"])({},n["a"].options.computed.classes.call(this)),{},{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var t=this;return this.selectedItems.map((function(e){return t.getValue(e)}))},hasDisplayedItems:function(){var t=this;return this.hideSelected?this.filteredItems.some((function(e){return!t.hasItem(e)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var t=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(e){var s=Object(o["s"])(e,t.itemText),i=null!=s?String(s):"";return t.filter(e,String(t.internalSearch),i)}))},internalSearch:{get:function(){return this.lazySearch},set:function(t){this.lazySearch=t,this.$emit("update:search-input",t)}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var t=n["a"].options.computed.$_menuProps.call(this);return t.contentClass="v-autocomplete__content ".concat(t.contentClass||"").trim(),Object(i["a"])(Object(i["a"])({},l),t)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var t=this;return this.multiple?null:this.selectedItems.find((function(e){return t.valueComparator(t.getValue(e),t.getValue(t.internalValue))}))},listData:function(){var t=n["a"].options.computed.listData.call(this);return t.props=Object(i["a"])(Object(i["a"])({},t.props),{},{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),t}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(t){t?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.updateSelf())},isMenuActive:function(t){!t&&this.hasSlot&&(this.lazySearch=void 0)},items:function(t,e){e&&e.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!t.length||this.activateMenu()},searchInput:function(t){this.lazySearch=t},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},destroyed:function(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged:function(t,e){var s=this;t!==e&&(this.setMenuIndex(-1),this.$nextTick((function(){s.internalSearch&&(1===t.length||s.autoSelectFirst)&&(s.$refs.menu.getTiles(),s.setMenuIndex(0))})))},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(t){this.searchIsDirty||(this.multiple&&t===o["z"].left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&t===o["z"].right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:t!==o["z"].backspace&&t!==o["z"].delete||this.deleteCurrentItem())},deleteCurrentItem:function(){var t=this.selectedIndex,e=this.selectedItems[t];if(this.isInteractive&&!this.getDisabled(e)){var s=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===s){var i=this.selectedItems.length,n=t!==i-1?t:t-1,a=this.selectedItems[n];a?this.selectItem(e):this.setValue(this.multiple?[]:void 0),this.selectedIndex=n}else this.selectedIndex=s}},clearableCallback:function(){this.internalSearch=void 0,n["a"].options.methods.clearableCallback.call(this)},genInput:function(){var t=a["a"].options.methods.genInput.call(this);return t.data=Object(r["a"])(t.data,{attrs:{"aria-activedescendant":Object(o["q"])(this.$refs.menu,"activeTile.id"),autocomplete:Object(o["q"])(t.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),t},genInputSlot:function(){var t=n["a"].options.methods.genInputSlot.call(this);return t.data.attrs.role="combobox",t},genSelections:function(){return this.hasSlot||this.multiple?n["a"].options.methods.genSelections.call(this):[]},onClick:function(t){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(t.target)||this.activateMenu())},onInput:function(t){if(!(this.selectedIndex>-1)&&t.target){var e=t.target,s=e.value;e.value&&this.activateMenu(),this.internalSearch=s,this.badInput=e.validity&&e.validity.badInput}},onKeyDown:function(t){var e=t.keyCode;n["a"].options.methods.onKeyDown.call(this,t),this.changeSelectedIndex(e)},onSpaceDown:function(t){},onTabDown:function(t){n["a"].options.methods.onTabDown.call(this,t),this.updateSelf()},onUpDown:function(t){t.preventDefault(),this.activateMenu()},selectItem:function(t){n["a"].options.methods.selectItem.call(this,t),this.setSearch()},setSelectedItems:function(){n["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var t=this;this.$nextTick((function(){t.multiple&&t.internalSearch&&t.isMenuActive||(t.internalSearch=!t.selectedItems.length||t.multiple||t.hasSlot?null:t.getText(t.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(t){return this.selectedValues.indexOf(this.getValue(t))>-1},onCopy:function(t){if(-1!==this.selectedIndex){var e=this.selectedItems[this.selectedIndex],s=this.getText(e);t.clipboardData.setData("text/plain",s),t.clipboardData.setData("text/vnd.vuetify.autocomplete.item+plain",s),t.preventDefault()}}}});e["a"]=c.extend({name:"v-combobox",props:{delimiters:{type:Array,default:function(){return[]}},returnObject:{type:Boolean,default:!0}},data:function(){return{editingIndex:-1}},computed:{computedCounterValue:function(){return this.multiple?this.selectedItems.length:(this.internalSearch||"").toString().length},hasSlot:function(){return n["a"].options.computed.hasSlot.call(this)||this.multiple},isAnyValueAllowed:function(){return!0},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!!this.$slots["no-data"]&&!this.hideNoData)}},methods:{onInternalSearchChanged:function(t){if(t&&this.multiple&&this.delimiters.length){var e=this.delimiters.find((function(e){return t.endsWith(e)}));null!=e&&(this.internalSearch=t.slice(0,t.length-e.length),this.updateTags())}this.updateMenuDimensions()},genInput:function(){var t=c.options.methods.genInput.call(this);return delete t.data.attrs.name,t.data.on.paste=this.onPaste,t},genChipSelection:function(t,e){var s=this,a=n["a"].options.methods.genChipSelection.call(this,t,e);return this.multiple&&(a.componentOptions.listeners=Object(i["a"])(Object(i["a"])({},a.componentOptions.listeners),{},{dblclick:function(){s.editingIndex=e,s.internalSearch=s.getText(t),s.selectedIndex=-1}})),a},onChipInput:function(t){n["a"].options.methods.onChipInput.call(this,t),this.editingIndex=-1},onEnterDown:function(t){t.preventDefault(),this.getMenuIndex()>-1||this.$nextTick(this.updateSelf)},onFilteredItemsChanged:function(t,e){this.autoSelectFirst&&c.options.methods.onFilteredItemsChanged.call(this,t,e)},onKeyDown:function(t){var e=t.keyCode;n["a"].options.methods.onKeyDown.call(this,t),this.multiple&&e===o["z"].left&&0===this.$refs.input.selectionStart?this.updateSelf():e===o["z"].enter&&this.onEnterDown(t),this.changeSelectedIndex(e)},onTabDown:function(t){if(this.multiple&&this.internalSearch&&-1===this.getMenuIndex())return t.preventDefault(),t.stopPropagation(),this.updateTags();c.options.methods.onTabDown.call(this,t)},selectItem:function(t){this.editingIndex>-1?this.updateEditing():c.options.methods.selectItem.call(this,t)},setSelectedItems:function(){null==this.internalValue||""===this.internalValue?this.selectedItems=[]:this.selectedItems=this.multiple?this.internalValue:[this.internalValue]},setValue:function(t){var e;n["a"].options.methods.setValue.call(this,null!=(e=t)?e:this.internalSearch)},updateEditing:function(){var t=this.internalValue.slice();t[this.editingIndex]=this.internalSearch,this.setValue(t),this.editingIndex=-1},updateCombobox:function(){var t=Boolean(this.$scopedSlots.selection)||this.hasChips;t&&!this.searchIsDirty||(this.internalSearch!==this.getText(this.internalValue)&&this.setValue(),t&&(this.internalSearch=void 0))},updateSelf:function(){this.multiple?this.updateTags():this.updateCombobox()},updateTags:function(){var t=this.getMenuIndex();if(!(t<0)||this.searchIsDirty){if(this.editingIndex>-1)return this.updateEditing();var e=this.selectedItems.indexOf(this.internalSearch);if(e>-1){var s=this.internalValue.slice();s.splice(e,1),this.setValue(s)}if(t>-1)return this.internalSearch=null;this.selectItem(this.internalSearch),this.internalSearch=null}},onPaste:function(t){if(this.multiple&&!this.searchIsDirty){var e=t.clipboardData.getData("text/vnd.vuetify.autocomplete.item+plain");e&&-1===this.findExistingIndex(e)&&(t.preventDefault(),n["a"].options.methods.selectItem.call(this,e))}}}})},"2bfd":function(t,e,s){},"3a2f":function(t,e,s){"use strict";s("a9e3");var i=s("ade3"),n=(s("9734"),s("4ad4")),a=s("a9ad"),r=s("16b7"),o=s("b848"),l=s("75eb"),c=s("f573"),u=s("f2e7"),d=s("80d2"),h=s("d9bd"),p=s("58df");e["a"]=Object(p["a"])(a["a"],r["a"],o["a"],l["a"],c["a"],u["a"]).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,s=t.content,i=!this.bottom&&!this.left&&!this.top&&!this.right,n=!1!==this.attach?e.offsetLeft:e.left,a=0;return this.top||this.bottom||i?a=n+e.width/2-s.width/2:(this.left||this.right)&&(a=n+(this.right?e.width:-s.width)+(this.right?10:-10)),this.nudgeLeft&&(a-=parseInt(this.nudgeLeft)),this.nudgeRight&&(a+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(a,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,s=t.content,i=!1!==this.attach?e.offsetTop:e.top,n=0;return this.top||this.bottom?n=i+(this.bottom?e.height:-s.height)+(this.bottom?10:-10):(this.left||this.right)&&(n=i+e.height/2-s.height/2),this.nudgeTop&&(n-=parseInt(this.nudgeTop)),this.nudgeBottom&&(n+=parseInt(this.nudgeBottom)),"".concat(this.calcYOverflow(n+this.pageYOffset),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(d["h"])(this.maxWidth),minWidth:Object(d["h"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(d["u"])(this,"activator",!0)&&Object(h["b"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=n["a"].options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===d["z"].esc&&(t.getActivator(e),t.runDelay("close"))},e},genTransition:function(){var t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(i["a"])(t,this.contentClass,!0),Object(i["a"])(t,"menuable__content__active",this.isActive),Object(i["a"])(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}})},"87c5":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{fluid:""}},[s("v-row",{attrs:{"no-gutters":""}},[s("v-col",{attrs:{cols:"12"}},[s("v-form",{ref:"userForm",staticClass:"custom-form",on:{submit:function(e){return e.preventDefault(),t.saveUser(e)}}},[s("v-card",{staticClass:"shadow1 white rounded mb-5 pb-5 px-3"},[s("v-row",{attrs:{"no-gutters":""}},[s("v-col",{attrs:{cols:"12"}},[s("v-toolbar",{staticStyle:{"border-bottom":"1px solid #ddd !important"},attrs:{elevation:0}},[s("v-toolbar-title",{staticClass:"subtitle-1"},[t._v("Create User")])],1),s("v-card-text",{staticClass:"py-0 mt-1"},[s("v-row",{attrs:{dense:"",justify:"center"}},[s("v-col",{attrs:{cols:"4"}},[s("v-row",{staticClass:"mb-1",attrs:{"no-gutters":""}},[s("v-col",{attrs:{cols:"3"}},[t._v("Full Name")]),s("v-col",{attrs:{cols:"9"}},[s("v-text-field",{attrs:{dense:"",outlined:"","hide-details":"",rules:[function(t){return!!t}]},model:{value:t.user.name,callback:function(e){t.$set(t.user,"name","string"===typeof e?e.trim():e)},expression:"user.name"}})],1)],1),s("v-row",{staticClass:"mb-1",attrs:{"no-gutters":""}},[s("v-col",{attrs:{cols:"3"}},[t._v("Phone")]),s("v-col",{attrs:{cols:"9"}},[s("v-text-field",{attrs:{dense:"",outlined:"","hide-details":"",rules:[function(t){return!!t}]},model:{value:t.user.phone,callback:function(e){t.$set(t.user,"phone","string"===typeof e?e.trim():e)},expression:"user.phone"}})],1)],1),s("v-row",{staticClass:"mb-1",attrs:{"no-gutters":""}},[s("v-col",{attrs:{cols:"3"}},[t._v("E-Mail")]),s("v-col",{attrs:{cols:"9"}},[s("v-text-field",{attrs:{dense:"",outlined:"","hide-details":""},model:{value:t.user.email,callback:function(e){t.$set(t.user,"email","string"===typeof e?e.trim():e)},expression:"user.email"}})],1)],1),s("v-row",{staticClass:"mb-1",attrs:{"no-gutters":""}},[s("v-col",{attrs:{cols:"3"}},[t._v("Branch")]),s("v-col",{attrs:{cols:"9"}},[s("v-combobox",{attrs:{dense:"",outlined:"","hide-details":"",items:t.$store.getters["branch/branches"],loading:t.$store.getters["branch/loading"],"item-text":"name","item-value":"id"},on:{focus:function(e){return t.$store.dispatch("branch/getBranches")}},model:{value:t.branch,callback:function(e){t.branch=e},expression:"branch"}})],1)],1),s("v-row",{staticClass:"mb-1",attrs:{"no-gutters":""}},[s("v-col",{attrs:{cols:"3"}},[t._v("User Type")]),s("v-col",{attrs:{cols:"9"}},[s("v-combobox",{attrs:{dense:"",outlined:"","hide-details":"",rules:[function(t){return!!t}],items:t.userTypes,"item-text":"display_text","item-value":"type",disabled:"super_admin"==t.selectedUserType},model:{value:t.selectedUserType,callback:function(e){t.selectedUserType=e},expression:"selectedUserType"}})],1)],1)],1),s("v-col",{attrs:{cols:"4"}},[s("v-row",{staticClass:"mb-1",attrs:{"no-gutters":""}},[s("v-col",{staticClass:"text-right pr-2",attrs:{cols:"3"}},[t._v("Username")]),s("v-col",{attrs:{cols:"9"}},[s("v-text-field",{attrs:{dense:"",outlined:"","hide-details":"",rules:[function(t){return!!t}]},model:{value:t.user.username,callback:function(e){t.$set(t.user,"username","string"===typeof e?e.trim():e)},expression:"user.username"}})],1)],1),s("v-row",{staticClass:"mb-1",attrs:{"no-gutters":""}},[s("v-col",{staticClass:"text-right pr-2",attrs:{cols:"3"}},[t._v("Password")]),s("v-col",{attrs:{cols:"9"}},[s("v-text-field",{attrs:{dense:"",outlined:"","hide-details":"",rules:[function(){return!!t.user.password},t.validatePassword.length],type:"password"},model:{value:t.user.password,callback:function(e){t.$set(t.user,"password","string"===typeof e?e.trim():e)},expression:"user.password"}})],1)],1),s("v-row",{staticClass:"mb-1",attrs:{"no-gutters":""}},[s("v-col",{staticClass:"text-right pr-2",attrs:{cols:"3"}},[t._v("Re-type")]),s("v-col",{attrs:{cols:"9"}},[s("v-text-field",{attrs:{dense:"",outlined:"","hide-details":"",rules:[function(){return!!t.retype||"Confirm your password"},function(){return t.user.password==t.retype||"Password did not match"}],type:"password"},model:{value:t.retype,callback:function(e){t.retype="string"===typeof e?e.trim():e},expression:"retype"}})],1)],1),s("v-row",{attrs:{"no-gutters":""}},[s("v-col",{attrs:{cols:"3"}}),s("v-col",{attrs:{cols:"9"}},[s("v-row",{attrs:{"no-gutters":""}},[s("v-col",{staticClass:"pr-1",attrs:{cols:"6"}},[s("v-btn",{attrs:{type:"submit",loading:t.waitingForSave,block:"",color:"text_bg_fave"}},[t._v("Save")])],1),s("v-col",{attrs:{cols:"6"}},[s("v-btn",{attrs:{dark:"",block:"",color:"deep-orange"},on:{click:t.resetForm}},[t._v("Clear")])],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)],1),s("v-row",{staticClass:"mt-1",attrs:{dense:""}},[s("v-col",{staticClass:"pb-0",attrs:{cols:"12"}},[s("v-data-table",{staticClass:"custom-data-table shadow1 px-4 py-4 rounded",attrs:{headers:t.userHeaders,items:t.$store.getters["user/users"],search:t.searchUser,loading:t.$store.getters["user/loadingUser"],"loading-text":"Loading... Please wait"},scopedSlots:t._u([{key:"top",fn:function(){return[s("v-toolbar",{staticStyle:{"border-bottom":"1px solid #ddd !important","margin-bottom":"10px"},attrs:{dense:"",color:"white",elevation:0}},[s("v-toolbar-title",{staticClass:"subtitle-1"},[t._v("User List")]),s("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),s("v-form",{staticClass:"custom-form"},[s("v-text-field",{staticStyle:{width:"300px"},attrs:{outlined:"",dense:"","hide-details":"",placeholder:"Search User","append-icon":"mdi-magnify"},model:{value:t.searchUser,callback:function(e){t.searchUser=e},expression:"searchUser"}})],1)],1)]},proxy:!0},"super_admin"==t.userType||"admin"==t.userType?{key:"item.action",fn:function(e){var i=e.item;return[s("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[s("v-icon",t._g({attrs:{small:"",color:"primary"},on:{click:function(e){return t.editUser(i)}}},n),[t._v("mdi-circle-edit-outline")])]}}],null,!0)},[s("span",[t._v("Edit")])]),"super_admin"!=i.user_type?s("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[s("v-icon",t._g({attrs:{small:"",color:"error"},on:{click:function(e){t.userId=i.id,t.$refs.confirmDialog.dialog=!0}}},n),[t._v("mdi-delete-circle-outline")])]}}],null,!0)},[s("span",[t._v("Delete")])]):t._e(),"super_admin"!=i.user_type&&"admin"!=i.user_type?s("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[s("v-icon",t._g({attrs:{small:"",color:"#000"},on:{click:function(e){return t.openPermissionDialog(i)}}},n),[t._v("mdi-account-key")])]}}],null,!0)},[s("span",[t._v("Permission")])]):t._e()]}}:null],null,!0)})],1)],1),s("delete-confirm",{ref:"confirmDialog",on:{confirm:t.deleteUser}}),s("user-permission",{ref:"permissionDialog",attrs:{user:t.selectedUserForPermission}})],1)},n=[],a=(s("4160"),s("d81d"),s("b64b"),s("159b"),s("96cf"),s("1da1")),r=s("b49a"),o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-row",{attrs:{justify:"center"}},[s("v-dialog",{attrs:{scrollable:"",persistent:"","max-width":"600px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[s("v-card",[s("v-card-title",{attrs:{color:"primary"}},[t._v(" User Access Permissions "),s("v-spacer"),s("v-btn",{attrs:{dark:"",icon:"",color:"error"},on:{click:function(e){t.dialog=!1}}},[t._v(" X ")])],1),s("v-divider"),s("v-card-text",{staticStyle:{height:"400px"}},[s("v-container",[s("v-treeview",{attrs:{selectable:"",items:t.$store.getters["layout/menuItems"],"item-key":"name","item-val":"name","open-all":"","selection-type":"independent","return-object":"","item-disabled":"locked"},scopedSlots:t._u([{key:"label",fn:function(e){var i=e.item;return[i.icon?s("v-icon",{staticClass:"mr-1",attrs:{small:"",color:i.color}},[t._v(" "+t._s(i.icon)+" ")]):t._e(),t._v(" "+t._s(i.name)+" ")]}}]),model:{value:t.permissions,callback:function(e){t.permissions=e},expression:"permissions"}})],1)],1),s("v-divider"),s("v-card-actions",[s("v-spacer"),s("v-btn",{staticClass:"mr-3",attrs:{color:"blue darken-1",dark:"",loading:t.loading},on:{click:t.saveUserPermissions}},[t._v(" Save Permission ")])],1)],1)],1)],1)},l=[],c={props:["user"],data:function(){return{dialog:!1,permissions:[],loading:!1}},watch:{user:function(t){if(null!=t){var e=JSON.parse(t.permissions);this.permissions=null!=e?e:[]}}},methods:{saveUserPermissions:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var s,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,s={permissions:t.permissions,id:t.user.id},e.next=4,t.$store.dispatch("user/userPermission",s);case 4:i=e.sent,i&&(t.dialog=!1),t.loading=!1,t.permissions=[];case 8:case"end":return e.stop()}}),e)})))()}}},u=c,d=s("2877"),h=s("6544"),p=s.n(h),m=s("8336"),f=s("b0af"),v=s("99d9"),g=s("a523"),b=s("169a"),y=s("ce7e"),x=s("132d"),I=s("0fd9"),S=s("2fa4"),w=s("eb2a"),C=Object(d["a"])(u,o,l,!1,null,"78adbb38",null),_=C.exports;p()(C,{VBtn:m["a"],VCard:f["a"],VCardActions:v["a"],VCardText:v["b"],VCardTitle:v["c"],VContainer:g["a"],VDialog:b["a"],VDivider:y["a"],VIcon:x["a"],VRow:I["a"],VSpacer:S["a"],VTreeview:w["a"]});var D=s("ad72"),T={name:"User",mixins:[D["a"]],components:{"delete-confirm":r["a"],"user-permission":_},data:function(){return{userHeaders:[{text:"SL",value:"sl"},{text:"Name",value:"name"},{text:"Username",value:"username"},{text:"Branch",value:"branch.name"},{text:"Phone",value:"phone"},{text:"E-Mail",value:"email"},{text:"Type",value:"user_type"},{text:"Action",value:"action"}],searchUser:"",userTypes:[{display_text:"Super Admin",type:"super_admin"},{display_text:"Admin",type:"admin"},{display_text:"User",type:"user"}],selectedUserType:null,user:{id:null,name:"",username:"",phone:"",email:"",password:"",branch_id:null},waitingForSave:!1,retype:"",userEditId:null,userId:null,selectedUserForPermission:null,branch:null,userType:""}},watch:{branch:function(t){void 0!=t&&(this.user.branch_id=t.id)}},created:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("user/getUsers");case 2:s=JSON.parse(localStorage.getItem("userData")),t.userType=s.userType;case 4:case"end":return e.stop()}}),e)})))()},methods:{saveUser:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.$refs.userForm.validate()){e.next=2;break}return e.abrupt("return");case 2:if(null!=t.branch){e.next=5;break}return t.$store.dispatch("snackbar/error","Select a branch"),e.abrupt("return");case 5:return t.waitingForSave=!0,null!=t.selectedUserType&&(t.user.user_type=String(t.selectedUserType.type).toLowerCase()),e.next=9,t.$store.dispatch("user/saveUser",t.user);case 9:s=e.sent,s&&t.resetForm(),t.waitingForSave=!1;case 12:case"end":return e.stop()}}),e)})))()},editUser:function(t){var e=this;this.userEditId=t.id,this.userTypes.forEach((function(s){s.type==String(t.user_type).toLowerCase()&&(e.selectedUserType=s)})),Object.keys(this.user).map((function(s){return e.user[s]=t[s]})),this.branch=t.branch},deleteUser:function(){this.$store.dispatch("user/deleteUser",this.userId),this.$refs.confirmDialog.dialog=!1},resetForm:function(){var t=this;this.selectedUserType=null,Object.keys(this.user).map((function(e){return t.user[e]=""})),this.userEditId=null,this.retype="",this.user.id=null,this.$refs.userForm.resetValidation(),this.branch=null},validatePhone:function(t){return""!=t||null!=this.userEditId},openPermissionDialog:function(t){this.selectedUserForPermission=t,this.$refs.permissionDialog.dialog=!0}}},k=T,V=(s("1516"),s("62ad")),O=s("2b5d"),$=s("8fea"),U=s("4bd4"),j=s("8654"),F=s("71d9"),A=s("2a7f"),P=s("3a2f"),E=Object(d["a"])(k,i,n,!1,null,"17320d68",null);e["default"]=E.exports;p()(E,{VBtn:m["a"],VCard:f["a"],VCardText:v["b"],VCol:V["a"],VCombobox:O["a"],VContainer:g["a"],VDataTable:$["a"],VDivider:y["a"],VForm:U["a"],VIcon:x["a"],VRow:I["a"],VTextField:j["a"],VToolbar:F["a"],VToolbarTitle:A["a"],VTooltip:P["a"]})},"8a79":function(t,e,s){"use strict";var i=s("23e7"),n=s("06cf").f,a=s("50c4"),r=s("5a34"),o=s("1d80"),l=s("ab13"),c=s("c430"),u="".endsWith,d=Math.min,h=l("endsWith"),p=!c&&!h&&!!function(){var t=n(String.prototype,"endsWith");return t&&!t.writable}();i({target:"String",proto:!0,forced:!p&&!h},{endsWith:function(t){var e=String(o(this));r(t);var s=arguments.length>1?arguments[1]:void 0,i=a(e.length),n=void 0===s?i:d(a(s),i),l=String(t);return u?u.call(e,l,n):e.slice(n-l.length,n)===l}})},9276:function(t,e,s){"use strict";var i=s("f1d3"),n=s.n(i);n.a},9734:function(t,e,s){},b49a:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-dialog",{attrs:{"max-width":"320",light:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[s("v-card",{staticClass:"text-center"},[s("div",{staticClass:"pt-5"},[s("v-icon",{staticClass:"cust-icon",attrs:{"x-large":"",color:"red",dark:""}},[t._v(" mdi-alert ")])],1),s("v-card-title",{staticClass:"justify-center py-0"},[s("h4",[t._v("Confirmation !")])]),s("v-card-text",{staticClass:"py-0"},[t._v("Are you sure to "+t._s(t.text)+"?")]),s("v-card-actions",{staticClass:"justify-center"},[s("v-btn",{attrs:{color:"primary",dark:""},on:{click:function(e){return t.$emit("confirm")}}},[t._v("Yes")]),s("v-btn",{attrs:{color:"error",dark:""},on:{click:function(e){t.dialog=!1}}},[t._v("No")])],1)],1)],1)},n=[],a={data:function(){return{dialog:!1,text:"delete"}}},r=a,o=(s("9276"),s("2877")),l=s("6544"),c=s.n(l),u=s("8336"),d=s("b0af"),h=s("99d9"),p=s("169a"),m=s("132d"),f=Object(o["a"])(r,i,n,!1,null,null,null);e["a"]=f.exports;c()(f,{VBtn:u["a"],VCard:d["a"],VCardActions:h["a"],VCardText:h["b"],VCardTitle:h["c"],VDialog:p["a"],VIcon:m["a"]})},f1d3:function(t,e,s){},f1f2:function(t,e,s){}}]);
//# sourceMappingURL=user.4a326ee3.js.map