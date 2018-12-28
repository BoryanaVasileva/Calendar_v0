<template>
    <div class="middleContent">
        <Day v-for="(prevDay, prevDayIndex) in prevCallendarDays" :key="'prev_month_prevdayIndex_'+prevDayIndex+'_'+prevDay" :currentDateOfMonth="prevDay" :isCurrentMonth="false"></Day>
        <Day v-for="(day, index) in currentCallendarDays" :key="'current_month_index_'+index+'_'+day" :currentDateOfMonth="day" :isCurrentMonth="true"></Day>
        <Day v-for="(nextDay, nextDayIndex) in naxtCallendarDaysArr" :key="'next_mont_nextDayIndex'+nextDayIndex+'_'+nextDay" :currentDateOfMonth="nextDay" :isCurrentMonth="false" ></Day>
    </div>
</template>

<script>
    import Day from './Day';
    export default {
        props: {
            currentCallendarDays: Array,
            prevCallendarDays: Array,
            naxtCallendarDaysArr: Array
        },
        components: {
            Day
        },
        data(){
            return{
                bool: false
            }
        },
        methods:{
            setClass(val){
                return this.bool = val;
            }
        }
    
    }
</script>

<style lang="scss" scoped>
@import '../assets/style/css/calendar.scss';

    .middleContent {
        @include setImprovedFlex($wrap:wrap);
        @include dimensions(100%);
        font-size: 0.2em;
        text-align: center;
        background-color: whitesmoke;
    }
    .middleContent :nth-child(7n){
        color: red!important;
    }
    .middleContent :nth-child(7n-1){
        color: orange!important;
    }
   </style>
