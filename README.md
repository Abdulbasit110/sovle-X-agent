# Math Solver Agent

An AI-powered math problem solver that uses Tesseract.js OCR to extract text from images and provides step-by-step solutions with LaTeX output. Features a modern Next.js frontend and a robust Express.js backend API.

## ✨ Features

- 📸 **Image Upload & OCR**: Upload math problem images or take photos
- 🤖 **AI-Powered Solving**: OpenAI Agents for intelligent math problem solving
- 📝 **Step-by-Step Solutions**: Clear, educational explanations for each step
- 🔢 **LaTeX Output**: Professional mathematical formatting
- 🎨 **Modern UI**: Beautiful, responsive Next.js frontend
- 🚀 **RESTful API**: Clean backend endpoints for integration
- 📱 **Mobile Friendly**: Responsive design for all devices
- 🔍 **Advanced OCR**: Tesseract.js for reliable text extraction

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   Express.js    │    │   External      │
│   Frontend      │◄──►│   Backend API   │◄──►│   AI Services   │
│   (Port 3000)   │    │   (Port 3001)   │    │   (OpenAI)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- OpenAI API key

### 1. Clone & Setup

```bash
git clone <your-repo>
cd math-solver-agent
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# OpenAI API Key for math solving
OPENAI_API_KEY=your_openai_api_key_here

# Backend server port (optional)
PORT=3001
```

**Note**: Tesseract.js works offline and doesn't require API keys!

### 3. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd math-solver-app
npm install
```

### 4. Start the Application

**Terminal 1 - Backend API:**
```bash
# From root directory
npm run dev
# Server runs on http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
# From math-solver-app directory
npm run dev
# Frontend runs on http://localhost:3000
```

### 5. Open Your Browser

Navigate to `http://localhost:3000` and start solving math problems!

## 📁 Project Structure

```
math-solver-agent/
├── 📁 Backend (Port 3001)
│   ├── index.js          # Express server with routes
│   ├── controller.js     # Request handlers & business logic
│   ├── agent.js          # AI math solver using OpenAI Agents
│   ├── ocr.js           # Image text extraction with Tesseract.js
│   ├── package.json     # Backend dependencies
│   └── README.md        # This file
│
└── 📁 Frontend (Port 3000)
    ├── app/              # Next.js app directory
    │   ├── page.tsx      # Main math solver interface
    │   └── layout.tsx    # App layout
    ├── components/       # UI components
    ├── package.json      # Frontend dependencies
    └── ...               # Next.js configuration files
```

## 🔌 API Endpoints

### Backend API (Port 3001)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check endpoint |
| `POST` | `/solve-math` | Upload image and get math solution |

### Frontend (Port 3000)

- **Main App**: `http://localhost:3000` - Math solver interface
- **Image Upload**: Drag & drop or camera capture
- **Real-time Processing**: Live feedback during solving

## 📱 Usage

### 1. Upload Math Problem
- Take a photo using your device camera
- Or upload an existing image file
- Supported formats: JPG, PNG, GIF, etc.

### 2. AI Processing
- Tesseract.js OCR extracts text from the image
- AI analyzes the math problem
- Generates step-by-step solution

### 3. View Results
- **Extracted Text**: See what the OCR read from your image
- **Step-by-Step Solution**: Understand each solving step
- **Final Answer**: Get the numerical/symbolic result
- **LaTeX Format**: Professional mathematical notation

## 🛠️ Development

### Backend Development

```bash
# Start with auto-reload
npm run dev

# Start production
npm start
```

### Frontend Development

```bash
cd math-solver-app

# Start with auto-reload
npm run dev

# Build for production
npm run build

# Start production
npm start
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for math solving | ✅ |
| `PORT` | Backend server port | ❌ (default: 3001) |

### OCR Configuration

Tesseract.js provides advanced OCR options:

```javascript
// Advanced OCR with custom settings
const options = {
  lang: 'eng',           // Language (English)
  oem: 1,               // OCR Engine Mode: LSTM neural nets
  psm: 6,               // Page segmentation: uniform text block
  dpi: 300              // Image DPI for better accuracy
};
```

### File Upload Limits

- **Maximum file size**: 10MB
- **Supported formats**: All common image types
- **Processing timeout**: Configurable

## 🧪 Testing

### Test Backend API

```bash
# Health check
curl http://localhost:3001/health

# Test math solver (replace with actual image)
curl -X POST http://localhost:3001/solve-math \
  -F "image=@math_problem.jpg"
```

### Test Frontend

1. Open `http://localhost:3000`
2. Upload a math problem image
3. Verify OCR text extraction
4. Check AI solution generation

## 🚀 Deployment

### Backend Deployment

```bash
# Build and start
npm run build
npm start

# Or use PM2
pm2 start index.js --name "math-solver-api"
```

### Frontend Deployment

```bash
cd math-solver-app

# Build for production
npm run build

# Deploy to Vercel, Netlify, or your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Backend won't start:**
- Check environment variables are set
- Ensure ports are not in use
- Verify all dependencies are installed

**Frontend can't connect to API:**
- Confirm backend is running on port 3001
- Check CORS settings
- Verify API endpoints are correct

**OCR not working:**
- Ensure image quality is good (clear, high contrast)
- Check image format is supported
- Verify image contains readable text
- Try different OCR settings if needed

**Math solving fails:**
- Verify OpenAI API key
- Check API quota and limits
- Ensure problem text is clear

### OCR Tips for Better Results

- **Image Quality**: Use clear, high-resolution images
- **Contrast**: Ensure good contrast between text and background
- **Lighting**: Avoid shadows and glare
- **Orientation**: Keep text horizontal and well-aligned
- **Font Size**: Larger, clearer fonts work better

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review API documentation
- Open an issue on GitHub

---

**Happy Math Solving! 🧮✨**
