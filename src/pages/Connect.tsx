import { useState } from 'react';
import { UserCircleIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export default function Connect() {
  const [activeTab, setActiveTab] = useState<'friends'|'communities'>('friends');

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      <div className="max-w-lg mx-auto p-4">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('friends')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'friends' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-800 text-gray-300'
            }`}
          >
            Friends
          </button>
          <button
            onClick={() => setActiveTab('communities')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'communities' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-800 text-gray-300'
            }`}
          >
            Communities
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === 'friends' ? (
            <div className="grid gap-4">
              {[1,2,3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-900 rounded-lg">
                  <UserCircleIcon className="w-12 h-12 text-gray-400" />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">User {i}</h3>
                    <p className="text-gray-400 text-sm">Online</p>
                  </div>
                  <button className="p-2 text-purple-500 hover:bg-purple-500/10 rounded-full">
                    <ChatBubbleLeftIcon className="w-6 h-6" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4">
              {[1,2,3].map((i) => (
                <div key={i} className="p-4 bg-gray-900 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Community {i}</h3>
                  <p className="text-gray-400 text-sm mb-4">A community for sharing and discussing...</p>
                  <button className="w-full py-2 px-4 bg-purple-500 text-white rounded-lg text-sm font-medium">
                    Join Community
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}