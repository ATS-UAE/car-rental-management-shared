import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = (
	options:
		| Parameters<typeof createStyles>[0]
		| ((theme: Theme) => ReturnType<typeof createStyles>)
): ReturnType<typeof makeStyles> => {
	if (typeof options === "function") {
		return makeStyles((theme: Theme) => {
			const styles = options(theme);
			return createStyles(styles);
		});
	}
	return makeStyles(
		createStyles(options as Parameters<typeof createStyles>[0])
	);
};
