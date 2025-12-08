import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Box, Button, Container, MenuItem, Paper, TextField, Typography} from "@mui/material";
import axios from "axios";

export default function NewBookPage() {
    const navigate = useNavigate();

    // 🔥 로그인 여부 검사
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const checkResponse = await axios.get(
                    "http://localhost:8080/api/v1/auth/check",
                    { withCredentials: true }
                );

                console.log(checkResponse.data);

                // 로그인 안된 경우 → data가 null이거나, message가 no session인 경우
                if (!checkResponse.data.data) {
                    alert("로그인이 필요한 서비스입니다.");
                    navigate("/login");
                }
            } catch (error) {
                // 오류가 나도 비로그인으로 판단
                alert("로그인이 필요한 서비스입니다.");
                navigate("/login");
            }
        };

        fetchUserData();
    }, [navigate]);


    const [form, setForm] = useState({
        title: '',
        genre:"NOVEL",
        content:'',
    });

    const genre = ["NOVEL","FANTASY",'ESSAY', 'POETRY', 'HISTORY', 'SCIENCE'];
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setForm({...form, [name]: value});
    };
    const handleSubmit = async () => {
        // 🔥 1) 프론트 유효성 검사
        if (!form.title.trim()) {
            alert("제목을 입력하세요.");
            return;
        }

        if (!form.content.trim()) {
            alert("내용을 입력하세요.");
            return;
        }

        if (!form.genre) {
            alert("장르를 선택하세요.");
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/v1/books',
                {
                    title: form.title,
                    genre: form.genre,
                    content: form.content
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        withCredentials: true
                    }
                }
            );

            console.log('응답:', response.data);

            if(response.data.status === 200) {
                alert(response.data.message);
                navigate('/books');
            } else {
                alert("등록실패: "+ response.data.message);
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message || "등록 중 오류 발생");
            }else {
                alert("서버와 연결할 수 없습니다.")
            }
        }
    };
    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 5,
                    borderRadius: 3,
                    border: "1px solid #e0e0e0",
                }}
            >
                {/* 페이지 제목 */}
                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", mb: 4 }}
                >
                    새 도서 등록
                </Typography>

                {/* 입력 필드들 */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {/* 제목 */}
                    <Box>
                        <Typography sx={{ mb: 1, fontWeight: 600 }}>
                            제목 *
                        </Typography>
                        <TextField
                            name="title"
                            fullWidth
                            placeholder="도서 제목을 입력해주세요"
                            value={form.title}
                            onChange={handleChange}
                        />
                    </Box>


                    {/* 장르 */}
                    <Box>
                        <Typography sx={{ mb: 1, fontWeight: 600 }}>
                            장르 *
                        </Typography>
                        <TextField
                            select
                            name="genre"
                            fullWidth
                            value={form.genre}
                            onChange={handleChange}
                        >
                            {genre.map((g) => (
                                <MenuItem key={g} value={g}>
                                    {g}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    {/* 내용 */}
                    <Box>
                        <Typography sx={{ mb: 1, fontWeight: 600 }}>
                            내용 *
                        </Typography>
                        <TextField
                            name="content"
                            fullWidth
                            multiline
                            rows={6}
                            placeholder="도서 내용을 입력해주세요"
                            value={form.content}
                            onChange={handleChange}
                        />
                    </Box>
                </Box>

                {/* 버튼 영역 */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        mt: 4,
                    }}
                >
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => navigate("/")}
                        sx={{
                            px: 3,
                            borderRadius: 2,
                        }}
                    >
                        취소
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            px: 3,
                            borderRadius: 2,
                            bgcolor: '#2196f3',
                        }}
                    >
                        등록하기
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}