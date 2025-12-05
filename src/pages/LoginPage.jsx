import React, { useState } from "react";
import {
    Box,
    Button,
    Typography,
    Link as MuiLink,
} from "@mui/material";
import BookRoundedIcon from "@mui/icons-material/BookRounded";
import AuthInput from "../components/AuthInput";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import {Link} from "react-router-dom"; // 컴포넌트 경로 맞춰서 조정!

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        console.log("로그인 데이터:", { email, password });
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Box
                sx={{
                    width: 550,
                    padding: "40px 30px",
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Box sx={{ display: 'inline-flex', p: 2, bgcolor: '#e3f2fd', borderRadius: '50%', mb: 2 }}>
                    <MenuBookIcon sx={{ fontSize: 40, color: '#2196f3' }} />
                </Box>
                <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    도서관리 시스템
                </Typography>
                <Typography sx={{ color: "#555", fontSize: "13px", mb: 3 }}>
                    로그인하여 계속하기
                </Typography>


                <AuthInput
                    label="이메일"
                    placeholder="이메일 주소"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <AuthInput
                    label="비밀번호"
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        padding: "10px 0",
                        backgroundColor: "#1a73e8",
                        fontWeight: 600,
                        fontSize: "15px",
                        borderRadius: "8px",
                        ":hover": { backgroundColor: "#1667c7" },
                    }}
                    onClick={handleLogin}
                >
                    로그인
                </Button>

                <Typography sx={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
                    계정이 없으신가요?{" "}
                    <Link to="/signup" style={{ color: "#1a73e8", textDecoration: "none" }}>
                        회원가입
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}

