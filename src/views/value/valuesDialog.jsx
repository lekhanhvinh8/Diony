import { useDispatch, useSelector } from "react-redux";

import List from "@material-ui/core/List";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  addValue,
  reloadValues,
  removeValue,
} from "../../app/store/ui/valuesDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getSelectProperty } from "../../app/store/entities/selectProperties";

const ValuesDialog = ({ propId, dialogOpen, setDialogOpen }) => {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.ui.valuesDialog.values);
  const loadding = useSelector((state) => state.ui.valuesDialog.isLoadding);
  const property = useSelector(getSelectProperty(propId));

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (propId) dispatch(reloadValues(propId));
  }, [propId, dispatch]);

  console.log(loadding);

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle>{property && "Values Of: " + property.name}</DialogTitle>
      <DialogContent style={{ height: 500 }}>
        {loadding ? (
          <Box
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <div>
            <Grid
              container
              spacing={2}
              style={{ marginLeft: 12, marginTop: 5, width: "98%" }}
            >
              <Grid item xs={10}>
                <TextField
                  label="Values"
                  fullWidth
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.currentTarget.value);
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                {propId && (
                  <IconButton
                    style={{ marginTop: 7 }}
                    disabled={inputValue === ""}
                    onClick={async () => {
                      if (propId) {
                        await dispatch(addValue(inputValue, propId));
                        setInputValue("");
                      }
                    }}
                  >
                    <AddIcon
                      color={inputValue !== "" ? "success" : "disabled"}
                    />
                  </IconButton>
                )}
              </Grid>
            </Grid>

            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {values.map((value) => {
                return (
                  <ListItem
                    key={value.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="comments"
                        onClick={() => {
                          dispatch(removeValue(value.id));
                        }}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton role={undefined} dense>
                      <ListItemText primary={value.value} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ValuesDialog;
