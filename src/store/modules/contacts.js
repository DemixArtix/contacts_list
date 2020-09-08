import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    contactsList: [
      [
        {
          name: 'name',
          value: 'Artem',
        },
        {
          name: 'surname',
          value: 'Demin',
        },
        {
          name: 'phone',
          value: '9998887777',
        },
        {
          name: 'email',
          value: 'test@mail.com',
        },
      ],
       [
        {
          name: 'name',
          value: 'Nastya',
        },
        {
          name: 'surname',
          value: 'Verbovetskaya',
        },
        {
          name: 'phone',
          value: '9995554433',
        },
        {
          name: 'email',
          value: 'test@mail.com',
        },
      ],
    ],
    currentContact: [],
    indexOfCurrentContact: null,
    lastAction : {
      nameAction: '',
      nameField:'',
      valueField: '',
      indexField: null,
      indexContact: null,
    }
  },
  getters: {
    contactsList: ({contactsList}) => contactsList,
    // currentContact: ({currentContact}) => currentContact,
    indexOfCurrentContact: ({indexOfCurrentContact}) => indexOfCurrentContact,
    lastAction: ({lastAction}) => lastAction,
  },
  mutations: {
    SET_CURRENT_CONTACT(state, contact) {
      // state.currentContact = contact.currentContact;
      state.indexOfCurrentContact = contact.indexOfCurrentContact;
    },
    CHANGE_FIELD(state, field) {
      const path = state.contactsList
        [state.indexOfCurrentContact]
          [field.index];
      path.name = field.name;
      path.value = field.value;
    },
    DELETE_FIELD(state, index) {
      const path = state.contactsList[state.indexOfCurrentContact];
      path.splice(index, 1);
    },
    ADD_FIELD(state, field) {
      const path = state.contactsList[state.indexOfCurrentContact];
      path.push(field);
    },
    ADD_CONTACT(state, contact) {
      state.contactsList.unshift(contact);
    },
    DELETE_CONTACT(state, index) {
      state.contactsList.splice(index, 1);
    },
    SET_LAST_ACTION(state, obj) {
      state.lastAction = obj
    },
    CANCEL_LAST_ACTION(state, {nameAction, nameField, valueField, indexField, indexContact}) {
      const path = state.contactsList[indexContact];
      const pathLastAction = state.lastAction;
        if(nameAction === 'add') {
          path.splice(indexField, 1);
          pathLastAction.nameAction = 'delete';
          pathLastAction.nameField = nameField;
          pathLastAction.valueField = valueField;
        }
        if(nameAction === 'change') {
          const lastNameField = path[indexField].name;
          const lastValueField = path[indexField].value;
          Vue.set(path, indexField, {
            name: nameField,
            value: valueField,
          });
          pathLastAction.nameField = lastNameField;
          pathLastAction.valueField = lastValueField;
        }
        if(nameAction === 'delete') {
          path.splice(indexField, 0, {
            name: nameField,
            value: valueField,
          });
          pathLastAction.nameAction = 'add';
        }
    }
  },
  actions: {
    setCurrentContact({commit}, contact) {
      commit('SET_CURRENT_CONTACT', contact)
    },
    changeField({commit}, field) {
      commit('CHANGE_FIELD', field)
    },
    deleteField({commit}, index) {
        commit('DELETE_FIELD', index)
    },
    addField({commit}, field) {
      commit('ADD_FIELD', field);
    },
    addContact({commit}, contact) {
      commit('ADD_CONTACT', contact)
    },
    deleteContact({commit}, index) {
      commit('DELETE_CONTACT', index)
    },
    setLastAction({commit, getters}, obj) {
      obj.indexContact = getters.indexOfCurrentContact;
      commit('SET_LAST_ACTION', obj);
    },
    cancelLastAction({commit, getters}) {
      const obj = getters.lastAction;
      commit('CANCEL_LAST_ACTION', obj);
    }
  }
}