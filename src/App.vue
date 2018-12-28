<template>
  <div id="app" >
    <Header></Header>
    <WeekLabels></WeekLabels>
    <MiddleContent></MiddleContent>
    <FooterReminder></FooterReminder>
  </div>
</template>

<script>
  import Header from './Header/Header.vue';
  import MiddleContent from './MiddleContent/Content.vue';
  import WeekLabels from './Header/WeekLabels.vue';
  import FooterReminder from './Footer/FooterReminder.vue';
  import {ACTION_CURRENT_DATE} from './store/types.js';
  import {mapActions} from 'vuex';

  export default {
    components: {
      Header,
      MiddleContent,
      WeekLabels,
      FooterReminder
    },
    methods:{
      ...mapActions({
        'changeCurrentDate': ACTION_CURRENT_DATE
      })
    },
    mounted(){
      this.changeCurrentDate(this.$moment().format('DD MMMM YYYY'));
    }
  };
</script>

<style lang="scss" scoped>
@import './assets/style/css/calendar.scss';

  #app {
    @include setImprovedFlex(center, center, column,false );
    @include dimensions(5rem, 6rem);
    border: 0.05em solid white;
    background-color: whitesmoke;
  }
 
</style>

