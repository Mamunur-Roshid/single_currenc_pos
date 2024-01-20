<template>
	<component :is="layout"></component>
</template>

<script>
import defaultLayout from './layouts/Default';
import simpleLayout from './layouts/Simple';
export default {
	components: {
		defaultLayout,
		simpleLayout,
	},

	computed: {
		layout () {
			return this.$route.meta.layout || 'defaultLayout';
		}
	},
}
</script>

<style>

</style>