<template>
    <div class="overlay"  v-show="showContainder">
        <div class="reminder">
            <div class="wrapper">
                
                <div class="closeB">
                    <div class="title">Add event reminder for {{day}}</div>
                
                    <div class="buttonClose" @click="hideReminder()">X</div>
                </div>
                <div class="eventText" :class="[{'warning':eventNameIsTooSmall()}, {'maxSize': eventNameWillGetMaxLength()}]">
                    <div class="labelEvent">Event</div>
                    <div class="eventInputField">
                        <input id="input" type="text" v-model="eventInput" maxlength="100">
                        <span v-if="eventInput!==''">{{eventNameIsTooSmall()? 'Event name is too small!': ''}}</span>
                        <span v-if="eventInput!==''">{{eventNameWillGetMaxLength()? 'Event name will get max length!': ''}}</span>
    
                    </div>
    
                </div>
    
                <div class="eventHour">
                    <div>Hour</div>
    
                    <input id="selectedHour" type="number" min="0" max="24" v-model="eventHour" maxlength="2">h<br>
                    <input id="selectedMin" type="number" min="0" max="60" v-model="eventMin" maxlength="2">m<br>
                    <input id="selectedSec" type="number" min="0" max="60" v-model="eventSec" maxlength="2">s<br>
    
                </div>
                <div id="clear" class="btnClear" @click="clearForm()">Clear</div>
                <div id="submit" class="btnSubmit" @click="saveEvent()">Submit</div>
            </div>
        </div>
  </div>
</template>

<script>
    import {
        mapActions
    } from 'vuex';
    import {
        ACTION_CREATE_REMINDER,
        ACTION_CURRENT_DATE
    } from '../store/types.js';
    import MomentJSMixin from '../mixins/momentMixin.js';
    
    export default {
        mixins: [MomentJSMixin],
        props: {
            show: Boolean,
            day: String
    
        },
        data() {
            return {
                eventInput: '',
                eventHour: 0,
                eventMin: 0,
                eventSec: 0,
                hide: false
            }
        },
        computed: {
            showContainder: {
                get() {
                    this.hide = this.show;
                    return this.hide;
                },
                set(value) {
                    return this.hide = value;
                }
            },
          

        },
        methods: {
            ...mapActions({
                'eventsArr': ACTION_CREATE_REMINDER,
                'changeCurrentDate': ACTION_CURRENT_DATE
            }),
              isAddedEvent() {
    
                let currentDayEventsReminder = JSON.parse(sessionStorage.getItem(this.day));

                if (currentDayEventsReminder !== null) {
                    this.eventInput = currentDayEventsReminder[currentDayEventsReminder.length - 1].event;
                    let stringHour = currentDayEventsReminder[currentDayEventsReminder.length - 1].hour.split(':');
    
                    this.eventHour = stringHour[0];
                    this.eventMin = stringHour[1];
                    this.eventSec = stringHour[2];
                    return;
                }
                return;
            },
            hideReminder() {
                this.$emit('showReminder', false);
            },
            eventNameIsTooSmall() {
                return this.eventInput.length < 10;
            },
            eventNameWillGetMaxLength() {
                return this.eventInput.length > 90;
            },
            clearForm() {
                this.eventInput = '';
                this.eventHour = 0;
                this.eventMin = 0;
                this.eventSec = 0;
                return;
            },
            checkForm() {
                let len = this.eventInput.length;
                let hourAsNum = parseInt(this.eventHour);
                let minAsNum = parseInt(this.eventMin);
                let secAsNum = parseInt(this.eventSec);
    
                if (len < 10 || len > 100) return false;
                if (len < 10 || len > 100 || hourAsNum < 0 || hourAsNum > 60 || minAsNum < 0 || minAsNum > 60 || secAsNum < 0 || secAsNum > 60) return false;
                return true;
            },
            saveEvent() {
                if (!this.checkForm()) return;
                if (this.eventHour < 10) this.eventHour = `0${this.eventHour}`;
                if (this.eventMin < 10) this.eventMin = `0${this.eventMin}`;
                if (this.eventSec < 10) this.eventSec = `0${this.eventSec}`;
    
                let dayEvents = JSON.parse(sessionStorage.getItem(this.day));
                let eventObj = {
                    'event': this.eventInput,
                    'hour': `${this.eventHour}:${this.eventMin}:${this.eventSec}`
                };
    
                if (dayEvents === null) {
                    dayEvents = [];
                    dayEvents.push(eventObj);
                } else {
                    dayEvents.push(eventObj)
                }
                sessionStorage.setItem(this.day, JSON.stringify(dayEvents));
                if (this.day === this.today) this.eventsArr(JSON.parse(sessionStorage.getItem(this.day)));
               
                return this.clearForm();
            },
    
        },
        watch: {
            showContainder() {
                if (this.showContainder === true){
                 console.log('Reminder is clicked');
                 return this.isAddedEvent();
                }return;
            },
    
    
        }
    
    }
