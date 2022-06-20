module.exports = class Time {

    static now() {
        let date = new Date();
        let currentDay = date.getDay() - 1;
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let currentTimeStamp = parseInt(hours.toString() + minutes.toString());
        return new Time(currentDay, currentTimeStamp);
    }

    constructor(day, currentTimeStamp) {
        this.day = day
        this.currentTimeStamp = currentTimeStamp
    }
}
