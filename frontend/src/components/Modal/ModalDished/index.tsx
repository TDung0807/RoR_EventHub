import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createdDished } from "../../../service/Dish";
import { useMutation } from "@tanstack/react-query";
export const ModalDished = ({
  open,
  setOpen,
  detailDishedData = null,
  action = "detail",
  restaurant_id = "1",
}) => {
  const handleClose = () => setOpen(false);
  const [dishedName, setDishedName] = useState("");
  const [dishedPrice, setDishedPrice] = useState("");
  const [dishedType, setDishedType] = useState("");
  const [ingredientValue, setIngredientValue] = useState("");

  useEffect(() => {
    if (detailDishedData) {
      setDishedName(detailDishedData.name || "");
      setDishedPrice(detailDishedData.price || "");
      setDishedType(detailDishedData.dish_type || "");
      setIngredientValue(detailDishedData.ingredient_id || "");
    }
  }, [detailDishedData]);
  const handleDishedPriceChange = (e) => {
    setDishedPrice(e.target.value);
  };
  const handleDishedNameChange = (e) => {
    setDishedName(e.target.value);
  };
  const handleDishedTypeChange = (e) => {
    setDishedType(e.target.value);
  };
  const { mutateAsync } = useMutation({ mutationFn: createdDished });

  const addingDished = () => {
    const result = mutateAsync({
      restaurant_id: restaurant_id,
      name: dishedName,
      price: dishedPrice,
      dish_type: dishedType,
      ingredient_id: ingredientValue,
    });
  };
  return (
    <>
      {action == "edit" && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              boxShadow: 24,
              borderRadius: 2,
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Edit Dished</Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Dished Name"
                required
                fullWidth
                variant="outlined"
                onChange={handleDishedNameChange}
                value={dishedName}
              />

              <FormControl fullWidth>
                <InputLabel id="mainInter-label">Main ingredient</InputLabel>
                <Select
                  required
                  labelId="mainInter-label"
                  value={ingredientValue}
                  onChange={(e) => {
                    setIngredientValue(e.target.value);
                  }}
                >
                  <MenuItem value="Pork">Pork</MenuItem>
                  <MenuItem value="Beef">Beef</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Dished Type"
                required
                fullWidth
                variant="outlined"
                value={dishedType}
                onChange={handleDishedTypeChange}
              />
              <TextField
                label="Price"
                value={dishedPrice}
                required
                fullWidth
                onChange={handleDishedPriceChange}
                variant="outlined"
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button onClick={handleClose} variant="text">
                  Cancel
                </Button>
                <Button variant="contained" color="primary">
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
      {action == "add" && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              boxShadow: 24,
              borderRadius: 2,
              p: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6">Adding Dished</Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Dished Name"
                required
                fullWidth
                variant="outlined"
                onChange={handleDishedNameChange}
                value={dishedName}
              />

              <FormControl fullWidth>
                <InputLabel id="mainInter-label">Main ingredient</InputLabel>
                <Select
                  required
                  labelId="mainInter-label"
                  value={ingredientValue}
                  onChange={(e) => {
                    setIngredientValue(e.target.value);
                  }}
                >
                  <MenuItem value={1}>Pork</MenuItem>
                  <MenuItem value={2}>Beef</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Dished Type"
                required
                fullWidth
                variant="outlined"
                value={dishedType}
                onChange={handleDishedTypeChange}
              />
              <TextField
                label="Price"
                value={dishedPrice}
                required
                fullWidth
                onChange={handleDishedPriceChange}
                variant="outlined"
              />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button onClick={handleClose} variant="text">
                  Cancel
                </Button>
                <Button
                  onClick={addingDished}
                  variant="contained"
                  color="primary"
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};
