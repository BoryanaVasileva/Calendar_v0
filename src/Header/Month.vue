<template>
    <div class="month">
    {{month}}
    </div>    
</template>
<script>
import {mapState} from 'vuex';
import MomentJSMixin from '../mixins/momentMixin.js'

export default {
    mixins:[MomentJSMixin]
}
</script>

<style lang="scss" scoped>
@import '../assets/style/css/calendar.scss'; 
.month{
    @include setImprovedFlex();
    @include dimensions(60%, 100%);
    padding: 1%;
    color: white;
    font-size: 2.5em;
}
</style>
