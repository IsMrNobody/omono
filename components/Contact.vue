<template>
  <v-card flat class="transparent">
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="success"
    >
      <span>Mensaje Enviado!</span>
      <v-icon dark>
        mdi-checkbox-marked-circle
      </v-icon>
    </v-snackbar>
    <v-form
      ref="form"
      @submit.prevent="submit"
    >
      <v-container fluid>
        <h3 class="mb-10">Contactanos y comparte tus dudas y sugerencias!.</h3>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="name"
              color="primary"
              label="Nombre"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-text-field
              v-model="email"
              color="primary"
              label="Email"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="message"
              color="primary"
              clearable
            >
              <template #label>
                <div>
                  Mensaje <small></small>
                </div>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <!-- <v-btn
          text
          @click="resetForm"
        >
          Cancel
        </v-btn> -->
        <v-spacer></v-spacer>
        <v-btn
          outlined
          color="primary"
          type="submit"
        >
          Enviar
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
  export default {
    data () {      
      return {
        name: '',
        email: '',
        message: '',
        // rules: {
        //   name: [val => (val || '').length > 0 || 'This field is required'],
        // },
        snackbar: false
      }
    },

    computed: {
      merchant() {
        return this.$store.state.merchant
      }
    },

    methods: {
      async submit () {
        const data = {
          userName: this.name,
          userEmail: this.email,
          comment: this.message,
          merchantPhone: this.merchant.phone,
          merchantEmail: this.merchant.email
        }
        if (data.userEmail &&  data.comment) {
          this.snackbar = true
          await this.$store.dispatch('order/sendMsg', data)
        }
        this.snackbar = false
        this.name = ''
        this.email = ''
        this.message = ''
      },
    },
  }
</script>
