<template>
  <div>
    <v-col align="center">
      <h3>Pedidos # {{ ordenes.length }}</h3>
      <v-btn outlined @click="getData()">Actualizar</v-btn>
    </v-col>
    <p v-show="!ordenes.length">No hay pedidos</p>
    <v-progress-circular
      v-if="loading"
      :size="50"
      color="amber"
      indeterminate
    ></v-progress-circular>
    <v-expansion-panels v-else>
      <v-expansion-panel v-for="(item, i) in ordenes" :key="i" class="marron">
        <v-expansion-panel-header v-if="item.active">
          <h3
            :class="
              item.status === 'Pendiente' ? 'white--text' : 'accent--text'
            "
          >
            {{ item.status }}
            <v-icon
              v-if="item.status === 'Pendiente'"
              :color="item.paid ? 'yellow' : ''"
              >mdi-clock</v-icon
            >
            <v-icon v-if="item.status === 'Cancelado'" color="red"
              >mdi-close</v-icon
            >
            <v-icon v-if="item.status === 'Entregado'" color="green"
              >mdi-check</v-icon
            >
          </h3>
          <p class="grey--text">ID: {{ item._id.substr(18) }}</p>
          <!-- <v-spacer></v-spacer> -->
          <!-- {{ item.createdAt }} -->
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row>
            <v-col>
              <v-card class="mt-5 black" max-width="800">
                <v-card-actions>
                  <v-card-subtitle class="subheading">
                    Cliente: {{ item.nameUser }}
                  </v-card-subtitle>
                    <v-spacer></v-spacer>
                    <v-card-subtitle>
                      Pedido #: {{ item._id.substr(18) }}
                    </v-card-subtitle>
                </v-card-actions>
                <!-- <v-card-subtitle class="subheading font-weight-bold">
                  {{ item.email }}
                  <br />
                </v-card-subtitle> -->
                <div class="text-center mb-4">
                  <v-btn text outlined color="green" @click="copy(item.phone)">
                    <v-icon> mdi-whatsapp </v-icon>
                    {{ item.phone }}
                  </v-btn>
                </div>

                <v-divider></v-divider>

                <v-list dense class="grey darken-2">
                  <v-list-item>
                    <v-list-item-content>Monto:</v-list-item-content>
                    <v-list-item-content class="text-h4 align-end">
                      {{ item.total }}$
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>Estado:</v-list-item-content>
                    <v-list-item-content>
                      <div>
                        <v-icon v-if="item.paid" color="green"
                          >mdi-check</v-icon
                        >
                        <v-icon v-else>mdi-clock</v-icon>
                      </div>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>Metodo de pago:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ item.paymentMethod }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-if="item.numberRef">
                    <v-list-item-content>Number Ref:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ item.numberRef }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>C/Products:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ item.products.length }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>Fecha:</v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ item.deliveryDate }}
                    </v-list-item-content>
                  </v-list-item>

                  <!-- <v-list-item>
                        <div>
                          <v-btn small icon @click="copy(item.phone)">
                            <v-icon color="green">
                            mdi-whatsapp
                            </v-icon>
                          </v-btn>
                        </div>
                        <v-list-item-content class="align-end">
                            {{ item.phone }}
                        </v-list-item-content>
                        </v-list-item>            -->

                  <div v-if="item.floor">
                    <v-list-item>
                      <v-list-item-content>Piso:</v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item.floor }}
                      </v-list-item-content>
                    </v-list-item>
                  </div>

                  <div v-if="item.address">
                    <v-list-item>
                      <v-list-item-content>Dirección:</v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item.address }}
                      </v-list-item-content>
                    </v-list-item>
                  </div>

                  <div v-if="item.house">
                    <v-list-item>
                      <v-list-item-content>Casa:</v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item.house }}
                      </v-list-item-content>
                    </v-list-item>
                  </div>

                  <div v-if="item.comments">
                    <v-card-subtitle> Comentario: </v-card-subtitle>
                    <v-card-text class="beige--text">
                      {{ item.comments }}
                    </v-card-text>
                  </div>
                </v-list>
                <v-card-actions>
                  <v-btn 
                    color="red" 
                    text 
                    small
                    :disabled="item.status === 'Cancelado'"
                    @click="editOrder({status: 'Cancelado', paid: false, id: item._id})"
                  >
                    Cancelar
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="item.paid === true"
                    color="yellow"
                    outlined
                    small
                    @click="editOrder({status: 'Pendiente', paid: true, id: item._id})"
                  >
                    Pagado
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="item.status === 'Entregado'"
                    color=""
                    outlined
                    small
                    @click="editOrder({status: 'Entregado', paid: true, id: item._id})"
                  >
                    Entregado
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col>
              <v-card max-height="420" class="overflow-auto grey darken-4 elevation-10 mt-5">
                <v-col v-for="(pro, k) in item.products" :key="k">
                  <v-col>
                    <v-card-actions>
                      <p>
                        U/
                        <span class="green--text">{{ pro.cantidad }}</span>
                      </p>
                      <v-spacer></v-spacer>
                      <p>
                        Total:
                        <span class="text-h6"> {{ pro.price * pro.cantidad }} $</span>
                      </p>
                    </v-card-actions>
                    <span class="grey--text">{{ pro.name }} - {{ pro.price }}$</span>
                    <p class="primary--text">{{ pro.selectedPortion[0].description }}</p>
                  </v-col>
                  <v-divider class="yellow"></v-divider>
                </v-col>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    ordenes() {
      return this.$store.state.order.filtered
    },
    loading() {
      return this.$store.state.order.loading
    },
  },
  methods: {
    copy(phone) {
      //   window.location.href = 'https://wa.me/584128352365'
      window.open(`https://wa.me/${phone}`)
    },
    getData() {
      this.$store.dispatch('order/getOrders')
    },
    editOrder(status) {
      this.$store.dispatch('order/editOrder', status)
    },
  },
}
</script>

<style>
</style>