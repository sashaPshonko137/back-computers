import React from "react";

import {
  InboxOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Button, Input, Typography } from "antd";
import { Link } from "react-router-dom";

import { AdaptiveDrawer } from "components/AdaptiveDrawer/AdaptiveDrawer";
import { DropdownUser } from "components/DropdownUser/DropdownUser";

import { RouterPath } from "configs/route-config";

import { useCartActions } from "hooks/cart/use-cart-actions";
import { useSearchProducts } from "hooks/products/use-search-products";

import styles from "./Navbar.module.scss";

export const Navbar = () => {
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  const { cartProductsData } = useCartActions();
  const { handleSearchProducts } = useSearchProducts();

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const MenuPoints = (
    <div className={styles.menuPoints}>
      <Link
        className={styles.catalogMobileLink}
        to={RouterPath.catalog}
        onClick={handleCloseDrawer}
      >
        <Button type="primary" block size="large" icon={<MenuOutlined />}  >
          Каталог
        </Button>
      </Link>

      <Input.Search
        className={styles.searchInput}
        placeholder="Найти товар"
        onSearch={handleSearchProducts}
        size="large"
      />

      <div className={styles.icons} onClick={handleCloseDrawer}>
        <Link className={styles.iconWrapper} to={RouterPath.orders}>
          <ShoppingCartOutlined className={styles.icon} />
          <Typography.Text>Заказы</Typography.Text>
        </Link>

        <Link className={styles.iconWrapper} to={RouterPath.cart}>
          <Badge
            count={cartProductsData?.carts_products?.length}
            showZero
            size="small"
          >
            <InboxOutlined className={styles.icon} />
          </Badge>

          <Typography.Text>Корзина</Typography.Text>
        </Link>
      </div>
    </div>
  );

  const MenuMobileVersion = (
    <div className={styles.menuMobileVersion}>{MenuPoints}</div>
  );

  return (
    <>
      <div className={styles.navbarWrapper}>
        <div className={styles.logoWrapper}>
          <Link className={styles.logoLink} to={RouterPath.main}>
            <img
              className={styles.logo}
              src="https://i.ibb.co/8z5BRDM/logo.png"
              alt=""
            />
            <img
              className={styles.logoM}
              src="https://i.ibb.co/JvrWYq9/logo-1.png"
              alt=""
            />
          </Link>
          <Link
            className={styles.catalogLink}
            to={RouterPath.catalog}
            onClick={handleCloseDrawer}
          >
            <MenuOutlined />
            <Typography.Text>Каталог</Typography.Text>
          </Link>
        </div>

        <Button
          className={styles.openMenuDrawerButton}
          type="primary"
          onClick={handleOpenDrawer}
        >
          Меню
        </Button>

        {MenuPoints}
        <DropdownUser />
      </div>

      <AdaptiveDrawer
        title="Меню"
        drawerPlacement="left"
        handleCloseDrawer={handleCloseDrawer}
        isOpenDrawer={isOpenDrawer}
        customWindowWidth={760}
      >
        {MenuMobileVersion}
      </AdaptiveDrawer>
    </>
  );
};
