import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeaf } from "../../app/store/entities/categories";
import {
  assignToCate as assignSelectPropToCate,
  getSelectProperty,
  unassignToCate as unassignSelectPropToCate,
} from "../../app/store/entities/selectProperties";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useEffect } from "react";
import {
  getTypingProperty,
  assignToCate as assignTypingPropToCate,
  unassignToCate as unassignTypingPropToCate,
} from "../../app/store/entities/typingProperties";

export const categoryOpenMode = {
  selectPropMode: 1,
  typingPropMode: 2,
};

const CategoriesDialog = ({ dialogOpen, setDialogOpen, propId, openMode }) => {
  const dispatch = useDispatch();
  const allLeafCategories = useSelector(getAllLeaf);
  const selectProperty = useSelector(getSelectProperty(propId));
  const typingProperty = useSelector(getTypingProperty(propId));
  const [checked, setChecked] = useState([]);
  const [cateValue, setCateValue] = useState(null);

  useEffect(() => {
    setChecked([]);
  }, [dialogOpen]);

  let categoryOptions;

  if (openMode === categoryOpenMode.selectPropMode) {
    categoryOptions = allLeafCategories
      .filter((c) =>
        selectProperty ? !selectProperty.categoryIDs.includes(c.id) : true
      )
      .map((c) => c.id + "-" + c.name);
  } else {
    categoryOptions = allLeafCategories
      .filter((c) =>
        typingProperty ? !typingProperty.categoryIDs.includes(c.id) : true
      )
      .map((c) => c.id + "-" + c.name);
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const renderList = () => {
    if (openMode === categoryOpenMode.selectPropMode)
      return (
        selectProperty &&
        selectProperty.categoryIDs.map((id) => {
          const category = allLeafCategories.find((cate) => cate.id === id);
          const labelId = `checkbox-list-label-${category.name}`;

          return (
            <ListItem
              key={category.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => {
                    dispatch(
                      unassignSelectPropToCate(selectProperty.id, category.id)
                    );
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(category.id)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(category.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={category.id + "-" + category.name}
                />
              </ListItemButton>
            </ListItem>
          );
        })
      );

    // typing prop mode
    return (
      typingProperty &&
      typingProperty.categoryIDs.map((id) => {
        const category = allLeafCategories.find((cate) => cate.id === id);
        const labelId = `checkbox-list-label-${category.name}`;

        return (
          <ListItem
            key={category.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => {
                  dispatch(
                    unassignTypingPropToCate(typingProperty.id, category.id)
                  );
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={handleToggle(category.id)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(category.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={category.id + "-" + category.name}
              />
            </ListItemButton>
          </ListItem>
        );
      })
    );
  };

  const renderAddButton = () => {
    if (openMode === categoryOpenMode.selectPropMode) {
      return (
        selectProperty &&
        cateValue && (
          <IconButton
            style={{ marginTop: 7 }}
            onClick={async () => {
              const cateId = cateValue.split("-")[0];
              setCateValue(null);
              await dispatch(
                assignSelectPropToCate(selectProperty.id, Number(cateId))
              );
            }}
          >
            <AddIcon color="success" />
          </IconButton>
        )
      );
    }

    // typing prop mode
    return (
      typingProperty &&
      cateValue && (
        <IconButton
          style={{ marginTop: 7 }}
          onClick={async () => {
            const cateId = cateValue.split("-")[0];
            setCateValue(null);
            await dispatch(
              assignTypingPropToCate(typingProperty.id, Number(cateId))
            );
          }}
        >
          <AddIcon color="success" />
        </IconButton>
      )
    );
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle>
        {openMode === categoryOpenMode.selectPropMode
          ? selectProperty && "Categories of" + selectProperty.name
          : typingProperty && "Categories of" + typingProperty.name}
      </DialogTitle>
      <DialogContent>
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {renderList()}
        </List>
        <Grid container spacing={2} style={{ marginLeft: 15, width: "98%" }}>
          <Grid item xs={10}>
            <Autocomplete
              id="autoComplete"
              options={categoryOptions}
              value={cateValue}
              onChange={(event, newValue) => {
                setCateValue(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            {renderAddButton()}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoriesDialog;
