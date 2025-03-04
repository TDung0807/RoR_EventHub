import React, { useEffect, useState, useMemo } from "react";
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
  refetchDishedFunc,
}) => {
  const handleClose = () => setOpen(false);
  // Các state quản lý thông tin của món ăn
  const [dishedName, setDishedName] = useState("");
  const [dishedPrice, setDishedPrice] = useState("");
  const [dishedType, setDishedType] = useState("");
  const [ingredientValue, setIngredientValue] = useState("");
  const [dishedId, setDishedId] = useState("");

  // Khi có dữ liệu detail thì cập nhật lại state
  useEffect(() => {
    if (detailDishedData) {
      setDishedName(detailDishedData.name || "");
      setDishedPrice(detailDishedData.price || "");
      setDishedType(detailDishedData.dish_type || "");
      setIngredientValue(detailDishedData.ingredient_id || "");
      setDishedId(detailDishedData.id || "");
    }
  }, [detailDishedData]);
  // Lấy danh sách tất cả nguyên liệu
  const {
    data: intergrientData,
    isError: interError,
    isLoading: interLoading,
  } = useQuery(["intergrient"], getAllIntergrient);

  // Các mutation cho việc thêm, sửa món ăn và nguyên liệu
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

  // Dữ liệu danh sách nguyên liệu trả về từ API
  const intergrientDataRender = intergrientData?.data?.ingredients || [];

  // Sử dụng useMemo để tính toán ingredientId ổn định
  const ingredientId = useMemo(() => {
    return intergrientDataRender.length ? intergrientDataRender[0].id : null;
  }, [intergrientDataRender]);

  // Lấy dữ liệu nguyên liệu theo dish id (ingredientId) nếu có
  const {
    data: intergrientIdData,
    isError: interIdError,
    isLoading: interIdLoading,
  } = useQuery(
    ["intergrient", ingredientId],
    () => getAllIntergrientByDishedId(ingredientId),
    { enabled: Boolean(ingredientId) }
  );
  // Nếu có lỗi thì hiển thị thông báo lỗi
  useEffect(() => {
    if (interError || interIdError) {
      toast.error("Lỗi khi tải dữ liệu nguyên liệu!");
    }
  }, [interError, interIdError]);

  // Cho giao diện loading/error được hiển thị trong JSX (không early return)
  const isLoading = interLoading || interIdLoading;

  // Lấy dữ liệu nguyên liệu theo id
  const intergrientDataIdRender = intergrientIdData?.data?.ingredients[0] || {};
  // Đồng bộ ingredientValue với dữ liệu lấy được nếu khác
  useEffect(() => {
    if (
      ingredientValue == "" &&
      intergrientDataIdRender?.id &&
      intergrientDataIdRender.id !== ingredientValue
    ) {
      setIngredientValue(intergrientDataIdRender.id || "");
    }
  }, [intergrientDataIdRender?.id, ingredientValue]);

  // Xử lý thay đổi các trường input
  const handleDishedNameChange = (e) => setDishedName(e.target.value);
  const handleDishedPriceChange = (e) => setDishedPrice(e.target.value);
  const handleDishedTypeChange = (e) => setDishedType(e.target.value);

  // Hàm thêm món ăn mới
  const addingDished = async () => {
    try {
      const resultDished = await addingDishedFunc({
        restaurant_id,
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
        resultIntegriendient.status !== 404 &&
        resultIntegriendient.status !== 500
      ) {
        toast("Thêm thành công ùi", {
          autoClose: 3000,
          type: "success",
        });
        handleClose();
        refetchDishedFunc();
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

  // Hàm sửa món ăn
  const onEditDished = async () => {
    try {
      const resultDished = await editDishedFunc({
        id: dishedId,
        restaurant_id,
        name: dishedName,
        price: dishedPrice,
        dish_type: dishedType,
        ingredient_id: ingredientValue,
      });
      // Nếu nguyên liệu thay đổi thì xoá cũ và thêm mới
      if (intergrientIdData?.data?.ingredients[0] != ingredientValue) {
        console.log(resultDished);
        await deleteIntergrientFunc({
          id: [resultDished.data.id],
          ingredient_ids: [ingredientValue],
        });
        const resultIntegriendientAdding = await addingIntegrient({
          dish_id: resultDished?.data?.id || 1,
          name: ingredientValue,
        });
        if (
          resultIntegriendientAdding.status !== 404 &&
          resultIntegriendientAdding.status !== 500
        ) {
          toast("Sửa thành công ùi", {
            autoClose: 3000,
            type: "success",
          });
          handleClose();
          refetchDishedFunc();
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {action === "edit" && (
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
                        console.log(e.target.value);

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
                    required
                    fullWidth
                    variant="outlined"
                    value={dishedPrice}
                    onChange={handleDishedPriceChange}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
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
          {action === "add" && (
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
                      onChange={(e) => setIngredientValue(e.target.value)}
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
                    required
                    fullWidth
                    variant="outlined"
                    value={dishedPrice}
                    onChange={handleDishedPriceChange}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}
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
      )}
    </>
  );
};
