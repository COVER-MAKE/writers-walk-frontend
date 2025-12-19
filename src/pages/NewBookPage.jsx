import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Box, Button, Container, MenuItem, Paper, TextField, Typography} from "@mui/material";
import axios from "axios";

export default function NewBookPage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const isEditMode = Boolean(id);

    // 🔥 로그인 여부 검사
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const checkResponse = await axios.get(
                    "${VITE_API_URL}/api/v1/auth/check",
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

    useEffect(() => {
        if (!isEditMode) return;

        const loadbook = async () => {
            try{
                const response = await axios.get('${VITE_API_URL}/api/v1/books/${id}');

                if (response.status === 200) {
                    const data = response.data.data;
                    setForm({
                        title: data.title,
                        genre: data.genre,
                        content:data.content,
                    });
                }
            } catch (error) {
                alert("도서의 정보를 불러올 수 없습니다.")
                navigate("/books");
            }
        };
        loadbook();
    },[id]);

    const genre = ["NOVEL","FANTASY",'ESSAY', 'POETRY', 'HISTORY', 'SCIENCE'];
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setForm({...form, [name]: value});
    };

    const handleSubmit = async () => {

        // validation
        if (!form.title.trim()) return alert("제목을 입력하세요.");
        if (!form.content.trim()) return alert("내용을 입력하세요.");

        try {
            let response;

            if (isEditMode) {
                // 수정 PUT 요청
                response = await axios.put(
                    '${VITE_API_URL}/api/v1/books/${id}',
                    form
                );
            } else {
                // 신규 등록 POST 요청
                response = await axios.post(
                    "${VITE_API_URL}/api/v1/books",
                    form
                );
            }

            if (response.data.status === 200) {
                alert(isEditMode ? "수정되었습니다!" : "등록되었습니다!");
                navigate(isEditMode ? `/books/${id}` : "/books");
            } else {
                alert(response.data.message || "실패했습니다");
            }

        } catch (error) {
            alert("오류가 발생했습니다.");
        }
    };


    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Paper elevation={0} sx={{ p: 5, borderRadius: 3, border: "1px solid #e0e0e0" }}>

                {/* 제목 */}
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
                    {isEditMode ? "도서 수정" : "새 도서 등록"}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {/* 제목 */}
                    <Box>
                        <Typography sx={{ mb: 1, fontWeight: 600 }}>제목 *</Typography>
                        <TextField name="title" fullWidth value={form.title} onChange={handleChange} />
                    </Box>

                    {/* 장르 */}
                    <Box>
                        <Typography sx={{ mb: 1, fontWeight: 600 }}>장르 *</Typography>
                        <TextField select name="genre" fullWidth value={form.genre} onChange={handleChange}>
                            {genre.map((g) => (
                                <MenuItem key={g} value={g}>{g}</MenuItem>
                            ))}
                        </TextField>
                    </Box>

                    {/* 내용 */}
                    <Box>
                        <Typography sx={{ mb: 1, fontWeight: 600 }}>내용 *</Typography>
                        <TextField
                            name="content"
                            fullWidth
                            multiline
                            rows={6}
                            value={form.content}
                            onChange={handleChange}
                        />
                    </Box>
                </Box>

                {/* 버튼 */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
                    <Button variant="outlined" color="inherit" onClick={() => navigate("/books")}>
                        취소
                    </Button>

                    <Button variant="contained" onClick={handleSubmit}>
                        {isEditMode ? "수정하기" : "등록하기"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}