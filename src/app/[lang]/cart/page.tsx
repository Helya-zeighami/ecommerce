"use client";
import React from "react";
import {
  remove,
  incrementQuantity,
  decrementQuantity,
} from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "@/i18n/client";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./cart.module.css";

type CartItem = {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  quantity: number;
};
type Params = {
  params: {
    lang: string;
  };
};
const Cartpage = ({ params: { lang } }: Params) => {
  const { t } = useTranslation(lang, "translation");
  const dispatch = useDispatch();
  const cartitems = useSelector((state: { cart: CartItem[] }) => state.cart);

  const handleRemove = (id: string) => {
    dispatch(remove(id));
  };

  const handleIncrement = (id: string) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: string) => {
    dispatch(decrementQuantity(id));
  };

  return (
    <div>
      <h3>{t("CartPage")}</h3>
      <div className={styles.cartWrapper}>
        {cartitems.map((item: CartItem) => (
          <Card key={item.id} className={styles.cartCard}>
            <CardMedia
              component="img"
              height="140"
              image={item.thumbnail}
              alt={item.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: ${item.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {item.quantity}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                aria-label="remove"
                color="secondary"
                onClick={() => handleRemove(item.id)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="decrement"
                color="primary"
                onClick={() => handleDecrement(item.id)}
              >
                <RemoveIcon />
              </IconButton>
              <IconButton
                aria-label="increment"
                color="primary"
                onClick={() => handleIncrement(item.id)}
              >
                <AddIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cartpage;
