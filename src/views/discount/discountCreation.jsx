import {
  Box,
  Button,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { createDiscount } from "../../app/services/discountService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { dateToLocaleString } from "../../app/utils/formatDate";

const DiscountCreation = () => {
  const leftColumnFormGrid = 3;
  const rightColumnFormGrid = 9;

  const today = new Date();
  const tempDate = new Date(today);
  tempDate.setDate(tempDate.getDate() + 1);
  const tomorrow = tempDate;

  const history = useHistory();

  const [discountCode, setDiscountCode] = useState("");
  const [reduction, setReduction] = useState("");
  const [minOrderVal, setMinOrderVal] = useState("");
  const [maxReduction, setMaxReduction] = useState("");
  const [fromDate, setFromDate] = useState(dateToLocaleString(today));
  const [toDate, setToDate] = useState(dateToLocaleString(tomorrow));
  const [checked, setChecked] = useState(false);
  const [maxNoUses, setMaxNoUses] = useState("");

  return (
    <Box>
      <Box>Tạo mới mã giảm giá</Box>
      <Box
        sx={{
          bgcolor: "#ffffff",
          marginTop: 2,
          borderRadius: 3,
          padding: 3,
        }}
      >
        <Box sx={{ width: "80%" }}>
          <Grid container spacing={2} rowSpacing={4}>
            <Grid item xs={leftColumnFormGrid} display="flex">
              <Box sx={{ flexGrow: 1 }}></Box>
              <Box display="flex" alignItems="center" sx={{ height: "100%" }}>
                Mã
              </Box>
            </Grid>
            <Grid item xs={rightColumnFormGrid}>
              <TextField
                size="small"
                fullWidth
                value={discountCode}
                onChange={(e) => {
                  setDiscountCode(e.currentTarget.value.toUpperCase());
                }}
              />
            </Grid>

            <Grid item xs={leftColumnFormGrid} display="flex">
              <Box sx={{ flexGrow: 1 }}></Box>
              <Box display="flex" alignItems="center" sx={{ height: "100%" }}>
                Tỷ lệ giảm
              </Box>
            </Grid>
            <Grid item xs={rightColumnFormGrid - 1}>
              <TextField
                type={"number"}
                size="small"
                fullWidth
                value={reduction}
                onChange={(e) => {
                  const currentReduction = e.currentTarget.value;
                  if (currentReduction > 100) {
                    setReduction(100);
                    return;
                  }

                  setReduction(currentReduction);
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100%" }}
              >
                %
              </Box>
            </Grid>

            <Grid item xs={leftColumnFormGrid} display="flex">
              <Box sx={{ flexGrow: 1 }}></Box>
              <Box display="flex" alignItems="center" sx={{ height: "100%" }}>
                Giá trị đơn tối thiểu
              </Box>
            </Grid>
            <Grid item xs={rightColumnFormGrid - 1}>
              <TextField
                type="number"
                size="small"
                fullWidth
                value={minOrderVal}
                onChange={(e) => {
                  setMinOrderVal(e.currentTarget.value);
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100%" }}
              >
                VND
              </Box>
            </Grid>

            <Grid item xs={leftColumnFormGrid} display="flex">
              <Box sx={{ flexGrow: 1 }}></Box>
              <Box display="flex" alignItems="center" sx={{ height: "100%" }}>
                Giá giảm tối đa
              </Box>
            </Grid>
            <Grid item xs={rightColumnFormGrid - 1}>
              <TextField
                type="number"
                size="small"
                fullWidth
                value={maxReduction}
                onChange={(e) => {
                  setMaxReduction(e.currentTarget.value);
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Box
                sx={{ display: "flex", alignItems: "center", height: "100%" }}
              >
                VND
              </Box>
            </Grid>

            <Grid item xs={leftColumnFormGrid} display="flex">
              <Box sx={{ flexGrow: 1 }}></Box>
              <Box display="flex" alignItems="center" sx={{ height: "100%" }}>
                Số lượt sử dụng
              </Box>
            </Grid>
            <Grid item xs={rightColumnFormGrid}>
              <TextField
                type="number"
                size="small"
                fullWidth
                value={maxNoUses}
                onChange={(e) => {
                  setMaxNoUses(e.currentTarget.value);
                }}
              />
            </Grid>

            <Grid item xs={leftColumnFormGrid} display="flex">
              <Box sx={{ flexGrow: 1 }}></Box>
              <Box display="flex" alignItems="center" sx={{ height: "100%" }}>
                Thời gian hiệu lực
              </Box>
            </Grid>
            <Grid item xs={rightColumnFormGrid}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <TextField
                    id="datetime-local"
                    label="Từ ngày"
                    type="datetime-local"
                    defaultValue={fromDate}
                    sx={{ width: 250 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      setFromDate(e.currentTarget.value);
                    }}
                  />
                </Box>

                <Box sx={{ marginLeft: 3, marginRight: 3 }}>-</Box>

                <Box>
                  <TextField
                    id="datetime-local"
                    label="Đến ngày"
                    type="datetime-local"
                    defaultValue={toDate}
                    sx={{ width: 250 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => {
                      setToDate(e.currentTarget.value);
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={leftColumnFormGrid} display="flex">
              <Box sx={{ flexGrow: 1 }}></Box>
              <Box display="flex" alignItems="center" sx={{ height: "100%" }}>
                Enable
              </Box>
            </Grid>
            <Grid item xs={rightColumnFormGrid}>
              <Switch
                checked={checked}
                onChange={(event) => {
                  setChecked(event.target.checked);
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          marginTop: 2,
        }}
      >
        <Button
          color="success"
          variant="outlined"
          style={{ padding: 5, textTransform: "none", marginRight: 10 }}
          onClick={() => {}}
        >
          <Typography color="black">Hủy</Typography>
        </Button>

        <Button
          color="success"
          variant="contained"
          style={{ padding: 5, textTransform: "none" }}
          onClick={async () => {
            try {
              let isValid = true;
              if (discountCode === "") {
                toast.error("Mã là bắt buộc");
                isValid = false;
              }
              if (reduction === "") {
                toast.error("Tỷ lệ giảm giá là bắt buộc");
                isValid = false;
              }
              if (reduction < 0) {
                toast.error("Tỷ lệ giảm giá phải > 0");
                isValid = false;
              }
              if (minOrderVal === "") {
                toast.error("Giá trị đơn tối thiểu là bắt buộc");
                isValid = false;
              }
              if (maxReduction === "") {
                toast.error("Giá giảm tối đa là bắt buộc");
                isValid = false;
              }
              if (maxNoUses === "") {
                toast.error("Số lượt sử dụng là bắt buộc");
                isValid = false;
              }
              if (maxNoUses < 0) {
                toast.error("Số lượt sử dụng phải lớn hơn 0");
                isValid = false;
              }
              if (new Date(fromDate) >= new Date(toDate)) {
                toast.error("Từ ngày phải bé hơn tới ngày");
                isValid = false;
              }

              if (isValid === false) return;

              const response = await createDiscount({
                code: discountCode,
                fromDate: fromDate,
                toDate: toDate,
                description: "Discount Description",
                discountRate: reduction,
                minOrderCost: minOrderVal,
                maxDiscount: maxReduction,
                enabled: checked,
                MaxUsings: maxNoUses,
              });

              toast.success("Add new discount successfully");
              history.push("/admin/discount");
            } catch (error) {
              toast.error("Mã giảm giá đã tồn tại");
            }
          }}
        >
          <Typography color="white">Tạo</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default DiscountCreation;
