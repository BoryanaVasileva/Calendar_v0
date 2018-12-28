import Vue from 'vue'
import App from './App.vue'
import {store} from './store/store'
import moment from 'moment';
import './assets/style/css/main.css';

Vue.prototype.$moment = moment;

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
