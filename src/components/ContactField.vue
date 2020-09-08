<template>
  <div class="contact-table__item">
    <template v-if="currentTemplate === 'change'">
      <input v-if="name !== 'name'" ref="nameInput" type="text" class="contact-table__name" placeholder="name" :value="name">
      <span v-if="name === 'name'" ref="nameInput" class="contact-table__name">{{name}} : </span>
      <input ref="valueInput" type="text" class="contact-table__value" placeholder="value" :value="value">
      <div class="contact-table__buttons">
        <button class="contact-table__button ok" @click="setCurrentTemplate('ok')" v-html="this.svg.ok"></button>
        <button class="contact-table__button cancel" @click="setCurrentTemplate('cancel')" v-html="this.svg.cancel"></button>
      </div>
    </template>
    <template v-else-if="currentTemplate === 'delete'">
        <span>Delete a field?</span>
      <div class="contact-table__buttons">
      <button class="contact-table__button ok" @click="onAcceptDelete" v-html="this.svg.ok">Yes</button>
      <button class="contact-table__button cancel" @click="onCancel" v-html="this.svg.cancel">No</button>
      </div>
    </template>
    <template v-else-if="currentTemplate === 'ok'">
        <span>Accept changes?</span>
        <div class="contact-table__buttons">
          <button class="contact-table__button ok" @click="onAcceptChanges" v-html="this.svg.ok">Yes</button>
          <button class="contact-table__button cancel" @click="setCurrentTemplate('change')" v-html="this.svg.cancel">No</button>
        </div>
    </template>
    <template v-else-if="currentTemplate === 'cancel'">
      <span>Cancel changes?</span>
      <div class="contact-table__buttons">
        <button class="contact-table__button ok" @click="onCancel" v-html="this.svg.ok"></button>
        <button class="contact-table__button cancel" @click="setCurrentTemplate('change')" v-html="this.svg.cancel"></button>
      </div>
    </template>
    <template v-else>
      <span class="contact-table__name">{{name}} : </span>
      <span class="contact-table__value">{{value}}</span>
      <div class="contact-table__buttons">
        <button class="contact-table__button change" :class="isName" @click="setCurrentTemplate('change')" v-html="this.svg.change"></button>
        <button class="contact-table__button delete" v-if="name !== 'name'" @click="setCurrentTemplate('delete')" v-html="this.svg.delete"></button>
      </div>
    </template>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "ContactField",
    props: {
      name: {
        type: String,
        default: '',
      },
      value: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: 0,
      }
    },
    data: () =>({
      currentTemplate: '',
      newName: '',
      newValue: '',
    }),
    computed: {
      ...mapGetters('svg', ['svg']),
      isName() {
        if(this.name === 'name') {
          return 'name';
        }
      }
    },
    methods: {
      ...mapActions('contacts', ['changeField', "deleteField", "setLastAction"]),
      objLastAction(action) {
        return {
          nameAction: action,
          nameField: this.name,
          valueField: this.value,
          indexField: this.index,
        }
      },
      onAcceptChanges() {
       if((this.newName || this.name === 'name') &&
         this.newValue &&
         (this.name !== this.newName || this.value !== this.newValue)
       ) {
          this.setLastAction(this.objLastAction('change'));
          this.changeField({
            name: this.newName || this.name,
            value: this.newValue,
            index: this.index,
          });
       }
        this.newName = this.newValue = this.currentTemplate = '';
      },
      onCancel() {
        this.currentTemplate = '';
      },
      onAcceptDelete() {
        this.setLastAction(this.objLastAction('delete'));
        this.deleteField(this.index);
        this.currentTemplate = '';
      },
      setCurrentTemplate(command) {
        if(this.currentTemplate === 'change') {
          this.newName = this.$refs.nameInput.value;
          this.newValue = this.$refs.valueInput.value;
          if ((this.name === 'name' || this.name === this.newName) && this.value === this.newValue) {

            return this.newName = this.newValue = this.currentTemplate = '';
          }
        }
          this.currentTemplate = command;
      }
    }

  }
</script>

<style scoped lang="scss">
  .test {
    width: 10px;
    height: 10px;
    color: black;
  }
  .contact {
    &-table {
      &__item {
        display: flex;
        justify-content: space-between;
        input {
          font-size: 18px;
          /*border: solid #a3ccd9;*/
          /*border-width: 0 0 2px 2px;*/
          padding-left: 10px;
          border-radius: 5px;
          border-width: 0 0;
          opacity: 0.3;
          transition: 0.5s;
          &:focus {
            opacity: 1;
            outline: none;
            background-image: linear-gradient(0.25turn, lightgray, white);

          }
        }
      }
      &__name {
        text-transform: capitalize;

      }
      &__value {
        margin-left: auto;
        margin-right: 20px;
      }
      &__buttons {
        display: flex;
        align-items: center;
      }
      &__button {
        background-color: #fff;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 5px;
        padding-top: 3px;
        opacity: 0.5;
        transition: 0.2s;
        &:focus {
          outline: none;
        }
        &:hover {
          opacity: 1;
/*          &.ok {
            background-color: green;
            color: #fff;
          }
          &.cancel {
            padding-top: 2px;
            background-color: red;
            color: #fff;
          }
          &.change {
            background-color: orange;
            color: #fff;
          }
          &.delete {
            background-color: red;
            color: #fff;
          }*/
        }
        &.ok {
          padding-top: 5px;
          color: green;
        }
        &.cancel {
          color: red;
        }
        &.change {
          color: orange;
        }
        &.delete {
          color: red;
        }
        &.name {
          margin-right: 30px;
        }
      }
    }

  }
</style>