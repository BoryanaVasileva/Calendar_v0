<template>
    <div class="headerLabels">
        <div class="alingContainer">
        <div class="labels" v-for="(label, lInd) in weekDaysLabels" :key="(lInd*7-5)"> {{label.slice(0,2)}}</div>    
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                weekDaysLabels: [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/style/css/calendar.scss';

 .labels:nth-child(7n-1) {
        color: orange;
    }
    
    .labels:nth-child(7n+0) {
        color: red;
    }
    
    .headerLabels {
       @include setImprovedFlex(); 
       @include dimensions(97%, 5%);
       font-size: 0.15em;
        color: white;
        background-color: olivedrab;
    }
    .alingContainer{
        @include setImprovedFlex($justify: space-around);
        @include dimensions(96%, 100%);

    }
    .labels {
        @include setImprovedFlex($justify: space-around);
        @include dimensions(20%, 100%);
        text-align: center;
    }
</style>
