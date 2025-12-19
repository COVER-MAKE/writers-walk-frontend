import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import axios from "axios";

export default function BookListPage() {
    const [books, setBooks] = useState([]);
    const [category, setCategory] = useState("");
    // 🔵추가: 전체 목록을 보존
    const [allBooks, setAllBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("title");

    const navigate = useNavigate();

    const booksPerPage = 10;
    const pages = 5; // 고정
    const startIndex = (currentPage - 1) * booksPerPage;
    const currentBooks = books.slice(startIndex, startIndex + booksPerPage);

    // 초기 목록 가져오기
    useEffect(() => {
        axios.get('${VITE_API_URL}/api/v1/books')
            .then(res => {
                const list = Array.isArray(res.data.data) ? res.data.data : [];
                setBooks(list);
                setAllBooks(list);
            })
            .catch(console.error);
    }, []);

    const changePage = (event, value) => {
        setCurrentPage(Number(value));
    };

    const searchBooks = async (keyword) => {
        const params = {};
        if (keyword?.trim()) params.keyword = keyword;
        const res = await
            axios.get("${VITE_API_URL}/api/v1/books/search",
                { params });
        return res.data.data;
    };
    const getBooksByGenre = async (category) => {
        const res = await
            axios.get("${VITE_API_URL}/api/v1/books/search/by-genre",
                { params: { category } });
        return res.data.data;
    };


    const handleSearch = async () => {
        console.log("filter:", selectedFilter, "category:", category);
        if (selectedFilter !== "category" && !search.trim()) return;

        try {
            let result = [];
            if (selectedFilter === "title") {
                result = await searchBooks(search);
            } else if (selectedFilter === "keyword") {
                result = await searchBooks(search);
            } else if (selectedFilter === "category") {
                result = await getBooksByGenre(category);
            }
            setBooks(result);
            setCurrentPage(1);
        } catch (err) {
            console.error(err);
        }
    };



    const resetSearch = () => {
        setBooks(allBooks);
        setSearch("");
        setCategory("");
        setCurrentPage(1);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>도서 목록</h1>

            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <select
                    value={selectedFilter}
                    onChange={(e) => {
                        setSelectedFilter(e.target.value);
                        setSearch("");
                        setCategory("");
                    }}

                >
                    <option value="keyword">제목+내용</option>
                    <option value="category">장르</option>
                </select>

                {selectedFilter === "title" && (
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ flex: 1 }}
                />
                    )}
                {selectedFilter === "category" && (
                <select
                    value={category}
                    onChange={(e) => {
                        const value = e.target.value;
                        setCategory(value);

                        if (value === "") {
                            // 🔥 전체 선택
                            setBooks(allBooks);
                            setCurrentPage(1);
                        } else {
                            // 🔍 카테고리 검색
                            getBooksByGenre(value).then(result => {
                                setBooks(result);
                                setCurrentPage(1);
                            });
                        }
                    }}
                >
                    <option value="">전체</option>
                    <option value="NOVEL">NOVEL</option>
                    <option value="FANTASY">FANTASY</option>
                    <option value="ESSAY">ESSAY</option>
                    <option value="POETRY">POETRY</option>
                    <option value="HISTORY">HISTORY</option>
                    <option value="SCIENCE">SCIENCE</option>
                </select>
                    )}
                <button onClick={handleSearch}>검색</button>
                <button onClick={resetSearch}>전체보기</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "40px", marginTop: "40px" }}>
                {currentBooks.map(book => (
                    <div key={book.id} style={{ textAlign: "center" }}
                         onClick={() => navigate('/books/' + book.id)}>
                        <div
                            style={{
                                width: "150px",
                                height: "200px",
                                margin: "0 auto",
                                borderRadius: "4px",
                                overflow: "hidden",
                                backgroundColor: book.thumbnailUrl ? "transparent" : "#e0e0e0",
                                border: book.thumbnailUrl ? "none" : "1px solid #ccc",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {book.thumbnailUrl ? (
                                <img
                                    src={book.thumbnailUrl}
                                    alt={book.title}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            ) : (
                                <span style={{ color: "#999" }}>No Image</span>
                            )}
                        </div>
                        <p>{book.title}</p>
                    </div>
                ))}
            </div>

            <div style={{ width: "100%", marginTop: "40px", display: "flex", justifyContent: "center" }}>
                <Pagination
                    count={pages}
                    page={currentPage}
                    onChange={changePage}
                    siblingCount={0}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                    renderItem={(item) => {
                        const start = (item.page - 1) * booksPerPage;
                        const end = start + booksPerPage;
                        const isEmpty = books.slice(start, end).length === 0;
                        return <PaginationItem {...item} disabled={isEmpty} />;
                    }}
                />
            </div>
        </div>
    );
}