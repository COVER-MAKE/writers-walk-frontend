import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Box, Button, Container, MenuItem, Paper, TextField, Typography} from "@mui/material";

export default function NewBookPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        author: '',
        genres:"기타",
        content:'',
    });

    const genres = ['소설','자기개발','스릴러','역사'];
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setForm({...form, [name]: value});
    };
    const handleSubmit = () => {
        alert('등록하기 버튼이 클릭됨(api 연결 예정)')
    }
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

                    {/* 작성자 */}
                    <Box>
                        <Typography sx={{ mb: 1, fontWeight: 600 }}>
                            작성자 *
                        </Typography>
                        <TextField
                            name="author"
                            fullWidth
                            placeholder="작성자 이름을 입력해주세요"
                            value={form.author}
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
                            {genres.map((g) => (
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