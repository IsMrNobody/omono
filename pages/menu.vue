<template>  
  <div>
    <SweetStore />
  </div>
</template>

<script>
import SweetStore from '@/components/tienda/SweetStore'
export default {
  components: {
    SweetStore
  },
  layout: 'store',
  created() {
    this.$store.dispatch('setMerchant')
    this.$store.dispatch('products/setProducts')
  }
}
</script>

<style>

</style>