export type InputValue = string | number;

export interface IBaseInputProps {
	label?: string;
	disabled?: boolean;
	fullWidth?: boolean;
	error?: boolean;
}
/**
 * Props for Formik Fields
 */
export interface IBaseFieldProps {
	name: string;
	onBlur?: import("react").FocusEventHandler;
}

export interface IInputProps {
	field: IBaseFieldProps & {
		onChange: import("react").ChangeEventHandler;
		value: InputValue;
	};
	type?: string;
}

export interface ISelectInputProps {
	items: Array<{ label: string; value: InputValue }>;
	haveNone?: boolean;
	field: IBaseFieldProps & {
		onChange: (
			event: React.ChangeEvent<{ name?: string; value: unknown }>,
			child: React.ReactNode
		) => void;
		value: InputValue;
	};
}

export interface IMultiSelectInputProps
	extends IBaseInputProps,
		Omit<ISelectInputProps, "field"> {
	field: Omit<ISelectInputProps["field"], "value"> & { value: InputValue[] };
}

export interface IImageInputProps
	extends IBaseInputProps,
		Omit<IInputProps, "field"> {
	icon: React.ElementType;
	field: Omit<IInputProps["field"], "value"> & {
		value?: File | string;
	};

	main: boolean;
	children?: React.ReactNode;
}

export interface IDateTimePickerProps extends IBaseInputProps {
	field: IBaseFieldProps & {
		value: Date;
		onChange: (date: Date) => void;
	};
}

export interface ISliderProps extends IBaseInputProps {
	min: number;
	max: number;
	step: number;
	classes: {
		label: string;
		root: string;
	};
	field: IBaseFieldProps & {
		onChange: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
		value: number | number[];
	};
}
