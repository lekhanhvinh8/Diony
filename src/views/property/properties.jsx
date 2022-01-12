import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { TextField } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import GradeIcon from "@mui/icons-material/Grade";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPropCateIdsColumnField,
  selectPropHasMultiValuesColumnField,
  selectPropIsRequiredColumnField,
  selectTab,
  selectPropTab,
  typingPropTab,
  setCateValue,
  initializeSelectPropGrid,
  initializeSelectPropGridOfCate,
  selectPropEditColumnField,
  selectPropDeleteColumnField,
  initializeTypingPropGrid,
  initializeTypingPropGridOfCate,
  typingPropTypeColumnField,
  typingPropCateIdsColumnField,
  typingPropDeleteColumnField,
  typingPropEditColumnField,
  selectPropValuesColumnField,
} from "./../../app/store/ui/propertiesPage";
import SelectPropertyGrid from "./selectPropertyGrid";
import { getAllLeaf } from "../../app/store/entities/categories";
import { getPath } from "./../../app/store/entities/categories";
import { removeSelectProperty } from "../../app/store/entities/selectProperties";
import CategoriesDialog, { categoryOpenMode } from "./categoriesDialog";
import TypingPropertyGrid from "./typingPropertyGrid";
import { removeTypingProperty } from "../../app/store/entities/typingProperties";
import ValuesDialog from "../value/valuesDialog";
import { toast } from "react-toastify";

export const noneCateId = "none";

