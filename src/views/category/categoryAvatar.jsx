import { Avatar, Box, Button, CircularProgress } from "@mui/material";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, updateImage } from "../../app/store/entities/categories";
import FolderIcon from "@mui/icons-material/Folder";

const CategoryAvatar = ({ cateId }) => {
  const dispatch = useDispatch();
  const category = useSelector(getCategory(cateId));
  const [imageLoadding, setImageLoadding] = useState(false);

  return (
    <Fragment>
      <Box display="flex" justifyContent="center">
        <Avatar
          src={category?.imageUrl && !imageLoadding ? category.imageUrl : ""}
          sx={{ width: 100, height: 100 }}
        >
          {imageLoadding ? <CircularProgress /> : <FolderIcon />}
        </Avatar>
      </Box>
      <Box sx={{ marginTop: 1 }} display="flex" justifyContent="center">
        <label htmlFor="contained-button-file">
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            style={{ display: "none" }}
            onChange={async (e) => {
              const files = e.target.files;

              if (files && files.length > 0) {
                const file = files[0];

                try {
                  await setImageLoadding(true);
                  await dispatch(updateImage(cateId, file));
                  await setImageLoadding(false);
                } catch (ex) {
                  setImageLoadding(false);
                }
              }
            }}
          />
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
      </Box>
    </Fragment>
  );
};

export default CategoryAvatar;
