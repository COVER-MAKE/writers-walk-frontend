// src/components/AuthInput.jsx
import { Box, Typography, TextField } from "@mui/material";

export default function AuthInput({ label, type = "text", value, onChange, placeholder }) {
    return (
        <Box sx={{ marginBottom: "20px" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 600, marginBottom: "5px" }}>
                {label}
            </Typography>
            <TextField
                fullWidth
                size="small"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </Box>
    );
}
