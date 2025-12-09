const GENRE_STYLES = {
    NOVEL: "Whimsical fairy tale illustration, soft watercolor and ink style, warm and dreamy atmosphere, hand-drawn texture, reminiscent of 'The Little Prince', highly detailed but soft edges.",
    FANTASY: "Epic high fantasy digital art, magical glowing effects, majestic scenery, vivid and vibrant colors, dynamic composition, cinematic lighting, 8k resolution.",
    ESSAY: "Modern minimalist art, flat design with soft shadows, plenty of negative space, pastel color palette, calm and peaceful mood, conceptual imagery.",
    POETRY: "Abstract impressionist painting, emotional and lyrical atmosphere, blurred edges, dreamlike surrealism, soft brush strokes, artistic interpretation.",
    HISTORY: "Classic oil painting style, realistic textures, historical accuracy, sepia or muted vintage tones, dramatic chiaroscuro lighting, museum quality art.",
    SCIENCE: "Hyper-realistic sci-fi render, futuristic technology, clean and sharp details, neon and metallic accents, 4k photorealistic, cinematic depth of field."
};

export const summarizeContent = async (apiKey, title, content) => {
    try {
        const response = await fetch("/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a professional book cover designer. Your job is to extract ONE single, strong visual symbol or metaphor that represents the entire book content. Do not describe complex scenes or multiple characters."
                    },
                    {
                        role: "user",
                        content: `Title: ${title}\nContent: ${content}\n\nExtract ONE core visual object or symbolic scene that best represents this story. Describe it in 1 sentence using visual keywords. (e.g., 'A single glowing rose inside a glass dome on a dark starry background')`
                    }
                ],
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            throw new Error("요약 실패");
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Summary API Error:", error);
        throw error;
    }
};

export const createReviewPrompt = (summary, genre) => {
    const genreStyle = GENRE_STYLES[genre] || GENRE_STYLES.NOVEL;

    const trimmedSummary = summary.length > 300 ? `${summary.slice(0, 300)}...` : summary;

    const prompt = [
        'Vertical 9:16 illustration, full-bleed.',
        `Subject: ${trimmedSummary}`,
        `Style: ${genreStyle}`,
        'Keep flat 2D, front view.',
        'Avoid: any text/letters/signatures, books/covers/spines, mockups, 3D, borders/frames.'
    ].join('\n');

    return prompt.length > 950 ? `${prompt.slice(0, 947)}...` : prompt;
};