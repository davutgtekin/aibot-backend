// server.js - TAM ve DÜZELTİLMİŞ KOD
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || 5000;

// Basit sağlık kontrolü (test endpoint)
app.get("/", (req, res) => {
  res.send("Chatbot Backend Çalışıyor ✅");
});

/**
 * POST /chat
 * Frontend'den gelen mesajları alıp Gemini API'ye gönderen ana fonksiyon
 */
// Doğru fonksiyon tanımı burada: "async" kelimesi var
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ reply: "Mesaj içeriği boş olamaz." });
    }

    if (!API_KEY) {
        console.error("API_KEY .env dosyasında tanımlı değil!");
        return res.status(500).json({ reply: "Sunucu yapılandırma hatası: API anahtarı eksik." });
    }

    // YENİ VE DOĞRU SATIR
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`;

    // Google'ın istediği doğru formatta hazırlanmış veri
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: userMessage }],
        },
      ],
    };

    // Axios ile Google'a isteği gönder
    const response = await axios.post(endpoint, payload, {
      headers: { "Content-Type": "application/json" },
    });

    // Google'dan gelen cevabın içinden metni güvenli bir şekilde çıkar
    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Üzgünüm, geçerli bir cevap alınamadı.";

    // Cevabı frontend'e JSON olarak gönder
    res.json({ reply });

  } catch (error) {
    // Hata oluşursa, terminale detaylı bilgi yaz
    console.error("Gemini API veya sunucu hatası:", error.response?.data || error.message);
    
    // Frontend'e genel bir hata mesajı gönder
    res.status(500).json({ reply: "Üzgünüm, sunucuda bir hata oluştu." });
  }
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor 🚀`);
});