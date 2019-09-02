import { RouteComponentProps } from "react-router";

export interface IPage {
	id: string;
	path: string;
	component: (props: any) => React.ReactNode;
	exact?: boolean;
	requireLogin?: boolean;
	sidebar?: {
		title: string;
		icon: React.ElementType;
		location: "top" | "bottom";
	};
	access?: Role[];
	wrapPaper?: boolean;
}
