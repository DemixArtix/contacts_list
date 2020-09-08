<template>
  <div class="contact-card">
    <div class="contact-table">
      <template v-for="({name, value}, index) in contactInfo">
        <ContactField :name="name" :value="value" :index="index"/>
      </template>
      <button class="contact-table__button_add" v-if="!addTemplate" @click="addTemplate = true">
        <span>Add field</span>
        <span v-html="this.svg.plus"></span>
      </button>
      <div v-else class="contact-add">
        <div class="contact-add__form">
          <input id="nameInput" ref="nameInput" type="text" class="contact-add__name" placeholder="name">
          <label v-if="emptyName" class="contact-add__label" for="nameInput">The field must not be empty</label>
        </div>
        <div class="contact-add__form">
          <input id="valueInput" ref="valueInput" type="text" class="contact-add__value" placeholder="value">
          <label v-if="emptyValue" class="contact-add__label" for="valueInput">The field must not be empty</label>
        </div>
        <div class="contact-add__buttons">
          <button @click="confirmAdd">Save</button>
          <button @click="addTemplate = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import ContactField from "./ContactField";

  export default {
    name: "ContactInfo",
    data: () => ({
      idContact: 0,
      contactInfo: [],
      addTemplate: false,
      emptyName: false,
      emptyValue: false,
    }),
    components: {
      ContactField
    },
    mounted() {
      this.idContact = this.$route.params.id - 1;
      this.contactInfo = this.contactsList[this.idContact];
      this.setCurrentContact(
        {
          // currentContact: this.contactInfo,
          indexOfCurrentContact: this.idContact
        });
    },
    computed: {
      ...mapGetters('contacts', ['contactsList']),
      ...mapGetters('svg', ['svg'])
    },
    methods: {
      ...mapActions('contacts', ['setCurrentContact', 'addField', 'setLastAction']),
      confirmAdd() {
          this.emptyName = this.emptyValue = false;
          const name = this.$refs.nameInput.value;
          const value = this.$refs.valueInput.value;
          if(name && value) {
            this.setLastAction({
              nameAction: 'add',
              nameField: name,
              valueField: value,
              indexField: Object.keys(this.contactInfo).length,
            });
            this.addField({
              name: name,
              value: value,
            });
          }
          if(!name && !value) {
            return this.emptyName = this.emptyValue = true;
          }
          if(!name) {
            return this.emptyName = true;
          }
          if(!value) {
            return this.emptyValue = true;
          }
          this.emptyName = this.emptyValue = this.addTemplate = false;
      }
    }

  }
</script>

<style scoped lang="scss">
   .contact {
     &-card {
       font-size: 22px;
       border: 2px solid #000;
       border-radius: 5px;
       padding: 20px;
       max-width: 40%;
       margin: 0 auto 20px;
     }
     &-table {
       display: flex;
       flex-direction: column;
       font-size: 22px;
       justify-content: space-between;
       &__item {
         display: flex;
         justify-content: space-between;
       }
       &__button_add {
         display: flex;
         align-self: flex-end;
         justify-content: flex-end;
         align-items: center;
         width: 30%;
         border-radius: 10px;
         border: none;
         padding: 5px 0 5px 10px;
         font-weight: bold;
         background-color: #fff;
         opacity: 0.5;
         transition: 0.5s;
         position: relative;
         &:hover {

           opacity: 1;
           span {
             transition: 0.5s;
             &:first-child {
               margin-left: 0;
               color: green;
               opacity: 0.6;
             }
             &:last-child {
             }
           }
         }
         span {
           font-size: 18px;
           &:first-child {
             left: 20px;
             margin-left: 50px;
             position: absolute;
             opacity: 0;
           }
           &:last-child {
             text-align: center;
             color: green;
             padding: 6px 6px 2px;
             width: 20px;
           }
         }
       }
     }
     &-add{
       display: flex;
       &__buttons {
         min-width: 120px;
         margin-left: 20px;
         button {
           width: 50%;
         }
       }
       &__name {
         text-transform: capitalize;
       }
       &__value {
         margin-left: auto;
       }
       &__label {
         font-size: 12px;
         margin-top: 2px;
         padding: 0;
         color: red;
       }
       &__form {
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         margin-left: auto;
         &:first-child {
           margin-right: 14px;
         }
       }
     }

   }
</style>