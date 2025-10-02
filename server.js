// server.js - NIHAI ÇÖZÜM: VERTEX AI ENTEGRASYONU
require("dotenv").config();
const express = require("express");
const cors = require("cors");
// YENİ KÜTÜPHANE: Artık Vertex AI kullanıyoruz.
const { VertexAI } = require('@google-cloud/vertexai');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Vertex AI'ı projemizin kimliği ve konumu ile başlatıyoruz.
// Kimlik doğrulaması için API anahtarı yerine otomatik olarak
// Google Cloud yetkilendirmesini kullanır, bu daha güvenlidir.
const vertex_ai = new VertexAI({
  project: process.env.GCP_PROJECT_ID,
  location: process.env.GCP_LOCATION,
});

// Kullanacağımız modeli belirliyoruz.
const model = "gemin-2.5-pro";
 // Bu, Vertex AI'daki EN stabil ve genel model adıdır.

const generativeModel = vertex_ai.getGenerativeModel({
  model: model,
});

app.get("/", (req, res) => {
  res.send("Chatbot Backend Çalışıyor ✅ (Vertex AI ile)");
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const reqPayload = {
      contents: [{ role: 'user', parts: [{ text: userMessage }] }],
    };

    const result = await generativeModel.generateContent(reqPayload);
    
    // Vertex AI'dan gelen cevap formatı biraz daha farklıdır, ona göre alıyoruz.
    const reply = result.response.candidates[0].content.parts[0].text;

    res.json({ reply });

  } catch (error) {
    console.error("--- KRİTİK HATA (VERTEX AI) ---");
    console.error(error);
    console.error("---------------------------------");
    res.status(500).json({ reply: "Üzgünüm, Vertex AI sunucusunda bir hata oluştu." });
  }
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor 🚀`);
});