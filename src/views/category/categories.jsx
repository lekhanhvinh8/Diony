import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryGrid from "./categoryGrid";
import { initializeGird } from "./../../app/store/categoriesPage";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";

const useStyles = makeStyles({
  root: {
    "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
      outline: "none",
    },
    "& .MuiDataGrid-row:hover": {
      backgroundColor: "none",
    },
    // "& .MuiDataGrid-columnsContainer": {
    //   visibility: "hidden",
    // },
  },
});

const Categories = () => {
  const dispatch = useDispatch();
  const mainGrid = useSelector((state) => state.ui.categoriesPage.mainGrid);
  const isGridInit = useSelector(
    (state) => state.ui.categoriesPage.isInitialized
  );
  const classes = useStyles();

  useEffect(() => {
    const initializeState = async () => {
      await dispatch(initializeGird());
    };

    if (!isGridInit) initializeState();
  }, []);

  const row = { ...mainGrid.row };
  const rows = [row];
  const columns = mainGrid.columns.map((c) => {
    const newCol = {
      ...c,
      renderCell: (params) => {
        return (
          <CategoryGrid
            rows={[...params.value.rows]}
            columns={[...params.value.columns]}
            fatherId={params.value.fatherId}
            pageSize={10}
            rowsPerPage={1}
          />
        );
      },
      cellClassName: "abc",
    };

    return newCol;
  });

  return (
    <div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={1}
          rowsPerPageOptions={[1]}
          rowHeight={450}
          disableSelectionOnClick
          disableColumnMenu
          disableMultipleColumnsSorting
          headerHeight={0}
          hideFooter
          className={classes.root}
        />
      </div>
    </div>
  );
};

export default Categories;
