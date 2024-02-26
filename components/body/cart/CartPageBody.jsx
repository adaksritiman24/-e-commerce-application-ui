import { Box, Paper, Stack, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { grey } from "@mui/material/colors";
import React from "react";
import useCart from "../hooks/useCart";
import { getFormattedPrice } from "../../common/utils/helpers";
import { useContext } from "react";
import { CartContext } from "../../../cart/CartProvider";
import CartProductActions from "./CartProductActions";
import ShhippingAndTotal from "./ShippingAndTotal";
import CartProductImage from "./CartProductImage";
import AuthContext from "../../../auth/AuthContext";
import Link from "next/link";
import { DeliverAddressModelProvider } from "../../../modals/DeliveryAddressModalProvider";


const CartPageBody = () => {
  const { setNumberOfItems } = useContext(CartContext);
  const { user, anonymousAuthSessionId } = useContext(AuthContext);
  const {
    cartData,
    increaseCartQuantityBy1,
    decreaseCartQuantityBy1,
    removeFromCart,
    addDeliveryAddress,
    placeOrderUsingBankCard,
  } = useCart(setNumberOfItems, user != null,  user?.username, anonymousAuthSessionId);


  if (cartData.cartEntryList == null || cartData.cartEntryList.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: grey[800],
          flexGrow: 1
        }}
      >
        <Box textAlign="center">
          <Box>
            <ShoppingCartIcon
              sx={{
                fontSize: "80px",
              }}
            />
          </Box>
          <Typography variant="h5" fontWeight="bold">
            Your cart is empty
          </Typography>
        </Box>
      </Box>
    );
  }


  return (
    <Paper
      elevation={4}
      sx={{
        my: "20px",
        mx: {
          lg: "160px",
          md: "20px",
          xs: "14px",
        },
        p: {
          lg: "30px",
          md: "22px",
          xs: "10px",
        },
        borderRadius : "4px",
      }}
    >
      <Typography variant="h4" ml="10px" borderBottom="0.4px solid grey">
        Your Cart
      </Typography>
      {cartData.cartEntryList != null && cartData.cartEntryList.map((product) => (
        <Box
          sx={{
            m: "10px",
            p: "14px",
            border: "1px solid grey",
            borderRadius: "4px",
            display: "flex",
            flexDirection: {
              md: "row",
              xs: "column",
            },
            flexWrap: "wrap",
          }}
          key={product.id}
        >
          <CartProductImage images={product.images} />
          <Box
            sx={{
              flexGrow: "1",
              mt: {
                md: "0px",
                xs: "4px",
              },
            }}
          >
            <Box
              sx={{
                "& a" : {
                  fontFamily: "Trebuchet MS",
                  fontSize: "20px",
                  color: grey[800],
                }
              }}
            >
              <Link href={`/product/${product.id}`}>
                {product.name}
              </Link>
            </Box>
           
            <Typography
              sx={{
                fontFamily: "Trebuchet MS",
                fontWeight: "bold",
                fontSize: "16px",
                color: grey[700],
              }}
            >
              {product.brand}
            </Typography>
            <CartProductActions
              product={product}
              increaseCartQuantityBy1={increaseCartQuantityBy1}
              decreaseCartQuantityBy1={decreaseCartQuantityBy1}
              removeFromCart={removeFromCart}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection : "column",
              mt: {
                lg: "4px",
                xs: "8px",
              },
            }}
          >
            <Stack
              sx={{
                alignSelf : "flex-end"
              }}
            >
              <Typography
                sx={{
                  fontSize: "15px",
                  textAlign: {
                    lg: "right",
                    xs: "right"   
                  },
                  color: grey[500],
                }}
              >
                Item Price
              </Typography>
              <Typography variant="subtitle1">
                {getFormattedPrice(product.discountedPrice)}
              </Typography>
            </Stack>
            <hr/>
            <Stack
              sx={{
                alignSelf : "flex-end"
              }}
            >
              <Typography
                sx={{
                  textAlign: {
                    lg: "right",
                    xs: "right"   
                  },
                  color: grey[500],
                }}
              >
                Total Price
              </Typography>
              <Typography variant="h6" fontWeight={600}>
                {getFormattedPrice(product.totalPrice)}
              </Typography>
            </Stack>
          </Box>
        </Box>
      ))}
      <DeliverAddressModelProvider addDeliveryAddress={addDeliveryAddress}>
        <ShhippingAndTotal 
         totalAmount={cartData.totalPrice}
         deliveryAddress={cartData.deliveryAddress} 
         placeOrderUsingBankCard={placeOrderUsingBankCard} 
        />
      </DeliverAddressModelProvider>
    </Paper>
  );
};

export default CartPageBody;
