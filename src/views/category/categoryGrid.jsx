import { DataGrid } from "@mui/x-data-grid";
import {
  expandCategory,
  narrowCategory,
  updateColumnField,
} from "../../app/store/ui/categoriesPage";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import Switch from "@mui/material/Switch";
import AddIcon from "@mui/icons-material/Add";
import {
  statusColumnField,
  buttonExpandColumnField,
} from "../../app/store/ui/categoriesPage";
import { useState } from "react";
import CategoryForm from "./categoryForm";
import { changeStatus } from "./../../app/store/ui/categoriesPage";
import { rootCategoryId } from "../../app/store/entities/categories";

const useStyles = makeStyles({
  root: {
    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
      outline: "none",
    },
    "& .MuiDataGrid-columnHeader:focus-within": {
      outline: "none",
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#D3D3D3",
    },
    "& .MuiDataGrid-row.Mui-selected": {
      backgroundColor: "#D3D3D3",
    },
  },
});

const CategoryGrid = ({
  rows,
  columns,
  mainColumnIndex,
  fatherId,
  pageSize,
}) => {
  const [selectionModel, setSelectionModel] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updatedCategoryId, setUpdatedCategoryId] = useState(rootCategoryId);
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
              onClick={() => {
                return params.row[buttonExpandColumnField]
                  ? handleNarrow(cateId)
                  : handleExpand(cateId);
              }}
              aria-label="delete"
              size="small"
            >
              {params.row[buttonExpandColumnField] ? (
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
              onChange={(event) => {
                dispatch(changeStatus(params.row.id, event.target.checked));
              }}
              inputProps={{ "aria-label": "controlled" }}
            />
          );
        }

        if (c.field === updateColumnField) {
          return (
            <IconButton
              onClick={() => {
                setUpdatedCategoryId(params.row.id);
                setDialogOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
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
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>
          {updatedCategoryId != -1 ? "Cập nhật danh mục" : "Tạo danh mục mới"}
        </DialogTitle>
        <DialogContent>
          <CategoryForm
            fatherId={fatherId}
            setDialogOpen={setDialogOpen}
            updatedCateId={updatedCategoryId}
          />
        </DialogContent>
      </Dialog>

      <Button
        style={{ marginTop: 10, marginBottom: 10 }}
        size="small"
        variant="contained"
        endIcon={<AddIcon />}
        onClick={() => {
          setUpdatedCategoryId(rootCategoryId);
          setDialogOpen(true);
        }}
      >
        Tạo Danh Mục
      </Button>

      <div style={{ height: 410, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
          disableColumnSelector
          className={classes.root}
          selectionModel={selectionModel}
          onCellClick={(row) => {
            if (
              row.field !== statusColumnField &&
              row.field !== updateColumnField
            )
              setSelectionModel([row.id]);
          }}
        />
      </div>
    </div>
  );
};

export default CategoryGrid;
