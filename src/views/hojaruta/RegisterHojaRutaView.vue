<template>
    <div>
        <h1>Registrar Hoja de Ruta</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="remitente">Remitente:</label>
                <select id="remitente" v-model="form.remitenteId" :class="{ 'is-invalid': errors.remitenteId }">
                    <option :value="remitente.id" v-for="(remitente, index) in remitenteList"
                        :key="`remitente-${index}`">{{ remitente.nombre + " " + remitente.apellido }}
                    </option>
                </select>
                <div v-if="errors.remitenteId" class="invalid-feedback">{{ errors.remitenteId }}</div>
            </div>
            <div class="form-group">
                <label for="name">Código:</label>
                <input type="text" id="name" v-model="form.codigo_hojaruta"
                    :class="{ 'is-invalid': errors.codigo_hojaruta }" placeholder="Ingrese el Código" />
                <div v-if="errors.codigo_hojaruta" class="invalid-feedback">{{ errors.codigo_hojaruta }}</div>
            </div>
            <div class="form-group">
                <label for="name">Referencia:</label>
                <input type="text" id="name" v-model="form.referencia" :class="{ 'is-invalid': errors.referencia }"
                    placeholder="Ingrese la Referencia" />
                <div v-if="errors.referencia" class="invalid-feedback">{{ errors.referencia }}</div>
            </div>
            <div class="form-group">
                <label for="fecha_recepcion">Fecha de Recepción:</label>
                <input type="date" id="fecha_recepcion" v-model="form.fecha_recepcion"
                    :class="{ 'is-invalid': errors.fecha_recepcion }" placeholder="Ingrese la fecha de recepción" />
                <div v-if="errors.fecha_recepcion" class="invalid-feedback">{{ errors.fecha_recepcion }}</div>
            </div>
            <button type="submit" class="btn btn-primary">Registrar</button>
        </form>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    name: 'RegisterHojaRuta',
    data() {
        return {
            remitenteList: [],
            form: {
                remitenteId: null,
                codigo_hojaruta: '',
                referencia: '',
                fecha_recepcion: null
            },
            errors: {}
        }
    },
    methods: {
        ...mapActions(['increment']),
        validateForm() {
            this.errors = {}
            if (!this.form.remitenteId) {
                this.errors.remitenteId = 'Debe seleccionar un remitente'
            }
            if (!this.form.codigo_hojaruta) {
                this.errors.codigo_hojaruta = 'Debe ingresar un código'
            }
            if (!this.form.referencia) {
                this.errors.referencia = 'Debe ingresar una referencia'
            }
            if (!this.form.fecha_recepcion) {
                this.errors.fecha_recepcion = 'Debe ingresar una fecha de recepción'
            }
            return Object.keys(this.errors).length === 0
        },
        submitForm() {
            if (this.validateForm()) {
                this.save()
                this.form = {
                    remitenteId: null,
                    codigo_hojaruta: '',
                    referencia: '',
                    fecha_recepcion: null
                }
            }
        },
        save() {
            console.log("Entró a save de HojaRuta")
            const vm = this;
            this.axios.post(this.baseUrl + "/hojarutas", this.form)
                .then(function (response) {
                    console.log("Entró a axios de RegisterHojaRuta")
                    if (response.status == '201') {
                        console.log("Entró al if del axios de RegisterHojaRuta")
                        vm.$emit('on-register', response.data);
                    }
                    vm.itemList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        getRemitenteList() {
            console.log("Entró a Lista de Remitentes")
            const vm = this;
            this.axios.get(this.baseUrl + "/remitentes")
                .then(function (response) {
                    vm.remitenteList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    },
    computed: {
        // propiedades computadas que dependen de otras propiedades reactivas
        ...mapState(['count']),
        ...mapGetters(['doubleCount', 'getBaseUrl']),
        baseUrl() {
            return this.getBaseUrl
        }
    },
    mounted() {
        this.getRemitenteList();
    },
}
</script>

<style scoped></style>