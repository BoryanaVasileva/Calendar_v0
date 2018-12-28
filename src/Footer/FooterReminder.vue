<template>
    <div class="remindeMeContainer">
        <div class="showReminder" v-if="!hideEventsReminder && eventsArr!==null">
    
            <div class="reminderHeader">
                <div class="reminderTitle">
                    {{ eventsArr!==null ? 'You have some events for today: '+ today : ''}}
                </div>
                
            </div>
            <div class="closeRem" @click="hideEventsReminder=!hideEventsReminder">
                    <span>X</span>
                </div>
    
        </div>
        <div class="events" v-if="eventsArr!==null && !hideEventsReminder">
            <div class="event" v-for="(event,key) in eventsArr" :key="key">{{key+1}}. {{event.event}} {{event.hour}}h </div>
        </div>
    </div>
</template>

<script>
    import MomentJSMixin from '../mixins/momentMixin.js'
    export default {
        mixins: [MomentJSMixin],
        data() {
            return {
                hideEventsReminder: false
            }
        },
        computed: {
            eventsArr() {
                return this.eventsReminder;
            }
        },
        mounted() {
            this.eventsReminder;
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/style/css/calendar.scss';
    .remindeMeContainer {
        @include setImprovedFlex($direction: column);
        @include dimensions(95.5%, 26.7%);
        color: rgba(54, 53, 53, .8);
        background-color: whitesmoke;
        border: 0.03em solid green;
    }
    
    .showReminder {
        @include setImprovedFlex($direction: column, $wrap: wrap);
        @include dimensions(100%, 30%);
        position: relative;
        font-size: 0.1em;
        background-color: whitesmoke;
    }
    
    .closeRem {
        @include setImprovedFlex($justify: flex-end);
        @include dimensions(5%, 100%);
        position: relative;
        span {
            @include setImprovedFlex($justify: center);
            @include dimensions(70%, 35%);
            color: red;
            top: -0.08em;
            left: 14.5em;
            font-size: 1.6em;
            position: absolute;
            border: 0.1em solid red;
            border-radius: 50%;
            &:hover {
                transform: scale(1.2);
            }
            &:active {
                transform: scale(0.8);
            }
        }
    }
    
    .reminderHeader {
        @include setImprovedFlex($justify: space-between);
        @include dimensions(100%, 20%);
        position: absolute;
        font-size: 0.15rem;
    }
    
    .reminderTitle {
        @include setImprovedFlex();
        @include dimensions(95%, 100%);
    }
    
    .events {
        @include setImprovedFlex($wrap: wrap);
        @include dimensions(100%, 70%);
        font-size: 0.1em;
        position: relative;
    }
    
    .event {
        @include setImprovedFlex();
        @include dimensions(100%, 20%);
    }
</style>
