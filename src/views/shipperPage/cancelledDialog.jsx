import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  adminCancelOrder,
  shipperCancelOrder,
} from "../../app/services/orderService";
import { shipperCancelledReasons } from "../../config.json";
import { reloadOrders } from "../../app/store/ui/shippingOrderPage";

export default function CancelledDialog({
  orderId,
  dialogOpen,
  setDialogOpen,
}) {
  const dispatch = useDispatch();
  const [selectedReasonIndex, selectReasonIndex] = useState("0");

  return (
    <Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Are you sure to cancel an order ?</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Please select a reason for cancellation
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="controlled-radio-buttons-group"
              value={selectedReasonIndex}
              onChange={(event) => {
                selectReasonIndex(event.target.value);
              }}
            >
              {shipperCancelledReasons.map((element, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    value={index}
                    label={element.reason}
                    control={<Radio />}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Back</Button>
          <Button
            onClick={async () => {
              if (orderId) {
                try {
                  await shipperCancelOrder(
                    orderId,
                    shipperCancelledReasons[
                      Number.parseInt(selectedReasonIndex)
                    ].reason
                  );

                  await dispatch(reloadOrders());

                  setDialogOpen(false);
                  toast.success("Cancel an order successfully");
                } catch (ex) {
                  setDialogOpen(false);
                  toast.error("Cancel an order failure");
                }
              }
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
