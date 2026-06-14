require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Ensure uploads directory exists (temp buffer dir not needed for Cloudinary)
// Kept for legacy safety — Cloudinary handles all image storage

// ── Security Headers via Helmet ───────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com',
          'https://cdnjs.cloudflare.com'
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'https://fonts.googleapis.com'
        ],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: [
          "'self'",
          'data:',
          'blob:',
          'https://res.cloudinary.com',
          'https://lh3.googleusercontent.com'
        ],
        connectSrc: ["'self'"]
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

// ── CORS ──────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  'https://rohankeshri.dev',
  'https://www.rohankeshri.dev',
  'http://localhost:5000',
  'http://127.0.0.1:5000',
  'http://localhost:3000'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);

// ── Rate Limiting ─────────────────────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // strict on login
  message: { error: 'Too many login attempts. Try again in 15 minutes.' }
});

app.use('/api/', apiLimiter);
app.use('/api/auth/login', loginLimiter);

// ── Body Parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ── Static Files ──────────────────────────────────────────────────────────────
// Serve frontend (all HTML pages, CSS, JS, images folder)
// Note: Uploaded images now live on Cloudinary — no local /uploads folder needed
app.use(express.static(path.join(__dirname), {
  index: 'index.html',
  extensions: ['html']
}));

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/gallery', require('./backend/routes/gallery'));
app.use('/api/certs', require('./backend/routes/certs'));

// ── SPA Fallback — serve index.html for unknown routes (except /api) ──────────
app.get('/{*path}', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Error]', err.message);
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large. Maximum 10 MB allowed.' });
  }
  if (err.message && err.message.includes('image')) {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: 'Internal server error.' });
});

// ── MongoDB Connection & Server Start ─────────────────────────────────────────
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });
    console.log('✅ MongoDB connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

startServer();