</script>

<style lang="scss" scoped>
    @import '../assets/style/css/calendar.scss';
    .warning {
        #input {
            color: orange;
        }
    }
    
    .maxSize {
        #input {
            color: red;
        }
    }
    
    .hide {
        visibility: false;
    }
    
    .reminder {
        @include display-flex;
        @include dimensions (2rem, 1.2rem);
        font-family: Montserrat, sans-serif;
        font-weight: normal;
        position: absolute;
        z-index: 100;
        left:7.31em;
        top: 5.5em;
        box-sizing: border-box;
        margin-top: 2%;
        color: white;
        background-color: white;
    }
    
    .wrapper {
        @include display-flex;
        @include flex-wrap($wrap: wrap);
        @include dimensions(100%);
        font-size: 0.4em;
        color: rgb(36, 125, 202);
        border: 0.1em solid orange;
    }
    
    .closeB {
        @include setImprovedFlex($justify: flex-end);
        @include dimensions(100%, 17%);
        background-color: orange;
        color: rgb(36, 125, 202);
        font-size: 1.4em;
    }
    .title{
         @include setImprovedFlex($justify: flex-start);
        @include dimensions(95%, 100%);
        font-size: 0.8em;
        text-align: left;
    }
    .buttonClose {
        @include setImprovedFlex();
        @include dimensions(6%, 10%);
        position: absolute;
        left: 16.4em;
        text-align: left;
        color: red;
        border: 0.1em solid red;
        border-radius: 50%;
        &:hover {
            transform: scale(1.1);
        }
        &:active {
            transform: scale(0.8);
        }
    }
    
    .eventText {
        @include setImprovedFlex($justify: flex-start);
        @include dimensions(100%, 30%);
        font-size: 0.1rem;
    }
    
    .labelEvent {
        @include dimensions(30%, 20%);
    }
    
    .eventInputField {
        @include dimensions(65%, 30%);
        input {
            @include dimensions(100%);
            font-size: 0.8em;
        }
        span {
            @include dimensions(100%, 10%);
            font-size: 0.7em;
            color: black;
            font-weight: normal;
        }
    }
    
    .eventHour {
        @include setImprovedFlex($justify: space-around);
        @include dimensions(100%, 25%);
        font-size: 1em;
        input {
            @include dimensions(15%, 40%);
            font-size: 1.1em;
            text-align: right;
             ::placeholder {
                color: black;
            }
        }
        div {
            @include dimensions(25%, 305);
            font-size: 0.1rem;
        }
    }
    
    .btnClear {
        @include dimensions(45%, 15%);
        margin: 0% 2%;
        padding-top: 0.2em;
        font-size: 1.2em;
        color: antiquewhite;
        cursor: pointer;
        background-color: cornflowerblue;
        &:hover{
            transform: scale(1.05)
        }
        &:active{
            transform: scale(0.8)
        }
    }
    
    .btnSubmit {
        @include dimensions(45%, 15%);
        margin: 0% 2%;
        padding-top: 0.2em;
        font-size: 1.2em;
        color: antiquewhite;
        cursor: pointer;
        background-color: olivedrab;
          &:hover{
            transform: scale(1.05)
        }
        &:active{
            transform: scale(0.8)
        }
    }
    
    #selectedSec, #selectedMin, #selectedHour {
        color: black!important;
    }
    
    .overlay {
        position: absolute;
        @include dimensions(45%, 83%);
        z-index: 20;
        top: 4em;
        left: 15em;
        right: 4em;;
        background: rgba(0, 0, 0, 0.0);
    }
</style>
