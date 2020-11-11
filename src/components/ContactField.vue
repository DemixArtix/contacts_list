<template>
  <div class="contact-table__item">
    <template v-if="currentTemplate === 'change'">
      <input v-if="name !== 'name'" ref="nameInput" type="text" class="contact-table__name" placeholder="name" :value="name">
      <span v-if="name === 'name'" ref="nameInput" class="contact-table__name name">{{name}} : </span>
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
  .name {
    margin-right: auto;
  }
  .contact {
    &-table {
      &__item {
        display: flex;
        justify-content: flex-start;
        position: relative;
        margin-top: 10px;
        padding-top: 15px;
      }
      &__name {
        text-transform: capitalize;
        margin-right: auto;
        position: absolute;
        font-size: .8rem;
        left: 0;
        top: 0;
      }
      &__value {
        /*margin-right: 20px;*/
        margin-top: 3px;
      }
      &__buttons {
        display: flex;
        align-items: center;
        margin-left: 10px;
        margin-right: 3px;
      }
      &__button {
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