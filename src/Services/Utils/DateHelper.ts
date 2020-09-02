export default class DateHelper {
    public get currentDate(): Date {
        return new Date();
    }

    public getInternalDateFormat(date: Date): string {
        const day = this.formatLeadingZero(date.getDate());

        const month = this.formatLeadingZero(date.getMonth() + 1);

        return `${day}.${month}.${date.getFullYear()}`;
    }

    public getInternalDateFormatFromString(date: string): string {
        const parsedDate = new Date(date);
        return this.getInternalDateFormat(parsedDate);
    }

    public formatTimeToInternalFormat(date: string): string {
        let output = '';
        const parsedDate = new Date(date);
        output += this.getInternalDateFormat(parsedDate);

        const hours = this.formatLeadingZero(parsedDate.getHours());
        const minutes = this.formatLeadingZero(parsedDate.getMinutes());

        output += ` ${hours}:${minutes}`;
        return output;
    }

    private formatLeadingZero(number: number): string {
        let output = number.toString();
        if (number < 10) {
            output = `0${output}`;
        }
        return output;
    }
}
