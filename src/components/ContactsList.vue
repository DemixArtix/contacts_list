<template>
  <ul>
    <template v-for="(contactInfo, index) in contactsList">
      <ContactsItem :contactInfo="contactInfo" :index="index"/>
    </template>
  </ul>
</template>

<script>
  import {mapGetters} from 'vuex';
  import ContactsItem from "./ContactsItem";

  export default {
    name: "ContactsList",
    components: {
      ContactsItem,
    },
    methods: {

    },
    computed: {
      ...mapGetters('contacts' , ['contactsList']),
    }
  }
</script>

<style scoped>
  ul {
    list-style: none;
    padding: 0;
  }
</style>