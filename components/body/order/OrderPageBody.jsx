import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { green, grey } from "@mui/material/colors";
import React from "react";
import { useContext } from "react";
import Link from "next/link";
import OrderShippingAndTotal from "./OrderShippingAndTotal";
import { CartContext } from "../../../cart/CartProvider";
import { getFormattedPrice } from "../../common/utils/helpers";
import CartProductImage from "../cart/CartProductImage";
import DoneIcon from "@mui/icons-material/Done";
import { useRouter } from "next/router";

const OrderPageBody = ({ orderData }) => {
  const { setNumberOfItems } = useContext(CartContext);
  const router = useRouter();
  const searchType = router.query.searchType;
  setNumberOfItems(0);

  if (orderData == undefined || orderData == null) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ReportProblemIcon
            sx={{
              fontSize: "70px",
            }}
          />
          <Typography fontWeight={600}>Order Not Found!</Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Paper
      elevation={2}
      sx={{
        my: "20px",
        mx: {
          lg: "30px",
          md: "20px",
          xs: "14px",
        },
        p: {
          lg: "30px",
          md: "22px",
          xs: "10px",
        },
        px: {
          lg: "130px",
        },
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{
          mx: "10px",
        }}
      >
        {(searchType === undefined || searchType === null) && (
          <>
            <Typography variant="h4">
              <DoneIcon sx={{ color: green[800], fontWeight: "bold", pr: 1 }} />
              Your order is confirmed!
            </Typography>
            <Typography variant="subtitle1">
              Thank you for shopping with Buzz.
            </Typography>
          </>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              sm: "row",
              xs: "column",
            },
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6">
              Order Number: <strong>{orderData.id}</strong>
            </Typography>
            <Box
              sx={{
                color: grey[700],
              }}
            >
              <Typography variant="subtitle1">
                Date: <strong>{orderData.orderDate}</strong>
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Chip
              variant="filled"
              label={`${orderData.status}`}
              color="success"
              sx={{
                background: grey[500],
                fontSize: "20px",
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          m: "10px",
        }}
      >
        {orderData.orderEntryList != null &&
          orderData.orderEntryList.map((product) => (
            <Box
              sx={{
                p: "14px",
                mt: 1,
                background: grey[200],
                display: "flex",
                borderRadius: "4px",
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
                    "& a": {
                      fontFamily: "Trebuchet MS",
                      fontSize: "20px",
                      color: grey[800],
                    },
                  }}
                >
                  <Link href={`/product/${product.id}`}>{product.name}</Link>
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
                <Typography variant="caption" fontSize={16} mt={"18px"}>
                  Quantity: <strong>{product.quantity}</strong>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  mt: {
                    lg: "4px",
                    xs: "8px",
                  },
                }}
              >
                <Stack
                  sx={{
                    alignSelf: "flex-end",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "15px",
                      textAlign: {
                        lg: "right",
                        xs: "right",
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
                <hr />
                <Stack
                  sx={{
                    alignSelf: "flex-end",
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: {
                        lg: "right",
                        xs: "right",
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
      </Box>
      <OrderShippingAndTotal
        totalAmount={orderData.totalPrice}
        deliveryAddress={orderData.deliveryAddress}
      />
    </Paper>
  );
};

export default OrderPageBody;
