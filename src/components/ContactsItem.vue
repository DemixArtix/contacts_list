<template>
  <li class="contacts-card" @click="choiceOfContact">
      <div class="contacts-card__buttons">
        <button @click.stop="confirmationTemplate = true">Delete Contact</button>
      </div>
      <div class="contacts-table">
        <div class="contacts-table__field"  v-for="(contactField, index) in contactInfo" :key="index">
          <span class="contacts-table__name">{{contactField.name}} : </span>
          <span class="contacts-table__value">{{contactField.value}}</span>
        </div>
      </div>
    <template v-if="confirmationTemplate">
      <div class="confirm-card" @click.stop>
        <span class="confirm-card__text">Delete contact</span>
        <div class="confirm-card__buttons">
          <button @click="onDeleteContact">Yes</button>
          <button @click="confirmationTemplate = false">No</button>
        </div>
      </div>
    </template>
  </li>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "ContactsItem",
    props: {
      contactInfo: {
        type: Array,
        default: () => ([]),
      },
      index: {
        type: Number,
        default: 0,
      }
    },
    data: () => ({
      confirmationTemplate: false
    }),
    methods: {
      ...mapActions('contacts', ['deleteContact']),
      choiceOfContact() {
        this.$router.push('/contact/' + (this.index + 1));
      },
      onDeleteContact() {
        this.deleteContact(this.index);
        this.confirmationTemplate = false;
      },
    }
  }
</script>

<style scoped lang="scss">
    .contacts {
      &-card {
        position: relative;
        font-size: 22px;
        border: 2px solid #000;
        border-radius: 5px;
        padding: 20px;
        max-width: 30%;
        margin: 0 auto 20px;
        &__buttons {
          display: flex;
          justify-content: flex-end;
          button {
            margin: 5px;
          }
        }
      }
      &-table {
        display: flex;
        flex-direction: column;
        font-size: 22px;
        &__field {

          display: flex;
          justify-content: space-between;
        }
        &__name {
          text-transform: capitalize;
        }
        &__value {
        }
      }
    }
  .confirm-card {
    position: absolute;
    top: -2px;
    left: -2px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 2px solid #000;
    border-radius: 5px;
    &__text {
      display: block;
      margin-top: 20px;
    }
  }
</style>