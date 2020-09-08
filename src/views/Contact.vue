<template>
  <div class="contact-card">
    <div
        v-if="this.lastAction.nameAction !== '' &&
        this.lastAction.indexContact === this.indexOfCurrentContact"
        class="contact-card__buttons">
      <button @click="onCancelLastAction">Cancel last action</button>
    </div>
    <ContactInfo/>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import ContactInfo from "../components/ContactInfo";

  export default {
    name: 'Contact',
    components: {
      ContactInfo,
    },
    computed: {
      ...mapGetters('contacts', ['lastAction', 'indexOfCurrentContact'])
    },
    methods: {
      ...mapActions('contacts', ['cancelLastAction']),
      onCancelLastAction() {
        this.cancelLastAction();
      }
    }


  }
</script>

<style scoped lang="scss">
  .contact-card {
    position: relative;
    &__buttons {
      position: fixed;
      top: 30px;
      right: 100px;
      width: 25px;
    }
  }
</style>

