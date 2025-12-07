import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import {
    Box,
    Button,
    Typography,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AuthInput from "../components/AuthInput";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        // 입력값 유효성 검사 (빈칸 방지)
        if (!email || !password) {
            alert("이메일과 비밀번호를 모두 입력해주세요.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/api/v1/auth/login',
                {
                    email: email,
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.status === 200) {
                console.log("로그인 성공:", response.data);

                // 홈 화면으로 이동
                navigate('/');
            } else {
                alert("로그인 실패: " + response.data.message);
            }

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message || "이메일 또는 비밀번호를 확인해주세요.");
            } else {
                alert("서버와 연결할 수 없습니다.");
            }
        }
    };

    // 엔터키 눌렀을 때 로그인 실행
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
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
                <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    도서관리 시스템
                </Typography>
                <Typography sx={{ color: "#555", fontSize: "13px", mb: 3 }}>
                    로그인하여 계속하기
                </Typography>

                <div onKeyDown={handleKeyPress}>
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
                </div>

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
                        mt: 2
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