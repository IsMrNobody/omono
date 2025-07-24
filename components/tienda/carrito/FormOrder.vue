<template>
  <div>
    <v-row>
      <v-col sm="" cols>
        <v-card flat class="transparent">
          <v-card-subtitle>
            Detalles de contacto
          </v-card-subtitle>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @submit.prevent="sendOrder()"
            >
              <v-text-field
                ref="name"
                v-model="name"
                :rules="nameRules"
                outlined
                placeholder="Nombre"
                required
              ></v-text-field>
              <v-text-field
                ref="phone"
                v-model="phone"
                :rules="phoneRules"
                label="Codigo de area"
                type="Number"
                outlined
                placeholder="telefono"
                required
              ></v-text-field>
              <v-text-field
                ref="email"
                v-model="email"
                :rules="emailRules"
                outlined
                placeholder="Email"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="" cols>
        <v-card class="transparent" outlined>
          <v-card-subtitle>
            Metodos de pago
          </v-card-subtitle>
          <!-- <PaymentCheck /> -->
        </v-card>        
        <v-card class="mt-5 transparent" flat>
          <v-textarea
            v-model="comment"
            outlined
            bg-color="light-blue"
            auto-grow
            label="Comentario"
            rows="4"
            shaped
          ></v-textarea>
        </v-card>
        <div v-show="fecha" class="mt-4">
          <DatePicker />
        </div>
      </v-col>
      <v-col cols>
        <v-col>
          <v-switch
            v-model="delivery"
            label="Delivery"
            color="tercero"
            :value="delivery"
            hide-details
          ></v-switch>
        </v-col>
        <v-card v-if="!delivery" color="secondary">
          <v-card-subtitle>
            Pick up - Te esperamos!
          </v-card-subtitle>
        </v-card>
        <v-card v-else flat class="transparent">
            <!-- <v-card-subtitle>
              Agregar Dirección
            </v-card-subtitle> -->
            <v-card-text>
                <!-- <v-alert
                  outlined
                  color="primary"
                  text
                >
                  Delivery incluido
                </v-alert> -->
                
                <v-form>
                  <v-text-field
                    ref="address"
                    v-model="address"
                    outlined
                    label="Dirección"
                    placeholder="Agregar Dirección"
                    required
                    class="mt-7"
                  ></v-text-field>
                  <v-row>
                    <v-col>
                      <v-text-field
                        ref="house"
                        v-model="house"
                        outlined
                        label="Casa"
                        placeholder="Casa"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        ref="floor"
                        v-model="floor"
                        outlined
                        label="Piso"
                        placeholder="Piso"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
            </v-card-text>
        </v-card>
      </v-col>      
    </v-row>
    <v-divider class="mt-5 mb-5"></v-divider>
    <v-col class="secondary">
      <v-row class="my-auto ma-4">
        <h2 class="text-title-1">Total:</h2>
        <v-spacer></v-spacer>

        <h2>{{ total }} $</h2>
        <v-spacer></v-spacer>
        <v-btn
          type="submit"
          outlined
          :loading="load"
          ripple
          :disabled="!valid"
          large
          light
          color="tercero"
          @click="sendOrder()"
        >
        pedir
        </v-btn>
      </v-row>
    </v-col>
    <v-divider class="mt-5 mb-5"></v-divider>
  </div>
</template>

<script>
// import PaymentCheck from '@/components/tienda/carrito/PaymentCheck'
import DatePicker from '@/components/tienda/carrito/DatePicker'
export default {
  components: {
    // PaymentCheck,
    DatePicker
  },
  props: {
    total: {
      type: String,
      default: () => {}
    }
  },
  data() {
    return {
      fecha: '',
      delivery: false,
      comment: 'comentario',
      name: 'jose',
      nameRules: [
        v => !!v || 'Nombre es requerido',
        // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      phone: '584128352365',
      phoneRules: [
        v => !!v || 'Telefono es requerido',
        // v => (v && v.length === 12) || 'Name must be less than 12 characters',
      ],
      address: '', 
      email: 'jose@gmail.com',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => /.+@.+\..+/.test(v) || 'E-mail debe ser valido',
      ],
      house: '',
      floor: '',
      valid: false,
      load: false
    }
  },
  methods: {
    deliver() {
      this.delivery = !this.delivery
    },
    sendOrder() {
      this.load = true
      const data = {
       nameUser: this.name,
       userEmail:  this.email,
       phone: this.phone,
       address: this.address,
       house: this.house,
       floor: this.floor,
       comments: this.comment,
       delivery: this.delivery
      }
      if (data.userEmail && data.phone && data.nameUser) {
        this.$store.dispatch('carrito/sendOrder', data)
      } else {
        alert('Debes rellenar todos los campos')
        this.load = false
      }
    }
  }
}
</script>

<style>

</style>