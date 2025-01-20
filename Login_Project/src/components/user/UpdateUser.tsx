import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { UserContext } from "./userReducer";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const UpdateUser = () => {
  const { state: user, dispatch: userDispatch } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const getInitials = (firstName: string = "", lastName: string = "", email: string = "") => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    return email[0]?.toUpperCase() || "?";
  };


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    userDispatch({ type: "UPDATE", data: { [id]: value } });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3000/api/user`, user, {
        headers: {
          "Content-Type": "application/json",
          "user-id": `${user.id}`,
          "access-control-allow-origin": "*",
        },
      });
      userDispatch({ type: "UPDATE", data: res.data });
    } catch (err) {
      console.error(err);
    } finally {
      setOpen(false);
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: "#fff176", width: 56, height: 56 }}>
          {getInitials(user.firstName, user.lastName, user.email)}
        </Avatar>
        <Typography variant="h6">שלום {user.firstName}</Typography>
        <Button variant="outlined" onClick={() => setOpen(!open)}>
          עדכן פרטים
        </Button>
      </Stack>

      {open && (
       <Paper
       elevation={3}
       sx={{
         left: 0,
         top: 0,
         height: "70vh",
         width: "20%",
         p: 3,
         boxSizing: "border-box",
         background: "rgb(248, 250, 253)"
       }}
     >
       <Typography variant="h5" mb={2}>
         עדכון פרטים
       </Typography>
       <form onSubmit={handleSubmit}>
         <Stack spacing={2}>
           <TextField
             label="שם פרטי"
             id="firstName"
             value={user.firstName}
             onChange={handleChange}
             fullWidth
             sx={{
              
               
             }}
           />
           <TextField
             label="שם משפחה"
             id="lastName"
             value={user.lastName}
             onChange={handleChange}
             fullWidth
             sx={{
              
             }}
           />
           <TextField
             label="אימייל"
             id="email"
             type="email"
             value={user.email}
             onChange={handleChange}
             fullWidth
             sx={{
               
             }}
           />
           <TextField
             label="כתובת"
             id="address"
             value={user.address}
             onChange={handleChange}
             fullWidth
             sx={{
              
             }}
           />
           <TextField
             label="טלפון"
             id="phone"
             type="tel"
             value={user.phone}
             onChange={handleChange}
             fullWidth
             
           />
           <Stack direction="row" spacing={2} justifyContent="flex-start" mt={2}>
             <Button variant="contained" color="primary" type="submit">
               עדכן
             </Button>
             <Button variant="outlined" onClick={() => setOpen(false)}>
               ביטול
             </Button>
           </Stack>
         </Stack>
       </form>
     </Paper>
     
      )}
    </Box>
    
  );
};

export default UpdateUser;
