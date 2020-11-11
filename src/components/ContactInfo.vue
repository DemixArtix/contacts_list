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
          <div class="contact-add__item">
            <input id="nameInput" ref="nameInput" type="text" class="contact-add__name" placeholder="name">
            <label v-if="emptyName" class="contact-add__label" for="nameInput">The field must not be empty</label>
          </div>
          <div class="contact-add__item">
            <input id="valueInput" ref="valueInput" type="text" class="contact-add__value" placeholder="value">
            <label v-if="emptyValue" class="contact-add__label" for="valueInput">The field must not be empty</label>
          </div>
        </div>
        <div class="contact-add__buttons">
          <button @click="confirmAdd" v-html="this.svg.ok"></button>
          <button @click="cancelAdd" v-html="this.svg.cancel"></button>
        </div>
      </div>
    </div>
    <div
        v-if="this.lastAction.nameAction !== '' &&
        this.lastAction.indexContact === this.indexOfCurrentContact"
        class="contact-card__buttons">
      <span>Cancel last action</span>
      <button @click="onCancelLastAction" v-html="this.svg.backspace"></button>
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
          indexOfCurrentContact: this.idContact
        });
    },
    computed: {
      ...mapGetters('contacts', ['contactsList', 'lastAction', 'indexOfCurrentContact']),
      ...mapGetters('svg', ['svg'])
    },
    methods: {
      ...mapActions('contacts', ['setCurrentContact', 'addField', 'setLastAction', "cancelLastAction"]),
      onCancelLastAction() {
        this.cancelLastAction();
      },
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
      },
      cancelAdd() {
        return this.addTemplate = this.emptyName = this.emptyValue = false
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
       padding: 20px 20px 30px;
       width: fit-content;
       margin: 0 auto 20px;
       min-width: 300px;
       &__buttons {
         display: flex;
         justify-content: flex-end;
         align-items: center;
         transition: 0.5s;
         color: orangered;
         position: relative;
         width: 200px;
         margin-left: auto;
         margin-top: 10px;
         &:hover {
           span {
             opacity: 0.5;
             right: 50px;
           }
         }
         span {
           transition: 0.5s;
           position: absolute;
           display: block;
           font-size: 1rem;
           opacity: 0;
           right: 0;
         }
         button {
           margin-right: 3px;
           color: orangered;
           position: relative;
         }
       }
     }
     &-table {
       display: flex;
       flex-direction: column;
       font-size: 22px;
       justify-content: space-between;

       &__item {
         display: flex;
         flex-direction: row;
         justify-content: space-between;
       }
       &__button_add {
         display: flex;
         align-self: flex-end;
         justify-content: flex-end;
         align-items: center;
         width: 120px;
         border-radius: 10px;
         border: none;
         padding: 10px 8px;
         background-color: #fff;
         opacity: 0.5;
         transition: 0.5s;
         position: relative;
         margin-top: 15px;
         &:hover {

           opacity: 1;
           span {
             &:first-child {
               right: 50px;
               color: green;
               opacity: 0.6;
             }
             &:last-child {
             }
           }
         }
         span {
           font-size: 1rem;
           transition: 0.5s;
           &:first-child {
             right: 0;
             position: absolute;
             opacity: 0;
           }
           &:last-child {
             text-align: center;
             color: green;
             width: 20px;
             border-radius: 50%;
           }
         }
       }
     }
     &-add{
       display: flex;
       justify-content: flex-start;
       &__buttons {
         display: flex;
         margin-right: 3px;
         margin-left: auto;
         align-items: flex-end;
         & button {
           &:first-child {
             color: green;
           }
           &:last-child {
             color: red;
           }
         }
       }
       &__name {
         text-transform: capitalize;
         margin-right: auto;
         font-size: .8rem;
       }
       &__value {
       }
       &__value, &__name {
         height: 30px;
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
       }
       &__item {
         display: flex;
         flex-direction: column;
       }
     }

   }
</style>