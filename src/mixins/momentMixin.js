import {mapState} from 'vuex';

export default {
    name: 'MomentJSMixin',
    data(){
        return {
            currentMonth: null
        }
    },
    computed:{
        ...mapState({
            currentDate: state => state.currentDate,
            eventsReminder: state => state.reminderEvents,
        }),
        month(){
         this.currentMonth = this.currentDate.split(" ");
         return this.currentMonth= this.currentMonth[1] + " " + this.currentMonth[2];

       },
       today(){
           return this.$moment().format('DD MMMM YYYY');
       },
       clickedDate(){
           return this.currentDate;
       }
      
    },
    methods:{
        subtractMonth(){
            return this.$moment(this.currentDate).subtract(1, 'month').format("DD MMMM YYYY");
            },
        addMonth(){
                return this.$moment(this.currentDate).add(1, 'month').format("DD MMMM YYYY");
            }
    }
}
