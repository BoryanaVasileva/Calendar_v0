<template>
    <div class="days" :class="[{reminderToDate : addReminderColor(currentDateOfMonth)},{today: isToday(currentDateOfMonth)},{notMonthDays: isCurrentMonth===false}]">
        <div class="day" :class="[{clickable: clickable}]" @click="clickDay(currentDateOfMonth)" @mouseover="checkForRemindEvents(currentDateOfMonth)" @mouseleave="hasReminder=false">
            {{currentDateOfMonth}}
            <span class="tooltiptext" v-if="hasReminder===true">
                <p>{{events!==null ? events[0].event+' for '+events[0].hour+'h' : ''}}</p>
            </span>
        </div>
        <CreateReminder :day="createDate(currentDateOfMonth)" :show="clicked" @showReminder="changeClicked($event)"></CreateReminder>
    </div>
</template>

<script>
    import MomentJSMixin from '../mixins/momentMixin.js';
    import DateOfMonthMixin from '../mixins/dateOfMonthMixin.js';
    import CreateReminder from './CreateReminder';
    
    export default {
        mixins: [MomentJSMixin],
        props: {
            currentDateOfMonth: Number,
            isCurrentMonth: Boolean
        },
        components: {
            CreateReminder
        },
        data() {
            return {
                clickable: false,
                clicked: false,
                hasReminder: false,
                events: null
            }
        },   
         methods: {
        isToday(day) {
            let dayOfMonth = this.createDate(day);
            return this.today === dayOfMonth ? true : false;
        },
        createDate(day) {
            if(this.isCurrentMonth===false) return;
            let d = day + " " + this.month;
            return this.$moment(d).format("DD MMMM YYYY");
        },
        isClickable(day) {
            if (!this.isCurrentMonth) return this.clickable = false;
            let dayOfMonth = this.createDate(day);
            if (this.$moment(this.today) <= this.$moment(dayOfMonth)) return this.clickable = true;
            return this.clickable = false;
        },
        clickDay(day) {
            this.hasReminder = false;
            if (this.isClickable(day)) return this.clicked = !this.clicked;
            return this.clicked = false;

        },
        changeClicked(val) {
            return this.clicked = val;
        },
        checkForRemindEvents(day) {
            this.isClickable(day);
            this.events = JSON.parse(sessionStorage.getItem(this.createDate(day)));
            if (!this.isCurrentMonth) return;
            if (this.events !== null) return this.hasReminder = true;

            return this.hasReminder = false;
        },
        addReminderColor(day) {
            if (!this.isCurrentMonth) return;
            if (JSON.parse(sessionStorage.getItem(this.createDate(day))) !== null) return true;
            return false;
        }
    }, 
        mounted() {
            this.today;
        },
        watch: {
            currentDate() {
                this.clickable = false;
                this.clicked = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/style/css/calendar.scss';
    .days:not(:nth-child(7n+0)):not(:nth-child(7n-1)) {
        color: green;
    }
    
    .reminderToDate {
        border-radius: 10%;
        border: 0.08em solid orange!important;
    }
    
    .days {
        @include display-flex;
        @include justify-content(center);
        @include dimensions(13%, 15.5%);
        text-align: center;
        border: 0.1em solid lightgray;
    }
    
    .day {
        @include display-flex;
        @include justify-content(center);
        @include dimensions(50%, 25%);
        transform: translateY(0.7em);
    }
    
    .notMonthDays {
        color: gray!important;
    }
    
    .today {
        color: white!important;
        background-color: green;
    }
    
    .currentMonth {
        font-weight: bold;
    }
    
    .clickable {
        cursor: pointer;
    }
    
    .day .tooltiptext {
        visibility: hidden;
        width: 3rem;
        height: 3em;
        align-items: center;
        font-size: 0.65em;
        color: white;
        text-align: center;
        border-radius: 6em;
        position: absolute;
        z-index: 1;
        bottom: 150%;
        background-color: rgb(57, 153, 218);
    }
    
    .day .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -0.5em;
        border-width: 0.25em;
        border-style: solid;
        border-color: rgba(57, 153, 218, 0.9) transparent transparent transparent;
    }
    
    .day:hover .tooltiptext {
        visibility: visible;
    }
    
</style>
