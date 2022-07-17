import { Box, Button } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useEffect, useState } from "react";
import ShipperDialog from "./shipperDialog";
import { useDispatch, useSelector } from "react-redux";
import { reloadShippers } from "../../app/store/ui/shippers";
import ShipperList from "./shipperList";

const Shippers = () => {
  const dispatch = useDispatch();
  const pageSize = useSelector((state) => state.ui.shippers.pageSize);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(reloadShippers(pageSize, 0));
  }, [dispatch, pageSize]);

  return (
    <Box>
      <Button
        endIcon={<PersonAddAltIcon />}
        variant="contained"
        color="primary"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Tạo tài khoản shipper
      </Button>
      <ShipperDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      <Box sx={{ mt: 2 }}>
        <ShipperList />
      </Box>
    </Box>
  );
};

export default Shippers;
