<template>
  <div class="add-block" :class="{'add-active': addTemplate}">
    <template v-if="!addTemplate">
      <div class="add-template__button" @click="addTemplate = true">
        <div>Add Contact</div>
      </div>
    </template>
    <template v-else>
      <div class="add-field">
        <span class="add-field__name-span">Name </span>
        <div class="add-field__name-block">
          <input id="nameValue" class="add-field__name-input" type="text" placeholder="value" v-model="nameValue">
          <label v-if="validateMessage" class="add-field__name-label"  for="nameValue">Field "Name" is required</label>
        </div>
      </div>
      <template v-for="(field, index) in arrOfFields">
        <div class="add-field">
          <input type="text" class="add-field__name" placeholder="name" v-model="field.name">
          <input type="text" class="add-field__value" placeholder="value" v-model="field.value">
          <button @click="arrOfFields.splice(index, 1)"   class="add-field__delete red" v-html="svg.delete"></button>
        </div>
      </template>
      <div class="add-field__button">
        <button @click="arrOfFields.push({name: '', value: ''})" class="green" v-html="svg.plus">Add Field</button>
      </div>
      <div class="add-block__buttons">
        <button class="add-block__button green" @click="onAddContact">Create</button>
        <button class="add-block__button red" @click="onCloseTemplate">Cancel</button>
      </div>

    </template>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "addContact",
    data: () => ({
      addTemplate: false,
      validateMessage: false,
      nameValue: '',
      arrOfFields: [],

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
    },
    computed: {
      ...mapGetters('svg', ['svg'])
    }
  }
</script>

<style scoped lang="scss">
  .green {
    color: green;
    border-color: green;
  }
  .red {
    color: red;
    border-color: red;
  }
  .add- {
    &template {
      &__button {
        border-radius: 5px;
        cursor: pointer;
        min-height: 50px;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 1s;
        opacity: .5;
        &:hover {
          opacity: 1;
        }
      }
    }
    &block {
      border-radius: 5px;
      color: green;
      border: 2px solid rgba(green, .5);
      &:hover {
        border: 2px solid rgba(green, 1);
      }
      &.add-active {
        padding: 20px;
        border: 2px solid #000;
      }
      &__button {
        border: 1px solid;
        font-size: 1rem;
        padding: 5px 15px;
        margin: 0 5px;
        &s {
          display: flex;

        }
      }
    }
    &field {
      max-width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 5px;
      position: relative;
      padding-top: 15px;
      padding-bottom: 10px;
      span {
        max-width: 140px;
      }
      input {
      }
      &__delete {
        margin-top: 10px;
      }
      &__button {
        display: flex;
        margin-bottom: 10px;

      }
      &__name {
        position: absolute;
        left: 0;
        top: 0;
        font-size: 12px;
        &-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        &-input {
          margin-top: 10px;
        }
        &-span {
          margin-left: 10px;
          margin-right: 10px;
        }
        &-arrow {
          margin-right: 10px;
        }
        &-label {
          margin-top: 5px;
          font-size: 10px;
          color: red;
          margin-left: 10px;
        }
      }
      &__value {
        margin-top: 10px;
        margin-right: 10px;
      }
    }
  }
</style>