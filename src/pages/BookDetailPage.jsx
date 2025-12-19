<<<<<<< Updated upstream
import React, {useEffect, useState} from 'react';
import {useParams, useNavigate, data} from 'react-router-dom';
import { summarizeContent, createReviewPrompt } from '../utils/aiService';
import axios from 'axios';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    Chip,
    Paper,
    Divider,
    CircularProgress,
    Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function BookDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState({
        id: 1,
        title: "젋은 느티나무",
        content: "재혼한 어머니를 따라 새로운 가족이 된 열여덟 살 숙희와 스물두 살 현규. 숙희는 의붓오빠인 현규에게서 나는 싱그러운 비누 냄새에 설레며 남매라는 관계 속에서 금지된 사랑의 감정을 느낀다. 죄책감과 혼란스러움에 괴로워하던 숙희는 결국 도망치듯 시골로 떠나지만, 그녀를 찾아온 현규는 '우리에게 길이 없는 것은 아니다'라며 잠시 떨어져 자신을 찾은 뒤 다시 만나자고 약속한다. 숙희는 젊은 느티나무 아래서 미래에 대한 희망을 확인하고, 비로소 그를 마음껏 사랑해도 된다는 벅찬 기쁨을 깨닫는다.",
        genre: "NOVEL",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQileziPs4UMKdTjbFFY4_ZjZANhGjoCdzhtw&s",
    });

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const response = await axios.get('${VITE_API_URL}/api/v1/books/${id}'
                );

                console.log(response.data);

                if (response.data.status === 200) {
                    const data = response.data.data;
                    setBook({
                        id: data.id,
                        title: data.title,
                        content: data.content,
                        genre: data.genre,
                        image: data.thumbnailUrl
                    });
                }
            } catch (error) {
                console.log(error);
                alert("도서정보를 불러올 수 없습니다.")
                navigate('/books');
            }
        };
        fetchBookDetail();
    },[id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete('${VITE_API_URL}/api/v1/books/${id}')
            if (response.data.status === 200) {
                alert("삭제가 완료되었습니다")
                navigate('/books');
            } else{
                alert("삭제 실패"+response.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("삭제 중에 오류가 발생했습니다")
        }
    }



    const [apiKey, setApiKey] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleAiCoverClick = async () => {
        try {
            const check = await axios.get('${VITE_API_URL}/api/v1/auth/check');
            if (check.data.status !== 200) {
                throw new Error('not logged in');
            }
        } catch {
            alert('로그인이 필요합니다. 다시 로그인해주세요.');
            navigate('/login');
            return;
        }

        let currentKey = apiKey;

        if (!currentKey) {
            const inputKey = window.prompt("OpenAI API Key를 입력해주세요 (sk-...):");
            if (!inputKey) return;

            const cleanKey = inputKey.trim();

            setApiKey(cleanKey);
            currentKey = cleanKey;
        }

        currentKey = currentKey.trim();

        setIsGenerating(true);
        setErrorMsg(null);

        try {
            console.log("1. 내용 요약 중...");
            const summary = await summarizeContent(currentKey, book.title, book.content);
            console.log("요약 완료:", summary);

            const finalPrompt = createReviewPrompt(summary, book.genre, book.title);
            console.log("생성된 프롬프트:", finalPrompt);

            console.log("2. 이미지 생성 중...");
            const response = await fetch("/openai/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentKey}`,
                },
                body: JSON.stringify({
                    model: "dall-e-2",
                    prompt: finalPrompt,
                    n: 1,
                    size: "1024x1024",
                }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error?.message || "이미지 생성 실패");
            }

            const data = await response.json();
            const generatedImageUrl = data.data[0].url;

            console.log("생성된 이미지:", generatedImageUrl);

            await axios.put(
                '${VITE_API_URL}/api/v1/books/${id}/cover-url',
                { thumbnailUrl: generatedImageUrl },
                { withCredentials: true }
            );

            setBook((prev) => ({
                ...prev,
                image: generatedImageUrl
            }));

            alert("표지가 성공적으로 생성되었습니다!");

        } catch (error) {
            console.error("Error generating cover:", error);
            setErrorMsg(error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            {/* 상단 네비게이션 및 버튼 영역 */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(`/books`)}
                    sx={{ color: 'text.secondary' }}
                >
                    목록으로 돌아가기
                </Button>

                <Stack direction="row" spacing={1}>
                    <Button variant="outlined" startIcon={<EditIcon />} color="primary" onClick={() => navigate(`/books/${id}/edit`)}>
                        수정
                    </Button>
                    <Button variant="contained" startIcon={<DeleteIcon />} color="error" onClick={handleDelete}>
                        삭제
                    </Button>
                </Stack>
            </Box>

            {/*메인 컨텐츠 영역 */}
            <Box sx={{ display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' }}>

                <Box sx={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                    {book.image ? (
                        <Box
                            component="img"
                            src={book.image}
                            alt={book.title}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: 2,
                                boxShadow: 3,
                                mb: 2,
                                objectFit: 'cover',
                                aspectRatio: '2/3',
                                opacity: isGenerating ? 0.5 : 1, // 로딩 중 흐리게
                                transition: 'opacity 0.3s'
                            }}
                        />

                    ) : (
                        <Box
                            sx={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: 2,
                                boxShadow: 3,
                                mb: 2,
                                backgroundColor: '#90caf9',
                                border: '1px solid #ccc',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                aspectRatio: '2/3',
                                color: 'black',
                                fontSize: '16px',
                                opacity: 0.3
                            }}
                        >
                            표지 없음
                        </Box>
                    )}

                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={isGenerating ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
                        onClick={handleAiCoverClick}
                        disabled={isGenerating}
                        sx={{ py: 1.5, borderRadius: 2, borderColor: '#ddd', color: '#555', '&:hover': { bgcolor: '#f5f5f5' } }}
                    >
                        {isGenerating ? "AI가 표지를 그리는 중..." : "AI 표지 생성"}
                    </Button>
                    {/* 에러 메시지 */}
                    {errorMsg && (
                        <Alert severity="error" sx={{ mt: 2, fontSize: '0.8rem' }}>
                            {errorMsg}
                        </Alert>
                    )}
                </Box>

                {/* 오른쪽: 상세 정보 (제목, 장르, 내용) */}
                <Box sx={{ flex: 1, minWidth: '300px', maxWidth: '600px' }}>
                    <Box sx={{ mb: 2 }}>
                        <Chip
                            label={book.genre}
                            color="primary"
                            size="small"
                            sx={{ fontWeight: 'bold', px: 1 }}
                        />
                    </Box>

                    {/* 제목 */}
                    <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                        {book.title}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 3, border: '1px solid #eee' }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                            책 내용
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#444', whiteSpace: 'pre-line' }}>
                            {book.content}
                        </Typography>
                    </Paper>
                </Box>

            </Box>
        </Container>
=======
import React, {useState} from 'react';
export default function BookDetailPage() {
    const book = {
        id: 1,
        title: "Title",
        summary: "summary",
        image: "/images/book1.png",
        createdAt: "2025-12-04",
        updatedAt: "2025-12-05"
    };

    let formattedSummary = "";
    if (book.summary) {
        const chunks = book.summary.match(/.{1,50}/g);
        formattedSummary = chunks ? chunks.join("\n") : "";
    }
    // 버튼 클릭 횟수 상태
    const [count, setCount] = useState(0)

    // 버튼 클릭 시 새 창 열기 + 클릭 횟수 증가
    const handleClick = () => {
        setCount(count + 1);
        console.log("버튼 클릭됨");
    };

    return(
        <div style={{ padding: "40px 20px" }}>
            {/* 제목 */}
            <h1 style={{ fontSize: "28px", marginBottom: "30px", textAlign: "center" }}>
                도서 상세
            </h1>

            {/* 전체 가로 레이아웃 */}
            <div style={{ display: "flex", gap: "40px" }}>

                {/* 왼쪽: 이미지 + 버튼 */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQileziPs4UMKdTjbFFY4_ZjZANhGjoCdzhtw&s"
                        alt={book.title}
                        style={{ width: "220px", height: "450", marginBottom: "15px" }}
                    />

                    <button
                        onClick={handleClick}
                             style={{
                                 padding: "10px 16px",
                                 fontSize: "14px",
                                 borderRadius: "8px",
                                 border: "1px solid #ccc",
                                 cursor: "pointer",
                                 marginBottom: "10px"
                    }}
                    >
                        AI로 책 표지 만들기
                    </button>
                </div>

                {/* 오른쪽 내용 */}
                <div className="right-section">
                    <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>{book.title}</h2>

                    {/* summary: 줄바꿈 반영 */}
                    <p style={{ whiteSpace: "pre-line", lineHeight: "1.5" }}>
                        {formattedSummary}
                    </p>

                    <div className="dates" style={{ marginTop: "15px", fontSize: "14px", color: "#555" }}>
                        <p>생성일: {book.createdAt}</p>
                        <p>수정일: {book.updatedAt}</p>
                    </div>
                </div>
            </div>
        </div>
>>>>>>> Stashed changes
    );
}