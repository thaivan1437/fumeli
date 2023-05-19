import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LayoutUserPage from "./avatar";
import { axiosInstance } from "@/utils/api";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import InputField from "@/components/input";
import NotiModal from "../modal/noti";
import { getUserGiftData } from "../logic/reducer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Toast from "@/components/toast";

export default function InfoUser() {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  useEffect(() => {
    // check login has data in localStore
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.username) {
      setUser(userData);
    }
  }, []);
  useEffect(() => {
    if (!user) {
      return;
    }
    async function fetchAllData() {
      await Promise.all([dispatch(getUserGiftData({ userId: user?.userid }))]);
    }
    void fetchAllData();
  }, [user]);

  const userDetail = useSelector((state) => state.userDetail);

  const [currentPass, setCurrentPass] = useState("");
  const [pass, setPass] = useState("");

  const fields = [
    { name: "currentPassword", label: "Mật khẩu hiện tại", type: "password" },
    { name: "newPassword", label: "Mật khẩu mới", type: "password" },
    {
      name: "confirmPassword",
      label: "Nhập lại mật khẩu mới",
      type: "password",
    },
  ];

  const getInfoUser = () => {
    const value = {
      city: userDetail.userDetail.City,
      introduction: userDetail.userDetail.Introduction,
      fullname: userDetail.userDetail.FullName,
      dateOfBirth: userDetail.userDetail.DateOfBirth,
      gender: userDetail.userDetail.Gender,
      email: userDetail.userDetail.Email,
      phoneNumber: userDetail.userDetail.PhoneNumber,
    };
    return value;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "currentPassword") {
      setCurrentPass(value);
    } else if (name === "newPassword") {
      setPass(value);
    }
  };
  const [showNotiModal, setNotiModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState(getInfoUser().city || "");
  const [introduction, setIntroduction] = useState(
    getInfoUser().introduction || ""
  );
  const [fullname, setFullName] = useState(getInfoUser().fullname || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    getInfoUser().dateOfBirth || ""
  );
  const [gender, setGender] = useState(getInfoUser().gender || "");
  const [email, setEmail] = useState(getInfoUser().email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    getInfoUser().phoneNumber || ""
  );
  const [statusCode, setStatusCode] = useState({ isShow: false, status: "" });

  useEffect(() => {
    if (!user) {
      return;
    }
    setCity(getInfoUser().city || "");
    setIntroduction(getInfoUser().introduction || "");
    setFullName(getInfoUser().fullname || "");
    setDateOfBirth(getInfoUser().dateOfBirth || "");
    setGender(getInfoUser().gender || "");
    setEmail(getInfoUser().email || "");
    setPhoneNumber(getInfoUser().phoneNumber || "");
  }, [userDetail.userDetail]);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleDateClick = () => {
    setOpen(true);
  };

  const handleDateClose = () => {
    setOpen(false);
  };

  const closeNotiModal = () => {
    setNotiModal(false);
  };
  const updateUserDetail = () => {
    const currentTime = new Date().toLocaleTimeString();
    axiosInstance
      .put(
        "api/appUser/update",
        {
          Id: user.userid,
          Introduction: introduction,
          FullName: fullname,
          DateOfBirth: dateOfBirth,
          Gender: gender,
          Email: email,
          PhoneNumber: phoneNumber,
          CreateDate: currentTime,
          City: city,
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        setNotiModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updatePassWord = () => {
    axiosInstance
      .put(
        "api/appUser/updatepassword",
        {
          Id: user.userid,
          CurrentPassword: currentPass,
          Password: pass,
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        setNotiModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const activeEmail = () => {
    axiosInstance
      .post(
        "api/appUser/sendactiveemail",
        {
          Id: user.userid,
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response) {
          setStatusCode({ isShow: true, status: "success" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const xs_email = userDetail.userDetail.EmailConfirmed ? 10 : 12;
  const xs1_email = userDetail.userDetail.EmailConfirmed ? 2 : 12;

  const showToast = () => {
    if (statusCode.isShow && statusCode.status === "success") {
      return (
        <Toast message="Vui lòng kiểm tra email của bạn!" type="success" />
      );
    }
  };

  return (
    <>
      {showToast()}
      <LayoutUserPage />
      <Container>
        <Typography
          variant="h4"
          className="userDetail__page--title"
          mt={4}
          mb={4}
        >
          CẬP NHẬT THÔNG TIN CÁ NHÂN
        </Typography>
        <Box className="info__box m-0">
          <TableContainer className="table__userDetail mt-2">
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: "none" },
                  }}
                >
                  <TableCell className="table__userDetail--text__left bd-none p-lr-0">
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={2}>
                        GIỚI THIỆU
                      </Grid>
                      <Grid item xs={12} md={10}>
                        <TextField
                          fullWidth
                          multiline
                          rows={6}
                          className="input__userDetail"
                          defaultValue={introduction}
                          onChange={(event) =>
                            setIntroduction(event.target.value)
                          }
                          id="introductionTxt"
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="table__userDetail--text__left bd-none p-lr-0">
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={2}>
                        HỌ VÀ TÊN<span className="cl-red">*</span>
                      </Grid>
                      <Grid item xs={12} md={10}>
                        <TextField
                          className="input__userDetail"
                          required
                          multiline
                          defaultValue={userDetail?.userDetail?.FullName || ""}
                          onChange={(event) => setFullName(event.target.value)}
                          id="fullnameTxt"
                        />
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="table__userDetail--text__left bd-none p-lr-0">
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={2}>
                        NGÀY SINH<span className="cl-red">*</span>
                      </Grid>
                      <Grid item xs={12} md={10}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            className="input__userDetail date__input"
                            color="white"
                            defaultValue={dayjs(dateOfBirth)}
                            onChange={(value) => setDateOfBirth(value)}
                            id="dateOfBirthTxt"
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="table__userDetail--text__left bd-none p-lr-0">
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={2}>
                        GIỚI TÍNH
                      </Grid>
                      <Grid item xs={12} md={10}>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="Nữ"
                          />
                          <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="Nam"
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="table__userDetail--text__left bd-none p-lr-0">
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={2}>
                        EMAIL<span className="cl-red">*</span>
                      </Grid>
                      <Grid item xs={xs_email} md={8}>
                        {userDetail.userDetail.EmailConfirmed ? (
                          <TextField
                            className="input__userDetail"
                            required
                            multiline
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            id="emailTxt"
                            disabled
                          />
                        ) : (
                          <TextField
                            className="input__userDetail"
                            required
                            multiline
                            defaultValue={email}
                            onChange={(event) => setEmail(event.target.value)}
                            id="emailTxt"
                          />
                        )}
                      </Grid>
                      <Grid item xs={xs1_email} md={2}>
                        {userDetail.userDetail.EmailConfirmed ? (
                          <CheckCircleIcon className="table__userDetail--confirmTick" />
                        ) : (
                          <Button
                            variant="contained"
                            className="btn__confirm"
                            onClick={activeEmail}
                          >
                            XÁC MINH
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="table__userDetail--text__left bd-none p-lr-0">
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={2}>
                        SĐT<span className="cl-red">*</span>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <TextField
                          className="input__userDetail"
                          required
                          multiline
                          defaultValue={phoneNumber}
                          onChange={(event) =>
                            setPhoneNumber(event.target.value)
                          }
                          id="phoneNumberTxt"
                        />
                      </Grid>
                      <Grid item xs={12} md={2}>
                        {/* {userDetail.userDetail.PhoneNumberConfirmed?<CheckCircleIcon className='table__userDetail--confirmTick' />:  <Button variant="contained" className="btn__confirm" onClick={activeEmail}>
                          XÁC MINH
                        </Button>} */}
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="table__userDetail--text__left bd-none p-lr-0">
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={2}>
                        TỈNH THÀNH<span className="cl-red">*</span>
                      </Grid>
                      <Grid item xs={12} md={10}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label"></InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={city}
                            onChange={handleChange}
                          >
                            <MenuItem value="An Giang">An Giang</MenuItem>
                            <MenuItem value="Bà Rịa-Vũng Tàu">
                              Bà Rịa-Vũng Tàu
                            </MenuItem>
                            <MenuItem value="Bạc Liêu">Bạc Liêu</MenuItem>
                            <MenuItem value="Bắc Kạn">Bắc Kạn</MenuItem>
                            <MenuItem value="Bắc Giang">Bắc Giang</MenuItem>
                            <MenuItem value="Bắc Ninh">Bắc Ninh</MenuItem>
                            <MenuItem value="Bến Tre">Bến Tre</MenuItem>
                            <MenuItem value="Bình Dương">Bình Dương</MenuItem>
                            <MenuItem value="Bình Định">Bình Định</MenuItem>
                            <MenuItem value="Bình Phước">Bình Phước</MenuItem>
                            <MenuItem value="Bình Thuận">Bình Thuận</MenuItem>
                            <MenuItem value="Cà Mau">Cà Mau</MenuItem>
                            <MenuItem value="Cà Mau">Cà Mau</MenuItem>
                            <MenuItem value="Cần Thơ (TP)">
                              Cần Thơ (TP)
                            </MenuItem>
                            <MenuItem value="Đà Nẵng (TP)">
                              Đà Nẵng (TP)
                            </MenuItem>
                            <MenuItem value="Đắk Lắk">Đắk Lắk</MenuItem>
                            <MenuItem value="Đắk Nông">Đắk Nông</MenuItem>
                            <MenuItem value="Điện Biên">Điện Biên</MenuItem>
                            <MenuItem value="Đồng Nai">Đồng Nai</MenuItem>
                            <MenuItem value="Đồng Tháp">Đồng Tháp</MenuItem>
                            <MenuItem value="Gia Lai">Gia Lai</MenuItem>
                            <MenuItem value="Hà Giang">Hà Giang</MenuItem>
                            <MenuItem value="Hà Nam">Hà Nam</MenuItem>
                            <MenuItem value="Hà Nội (TP)">Hà Nội (TP)</MenuItem>
                            <MenuItem value="Hà Tây">Hà Tây</MenuItem>
                            <MenuItem value="Hà Tĩnh">Hà Tĩnh</MenuItem>
                            <MenuItem value="Hải Dương">Hải Dương</MenuItem>
                            <MenuItem value="Hải Phòng (TP)">
                              Hải Phòng (TP)
                            </MenuItem>
                            <MenuItem value="Hòa Bình">Hòa Bình</MenuItem>
                            <MenuItem value="Hồ Chí Minh (TP)">
                              Hồ Chí Minh (TP)
                            </MenuItem>
                            <MenuItem value="Hậu Giang">Hậu Giang</MenuItem>
                            <MenuItem value="Hưng Yên">Hưng Yên</MenuItem>
                            <MenuItem value="Khánh Hòa">Khánh Hòa</MenuItem>
                            <MenuItem value="Kiên Giang">Kiên Giang</MenuItem>
                            <MenuItem value="Kon Tum">Kon Tum</MenuItem>
                            <MenuItem value="Lai Châu">Lai Châu</MenuItem>
                            <MenuItem value="Lào Cai">Lào Cai</MenuItem>
                            <MenuItem value="Lạng Sơn">Lạng Sơn</MenuItem>
                            <MenuItem value="Lâm Đồng">Lâm Đồng</MenuItem>
                            <MenuItem value="Long An">Long An</MenuItem>
                            <MenuItem value="Nam Định">Nam Định</MenuItem>
                            <MenuItem value="Nghệ An">Nghệ An</MenuItem>
                            <MenuItem value="Ninh Bình">Ninh Bình</MenuItem>
                            <MenuItem value="Ninh Thuận">Ninh Thuận</MenuItem>
                            <MenuItem value="Phú Thọ">Phú Thọ</MenuItem>
                            <MenuItem value="Phú Yên">Phú Yên</MenuItem>
                            <MenuItem value="Quảng Bình">Quảng Bình</MenuItem>
                            <MenuItem value="Quảng Nam">Quảng Nam</MenuItem>
                            <MenuItem value="Quảng Ngãi">Quảng Ngãi</MenuItem>
                            <MenuItem value="Quảng Ninh">Quảng Ninh</MenuItem>
                            <MenuItem value="Quảng Trị">Quảng Trị</MenuItem>
                            <MenuItem value="Sóc Trăng">Sóc Trăng</MenuItem>
                            <MenuItem value="Sơn La">Sơn La</MenuItem>
                            <MenuItem value="Tây Ninh">Tây Ninh</MenuItem>
                            <MenuItem value="Thái Bình">Thái Bình</MenuItem>
                            <MenuItem value="Thái Nguyên">Thái Nguyên</MenuItem>
                            <MenuItem value="Thanh Hóa">Thanh Hóa</MenuItem>
                            <MenuItem value="Thừa Thiên – Huế">
                              Thừa Thiên – Huế
                            </MenuItem>
                            <MenuItem value="Tiền Giang">Tiền Giang</MenuItem>
                            <MenuItem value="Trà Vinh">Trà Vinh</MenuItem>
                            <MenuItem value="Tuyên Quang">Tuyên Quang</MenuItem>
                            <MenuItem value="Vĩnh Long">Vĩnh Long</MenuItem>
                            <MenuItem value="Vĩnh Phúc">Vĩnh Phúc</MenuItem>
                            <MenuItem value="Yên Bái">Yên Bái</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>

                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell className="table__userDetail--text__left bd-none p-lr-0">
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={2}>
                        MẬT KHẨU<span className="cl-red">*</span>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        {fields.map((field) => (
                          <Box key={field.name} my={2}>
                            <InputField
                              name={field.name}
                              label={field.label}
                              type={field.type}
                              fullWidth
                              required
                              onChange={handleInputChange}
                            />
                          </Box>
                        ))}
                      </Grid>
                      <Grid item xs={12} md={2}>
                        <Button
                          variant="contained"
                          className="btn__confirm"
                          onClick={() => updatePassWord()}
                        >
                          THAY ĐỔI
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Button
          variant="contained"
          className="btn_outline w-100"
          type="submit"
          onClick={() => updateUserDetail()}
        >
          CẬP NHẬT NGAY
        </Button>
      </Container>
      {showNotiModal ? <NotiModal onClose={closeNotiModal} /> : null}
    </>
  );
}
