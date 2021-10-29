import { DataGrid } from "@mui/x-data-grid";
import { expandCategory, narrowCategory } from "../../app/store/categoriesPage";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import Switch from "@mui/material/Switch";
import AddIcon from "@mui/icons-material/Add";
import {
  statusColumnField,
  buttonExpandColumnField,
} from "../../app/store/categoriesPage";
import { useState } from "react";
import CategoryForm from "./categoryForm";

const useStyles = makeStyles({
  root: {
    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
      outline: "none",
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "blue",
    },
    "& .MuiDataGrid-row.Mui-selected": {
      backgroundColor: "yellow",
    },
  },
});

const CategoryGrid = ({ rows, columns, fatherId, pageSize, rowsPerPage }) => {
  const [selectionModel, setSelectionModel] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleExpand = (cateId) => {
    dispatch(expandCategory(cateId));
  };

  const handleNarrow = (cateId) => {
    dispatch(narrowCategory(cateId));
  };

  columns = columns.map((c) => {
    const newCol = {
      ...c,
      renderCell: (params) => {
        if (c.field === buttonExpandColumnField) {
          const cateId = params.row.id;
          return (
            <IconButton
              onClick={() =>
                params.row.isExpand
                  ? handleNarrow(cateId)
                  : handleExpand(cateId)
              }
              aria-label="delete"
              size="small"
            >
              {params.row.isExpand ? (
                <ArrowBackIosIcon />
              ) : (
                <ArrowForwardIosIcon />
              )}
            </IconButton>
          );
        }

        if (c.field === statusColumnField) {
          return (
            <Switch
              checked={params.value}
              onChange={() => {}}
              inputProps={{ "aria-label": "controlled" }}
            />
          );
        }

        return params.value;
      },
    };

    return newCol;
  });

  return (
    <div
      style={{
        height: 450,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button
        style={{ width: 40 }}
        size="small"
        variant="contained"
        endIcon={<AddIcon />}
        onClick={() => setDialogOpen(true)}
      >
        new
      </Button>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>New category</DialogTitle>
        <DialogContent>
          <CategoryForm fatherId={fatherId} setDialogOpen={setDialogOpen} />
        </DialogContent>
      </Dialog>

      <div style={{ height: 410, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[rowsPerPage]}
          disableColumnSelector
          className={classes.root}
          selectionModel={selectionModel}
          onCellClick={(row) => {
            if (row.field !== statusColumnField) setSelectionModel([row.id]);
          }}
        />
      </div>
    </div>
  );
};

export default CategoryGrid;
