import React, { FC, useState } from "react";
import {
	AppBar,
	Tabs,
	Tab,
	withStyles,
	WithStyles,
	createStyles,
	Theme
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

export interface InfoCardProps extends WithStyles<typeof styles> {
	tabs: Array<{
		label: string;
		body: JSX.Element;
	}>;
	wrapInPaper?: boolean;
}

const a11yProps = (index: any) => {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`
	};
};

const styles = (theme: Theme) =>
	createStyles({
		root: {
			height: "80vh",
			display: "flex",
			flexDirection: "column"
		},
		selected: {
			"&.Mui-selected": { color: theme.palette.primary.contrastText }
		},
		appBar: {
			background: theme.palette.primary.main
		}
	});

const InfoCardBase: FC<InfoCardProps> = ({
	tabs,
	classes,
	wrapInPaper = false
}) => {
	const [currentTab, setCurrentTab] = useState(0);
	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setCurrentTab(newValue);
	};

	const component = (
		<div className={wrapInPaper ? undefined : classes.root}>
			<AppBar
				classes={{ root: classes.appBar }}
				position="static"
				color="default"
			>
				<Tabs
					value={currentTab}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
				>
					{tabs.map((tab, index) => (
						<Tab
							label={tab.label}
							classes={{ selected: classes.selected }}
							{...a11yProps(index)}
						/>
					))}
				</Tabs>
			</AppBar>
			{tabs.length ? tabs[currentTab].body : null}
		</div>
	);

	if (wrapInPaper) {
		return <Paper classes={{ root: classes.root }}>{component}</Paper>;
	}

	return component;
};

export const InfoCard = withStyles(styles)(InfoCardBase);
