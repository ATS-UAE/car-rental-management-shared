import React, { FC, useState, ReactElement, Component, ReactNode } from "react";
import _ from "lodash";
import {
	Stepper,
	Step,
	StepLabel,
	withStyles,
	createStyles,
	WithStyles,
	Grid
} from "@material-ui/core";
import { Form, FormProps } from ".";
import { FormError } from "./FormProvider";

export interface FormStep {
	id: number;
	label: string;
	hidden?: boolean;
	disabled?: boolean;
	completed?: boolean;
	error?: boolean;
	fields: string[];
}

export type FormStepperChildrenUtils<Values extends object> = {
	setPageState: (newState: Partial<FormStep>, id?: number) => void;
	nextPage?: () => void;
	previousPage?: () => void;
	isFirstPage: boolean;
	isLastPage: boolean;
	touchPageFields: () => void;
	getPageErrors: () => FormProps<Values>["errors"];
};

type StepperCallback<T, Values extends object> = (
	utils: FormStepperChildrenUtils<Values>
) => T;

type ReolvableChildren<Values extends object> =
	| ReactNode
	| StepperCallback<ReactNode, Values>;

interface FormStepperProps<Values extends object>
	extends Omit<FormProps<Values>, "children"> {
	steps: FormStep[];
	currentStep: number;
	actions?: StepperCallback<ReactElement, Values> | ReactNode;
	onNavigateStep: (stepId: number) => void;
	onStepsChange: (steps: FormStep[]) => void;
	render: ReolvableChildren<Values>;
}

type Props<Values extends object> = FormStepperProps<Values>;

export class FormStepper<Values extends object> extends Component<
	FormStepper<Values>["C"] extends React.ComponentType<infer P> ? P : never,
	{}
> {
	private readonly C =
		// JSX.LibraryManagedAttributes handles defaultProps, etc.  If you don't
		// need that, you can use `BaseFormCard<T>["props"]` or hard-code the props type.
		(
			props: JSX.LibraryManagedAttributes<
				typeof FormStepperBase,
				FormStepperBase<Values>["props"]
			>
		) => <FormStepperBase<Values> {...props} />;

	public static getFirstPage = <Values extends object = object>(
		steps: FormStep[]
	) => FormStepper.filterHiddenSteps<Values>(steps)[0];

	public static getLastPage = <Values extends object = object>(
		steps: FormStep[]
	) => {
		const filtered = FormStepper.filterHiddenSteps<Values>(steps);
		return filtered[filtered.length - 1];
	};

	public static filterHiddenSteps = <Values extends object = object>(
		steps: FormStep[]
	) => steps.filter(s => s.hidden !== true);

	public static getPageById = <Values extends object = object>(
		id: number,
		steps: FormStep[]
	) => steps.find(s => s.id === id) as FormStep;

	public static getPageIndexById = <Values extends object = object>(
		id: number,
		steps: FormStep[]
	) => steps.findIndex(s => s.id === id);

	public static isLastPage = <Values extends object = object>(
		currentStepId: number,
		steps: FormStep[]
	) => {
		const lastPage = FormStepper.getLastPage<Values>(steps);
		return (lastPage && lastPage.id === currentStepId) || false;
	};

	public static isFirstPage = <Values extends object = object>(
		currentStepId: number,
		steps: FormStep[]
	) => {
		const firstPage = FormStepper.getFirstPage<Values>(steps);
		return (firstPage && firstPage.id === currentStepId) || false;
	};

	public static getNextPage = <Values extends object = object>(
		currentStepId: number,
		steps: FormStep[]
	) => {
		const isLastPage = FormStepper.isLastPage<Values>(currentStepId, steps);
		const stepperSteps = FormStepper.filterHiddenSteps<Values>(steps);

		if (!isLastPage) {
			const nextStepIndex =
				FormStepper.getPageIndexById<Values>(currentStepId, stepperSteps) + 1;
			return stepperSteps[nextStepIndex];
		}
	};
	public static getPreviousPage = <Values extends object = object>(
		currentStepId: number,
		steps: FormStep[]
	) => {
		const isFirstPage = FormStepper.isFirstPage<Values>(currentStepId, steps);
		const stepperSteps = FormStepper.filterHiddenSteps<Values>(steps);

		if (!isFirstPage) {
			const prevStepIndex =
				FormStepper.getPageIndexById<Values>(currentStepId, stepperSteps) - 1;
			return stepperSteps[prevStepIndex];
		}
	};

	public static setPageState = <Values extends object = object>(
		id: number,
		newState: Partial<FormStep>,
		steps: FormStep[]
	): FormStep[] => {
		const pageIndex = FormStepper.getPageIndexById<Values>(id, steps);
		const oldState = steps[pageIndex];
		const leftElements = steps.slice(0, pageIndex);
		const rightElements = steps.slice(pageIndex + 1);
		return [...leftElements, _.merge(oldState, newState), ...rightElements];
	};

	public static getStepperActiveStepIndex = <Values extends object = object>(
		id: number,
		steps: FormStep[]
	) => FormStepper.filterHiddenSteps<Values>(steps).findIndex(s => s.id === id);

	public static getPageErrors = <Values extends object = object>(
		currentPage: FormStep,
		errors?: FormError<Values>
	): Partial<FormError<Values>> => {
		let pickedErrors: FormError<Values> =
			(errors && _.pick(errors, currentPage.fields)) || {};

		return pickedErrors;
	};

	public static touchPageFields = <Values extends object>(
		currentPage: FormStep,
		currentTouched: FormProps<Values>["touched"] = {},
		setTouched?: FormProps<Values>["onFieldTouch"]
	) => {
		const touched = currentPage.fields.reduce<object>((acc, field) => {
			_.set(acc, field, true);
			return acc;
		}, {});

		setTouched && setTouched({ ...currentTouched, ...touched });
	};

	render() {
		return <this.C {...this.props} />;
	}
}

