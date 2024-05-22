import React from "react";

import { Button, Carousel, Typography } from "antd";

import { AdaptiveDrawer } from "components/AdaptiveDrawer/AdaptiveDrawer";
import BrandsCarousel from "components/BrandCarousel/BrandCarousel";
import FeaturesList from "components/FeatureList/FeaturesList";
import { ProductCardsList } from "components/ProductCardsList/ProductCardsList";
import { Spinner } from "components/Spinner/Spinner";

import { useGetProductsQuery } from "store/api/products/products-api";

import { PRODUCTS_COUNT_IN_MAIN_PAGE } from "constants/products-constants";

import { useGetPaginationBlock } from "hooks/general/use-get-pagination-block";
import { useGetProductsFilters } from "hooks/products/use-get-products-filters";
import { useSearchProducts } from "hooks/products/use-search-products";

import styles from "./Main.module.scss";

export const Main = () => {
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const { currentPage, PaginationBlock } = useGetPaginationBlock();
  const { searchValue } = useSearchProducts();

  const { FiltersAside, minValue, maxValue, sortOrder, sortBy } =
    useGetProductsFilters();

  const { data: productsData, isLoading: isProductsLoading } =
    useGetProductsQuery({
      page: currentPage,
      limit: PRODUCTS_COUNT_IN_MAIN_PAGE,
      minPrice: minValue,
      maxPrice: maxValue,
      type: "",
      sortBy,
      sortOrder,
      searchValue,
    });

  const isEmptyProductsData = productsData?.products.length === 0;

  return (
    <>
      <FeaturesList />
      <Typography.Title className={styles.mainTitle}>
        Бренды с которыми мы работаем
      </Typography.Title>
      <BrandsCarousel />
      <Typography.Title className={styles.mainTitle}>
        Наши товары
      </Typography.Title>

      <Button
        className={styles.openFiltersMobileButton}
        type="primary"
        onClick={handleOpenDrawer}
      >
        Фильтры
      </Button>

      <AdaptiveDrawer
        title="Фильтры"
        drawerPlacement="right"
        handleCloseDrawer={handleCloseDrawer}
        isOpenDrawer={isOpenDrawer}
        customWindowWidth={1200}
      >
        {FiltersAside}
      </AdaptiveDrawer>

      {isProductsLoading ? (
        <Spinner />
      ) : (
        <div className={styles.mainWrapper}>
          <div className={styles.filtersWrapper}>{FiltersAside}</div>
          <ProductCardsList productsData={productsData?.products} />
        </div>
      )}

      {!isEmptyProductsData && (
        <PaginationBlock
          countElementsOnPage={PRODUCTS_COUNT_IN_MAIN_PAGE}
          totalCount={productsData?.totalCount}
        />
      )}
    </>
  );
};
