// This component is quick-and-dirty modification of React admin original MenuItemLink component for POC.
// Original component doesn't fit our requirements, we want to keep just styles and sideBar related behaviour

import React, { forwardRef, useCallback } from "react";
import { MenuItem, ListItemIcon, MenuItemProps } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import { useStore } from "ra-core";

// Define the type for the use of sidebar state
type useSidebarStateResult = [boolean, (open: boolean) => void];

// Hook to manage the sidebar state
const useSidebarState = (): useSidebarStateResult => {
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return useStore<boolean>("sidebar.open", isXSmall ? false : true);
};

// Define the MenuItemLink component
export const MenuItemLink = forwardRef<HTMLDivElement, MenuItemLinkProps>(
  (props, ref) => {
    const { className, primaryText, leftIcon, onClick, ...rest } = props;
    const [open, setOpen] = useSidebarState();
    const isSmall = useMediaQuery(useTheme().breakpoints.down("md"));

    const handleMenuTap = useCallback(
      (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (isSmall) {
          setOpen(false);
        }
        onClick && onClick(event);
      },
      [setOpen, isSmall, onClick]
    );

    return (
      <StyledMenuItem
        className={className}
        ref={ref}
        onClick={handleMenuTap}
        {...rest}
      >
        {leftIcon && <ListItemIcon>{leftIcon}</ListItemIcon>}
        {primaryText}
      </StyledMenuItem>
    );
  }
);

// Define the component's prop types
export type MenuItemLinkProps = MenuItemProps & {
  leftIcon?: React.ReactElement;
  primaryText?: React.ReactNode;
};

// Define the styled MenuItem component
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
  "& .MuiListItemIcon-root": { minWidth: theme.spacing(5) },
}));