const Properties = ({ match, history }) => {
  const { cateId } = match.params;

  const dispatch = useDispatch();
  const cateValue = useSelector((state) => state.ui.propertiesPage.cateValue);
  const tabValue = useSelector((state) => state.ui.propertiesPage.resentTab);
  const selectPropGrid = useSelector(
    (state) => state.ui.propertiesPage.selectPropertyGrid
  );
  const typingPropGrid = useSelector(
    (state) => state.ui.propertiesPage.typingPropertyGrid
  );
  const allLeafCategories = useSelector(getAllLeaf);
  const categoryPath = useSelector(
    getPath(cateValue ? cateValue.split("-")[0] : null)
  );
  const selectProperties = useSelector(
    (state) => state.entities.selectProperties
  );
  const typingProperties = useSelector(
    (state) => state.entities.typingProperties
  );

  const cateOptions = allLeafCategories.map((leafCate) => {
    return leafCate.id + "-" + leafCate.name;
  });

  const [selectPropDialogOpen, setSelectPropDialogOpen] = useState(false);
  const [typingPropDialogOpen, setTypingPropDialogOpen] = useState(false);
  const [dialogCategoriesOpen, setDialogCategoriesOpen] = useState(false);
  const [dialogValuesOpen, setDialogValuesOpen] = useState(false);
  const [updatedSelectPropId, setUpdatedSelectPropId] = useState(null);
  const [updatedTypingPropId, setUpdatedTypingPropId] = useState(null);
  const [categoryDialogOpenMode, setCategoryDialogOpenMode] = useState(
    categoryOpenMode.selectPropMode
  );

  useEffect(() => {
    const asyncFunc = async () => {
      if (cateId !== noneCateId) {
        const selectedCate = cateOptions.find((option) => {
          const optionId = option.split("-")[0];
          return optionId.toString() === cateId;
        });

        if (selectedCate) {
          await dispatch(initializeSelectPropGridOfCate(cateId));
          await dispatch(initializeTypingPropGridOfCate(cateId));
          dispatch(setCateValue(selectedCate));
        }
      } else {
        await dispatch(initializeSelectPropGrid());
        await dispatch(initializeTypingPropGrid());
        dispatch(setCateValue(null));
      }
    };

    asyncFunc();
  }, [allLeafCategories, selectProperties, typingProperties]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectPropGridColumns = selectPropGrid.columns.map((column) => {
    return {
      ...column,
      renderCell: (params) => {
        if (column.field === selectPropIsRequiredColumnField) {
          if (params.value) return <Chip label="Required" color="error" />;
          return <Chip label="Optional" color="success" />;
        }

        if (column.field === selectPropHasMultiValuesColumnField) {
          if (params.value) return <Chip label="Multi" color="success" />;
          return <Chip label="Single" color="primary" />;
        }

        if (column.field === selectPropCateIdsColumnField) {
          return (
            <Tooltip title="Categories" placement="right">
              <IconButton
                onClick={() => {
                  setUpdatedSelectPropId(params.row.id);
                  setCategoryDialogOpenMode(categoryOpenMode.selectPropMode);
                  setDialogCategoriesOpen(true);
                }}
              >
                <CategoryIcon color="primary" />
              </IconButton>
            </Tooltip>
          );
        }

        if (column.field === selectPropValuesColumnField) {
          return (
            <Tooltip title="Values" placement="right">
              <IconButton
                onClick={() => {
                  setUpdatedSelectPropId(params.row.id);
                  setDialogValuesOpen(true);
                }}
              >
                <GradeIcon color="primary" />
              </IconButton>
            </Tooltip>
          );
        }

        if (column.field === selectPropEditColumnField) {
          return (
            <IconButton
              onClick={() => {
                setUpdatedSelectPropId(params.row.id);
                setSelectPropDialogOpen(true);
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
          );
        }

        if (column.field === selectPropDeleteColumnField) {
          return (
            <IconButton
              onClick={async () => {
                try {
                  await dispatch(removeSelectProperty(params.row.id));
                  toast.success("Delete Successfully");
                } catch (ex) {
                  toast.error("Delete Fail");
                }
              }}
            >
              <DeleteIcon color="error" />
            </IconButton>
          );
        }

        return params.value;
      },
    };
  });

  const typingPropGridColumns = typingPropGrid.columns.map((column) => {
    return {
      ...column,
      renderCell: (params) => {
        if (column.field === typingPropTypeColumnField) {
          return <Chip label={params.value} color="primary" />;
        }

        if (column.field === typingPropCateIdsColumnField) {
          return (
            <IconButton
              onClick={() => {
                setUpdatedTypingPropId(params.row.id);
                setCategoryDialogOpenMode(categoryOpenMode.typingPropMode);
                setDialogCategoriesOpen(true);
              }}
            >
              <CategoryIcon color="primary" />
            </IconButton>
          );
        }

        if (column.field === typingPropEditColumnField) {
          return (
            <IconButton
              onClick={() => {
                setUpdatedTypingPropId(params.row.id);
                setTypingPropDialogOpen(true);
              }}
            >
              <EditIcon color="primary" />
            </IconButton>
          );
        }

        if (column.field === typingPropDeleteColumnField) {
          return (
            <IconButton
              onClick={() => dispatch(removeTypingProperty(params.row.id))}
            >
              <DeleteIcon color="error" />
            </IconButton>
          );
        }

        return params.value;
      },
    };
  });

  return (
    <div>
      <CategoriesDialog
        dialogOpen={dialogCategoriesOpen}
        setDialogOpen={setDialogCategoriesOpen}
        propId={
          categoryDialogOpenMode === categoryOpenMode.selectPropMode
            ? updatedSelectPropId
            : updatedTypingPropId
        }
        openMode={categoryDialogOpenMode}
      />

      <ValuesDialog
        dialogOpen={dialogValuesOpen}
        setDialogOpen={setDialogValuesOpen}
        propId={updatedSelectPropId}
      />

      <Stack divider={<Divider flexItem />} spacing={2}>
        <Autocomplete
          id="autoComplete"
          options={cateOptions}
          value={cateValue}
          onChange={(event, newValue) => {
            let cateId = noneCateId;
            if (newValue) cateId = newValue.split("-")[0];

            history.push(`/admin/properties/${cateId}`);
          }}
          renderInput={(params) => <TextField {...params} label="Category" />}
        />
        <Stack direction="row" style={{ height: 32 }}>
          <Button
            color="error"
            endIcon={<AddIcon />}
            variant="contained"
            style={{ padding: 0, marginRight: 10 }}
            onClick={() => {
              if (tabValue === selectPropTab) {
                setUpdatedSelectPropId(null);
                setSelectPropDialogOpen(true);
              } else {
                setUpdatedTypingPropId(null);
                setTypingPropDialogOpen(true);
              }
            }}
          >
            New
          </Button>

          <Stack
            direction="row"
            divider={
              <ArrowForwardIosIcon color="primary" style={{ marginTop: 4 }} />
            }
            spacing={1}
          >
            {categoryPath &&
              categoryPath.map((c) => {
                return (
                  <Chip
                    key={c.id}
                    label={c.name}
                    variant="outlined"
                    color="primary"
                  />
                );
              })}
          </Stack>

          <IconButton
            color="error"
            style={{ padding: 0, marginLeft: 10 }}
            onClick={() => history.push("/admin/properties/none")}
          >
            <ClearIcon />
          </IconButton>
        </Stack>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={(e, newValue) => dispatch(selectTab(newValue))}
                aria-label="lab API tabs example"
              >
                <Tab label="Select Property" value={selectPropTab} />
                <Tab label="Typing Property" value={typingPropTab} />
              </TabList>
            </Box>
            <TabPanel value={selectPropTab}>
              <SelectPropertyGrid
                rows={selectPropGrid.rows}
                columns={selectPropGridColumns}
                updatedPropId={updatedSelectPropId}
                dialogOpen={selectPropDialogOpen}
                setDialogOpen={setSelectPropDialogOpen}
              />
            </TabPanel>
            <TabPanel value={typingPropTab}>
              <TypingPropertyGrid
                rows={typingPropGrid.rows}
                columns={typingPropGridColumns}
                updatedPropId={updatedTypingPropId}
                dialogOpen={typingPropDialogOpen}
                setDialogOpen={setTypingPropDialogOpen}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Stack>
    </div>
  );
};

export default Properties;
