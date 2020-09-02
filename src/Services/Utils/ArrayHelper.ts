import { StandardObjectInterface, SimpleObjectInterface } from '../../Contracts/StandartObjectTypes';

export default class ArrayHelper {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public isArray(data: any): boolean {
        return data !== 'undefined' && Array.isArray(data);
    }

    public isEmpty(array: string[] | number[] | StandardObjectInterface[]): boolean {
        return array.length === 0;
    }

    public getRandomElementFromArray(
        array: number[] | string[] | StandardObjectInterface[] | (number | string)[],
    ): number | string | StandardObjectInterface {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    public groupElementsByEmbeddedKey(array: StandardObjectInterface[], embeddedKey: string): StandardObjectInterface {
        const isEmbeddedKey = this.isEmbeddedKey(embeddedKey);

        const groupedObject: StandardObjectInterface = {};

        for (const element of array) {
            const valueOfElementKey = isEmbeddedKey
                ? String(this.getDeepValue(element, embeddedKey))
                : element[embeddedKey];

            if (!groupedObject.hasOwnProperty(valueOfElementKey)) {
                groupedObject[valueOfElementKey] = [];
                groupedObject[valueOfElementKey].push(element);
            } else {
                groupedObject[valueOfElementKey].push(element);
            }
        }

        return groupedObject;
    }

    public getMaxValueFromObjects(objects: StandardObjectInterface[], embeddedKey: string): number {
        const isEmbeddedKey = this.isEmbeddedKey(embeddedKey);

        let max = 0;
        let iterator = 0;
        for (const object of objects) {
            const deepValue = isEmbeddedKey ? this.getDeepValue(object, embeddedKey) : object[embeddedKey];
            if (iterator === 0) {
                max = deepValue;
            }

            if (deepValue > max) {
                max = deepValue;
            }
            iterator++;
        }
        return max;
    }

    public getMinValueFromObjects(objects: StandardObjectInterface[], embeddedKey: string): number {
        const isEmbeddedKey = this.isEmbeddedKey(embeddedKey);

        let min = 0;
        let iterator = 0;
        for (const object of objects) {
            const deepValue = isEmbeddedKey ? this.getDeepValue(object, embeddedKey) : object[embeddedKey];
            if (iterator === 0) {
                min = deepValue;
            }

            if (deepValue < min) {
                min = deepValue;
            }
            iterator++;
        }
        return min;
    }

    public getSumFromObjects(objects: StandardObjectInterface[], embeddedKey: string): number {
        const isEmbeddedKey = this.isEmbeddedKey(embeddedKey);
        let sum = 0;
        let iterator = 0;
        for (const object of objects) {
            const deepValue = isEmbeddedKey ? this.getDeepValue(object, embeddedKey) : object[embeddedKey];
            sum += deepValue;
            iterator++;
        }
        return sum;
    }

    private isEmbeddedKey(key: string): boolean {
        return key.search(/\./) > -1;
    }

    private getDeepValue(object: StandardObjectInterface, embeddedKey: string): any {
        const deepLevelKeys = embeddedKey.split('.');

        let link = object;

        for (const key of deepLevelKeys) {
            try {
                link = link[key];
            } catch (e) {
                return undefined;
            }
        }
        return link;
    }

    public getJoinedValuesFromObjects(
        objects: SimpleObjectInterface[],
        embeddedKey: string,
        delimiter: string,
    ): string {
        const result: any[] = [];

        for (const object of objects) {
            if (!result.includes(object[embeddedKey]) && object[embeddedKey]) {
                result.push(object[embeddedKey]);
            }
        }
        return result.length > 0 ? result.join(delimiter) : '';
    }
}
