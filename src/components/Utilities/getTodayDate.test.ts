import { getTodayDate } from "./getTodayDate";

describe("getTodayDate", () => {
    it("should return today's date", () => {
        const today: Date = new Date();
        let day: number = today.getDate();
        let month: number = today.getMonth() + 1;
        const year: number = today.getFullYear();
        
        if (day < 10) {
            day = +("0" + day);
        }
        if (month < 10) {
            month = +("0" + month);
        }

        const todayDate: string = year + "-" + month + "-" + day;
        const maxDate: string = year + 1 + "-" + month + "-" + day;

        expect(getTodayDate()).toEqual({todayDate, maxDate});
    });
})