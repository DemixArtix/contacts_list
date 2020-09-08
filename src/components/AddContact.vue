<template>
  <div class="add-block">
    <template v-if="!addTemplate">
      <button class="add-block__button" @click="addTemplate = true">Add Contact</button>
    </template>
    <template v-else>
      <div class="add-field">
        <span class="add-field__name-span">Name => </span>
        <div class="add-field__name-block">
          <input id="nameValue" class="add-field__name-input" type="text" placeholder="value" v-model="nameValue">
          <label v-if="validateMessage" class="add-field__name-label"  for="nameValue">Field "Name" is required</label>
        </div>
      </div>
      <template v-for="(field, index) in arrOfFields">
        <div class="add-field">
          <input type="text" placeholder="name" v-model="field.name">
          <span> => </span>
          <input type="text" placeholder="value" v-model="field.value">
          <button @click="arrOfFields.splice(index, 1)">Delete</button>
        </div>
      </template>
      <div class="add-field__button">
        <button @click="arrOfFields.push({name: '', value: ''})">Add Field</button>
      </div>
      <div class="add-block__buttons">
        <button class="add-block__button" @click="onAddContact">Save Contact</button>
        <button class="add-block__button" @click="onCloseTemplate">Close </button>
      </div>

    </template>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "addContact",
    data: () => ({
      addTemplate: false,
      validateMessage: false,
      nameValue: '',
      arrOfFields: []
    }),
    methods: {
      ...mapActions('contacts', ['addContact']),
      onAddContact() {
        if(!this.nameValue) {
          return this.validateMessage = true
        }
        const newContact = [{
          name: 'name',
          value: this.nameValue,
        }].concat(this.arrOfFields.filter(field => field.name && field.value));

        this.addContact(newContact);
        this.arrOfFields = [];
        this.nameValue = '';
        this.validateMessage = this.addTemplate = false;
      },
      onCloseTemplate() {
        this.arrOfFields = [];
        this.nameValue = '';
        this.addTemplate = this.validateMessage = false;
      }

    }
  }
</script>

<style scoped lang="scss">
  .add- {
    &block {
      margin: 0 auto;
      max-width: 30%;
      border: 2px solid #000;
      padding: 20px;
      border-radius: 5px;
    }
    &field {
      max-width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      span {
        max-width: 140px;
      }
      input {
        max-width: 130px;
      }
      &__button {
        display: flex;
        justify-content: flex-end;
      }
      &__name {
        &-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        &-input {
        }
        &-span {

        }
        &-label {
          margin-top: 2px;
          font-size: 10px;
          color: red;
        }
      }
    }
  }
</style>