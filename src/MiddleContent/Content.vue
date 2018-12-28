<template>
    <div class="callendarContent">
        <CallendarDaysComp :currentCallendarDays="callendarDays" :prevCallendarDays="previousCallendarDays" :naxtCallendarDaysArr="nextCallendarDays"></CallendarDaysComp>
    </div>
</template>

<script>
    import CallendarDaysComp from './CalendarDays';
    import MomentJSMixin from '../mixins/momentMixin.js'
    
    export default {
        mixins:[MomentJSMixin],
        data() {
            return {
                callendar: [],
                previosMonthDays: [],
                nextDays: [],
                callendarShowDays: 42,
    
            }
        },
        components: {
            CallendarDaysComp
        },
        computed: {
                callendarDays() {
                this.callendar = [];
                let days = this.$moment("1 "+this.month).daysInMonth();
                for (let i = 1; i <= days; i++) this.callendar.push(i);
    
                return this.callendar;
            },
            previousCallendarDays() {
                this.previosMonthDays = [];
                
                let numberOfPrevMonthDays = this.$moment(this.subtractMonth()).daysInMonth();
                // console.log(this.month);
                let startMonthWeekDay = this.$moment("1 "+this.month).startOf('month').weekday()-1;
                // console.log(startMonthWeekDay);
                if(startMonthWeekDay==-1) startMonthWeekDay=6;
                for (let i = 0; i < startMonthWeekDay; i++) {
                    this.previosMonthDays.push(numberOfPrevMonthDays - i);
                }  
                return this.previosMonthDays.reverse();
            },
            nextCallendarDays(){
                this.nextDays=[];
                let nextArrlenght = this.callendarShowDays- (this.callendar.length + this.previosMonthDays.length);
                for(let i=1; i<= nextArrlenght; i++) this.nextDays.push(i);
                return this.nextDays;
            }

        },
    }
</script>

<style lang="scss" scoped>
@import '../assets/style/css/calendar.scss';

    .callendarContent {
        @include display-flex;
        @include dimensions(100%, 60%);
    }
</style>
