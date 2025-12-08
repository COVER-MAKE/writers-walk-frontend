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
    );
}