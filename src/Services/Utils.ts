import StringHelper from './Utils/StringHelper';
import NumberHelper from './Utils/NumberHelper';
import ArrayHelper from './Utils/ArrayHelper';
import ObjectHelper from './Utils/ObjectHelper';
import CodeGenerator from './Utils/CodeGenerator';
import DateHelper from './Utils/DateHelper';

export class Utils {
    private static instance: Utils;

    private readonly stringHelper: StringHelper;
    private readonly numberHelper: NumberHelper;
    private readonly arrayHelper: ArrayHelper;
    private readonly objectHelper: ObjectHelper;
    private readonly codeGenerator: CodeGenerator;
    private readonly dateHelper: DateHelper;

    private constructor() {
        this.stringHelper = new StringHelper();
        this.numberHelper = new NumberHelper();
        this.arrayHelper = new ArrayHelper();
        this.objectHelper = new ObjectHelper();
        this.codeGenerator = new CodeGenerator();
        this.dateHelper = new DateHelper();
    }

    public static getInstance(): Utils {
        if (!Utils.instance) {
            Utils.instance = new Utils();
        }
        return Utils.instance;
    }

    public get string(): StringHelper {
        return this.stringHelper;
    }

    public get number(): NumberHelper {
        return this.numberHelper;
    }

    public get array(): ArrayHelper {
        return this.arrayHelper;
    }

    public get object(): ObjectHelper {
        return this.objectHelper;
    }

    public get generator(): CodeGenerator {
        return this.codeGenerator;
    }

    public get date(): DateHelper {
        return this.dateHelper;
    }
}

export default Utils.getInstance();
