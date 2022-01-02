import { Box, Chip, Typography } from "@mui/material";
import { paymentMethod } from "../../config.json";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const PaymentInfo = () => {
  const order = useSelector((state) => state.entities.orderDetail);

  let formatedDate = null;

  try {
    const date = new Date(order.paymentDate);
    formatedDate = format(date, "MM/dd/yyyy h:mm a");
  } catch (error) {}

  return (
    <Box>
      {order.paymentType === paymentMethod.paypal ? (
        <Box>
          <Typography>{"Payment Method: Paypal"}</Typography>
          <Box sx={{ mt: 1 }} display="flex" alignItems="center">
            <Typography>Status: </Typography>
            {order.isPaid ? (
              <Chip
                label="Paid"
                variant="outlined"
                color="primary"
                sx={{ ml: 1 }}
              />
            ) : (
              <Chip
                label="Unpaid"
                variant="outlined"
                color="error"
                sx={{ ml: 1 }}
              />
            )}
          </Box>
          <Typography sx={{ mt: 1 }}>
            {formatedDate ? "Payment Date: " + formatedDate : null}
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography>{"Payment Method: COD"}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default PaymentInfo;
