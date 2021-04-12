export declare abstract class YupUtils {
    static transformEmptyStringTo: <Original extends string, Transformed, ReturnedValue>(value: ReturnedValue) => (yupValue: Transformed, originalValue: Original) => Transformed | ReturnedValue;
}
