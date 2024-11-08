import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudArrowUpIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import { uploadVideo } from '../services/storage';

export default function Studio() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await uploadVideo(file);
      navigate('/express'); // Redirect to feed after upload
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload video. Please try again.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Tam Tam Studio</h1>
          <p className="text-gray-400">Share your creativity with the world</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <VideoCameraIcon className="w-8 h-8 text-purple-500" />
            <div>
              <h2 className="text-lg font-medium text-white">Upload Video</h2>
              <p className="text-sm text-gray-400">MP4 or WebM, max 50MB</p>
            </div>
          </div>

          <label className="relative block w-full aspect-video border-2 border-dashed border-gray-700 rounded-lg hover:border-purple-500 transition-colors cursor-pointer overflow-hidden">
            <input
              type="file"
              accept="video/mp4,video/webm"
              className="hidden"
              onChange={handleFileSelect}
              disabled={uploading}
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <CloudArrowUpIcon className="w-12 h-12 text-gray-500 mb-4" />
              <p className="text-gray-400 text-center">
                {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
              </p>
            </div>

            {uploading && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                <div 
                  className="h-full bg-purple-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </label>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p>By uploading, you agree to our Terms of Service</p>
        </div>
      </div>
    </div>
  );
}