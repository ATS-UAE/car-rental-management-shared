export abstract class StringUtils {
	public static toTitleWords = (word: string) => {
		const delimiter = "_";
		const splitWord = word.split(delimiter);
		let result = "";
		splitWord.forEach((item, index, array) => {
			for (let i = 0; i < item.length; i++) {
				const letter = item[i];
				if (i === 0) {
					result += letter.toUpperCase();
				} else {
					result += letter.toLowerCase();
				}
			}
			if (index < array.length - 1) {
				result += " ";
			}
		});
		return result;
	};
}
