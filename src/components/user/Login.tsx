    import { useContext, useRef, useState } from "react";
    import { UserContext } from "./userReducer";
    import { Box, Button, Modal, TextField, Typography } from "@mui/material";

    const Login = () => {
        const {state, dispatch: userDispatch } = useContext(UserContext)
        const [isLogin, setIsLogin] = useState(false);
        const [isSignUp, setIsSignUp] = useState(false);
        const emailRef = useRef<HTMLInputElement>(null);
        const passwordRef = useRef<HTMLInputElement>(null);
        const baseUrl = import.meta.env.VITE_API_URL;


    const handleLogin = async () => {
            const url = isLogin ? `${baseUrl}/api/user/login` : `${baseUrl}/api/user/register`;

            // יצירת אובייקט עם הנתונים לשליחה
            const updatedData = {
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            };

            console.log('נתונים לשליחה:', updatedData)
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {                                    
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*',
                    },
                    body: JSON.stringify(updatedData),
                });

                if (response.status === 401) {
                    alert('משתמש לא מוכר, נסה להרשם');
                } else if (!response.ok) {
                    const errorMessage = await response.text(); 
                    console.error(`שגיאה: ${errorMessage}`); 
                    throw new Error(`fetch error ${response.status}`);
                }

                const data = await response.json()
                console.log('תשובת השרת:', data)

                await userDispatch({
                    type: isSignUp ? 'SIGNUP' : 'LOGIN',
                    data: isSignUp
                        ? {
                            id: data.userId,
                            email: emailRef.current?.value || '',
                            password: passwordRef.current?.value || '',
                        }
                        : data.user,
                })

                console.log('after',state)
                

            } catch (error) {
                console.error('שגיאה בתהליך ההתחברות:', error); 
            } finally {
                // מחיקת ערכים מהשדות לאחר סיום הבקשה
                if (emailRef.current) emailRef.current.value = ''
                if (passwordRef.current) passwordRef.current.value = ''
                setIsLogin(false);
                setIsSignUp(false);
            }
        }

        return (
            <>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        padding: 2,
                        gap: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setIsSignUp(true)}
                    >
                        SignUp
                    </Button>
                </Box>

                {(isLogin || isSignUp) && (
                    <Modal
                        open={isLogin || isSignUp}
                        onClose={() => {
                            setIsLogin(false)
                            setIsSignUp(false)
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 400,
                                bgcolor: "background.paper",
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 2,
                            }}
                        >
                            <Typography variant="h6" component="h2" mb={2}>
                                {isLogin ? "Login" : "Sign Up"}
                            </Typography>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                margin="normal"
                                inputRef={emailRef}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                inputRef={passwordRef}
                            />
                            <Box mt={2} display="flex" justifyContent="space-between">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleLogin}
                                >
                                    Send
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setIsLogin(false);
                                        setIsSignUp(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    </Modal>
                )}
            </>
        )
    }

    export default Login

