import { RouteProps } from "react-router-dom";

import { AccountPage } from "pages/AccountPage";
import { AdminPanelPage } from "pages/AdminPanelPage";
import { CartPage } from "pages/CartPage";
import { CatalogItemPage } from "pages/CatalogItemPage";
import { CatalogPage } from "pages/CatalogPage";
import { CertainProductByIdPage } from "pages/CertainProductByIdPage";
import { CustomBuilderPage } from "pages/CustomBuilderPage";
import { ForbiddenPage } from "pages/ForbiddenPage";
import { GiftCardPage } from "pages/GiftCardPage";
import { HelpPage } from "pages/HelpPage";
import { MainPage } from "pages/MainPage";
import { NotAuthorizedPage } from "pages/NotAuthorizedPage";
import { OrdersPage } from "pages/OrdersPage";
import { ServicePage } from "pages/ServicePage";

import { LazyLoadChunk } from "components/LazyLoadChunk/LazyLoadChunk";

export type TAppRouteProps = RouteProps & {
  authOnly?: boolean;
  adminOnly?: boolean;
  element: JSX.Element;
};

export enum AppRoutes {
  MAIN = "main",
  CERTAIN_PRODUCT_BY_ID_IN_MAIN = "certain_product_by_id_in_main",
  ACCOUNT = "account",
  CATALOG = "catalog",
  CATALOG_ITEM = "catalog_item",
  CERTAIN_PRODUCT_BY_ID_IN_CATALOG_ITEM = "certain_product_by_id_in_catalog_item",
  CART = "cart",
  ORDERS = "orders",
  ADMIN_PANEL = "admin_panel",
  FORBIDDEN = "forbidden",
  NOT_AUTHORIZED = "not_authorized",
  HELP = "help",
  SERVICE = "service",
  GIFTCARD = "giftcard",
  CUSTOMBUILD = "custombuild",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.CERTAIN_PRODUCT_BY_ID_IN_MAIN]: "/:id",
  [AppRoutes.ACCOUNT]: "/account",
  [AppRoutes.CATALOG]: "/catalog",
  [AppRoutes.CATALOG_ITEM]: "/catalog/:url",
  [AppRoutes.CERTAIN_PRODUCT_BY_ID_IN_CATALOG_ITEM]: "/catalog/:url/:id",
  [AppRoutes.CART]: "/cart",
  [AppRoutes.ORDERS]: "/orders",
  [AppRoutes.ADMIN_PANEL]: "/admin_panel",
  [AppRoutes.FORBIDDEN]: "/forbidden",
  [AppRoutes.NOT_AUTHORIZED]: "/not_authorized",
  [AppRoutes.HELP]: "/help",
  [AppRoutes.SERVICE]: "/service",
  [AppRoutes.GIFTCARD]: "/giftcard",
  [AppRoutes.CUSTOMBUILD]: "/custombuild",
};

export const routeConfig: Record<AppRoutes, TAppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: RouterPath.main,
    element: (
      <LazyLoadChunk>
        <MainPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.CERTAIN_PRODUCT_BY_ID_IN_MAIN]: {
    path: RouterPath.certain_product_by_id_in_main,
    element: (
      <LazyLoadChunk>
        <CertainProductByIdPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.ACCOUNT]: {
    path: RouterPath.account,
    element: (
      <LazyLoadChunk>
        <AccountPage />
      </LazyLoadChunk>
    ),
    authOnly: true,
  },
  [AppRoutes.CATALOG]: {
    path: RouterPath.catalog,
    element: (
      <LazyLoadChunk>
        <CatalogPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.CATALOG_ITEM]: {
    path: RouterPath.catalog_item,
    element: (
      <LazyLoadChunk>
        <CatalogItemPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.CERTAIN_PRODUCT_BY_ID_IN_CATALOG_ITEM]: {
    path: RouterPath.certain_product_by_id_in_catalog_item,
    element: (
      <LazyLoadChunk>
        <CertainProductByIdPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.CART]: {
    path: RouterPath.cart,
    element: (
      <LazyLoadChunk>
        <CartPage />
      </LazyLoadChunk>
    ),
    authOnly: true,
  },
  [AppRoutes.ORDERS]: {
    path: RouterPath.orders,
    element: (
      <LazyLoadChunk>
        <OrdersPage />
      </LazyLoadChunk>
    ),
    authOnly: true,
  },
  [AppRoutes.ADMIN_PANEL]: {
    path: RouterPath.admin_panel,
    element: (
      <LazyLoadChunk>
        <AdminPanelPage />
      </LazyLoadChunk>
    ),
    authOnly: true,
    adminOnly: true,
  },
  [AppRoutes.FORBIDDEN]: {
    path: RouterPath.forbidden,
    element: (
      <LazyLoadChunk>
        <ForbiddenPage />
      </LazyLoadChunk>
    ),
    authOnly: true,
  },
  [AppRoutes.NOT_AUTHORIZED]: {
    path: RouterPath.not_authorized,
    element: (
      <LazyLoadChunk>
        <NotAuthorizedPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.HELP]: {
    path: RouterPath.help,
    element: (
      <LazyLoadChunk>
        <HelpPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.SERVICE]: {
    path: RouterPath.service,
    element: (
      <LazyLoadChunk>
        <ServicePage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.GIFTCARD]: {
    path: RouterPath.giftcard,
    element: (
      <LazyLoadChunk>
        <GiftCardPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.CUSTOMBUILD]: {
    path: RouterPath.custombuild,
    element: (
      <LazyLoadChunk>
        <CustomBuilderPage />
      </LazyLoadChunk>
    ),
    authOnly: true,
  },
};
