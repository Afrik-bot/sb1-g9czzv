import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  UserCircleIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon,
  ArrowRightOnRectangleIcon,
  CogIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const menuItems = [
    { icon: UserCircleIcon, label: 'Edit Profile', action: () => {} },
    { icon: ShieldCheckIcon, label: 'Privacy Settings', action: () => {} },
    { icon: BellIcon, label: 'Notifications', action: () => {} },
    { icon: GlobeAltIcon, label: 'Language', action: () => {} },
    { icon: CogIcon, label: 'Account Settings', action: () => {} },
    { icon: ArrowRightOnRectangleIcon, label: 'Log Out', action: handleLogout, danger: true },
  ];

  return (
    <div className="min-h-screen bg-gray-950 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-500/20 to-gray-950 pt-10 pb-6 px-4">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {currentUser?.email?.[0].toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {currentUser?.email?.split('@')[0] || 'User'}
              </h2>
              <p className="text-gray-400 text-sm">{currentUser?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-white">0</div>
              <div className="text-sm text-gray-400">Following</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">0</div>
              <div className="text-sm text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white">0</div>
              <div className="text-sm text-gray-400">Likes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-xl mx-auto px-4 pt-6">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`w-full p-4 rounded-xl flex items-center gap-3 transition-colors ${
                item.danger 
                  ? 'text-red-500 hover:bg-red-500/10' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="flex-1 text-left">{item.label}</span>
              <span className="text-gray-600">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}