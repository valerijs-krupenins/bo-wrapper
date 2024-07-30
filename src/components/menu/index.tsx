import React from "react";
import { Menu, MenuProps } from "react-admin";
import { useNavigate } from "react-router-dom";

import { BO_1_MenuConfig } from "bo_1";
import { BO_2_MenuConfig } from "bo_2";

import { MenuItemLink } from "./menu-item";

export const CustomMenu = (props: MenuProps) => {
  const navigate = useNavigate();

  const combinedMenuConfig = [...BO_1_MenuConfig, ...BO_2_MenuConfig];

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <Menu {...props}>
      {combinedMenuConfig.map((item) => (
        <MenuItemLink
          key={item.name}
          primaryText={item.name}
          leftIcon={<item.icon />}
          onClick={() => handleClick(item.path)}
        />
      ))}
    </Menu>
  );
};

export default CustomMenu;
