"use client";
import React from "react";
import getProduct from "@/lib/getProduct";
import { useQuery } from "@tanstack/react-query";
import styles from "./productDetails.module.css";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { add } from "@/redux/cartSlice";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type Params = {
  id: number;
};

const ProductDetails: React.FC<{ params: Params }> = ({ params }) => {
  const dispatch = useDispatch();
  const items = useSelector((state: { cart: any[] }) => state.cart);

  const { data, error, isLoading } = useQuery<any>({
    queryKey: ["product", params.id],
    queryFn: () => getProduct(params.id),
  });

  const handleAddToCart = (product: any) => {
    dispatch(add(product));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <h2>{error.message}</h2>;

  return (
    <Card className={styles.card}>
      <CardMedia
        component="img"
        height="300"
        className={styles.image}
        image={data.thumbnail}
        alt={data.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {data.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${data.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Discount: {data.discountPercentage}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {data.rating}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stock: {data.stock}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Brand: {data.brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {data.category}
        </Typography>
      </CardContent>
      <div className={styles.cartContainer}>
        <IconButton
          aria-label="cart"
          color="inherit"
          onClick={() => handleAddToCart(data)}
          className={styles.cartButton}
        >
          <Badge badgeContent={items.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </div>
    </Card>
  );
};

export default ProductDetails;
