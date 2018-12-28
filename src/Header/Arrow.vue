<template>
     <div id="arrowLeft">
             <div class="arrow" :class="leftArrow? 'arrow-left' : 'arrow-right'"  @click="changeMonth()"></div>      
    </div>
</template>
<script>
import {mapActions} from 'vuex';
import {ACTION_CURRENT_DATE} from '../store/types.js';
import MomentJSMixin from '../mixins/momentMixin.js';

export default {
    mixins:[MomentJSMixin],
    props:{
        leftArrow: Boolean
    },
    methods:{
        ...mapActions({
            'changeDate': ACTION_CURRENT_DATE
        }),
        changeMonth(){
          if(this.leftArrow) return this.changeDate(this.subtractMonth());
          return this.changeDate(this.addMonth());
        }

    }

}
</script>


<style lang="scss" scoped>
@import '../assets/style/css/calendar.scss';

    #arrowLeft {
        @include setImprovedFlex($justify: space-around);
        @include dimensions(20%, 100%);
        padding: 0.05rem
      
    }
    .arrowContent{
        @include setImprovedFlex();
        @include dimensions(100%, 100%);
        color:white;
        font-size: 3em;
    }
    
    .arrow {
        @include dimensions(1em, 1em);
        box-shadow: 0.11em -0.11em 0 0.11em aliceblue inset;
        -webkit-box-shadow: 0.2em -0.2em aliceblue  inset;
        border: solid transparent;
        border-width: 0 0 0.5em 0.5em;
        transition: 0.2s;
      }
    
    .arrow:hover {
        box-shadow: 0.1em -0.1em 0 0.1em rgb(153, 146, 153)  inset;
        -webkit-box-shadow: 0.1em -0.2em rgb(153, 146, 153)  inset;
    }
    .arrow:active{
        font-size: 0.5em;
    }
    
    .arrow-right {
        transform: rotate(225deg)
    }
    
    .arrow-left {
        transform: rotate(45deg)
    }
</style>


