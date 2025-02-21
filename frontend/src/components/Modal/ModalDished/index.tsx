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
import { createdDished, editDished } from "../../../service/Dish";
import { useQuery } from "react-query";

import { useMutation } from "@tanstack/react-query";
import {
  addIntergrient,
  getAllIntergrient,
  getAllIntergrientByDishedId,
  deleteIntergrient,
} from "../../../service/Ingredient";
import { toast } from "react-toastify";

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
  const [dishedId, setDishedId] = useState("");
  useEffect(() => {
    if (detailDishedData) {
      setDishedName(detailDishedData.name || "");
      setDishedPrice(detailDishedData.price || "");
      setDishedType(detailDishedData.dish_type || "");
      setIngredientValue(detailDishedData.ingredient_id || "");
      setDishedId(detailDishedData.id || "");
    }
  }, [detailDishedData]);
  const {
    data: intergrientData,
    isError: IntergrientIsError,
    isLoading: IntergrientIsLoading,
  } = useQuery(["intergrient"], getAllIntergrient);

  const { mutateAsync: addingDishedFunc } = useMutation({
    mutationFn: createdDished,
  });
  const { mutateAsync: addingIntegrient } = useMutation({
    mutationFn: addIntergrient,
  });
  const { mutateAsync: deleteIntergrientFunc } = useMutation({
    mutationFn: deleteIntergrient,
  });
  const { mutateAsync: editDishedFunc } = useMutation({
    mutationFn: editDished,
  });

  const intergrientDataRender = intergrientData?.data?.ingredients || [];
  const {
    data: intergrientIdData,
    isError: IntergrientIdIsError,
    isLoading: IntergrientIdIsLoading,
  } = useQuery(
    ["intergrient", intergrientDataRender.id],
    getAllIntergrientByDishedId
  );
  const intergrientDataIdRender = intergrientIdData?.data?.ingredients[0] || {};

  if (IntergrientIsError || IntergrientIdIsError) {
    return <div>Loading...</div>;
  }

  if (IntergrientIsLoading || IntergrientIdIsLoading) {
    return <div>Error loading data. Please try again.</div>;
  }
  // Use useEffect to avoid triggering re-renders
  useEffect(() => {
    if (intergrientDataIdRender?.id) {
      setIngredientValue(intergrientDataIdRender.id);
    }
  }, [intergrientDataIdRender?.id]);

  const handleDishedPriceChange = (e) => {
    setDishedPrice(e.target.value);
  };
  const handleDishedNameChange = (e) => {
    setDishedName(e.target.value);
  };
  const handleDishedTypeChange = (e) => {
    setDishedType(e.target.value);
  };

  const addingDished = async () => {
    try {
      const resultDished = await addingDishedFunc({
        restaurant_id: restaurant_id,
        name: dishedName,
        price: dishedPrice,
        dish_type: dishedType,
        ingredient_id: ingredientValue,
      });

      const resultIntegriendient = await addingIntegrient({
        dish_id: resultDished?.data?.id || 1,
        name: ingredientValue,
      });
      if (
        resultIntegriendient.status != 404 &&
        resultIntegriendient.status != 500
      ) {
        toast("Thêm thành công ùi", {
          autoClose: 3000,
          type: "success",
        });
        handleClose();
      } else {
        toast("Lỗi ùi nè bạn ui", {
          autoClose: 3000,
          type: "error",
        });
      }
    } catch {
      toast("Lỗi ùi nè bạn ui", {
        autoClose: 3000,
        type: "error",
      });
    }
  };

  const onEditDished = async () => {
    try {
      const resultDished = await editDishedFunc({
        id: dishedId,
        restaurant_id: restaurant_id,
        name: dishedName,
        price: dishedPrice,
        dish_type: dishedType,
        ingredient_id: ingredientValue,
      });
      if (intergrientIdData?.data?.ingredients[0] != ingredientValue) {
        const resultIntegriendient = await deleteIntergrientFunc({
          id: [resultDished.data.id],
        });
        const resultIntegriendientAdding = await addingIntegrient({
          dish_id: resultDished?.data?.id || 1,
          name: ingredientValue,
        });
        if (
          resultIntegriendientAdding.status != 404 &&
          resultIntegriendientAdding.status != 500
        ) {
          toast("Sửa thành công ùi", {
            autoClose: 3000,
            type: "success",
          });
          handleClose();
        } else {
          toast("Lỗi ùi nè bạn ui", {
            autoClose: 3000,
            type: "error",
          });
        }
        handleClose();
      }
    } catch {
      toast("Lỗi ùi nè bạn ui", {
        autoClose: 3000,
        type: "error",
      });
    }
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
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Ingredients</InputLabel>
                <Select
                  value={ingredientValue}
                  onChange={(e) => {
                    setIngredientValue(e.target.value);
                  }}
                >
                  {intergrientDataRender.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
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
                  onClick={onEditDished}
                  variant="contained"
                  color="primary"
                >
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

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Ingredients</InputLabel>
                <Select
                  value={ingredientValue}
                  onChange={(e) => {
                    setIngredientValue(e.target.value);
                  }}
                >
                  {intergrientDataRender.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
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
