<template>
    <div>
        <h1>Editar Remitente</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="form.nombre" :class="{ 'is-invalid': errors.nombre }" placeholder="Ingrese el nombre" />
                <div v-if="errors.nombre" class="invalid-feedback">{{ errors.nombre }}</div>
            </div>
            <div class="form-group">
                <label for="apellido">Apellido:</label>
                <input type="text" id="apellido" v-model="form.apellido" :class="{ 'is-invalid': errors.apellido }" placeholder="Ingrese el apellido" />
                <div v-if="errors.apellido" class="invalid-feedback">{{ errors.apellido }}</div>
            </div>            
            <div class="form-group">
                <label for="telefono">Teléfono:</label>
                <input type="text" id="telefono" v-model="form.telefono" :class="{ 'is-invalid': errors.telefono }" placeholder="Ingrese el teléfono" />
                <div v-if="errors.telefono" class="invalid-feedback">{{ errors.telefono }}</div>
            </div>
            <div class="form-group">
                <label for="email">Correo electrónico:</label>
                <input type="email" id="email" v-model="form.email" :class="{ 'is-invalid': errors.email }" placeholder="Ingrese el correo electrónico" />
                <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
            </div>
            <div class="form-group">
                <label for="direccion">Dirección:</label>
                <input type="text" id="direccion" v-model="form.direccion" :class="{ 'is-invalid': errors.direccion }" placeholder="Ingrese la dirección" />
                <div v-if="errors.direccion" class="invalid-feedback">{{ errors.direccion }}</div>
            </div>

            <button type="submit" class="btn btn-primary">Registrar</button>
        </form>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    name: 'EditRemitente',
    data() {
        return {
            errors: {}
        }
    },
    props: ['item'],
    methods: {
        ...mapActions(['incremenet']),
        validateForm() {
            this.errors = {}
            
            if (!this.item.nombre) {
                this.errors.nombre = 'El nombre es requerido'
            }
            
            if (!this.item.apellido) {
                this.errors.apellido = 'El apellido es requerido'
            }

            if (!this.item.telefono) {
                this.errors.telefono = 'El teléfono es requerido'
            } else if (!/^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{1,4}([-.\s]?\d{1,9})+$/.test(this.item.telefono)) {
                this.errors.telefono = 'El teléfono no es válido.';
            }

            if (!this.item.email){
                this.errors.email = 'El correo electrónico es requerido'
            } 
            // else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.item.email)) {
            //     this.errors.email = 'El correo electrónico no es válido.';
            // }
            
            if (!this.item.direccion) {
                this.errors.direccion = 'La dirección es requerida'
            }
            
            return Object.keys(this.errors).length === 0
        },
        submitForm() {
            if (this.validateForm()) {
                // Enviar los datos al servidor
                this.save();
                // Reiniciar el formulario
            }
        },
        save() {
            const vm = this;
            this.axios.patch(this.baseUrl + "/remitentes/" + this.item.id, this.form).then(function (response) {
                if (response.status == '200') {
                    vm.$emit('on-update', response.data);
                }
                console.log(response); 
            }).catch(function (error) {
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
        },
        form() {
            return Object.assign({}, this.item);
        }
    },
}
</script>
<style scoped></style>