export abstract class YupUtils {
	public static transformEmptyStringTo = <
		Original extends string,
		Transformed,
		ReturnedValue
	>(
		value: ReturnedValue
	) => (yupValue: Transformed, originalValue: Original) => {
		if (originalValue === "") {
			return value;
		}
		return yupValue;
	};
}
