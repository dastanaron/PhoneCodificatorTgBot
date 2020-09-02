export default class NumberHelper {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public isNumber(data: any): boolean {
        return typeof data === 'number';
    }

    public formatNumberToPrice(value: number, currency = 'RUB', locale = 'ru-RU'): string {
        return new Intl.NumberFormat(locale, { style: 'currency', currency: currency })
            .format(value)
            .replace(/\,00/, '');
    }

    public formatFloat(value: number | string): string {
        return String(value).replace(/\./, ',');
    }

    public divideIntoBits(value?: number | string): string | undefined {
        if (value === 0 || value === '0') {
            return String(value);
        }

        if (value) {
            return value
                .toString()
                .replace(/\s/g, '')
                .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        }
        return undefined;
    }

    public joinDividedIntoBits(value: string): number {
        return Number(value.replace(/\s/g, ''));
    }

    public getRandomInteger(min: number, max: number): number {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
}
