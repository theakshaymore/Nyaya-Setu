# ⚖️ Nyaya-Setu

**A Hybrid AI Legal Assistant for Indian Citizens.** _Bridging the gap between complex laws and common understanding._

## ![NyayaSetu](/ss1.png)

## 🏗️ The Project

**NyayaSetu** is a specialized MERN stack application designed to automate legal workflows like FIR drafting and bail checking. It features a unique **Dual-Engine** architecture that allows the system to toggle between high-performance cloud APIs and a self-hosted, private LLM.

### 🌟 Key Features

## ![NyayaSetu](/ss2.png)

---

## 🛠️ Tech Stack

- **Frontend:** React + Vite, Tailwind CSS, Shadcn UI
- **Backend:** Node.js, Express
- **Database:** Supabase (Postgres)
- **AI Orchestration:** Hybrid (Groq API ↔️ Self-hosted Llama 3 via Ollama)
- **Infrastructure:** Oracle Cloud (ARM Ampere A1), Vercel

---

## ⚙️ Hybrid AI Logic

The app includes a **hidden administrative toggle** that changes the backend inference source:

1. **Cloud Mode (Groq):** Maximum speed and reasoning depth using Llama-3.3-70B.
2. **Local Mode (Oracle):** Zero-cost, private inference using a fine-tuned GGUF model on an Oracle Always Free instance.

---

## 🚀 Setup & Installation

```bash
# 1. Clone the repo
git clone [https://github.com/your-username/NyayaSetu.git](https://github.com/your-username/NyayaSetu.git)

# 2. Install Dependencies
npm install

# 3. Environment Variables
# Create a .env file in the root with your Supabase and Groq keys.
# SUPABASE_URL=...
# SUPABASE_SERVICE_KEY=...
# GROQ_API_KEY=...
# LOCAL_LLM_URL=...

# 4. Run Development
npm run dev

```

👨‍💻 Author
Akshay More Full-Stack Developer | MERN Specialist

⚖️ Disclaimer
This project is for educational purposes and portfolio demonstration only. It does not provide legal advice.
