import React, { useState, useRef, useEffect } from 'react';

const VideoPlayerWithCaptions = ({ videoFile, captions, onDownloadSrt }) => {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCaption, setCurrentCaption] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);
  const [selectedFont, setSelectedFont] = useState('Inter');
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [processedCaptions, setProcessedCaptions] = useState([]);
  const [currentWords, setCurrentWords] = useState([]);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(0);
  
  const fontOptions = [
    { value: 'Inter', label: 'Inter (Modern)' },
    { value: 'Arial', label: 'Arial (Classic)' },
    { value: 'Georgia', label: 'Georgia (Serif)' }
  ];

  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [videoFile]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedMetadata = () => {
      console.log('Video metadata loaded');
      setDuration(video.duration);
    };
    const handleError = (e) => {
      console.error('Video error:', e);
    };
    const handleVolumeChange = () => {
      setVolume(video.volume);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [videoUrl]);

  useEffect(() => {
    if (!captions || captions.length === 0) {
      setProcessedCaptions([]);
      return;
    }

    const processed = [];
    captions.forEach(caption => {
      const words = caption.text.split(' ');
      const maxWordsPerSegment = 6; 
      const segmentDuration = (caption.end - caption.start) / Math.ceil(words.length / maxWordsPerSegment);
      
      for (let i = 0; i < words.length; i += maxWordsPerSegment) {
        const segmentWords = words.slice(i, i + maxWordsPerSegment);
        const segmentStart = caption.start + (i / maxWordsPerSegment) * segmentDuration;
        const segmentEnd = Math.min(caption.start + ((i + maxWordsPerSegment) / maxWordsPerSegment) * segmentDuration, caption.end);
        
        processed.push({
          start: segmentStart,
          end: segmentEnd,
          text: segmentWords.join(' '),
          words: segmentWords
        });
      }
    });
    
    setProcessedCaptions(processed);
  }, [captions]);

  useEffect(() => {
    if (!processedCaptions || processedCaptions.length === 0) {
      setCurrentCaption('');
      setCurrentWords([]);
      return;
    }

    const current = processedCaptions.find(caption => 
      currentTime >= caption.start && currentTime <= caption.end
    );

    if (current) {
      setCurrentCaption(current.text);
      setCurrentWords(current.words);
      
      const segmentProgress = (currentTime - current.start) / (current.end - current.start);
      const wordIndex = Math.floor(segmentProgress * current.words.length);
      setHighlightedWordIndex(Math.min(wordIndex, current.words.length - 1));
    } else {
      setCurrentCaption('');
      setCurrentWords([]);
      setHighlightedWordIndex(0);
    }
  }, [currentTime, processedCaptions]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * duration;
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

    if (!videoFile) {
      return null;
    }

    return (
    <div className="remotion-video-player">
      <div className="player-header">
        <div className="header-row">
          <h3>Video Player with Captions</h3>
          <div className="header-controls">
            <div className="font-selector">
              <select 
                value={selectedFont} 
                onChange={(e) => setSelectedFont(e.target.value)}
                className="font-dropdown"
              >
                {fontOptions.map(font => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>
            {onDownloadSrt && (
              <button 
                onClick={onDownloadSrt}
                className="download-srt-btn"
                title="Download SRT file"
              >
                Download SRT
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="player-wrapper">
        <div className="video-container">
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              className="remotion-video"
              preload="metadata"
              onLoadStart={() => console.log('Video loading started')}
              onCanPlay={() => console.log('Video can play')}
              onError={(e) => console.error('Video error:', e)}
            />
          ) : (
            <div className="video-loading">Loading video...</div>
          )}
          
          {currentCaption && (
            <div 
              className="remotion-caption-overlay"
              style={{ fontFamily: selectedFont }}
            >
              <div className="caption-text">
                {currentWords.map((word, index) => (
                  <span 
                    key={index}
                    className={`caption-word ${
                      index <= highlightedWordIndex ? 'highlighted' : 'unhighlighted'
                    }`}
                  >
                    {word}
                    {index < currentWords.length - 1 && ' '}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="remotion-controls">
          <div className="control-row">
            <button 
              className="play-pause-btn"
              onClick={togglePlayPause}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            
            <div className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            
            <div className="progress-container" onClick={handleSeek}>
              <div className="progress-track">
                <div 
                  className="progress-fill"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="player-info">
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Status:</span>
            <span className="info-value">{isPlaying ? 'Playing' : 'Paused'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerWithCaptions;