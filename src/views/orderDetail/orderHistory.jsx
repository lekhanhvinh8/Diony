import { Box, Stepper, Typography, StepLabel, Step } from "@mui/material";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { orderStatus } from "../../config.json";

const getOrderStatus = (statusCode) => {
  if (statusCode === undefined) return orderStatus.all;

  const orderStatusTemp = orderStatus;

  for (var prop in orderStatusTemp) {
    if (Object.prototype.hasOwnProperty.call(orderStatusTemp, prop)) {
      if (orderStatusTemp[prop].statusCode === statusCode)
        return orderStatusTemp[prop];
    }
  }
};

export default function OrderHistory({}) {
  const order = useSelector((state) => state.entities.orderDetail);

  const trackings = order.trackings;
  if (!trackings) return null;

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={1} orientation="vertical">
        {trackings.map((tracking, index) => {
          const stepName = getOrderStatus(tracking.orderStatusCode).step;

          let formatedDate = "Undefine";

          try {
            const date = new Date(tracking.actionTime);
            formatedDate = format(date, "MM/dd/yyyy h:mm a");
          } catch (error) {}

          const isError =
            tracking.orderStatusCode === orderStatus.cancelled.statusCode;

          return (
            <Step key={index} completed>
              <StepLabel error={isError}>
                <Box>
                  <Typography>{stepName}</Typography>
                  <Typography fontSize={12} color="#808080">
                    {formatedDate}
                  </Typography>
                </Box>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
