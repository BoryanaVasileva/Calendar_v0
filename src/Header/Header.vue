<template>
    <div class="header">
        <Arrow :leftArrow="true" ></Arrow>
        <Month></Month>
        <Arrow :leftArrow="false"></Arrow>
    
    </div>
</template>

<script>
    import Arrow from './Arrow';
    import Month from './Month';

    export default {
        components: {
            Arrow,
            Month
        }
    }
</script>

<style lang="scss" scoped>
@import '../assets/style/css/calendar.scss';
    .header {
        @include setImprovedFlex();
        @include dimensions(97%, 8%);
        font-size: 0.1em;
        text-align: center;
        background-color: olivedrab;
    
    }
</style>
