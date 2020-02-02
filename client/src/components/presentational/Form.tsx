import React, { Component, ReactNode } from "react";
import {
	Grid,
	Typography,
	createStyles,
	withStyles,
	Theme
} from "@material-ui/core";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import {
	ErrorChip,
	FormProvider,
	FormProviderProps,
	FormHeader,
	FormHeaderProps,
	FormFooter,
	FormFooterProps
} from ".";

export enum FormStatus {
	CHANGING = "CHANGING",
	SUBMITTING = "SUBMITTING"
}

export interface FormProps<Values extends object>
	extends FormProviderProps<Values>,
		FormHeaderProps,
		FormFooterProps {
	container?: boolean;
	header?: ReactNode;
	footer?: ReactNode;
}

export class Form<Values extends object> extends Component<
	Form<Values>["C"] extends React.ComponentType<infer P> ? P : never,
	{}
> {
	private readonly C = withStyles(styles)(
		// JSX.LibraryManagedAttributes handles defaultProps, etc.  If you don't
		// need that, you can use `BaseFormCard<T>["props"]` or hard-code the props type.
		(
			props: JSX.LibraryManagedAttributes<
				typeof FormBase,
				FormBase<Values>["props"]
			>
		) => <FormBase<Values> {...props} />
	);

	render() {
		return <this.C {...this.props} />;
	}
}

class FormBase<Values extends object> extends Component<
	FormProps<Values> & WithStyles<typeof styles>
> {
	public render() {
		const {
			errorNotes,
			classes,
			title,
			hints,
			children,
			footer,
			header,
			...formProps
		} = this.props;

		return (
			<Grid container className={classes.root} direction="column">
				<Grid item className={classes.header}>
					<FormHeader errorNotes={errorNotes} title={title}>
						{header}
					</FormHeader>
				</Grid>
				<FormProvider {...formProps}>
					<Grid item className={classes.body}>
						{children}
					</Grid>
					<Grid className={classes.footer} item>
						<FormFooter hints={hints}>{footer}</FormFooter>
					</Grid>
				</FormProvider>
			</Grid>
		);
	}
}

const styles = (theme: Theme) =>
	createStyles({
		root: {},
		header: {},
		body: {},
		footer: {},
		hints: {
			float: "right"
		},
		title: {
			marginBottom: theme.spacing(3)
		}
	});
