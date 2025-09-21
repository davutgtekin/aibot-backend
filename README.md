# Chatbot Backend Sunucusu

Bu proje, bir chatbot arayüzünden (frontend) gelen istekleri alan, bu istekleri Google Gemini API'sine ileten ve alınan yapay zeka cevaplarını tekrar arayüze gönderen bir backend sunucusudur.

## 🚀 Projenin Amacı

Bu sunucunun temel amacı, frontend ile Google'ın güçlü yapay zeka modeli arasında güvenli ve verimli bir köprü görevi görmektir. Bu sayede `API_KEY` gibi hassas bilgiler kullanıcı tarafında ifşa edilmez.

## ✨ Özellikler

-   **RESTful API:** Frontend'in iletişim kurması için `/chat` adında bir `POST` endpoint'i sağlar.
-   **Gemini API Entegrasyonu:** Kullanıcı mesajlarını alıp Google Gemini Pro modeline gönderir.
-   **Güvenlik:** API anahtarı, `.env` dosyası aracılığıyla güvenli bir şekilde saklanır ve sunucu tarafında kullanılır.
-   **Hata Yönetimi:** Gemini API'sinden veya isteklerden kaynaklanan hataları yakalar ve anlamlı bir şekilde yanıtlar.

## 🛠️ Kullanılan Teknolojiler

-   **Node.js:** JavaScript'i sunucu tarafında çalıştırmak için kullanılan platform.
-   **Express.js:** Web sunucusu oluşturmak ve API endpoint'lerini yönetmek için kullanılan framework.
-   **Axios:** Google Gemini API'sine HTTP istekleri yapmak için kullanılan kütüphane.
-   **CORS:** Frontend'in farklı bir porttan gelen isteklere izin vermesini sağlar.
-   **Dotenv:** Ortam değişkenlerini (`.env` dosyası) yönetmek için kullanılır.

## 🏃‍♂️ Kurulum ve Çalıştırma

Bu projenin çalışması için bir frontend arayüzüne ihtiyacı vardır. Uyumlu arayüz projesine aşağıdaki linkten ulaşabilirsiniz:
-   **➡️ [vsChatbot.v0 Deposu](https://github.com/davutgtekin/vsChatbot.v0)**

### Backend Sunucusunu Çalıştırma Adımları:

1.  **Depoyu Klonlayın:**
    ```bash
    git clone https://github.com/[davutgtekin]/chatbot-backend.git
    cd chatbot-backend
    ```

2.  **Gerekli Paketleri Yükleyin:**
    ```bash
    npm install
    ```

3.  **`.env` Dosyasını Oluşturun:**
    -   Projenin ana dizininde `.env` adında bir dosya oluşturun.
    -   İçine Google AI Studio'dan aldığınız API anahtarınızı aşağıdaki gibi ekleyin:
      ```
      API_KEY=Sizin_Google_API_Anahtariniz_Buraya_Gelecek
      ```

4.  **Sunucuyu Başlatın:**
    ```bash
    node server.js
    ```
    Sunucu varsayılan olarak `http://localhost:5000` adresinde çalışmaya başlayacaktır.