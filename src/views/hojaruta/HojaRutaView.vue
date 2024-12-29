<template>
    <div>
        <Modal v-model:modelValue="showModalNuevo">
            <RegisterHojaRuta @on-register="onRegister($event)" />
        </Modal>
        <Modal v-model:modelValue="showModalEdit">
            <EditHojaRuta @on-update="onUpdate($event)" :item="itemToEdit" />
        </Modal>
        <h1>Lista de Hojas de Ruta</h1>
        <button @click="showModalNuevo = true" class="btn btn-primary">Nuevo</button>
        <button @click="buscar()" class="btn btn-lith" style="float:right">Buscar</button>
        <input type="search" style="float:right" v-model="textToSearch" @search="buscar()"
            placeholder="Buscar por Referencia">
        <div style="margin: 20px 0;">
            <h3>Filtro:</h3>
            <form @submit.prevent="filtrar()">
                <label for="remitente">Remitente</label>
                <select id="remitente" v-model="filter.remitenteId">
                    <option value="">Todos</option>
                    <option :value="remitente.id" v-for="(remitente, index) in remitenteList" :key="`remitente-${index}`">{{ remitente.nombre + " " + remitente.apellido }}</option>
                </select>
                <button type="submit" class="btn btn-lith">Fitrar</button>
            </form>
        </div>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Código</th>
                    <th>Referencia</th>
                    <th>Fecha de Recepción</th>
                    <th>Remitente</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itemList" :key="index">
                    <td>{{ 1 + index }}</td>
                    <td>{{ item.codigo_hojaruta }}</td>
                    <td>{{ item.referencia }}</td>
                    <td>{{ item.fecha_recepcion }}</td>
                    <td>{{ item.remitente.nombre + " " + item.remitente.apellido }}</td>
                    <td>
                        <button @click="edit(item)" class="btn btn-dark" style="margin-right: 15px;">Editar</button>
                        <button @click="Eliminar(item.id)" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import RegisterHojaRuta from './RegisterHojaRutaView.vue'
import EditHojaRuta from './EditHojaRutaView.vue'

export default {
    name: 'HojaRuta',
    data() {
        return {
            currentPage: 1,
            totalPages: 100, // Este valor debe ser calculado según tus datos
            showModalNuevo: false,
            showModalEdit: false,
            itemToEdit: null,
            textToSearch: '',
            textToFilter: '',
            itemList: [],
            remitenteList: [],
            path: '',
            filter: {
                remitenteId: null
            }
        }
    },
    components: {
        Modal,
        RegisterHojaRuta,
        EditHojaRuta
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
        ...mapActions(['increment']),
        getList() {
            const vm = this;
            this.axios.get(this.baseUrl + "/hojarutas?_expand=remitente" + this.textToFilter + "&q=" + this.textToSearch)
                .then(function (response) {
                    console.log("Entró a axios de HojaRutaView")
                    vm.itemList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        getRemitenteList() {
            const vm = this;
            this.axios.get(this.baseUrl + "/remitentes")
                .then(function (response) {
                    vm.remitenteList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        edit(item) {
            this.itemToEdit = Object.assign({}, item);
            this.showModalEdit = true;
        },
        Eliminar(id) {
            if (confirm("¿Esta Seguro de eliminar el registro?")) {
                const vm = this;
                this.axios.delete(this.baseUrl + "/hojarutas/" + id)
                    .then(function (response) {
                        vm.getList();
                        vm.$toast.show("Registro eliminado.", "danger");
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            }
        },
        buscar() {
            this.getList();
        },
        filtrar() {
            this.textToFilter = '';
            if (this.filter.remitenteId != null && this.filter.remitenteId != '') {
                this.textToFilter += "&remitenteId=" + this.filter.remitenteId;
            }
            this.getList();
        },
        onRegister(event) {
            this.getList();
            this.showModalNuevo = false;
            this.$toast.show('Registro exitoso', 'success');
        },
        onUpdate(event) {
            this.getList();
            this.showModalEdit = false;
            this.itemToEdit = null;
            this.$toast.show('Edicion exitosa', 'info');
        },
        showToast(message, type) {
            this.$toast.show(message, type);
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
    props: {
        // propiedades que el componente puede recibir.
    },
    mounted() {
        this.getList();
        this.getRemitenteList();
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>