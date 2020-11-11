<template>
  <li class="contacts-card" @click="choiceOfContact">
      <div class="contacts-card__buttons">
        <button class="contacts-card__delete" @click.stop="confirmationTemplate = true">Delete Contact</button>
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
          <button @click="onDeleteContact" class="green">Yes</button>
          <button @click="confirmationTemplate = false" class="red">No</button>
        </div>
      </div>
    </template>
  </li>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

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
    },
    computed: {
      ...mapGetters('svg', ['svg']),
    }
  }
</script>

<style scoped lang="scss">
    .green {
      color: green;
    }
    .red {
      color: red;
    }

    .contacts {
      &-card {
        position: relative;
        border: 2px solid lightcyan;
        border-radius: 5px;
        padding: 20px;
        /*max-width: 260px;*/
        &:hover {
          border-color: lightblue;
        }
        &__buttons {
          display: flex;
          justify-content: flex-end;
          button {
            margin: 5px;
          }
        }
        &__delete {
          border: 1px solid red;
          color: red;
        }
      }
      &-table {
        display: flex;
        flex-direction: column;
        padding: 0 10px;
        &__field {
          position: relative;
          padding-top: 10px;
          padding-bottom: 10px;
          margin-right: auto;
        }
        &__name {
          position: absolute;
          left: 0;
          top: 0;
          font-size: 10px;
          text-transform: capitalize;
        }
        &__value {
        }
        &__line {
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
    display: flex;
    justify-content: center;
    flex-direction: column;
    &__text {
      display: block;
      padding: 20px;
    }
    &__buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        font-size: 18px;
        border: 1px solid;
        margin: 10px;
        padding: 5px 20px ;
        &.red {
          border-color: red;
        }
        &.green {
          border-color: green;
        }
      }
    }
  }
</style>