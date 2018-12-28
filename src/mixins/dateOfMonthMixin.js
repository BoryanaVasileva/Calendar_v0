
export default{
    methods: {
        isToday(day) {
            let dayOfMonth = this.createDate(day);
            return this.today === dayOfMonth ? true : false;
        },
        createDate(day) {
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
   
}