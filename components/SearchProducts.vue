<template>
  <v-text-field
    v-model="searchQuery"
    prepend-inner-icon="mdi-magnify"
    label="Buscar productos"
    outlined
    color="white"
    dense
    clearable
    @input="search"
    class="mb-4"
  ></v-text-field>
</template>

<script>
export default {
  name: 'SearchProducts',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    search() {
      this.$emit('search', this.searchQuery.toLowerCase())
    }
  }
}
</script>
