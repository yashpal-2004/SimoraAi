# Video Caption Generator - Testing Instructions

## Prerequisites

1. **Install Whisper** (required for caption generation):
   ```bash
   pip install openai-whisper
   ```

2. **Verify Whisper installation**:
   ```bash
   whisper --help
   ```

## Running the Application

### 1. Start the Backend Server
```bash
cd "/Users/bhavesh-appbrew/Desktop/Simora AI/video-caption-backend"
npm start
```
The server will start on `http://localhost:3001`

### 2. Start the Frontend Server
```bash
cd "/Users/bhavesh-appbrew/Desktop/Simora AI/video-audio-extractor"
npm run dev
```
The frontend will start on `http://localhost:5173`

## Testing the Complete Workflow

### Step 1: Upload Video
1. Open `http://localhost:5173` in your browser
2. Drag and drop a video file or click to select one
3. Supported formats: MP4, AVI, MOV, MKV

### Step 2: Generate Captions
1. Click "Extract Audio & Generate Captions"
2. The process will:
   - Extract audio from video using FFmpeg (client-side)
   - Send audio to backend API
   - Process audio with Whisper AI model
   - Generate SRT captions
   - Display results

### Step 3: View Results
- **Audio Player**: Listen to extracted audio
- **Caption Preview**: See generated captions with timestamps
- **SRT Preview**: View SRT file format
- **Video Player**: Watch video with caption overlay
- **Downloads**: Download audio (MP3) and captions (SRT)

## API Endpoints

- **Health Check**: `GET http://localhost:3001/health`
- **Upload Audio**: `POST http://localhost:3001/api/upload-audio`
- **Test Endpoint**: `GET http://localhost:3001/api/test`

## Expected Behavior

1. Video upload should show file info
2. Audio extraction should show progress bar
3. Caption generation should display "Generating captions with AI..."
4. Results should show:
   - Audio player with controls
   - Caption segments with timestamps
   - SRT file preview
   - Video player with caption overlay
   - Download buttons for audio and SRT

## Troubleshooting

### If Whisper is not installed:
```bash
pip install openai-whisper
# or with conda:
conda install -c conda-forge openai-whisper
```

### If backend API fails:
- Check that both servers are running
- Verify CORS is enabled
- Check browser console for errors
- Ensure audio file is valid

### If caption generation is slow:
- Whisper processing time depends on:
  - Audio length
  - Model size (base, small, medium, large)
  - System performance

## Architecture

```
Frontend (React + Vite)          Backend (Express.js)
├── Video Upload                 ├── Audio Upload API
├── FFmpeg Audio Extraction      ├── Whisper Integration
├── API Communication            ├── SRT Generation
├── Video Player with Captions   └── File Management
└── Download Features
```

## Next Steps

- Install Remotion for advanced video rendering
- Add support for multiple languages
- Implement real-time caption editing
- Add video trimming features
- Support batch processing