<template>
  <div class="main">
    <AddContact/>
    <ContactsList/>
  </div>
</template>

<script>
  import ContactsList from "../components/ContactsList";
  import AddContact from "../components/AddContact";

export default {
  name: 'Main',
  components: {
    AddContact,
    ContactsList,
  }
}
</script>
