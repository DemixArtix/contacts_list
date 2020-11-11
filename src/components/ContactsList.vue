<template>
  <ul>
    <AddContact/>
    <template v-for="(contactInfo, index) in contactsList">
      <ContactsItem :contactInfo="contactInfo" :index="index"/>
    </template>
  </ul>
</template>

<script>
  import {mapGetters} from 'vuex';
  import ContactsItem from "./ContactsItem";
  import AddContact from "./AddContact";

  export default {
    name: "ContactsList",
    components: {
      AddContact,
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

    display: grid;
    grid-template-columns: repeat(auto-fit, 300px);
    grid-gap: 10px;
    justify-content: center;
  }
</style>