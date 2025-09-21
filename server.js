// server.js - HATA AYIKLAMA MODLU TAM KOD
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
 * Hata ayıklama logları eklendi.
 */
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`;

    const payload = {
      contents: [{
        role: "user",
        parts: [{ text: userMessage }],
      }],
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ],
    };

    const response = await axios.post(endpoint, payload, {
      headers: { "Content-Type": "application/json" },
    });

    // --- EN ÖNEMLİ DEBUG ADIMI ---
    // Google'dan gelen tüm cevabı terminale yazdırıyoruz.
    console.log("--- Google'dan Gelen Tam Yanıt ---");
    console.log(JSON.stringify(response.data, null, 2));
    console.log("---------------------------------");
    // ---------------------------------

    // Cevabın içinde "candidates" olup olmadığını kontrol et
    if (response.data.candidates && response.data.candidates.length > 0) {
      const reply = response.data.candidates[0].content.parts[0].text;
      res.json({ reply });
    } else {
      // Eğer "candidates" yoksa, nedenini anlamaya çalış
      const feedback = response.data.promptFeedback;
      const blockReason = feedback ? feedback.blockReason : "Bilinmeyen Neden";
      console.error("Google'dan geçerli bir cevap alınamadı. Sebep:", blockReason, feedback);
      res.json({ reply: `Bunu anlayamadım 🤯 (Sebep: ${blockReason})` });
    }

  } catch (error) {
    // Eğer bir ağ hatası veya 4xx/5xx gibi bir durum olursa, burası çalışır.
    console.error("--- KRİTİK HATA ---");
    // Hata nesnesinin tamamını incelemek için console.dir kullanmak daha iyi olabilir
    console.dir(error.response ? error.response.data : error, { depth: null });
    console.error("-------------------");
    res.status(500).json({ reply: "Üzgünüm, sunucuda kritik bir hata oluştu." });
  }
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor 🚀`);
});