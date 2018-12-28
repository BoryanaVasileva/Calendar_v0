import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
import moment from 'moment';

Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        currentDate: moment().format('DD MMMM YYYY'),
        reminderEvents: JSON.parse(sessionStorage.getItem(moment().format('DD MMMM YYYY'))),
       
      
    },
    mutations: {
        [types.CURRENT_DATE]: (state, currentDate) => {
            state.currentDate = currentDate;
        },
        [types.CREATE_REMINDER] : (state, reminderEvents) =>{
            state.reminderEvents = [];
            if(reminderEvents!=null){
              for(let i=0; i< reminderEvents.length; i++)
              state.reminderEvents.push(reminderEvents[i]);
            }
        }
       
    
    },
    actions: {
        [types.ACTION_CURRENT_DATE]: ({ commit }, currentDate) => {
            commit(types.CURRENT_DATE, currentDate);
        },
        [types.ACTION_CREATE_REMINDER]: ({commit}, reminderEvents) =>{
            commit(types.CREATE_REMINDER, reminderEvents);
        }
    }    
});