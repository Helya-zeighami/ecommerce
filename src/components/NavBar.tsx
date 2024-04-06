"use client";
import Link from "next/link";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import styles from "./navbar.module.css";
import { useSelector } from "react-redux";
import { useTranslation } from "@/i18n/client";
import { languages, fallbackLng } from "@/i18n/settings";

type CartItem = {
  id: string;
};

type Params = {
  params: {
    lang: string;
  };
};

const NavBar = ({ params: { lang } }: Params) => {
  const items = useSelector((state: { cart: CartItem[] }) => state.cart);
  const { t } = useTranslation(lang, "translation");

  const oppositeLang = lang === fallbackLng ? languages[1] : fallbackLng;

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <div className={styles.navLinks}>
          <Link href="/" passHref>
            <Button
              startIcon={<HomeIcon />}
              className={styles.navButton}
              color="inherit"
              sx={{ color: "white" }}
            >
              {t("Home")}
            </Button>
          </Link>
          <Link href="/cart" passHref>
            <Button
              startIcon={
                <Badge badgeContent={items.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              }
              className={styles.navButton}
              color="inherit"
              sx={{ color: "white" }}
            >
              {t("Cart")}
            </Button>
          </Link>
          <Link href={`/${oppositeLang}`} passHref>
            <Button
              className={styles.navButton}
              color="inherit"
              sx={{ color: "white" }}
            >
              {oppositeLang}
            </Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
