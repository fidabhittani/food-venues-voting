import React, { useState } from "react";

import { Layout, Avatar, Menu, Icon, Popover, Affix } from "antd";
import "./main.less";
const SubMenu = Menu.SubMenu;

const { Header, Footer, Sider, Content } = Layout;

interface IMainLayout {
  children: any;
  menus?: any;
  title?: string;
}

interface IMenu {
  key?: string | number;
  title?: string;
  items?: IMenu[];
}

interface IMenus {
  menus?: IMenu[];
}

const CreateMenus = ({ menus = [] }: IMenus) => {
  return (
    <Menu mode="inline" theme="dark">
      {menus &&
        Array.isArray(menus) &&
        menus.map((menu: IMenu, index: number) => {
          const { title, items, key } = menu;
          if (items && Array.isArray(items)) {
            return (
              <SubMenu
                key={key}
                title={
                  <span>
                    <Icon type="mail" />
                    <span>{title}</span>
                  </span>
                }
              >
                {items &&
                  Array.isArray(items) &&
                  items.map(({ title }: IMenu, index: number) => (
                    <Menu.Item key={`sub-menu-item-${index}`}>
                      <Icon type="desktop" />
                      <span>{title}</span>
                    </Menu.Item>
                  ))}
              </SubMenu>
            );
          }

          return (
            <Menu.Item key={`sub-menu-item-${index}`}>
              <Icon type="desktop" />
              <span>{title}</span>
            </Menu.Item>
          );
        })}
    </Menu>
  );
};

const MainLayout = ({
  children,
  title = "Finleap Case Study",
  menus = [{ key: "Home", title: "Home" }]
}: IMainLayout) => {
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  return (
    <Layout id="main-app-container" className="layout">
      <Affix offsetTop={0}>
        <Header className="header">
          <div className="left">
            <h2>{title}</h2>
          </div>
          <div className="right">
            <Popover
              placement="bottom"
              title={"Settings"}
              content={() => null}
              trigger="click"
            >
              <Icon
                style={{
                  color: "#87d068",
                  fontSize: "18px",
                  marginRight: "10px"
                }}
                type="setting"
              />
            </Popover>

            <Avatar
              style={{ color: "#87d068", background: "transparent" }}
              icon="user"
            />
          </div>
        </Header>
      </Affix>

      <Content style={{ padding: "0 0" }}>
        <Layout>
          <Sider collapsed={menuCollapsed}>
            <Affix offsetTop={60}>
              <CreateMenus menus={menus} />
            </Affix>
          </Sider>
          <Content style={{ position: "relative" }}>
            <Icon
              className="trigger"
              type={menuCollapsed ? "menu-unfold" : "menu-fold"}
              onClick={() => setMenuCollapsed(!menuCollapsed)}
            />

            {children}
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2019 Created by Ant UED
            </Footer>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default MainLayout;
