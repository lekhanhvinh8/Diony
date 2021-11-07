import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CategoryGrid from "./categoryGrid";
import { makeStyles } from "@material-ui/core/styles";
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
  const mainGrid = useSelector((state) => state.ui.categoriesPage.mainGrid);

  const classes = useStyles();

  useEffect(() => {
    const asyncFunc = async () => {};

    asyncFunc();
  }, []);

  const row = { ...mainGrid.row };
  const rows = [row];
  const columns = mainGrid.columns.map((c, index) => {
    const newCol = {
      ...c,
      renderCell: (params) => {
        return (
          <CategoryGrid
            rows={[...params.value.rows]}
            columns={[...params.value.columns]}
            mainColumnIndex={index}
            fatherId={params.value.fatherId}
            pageSize={5}
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
