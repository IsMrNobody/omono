<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      hide-overlay
      fullscreen
      transition="dialog-bottom-transition"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          absolute
          fab
          color="tercero"
          large
          right
          top
          dark
          v-bind="attrs"
          @click="value2(0)"
          v-on="on"
        >
          <v-icon large color="secondary">mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-container>
        <v-col>
          <v-card flat max-width="500" class="mx-auto primary" elevation="10">
            <v-toolbar
              dark
              color="secondary"
            >
              <v-btn
                icon
                dark
                @click="dialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>{{ producto.name + ' ' + chipInfo.title}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-container>
                <v-row justify="center">                  
                  <v-col sm="8" cols>
                    <v-card height="200" width="100vw" flat class="mx-auto">
                      <v-img height="100%" :src="producto.img.url"></v-img>
                    </v-card>
                    <v-card-actions class="mt-5">
                      <p class="display-1">
                        <span class="white--text">
                          $ {{ total }}
                        </span>
                      </p>
                      <v-spacer></v-spacer>
                      <v-btn
                        outlined
                        x-large
                        color="tercero"
                        @click="addCart()"
                      >
                        Agregar
                        <v-icon>mdi-cart</v-icon>
                      </v-btn>
                    </v-card-actions>
                    <v-card-title>{{ producto.name }}</v-card-title>
                    <!-- <v-card-subtitle>{{ producto.category }}</v-card-subtitle> -->
                    <v-card-text>
                      <p class="text-subtitle-1 grey--text">{{ producto.description }}</p>
                      <!-- <p class="display-1">$ {{ producto.price }}</p> -->
                    </v-card-text>
                    <v-card-text>
                      <p>Porciones:</p>
                      <v-chip-group                        
                        v-model="selection"
                        active-class="secondary white--text"
                        column
                      >                   
                        <v-chip 
                          v-for="(chip, i) in producto.portion"
                          :key="i"
                          @click="value2(i)"
                        >
                          {{ chip.title }}
                        </v-chip>
                      </v-chip-group>
                      <p class="subtitle-2 grey--text">{{ chipInfo.description }}</p>
                      <!-- <h4>Ingredients:</h4>
                      <p class="grey--text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat quidem architecto illum suscipit aut culpa provident facere reprehenderit deleniti iure corporis distinctio ratione rem, nisi, rerum laboriosam repudiandae optio nemo.</p> -->
                    </v-card-text>
                    <v-col>
                      <v-card-text>
                        <h4 class="grey--text">Ingredientes:</h4>
                        <p class="grey--text">{{ producto.ingredients }}</p>
                      </v-card-text>
                    </v-col>
                  </v-col>
                </v-row>
            </v-container>
            <v-divider></v-divider>        
          </v-card>
        </v-col>
      </v-container>
    </v-dialog>
  </v-row>
</template>

<script>
  import { success } from '~/plugins/sweetAlert'
  export default {
    props: {
      producto: {
       type: Object,
       default: () => {}
      }
    },
    data () {
      return {
        selection: 0,
        dialog: false,
        chipInfo: '',
        total: this.producto.price,
        totaly: ''
      }
    },
    methods: {
      value2(id) {
        const prod = this.producto.portion[id]
        this.chipInfo = prod
        const productPrice = this.producto.price
        const total = (productPrice + prod.price)
        this.total =  total
      },
      addCart() {
        const data = {
          ...this.producto,
          price: this.total,
          totalProducto: this.total,
          selectedPortion: this.chipInfo,
          cantidad: 1
        }
        this.$store.dispatch('carrito/addToCar', data)
        this.dialog = false
        success.fire('Added to cart')
      }
    },
  }
</script>
