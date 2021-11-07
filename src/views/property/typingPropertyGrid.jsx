import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import TypingPropertyForm from "./typingPropertyForm";

const useStyles = makeStyles({
  root: {
    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
      outline: "none",
    },
    "& .MuiDataGrid-columnHeader:focus-within": {
      outline: "none",
    },
  },
});

const TypingPropertyGrid = ({
  columns,
  rows,
  updatedPropId,
  dialogOpen,
  setDialogOpen,
}) => {
  const classes = useStyles();

  return (
    <div style={{ height: 500, width: "100%" }}>
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>
          {updatedPropId ? "Update property" : "New property"}
        </DialogTitle>
        <DialogContent>
          <TypingPropertyForm
            setDialogOpen={setDialogOpen}
            updatedPropId={updatedPropId}
          />
        </DialogContent>
      </Dialog>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        className={classes.root}
      />
    </div>
  );
};

export default TypingPropertyGrid;