class FormStepperBase<Values extends object> extends Component<Props<Values>> {
	public render = () => {
		const {
			actions,
			steps,
			currentStep,
			onStepsChange,
			onNavigateStep,
			render,
			...formProps
		} = this.props;

		const activeStep = FormStepper.getPageById<Values>(currentStep, steps);
		const stepperSteps = FormStepper.filterHiddenSteps<Values>(steps);
		const utils: FormStepperChildrenUtils<Values> = {
			isFirstPage: FormStepper.isFirstPage<Values>(currentStep, steps),
			isLastPage: FormStepper.isLastPage<Values>(currentStep, steps),
			nextPage: () => {
				const nextPage = FormStepper.getNextPage<Values>(currentStep, steps);
				nextPage && onNavigateStep(nextPage.id);
			},
			previousPage: () => {
				const previousPage = FormStepper.getPreviousPage<Values>(
					currentStep,
					steps
				);
				previousPage && onNavigateStep(previousPage.id);
			},
			setPageState: (newState, id) => {
				const newSteps = FormStepper.setPageState<Values>(
					id || activeStep.id,
					newState,
					steps
				);

				onStepsChange(newSteps);
			},
			getPageErrors: () =>
				FormStepper.getPageErrors<Values>(activeStep, formProps.errors),
			touchPageFields: () =>
				FormStepper.touchPageFields<Values>(
					activeStep,
					formProps.touched,
					formProps.onFieldTouch
				)
		};
		return (
			<Form
				{...formProps}
				header={
					<Stepper
						activeStep={FormStepper.getStepperActiveStepIndex<Values>(
							currentStep,
							steps
						)}
					>
						{stepperSteps.map(step => (
							<Step
								completed={step.completed}
								disabled={step.disabled}
								active={step.id === activeStep.id}
								key={step.id}
							>
								<StepLabel alternativeLabel error={step.error}>
									{step.label}
								</StepLabel>
							</Step>
						))}
					</Stepper>
				}
				footer={typeof actions === "function" ? actions(utils) : actions}
			>
				{typeof render === "function" ? render(utils) : render}
			</Form>
		);
	};
}
