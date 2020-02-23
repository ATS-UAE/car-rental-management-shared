import React, { FC, ReactNode } from "react";
import {
	AppBar as MuiAppBar,
	Toolbar,
	Typography,
	IconButton,
	withStyles,
	createStyles,
	WithStyles,
	Theme
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

const styles = (theme: Theme) =>
	createStyles({
		logo: {
			cursor: "pointer",
			padding: 5,
			height: 56,
			[`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
				height: 48
			},
			[theme.breakpoints.up("sm")]: {
				height: 64
			},
			filter:
				"drop-shadow(0px 2px 1px rgba(0,0,0,0.2)) drop-shadow(0px 1px 1px rgba(0,0,0,0.14)) drop-shadow(0px 1px 3px rgba(0,0,0,0.12))"
		},
		toolbar: {
			display: "flex",
			justifyContent: "space-between"
		}
	});

export interface AppBarProps {
	classes?: Partial<Record<keyof typeof styles, string>>;
	title?: string;
	renderActions?: () => ReactNode;
	onMenuClick?: () => void;
	onLogoClick?: () => void;
	logoSrc: string;
	logoAlt: string;
}

const AppBarBase: FC<AppBarProps & WithStyles<typeof styles>> = ({
	classes,
	title,
	renderActions,
	onMenuClick,
	onLogoClick,
	logoSrc,
	logoAlt
}) => {
	return (
		<div>
			<MuiAppBar position="static">
				<Toolbar className={classes.toolbar}>
					<div>
						<img
							src={logoSrc}
							className={classes.logo}
							alt={logoAlt}
							onClick={() => onLogoClick && onLogoClick()}
						/>
						{title && (
							<Typography variant="h6" color="inherit">
								{title}
							</Typography>
						)}
					</div>
					<div>
						{renderActions && renderActions()}
						{onMenuClick && (
							<IconButton
								color="inherit"
								aria-label="Menu"
								onClick={onMenuClick}
							>
								<Menu />
							</IconButton>
						)}
					</div>
				</Toolbar>
			</MuiAppBar>
		</div>
	);
};

export const AppBar = withStyles(styles)(AppBarBase);
