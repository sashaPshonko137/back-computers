import { Typography } from "antd";
import { Link } from "react-router-dom";

import { CartButtons } from "components/CartButtons/CartButtons";
import { ImageInCard } from "components/ImageInCard/ImageInCard";

import { IProduct } from "types/IProduct";

import styles from "./ProductCard.module.scss";

interface IProductCardProps {
  product: IProduct;
}

export const ProductCard = (props: IProductCardProps) => {
  const { product } = props;

  return (
    <Link className={styles.link} to={`${product.id}`} key={product.id}>
      <div className={styles.shadowCard}>
        <div className={styles.cardContent}>
          <div className={styles.imageContainer}>
            <ImageInCard imageUrl={product.image.filename} />
          </div>
          <div className={styles.textContainer}>
            <Typography.Text className={styles.cardTitle} ellipsis>
              {product.name}
            </Typography.Text>{" "}
            <br />
            <Typography.Paragraph
              ellipsis={{
                rows: 5,
              }}
            >
              {product.description}
            </Typography.Paragraph>
          </div>
          <div className={styles.actionsContainer}>
            <Typography.Text className={styles.cardTitle}>
              {product.price} ₽
            </Typography.Text>
            <CartButtons productId={product.id} />
          </div>
        </div>
      </div>
    </Link>
  );
};
