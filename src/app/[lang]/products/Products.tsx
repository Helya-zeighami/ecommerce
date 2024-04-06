"use client";
import getProducts from "@/lib/getProducts";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { add } from "@/redux/cartSlice";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "@/i18n/client";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styles from "./products.module.css";

type Params = {
  params: {
    lang: string;
  };
};

const Products = ({ params: { lang } }: Params) => {
  const { t } = useTranslation(lang, "translation");
  const [products, setProducts] = useState([] as any[]);
  const dispatch = useDispatch();

  const handleAdd = (product: any) => {
    dispatch(add(product));
  };

  const { data, error } = useQuery<any>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  if (error) return <h2>{error.message}</h2>;

  return (
    <div className={styles.productsContainer}>
      <h1 className={styles.title}>{t("Products")}</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <Card
            sx={{ maxWidth: 345 }}
            key={product.id}
            className={styles.productCard}
          >
            <CardContent>
              <Link href={`/products/${product.id}`}>
                <Typography variant="h6" className={styles.productTitle}>
                  {product.title}
                </Typography>
              </Link>
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.productDescription}
              >
                {product.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: ${product.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Discount: {product.discountPercentage}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating: {product.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock: {product.stock}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Brand: {product.brand}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {product.category}
              </Typography>
            </CardContent>
            <CardMedia
              sx={{ height: 140 }}
              image={product.thumbnail}
              title={product.title}
            />
            <CardActions>
              <Button
                variant="contained"
                className={styles.addButton}
                onClick={() => handleAdd(product)}
              >
                {t("Add to cart")}
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
