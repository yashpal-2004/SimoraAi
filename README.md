# Simora AI - Video Caption Generator

Simora AI is a web application that generates captions for videos using speech-to-text technology. It allows users to upload videos, extract audio, and generate accurate captions that can be displayed alongside the video. The application supports multiple languages and provides a user-friendly interface for editing and customizing captions.

## Features

- **Video Upload**: Upload videos in various formats
- **Audio Extraction**: Automatically extract audio from videos
- **Speech-to-Text**: Generate accurate captions using advanced speech recognition
- **Bilingual Support**: Choose between English and Hinglish (Hindi-English) models
- **Customizable Captions**: Adjust font, size, and style of captions
- **Interactive Player**: Play video with synchronized captions
- **Export Options**: Download captions as SRT or VTT files
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- React 19
- Vite
- FFmpeg.wasm (for client-side video processing)
- Remotion Player
- Tailwind CSS (based on styling patterns)

### Backend
- Node.js with Express
- Whisper (for speech-to-text)
- Multer (for file uploads)
- CORS (for cross-origin requests)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- FFmpeg (for local development)

## Installation

### Frontend Setup

1. Navigate to the FrontEnd directory:
   ```bash
   cd FrontEnd
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Backend Setup

1. Navigate to the BackEnd directory:
   ```bash
   cd BackEnd
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the BackEnd directory with the following variables:
   ```
   PORT=3001
   WHISPER_MODEL=base.en  # or other Whisper model
   ```

4. Start the backend server:
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

## Usage

1. Open the application in your web browser (default: http://localhost:5173)
2. Click "Upload Video" or drag and drop a video file
3. Wait for the audio to be extracted and processed
4. View the generated captions on the video player
5. Customize the caption appearance using the controls
6. Download the captions in your preferred format

## Project Structure

```
Simora-AI/
├── BackEnd/
│   ├── src/
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
│   ├── .env.example       # Environment variables template
│   ├── package.json
│   └── server.js          # Main server file
│
└── FrontEnd/
    ├── public/            # Static assets
    ├── src/
    │   ├── components/    # React components
    │   │   ├── VideoUploader.jsx
    │   │   └── VideoPlayerWithCaptions.jsx
    │   ├── App.jsx        # Main application component
    │   └── main.jsx       # Application entry point
    ├── package.json
    └── vite.config.js
```

## Environment Variables

### Backend
- `PORT`: Port number for the backend server (default: 3001)
- `WHISPER_MODEL`: Whisper model to use (e.g., 'base.en', 'small', 'medium')

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Whisper](https://openai.com/research/whisper) - Speech recognition model by OpenAI
- [FFmpeg](https://ffmpeg.org/) - Multimedia framework
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling

## Support

For support, please open an issue in the GitHub repository.
