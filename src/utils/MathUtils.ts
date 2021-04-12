export abstract class MathUtils {
	public static rangeOverlap = (
		x1: number,
		x2: number,
		y1: number,
		y2: number
	): boolean => Math.max(x1, y1) <= Math.min(x2, y2);
}
