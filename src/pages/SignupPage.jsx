import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import AuthInput from "../components/AuthInput";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";

export default function SignupPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSignup = async () => {
        if (!email || !password) {
            alert('이메일과 비밀번호를 작성해주세요.');
            return;
        }
        try {
            const response = await axios.post(
                '${VITE_API_URL}/api/v1/auth/signup',
                {
                    email: email,
                    password: password
                },
                {
                    headers: {"Content-Type": "application/json",
                    }
                }
            );

            console.log("서버 응답:", response);

            if (response.data.status === 201) {
                alert("회원가입이 완료되었습니다.");
                navigate(`/login`);
            } else{
                alert("회원가입 실패: " + response.data.message);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message || "회원가입에 실패했습니다.");
            } else {
                alert("서버와 연결할 수 없습니다.")
            }
        }
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
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    도서관리 시스템
                </Typography>
                <Typography sx={{ color: "#555", fontSize: "13px", mb: 3 }}>
                    새 계정 만들기
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
                    onClick={handleSignup}
                >
                    회원가입
                </Button>

                <Typography sx={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
                    이미 계정이 있으신가요?{" "}
                    <Link to="/login" style={{ color: "#1a73e8", textDecoration: "none" }}>
                        로그인
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
}
