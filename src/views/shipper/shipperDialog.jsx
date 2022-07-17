import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ShipperForm from "./shipperForm";

const ShipperDialog = ({
  dialogOpen,
  setDialogOpen,
  updatedShipperId = null,
}) => {
  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle>Tạo tài khoản shipper</DialogTitle>
      <DialogContent>
        <ShipperForm
          setDialogOpen={setDialogOpen}
          updatedShipperId={updatedShipperId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ShipperDialog;
