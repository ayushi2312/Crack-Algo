import React, { useState } from 'react';
import { Bell, X, Trophy, Users, Zap, Star } from 'lucide-react';

interface Notification {
  id: number;
  type: 'challenge' | 'xp' | 'achievement' | 'friend' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  action?: string;
}

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'challenge',
      title: 'New Challenge Invite',
      message: 'AlgoQueen has challenged you to a DSA battle!',
      time: '2 min ago',
      isRead: false,
      action: 'Accept'
    },
    {
      id: 2,
      type: 'xp',
      title: 'XP Earned!',
      message: 'You earned 150 XP for completing "Array Basics"',
      time: '5 min ago',
      isRead: false
    },
    {
      id: 3,
      type: 'achievement',
      title: 'New Badge Unlocked!',
      message: 'Congratulations! You earned the "First Solve" badge',
      time: '10 min ago',
      isRead: true
    },
    {
      id: 4,
      type: 'friend',
      title: 'Friend Request',
      message: 'BinaryBeast wants to be your friend',
      time: '15 min ago',
      isRead: false,
      action: 'Accept'
    },
    {
      id: 5,
      type: 'system',
      title: 'Daily Streak',
      message: 'Keep it up! You\'re on a 5-day solving streak',
      time: '1 hour ago',
      isRead: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'challenge':
        return <Trophy className="w-5 h-5 text-purple-400" />;
      case 'xp':
        return <Star className="w-5 h-5 text-yellow-400" />;
      case 'achievement':
        return <Trophy className="w-5 h-5 text-gold" />;
      case 'friend':
        return <Users className="w-5 h-5 text-blue-400" />;
      case 'system':
        return <Zap className="w-5 h-5 text-green-400" />;
      default:
        return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'challenge':
        return 'border-l-purple-500 bg-purple-50';
      case 'xp':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'achievement':
        return 'border-l-gold bg-yellow-50';
      case 'friend':
        return 'border-l-blue-500 bg-blue-50';
      case 'system':
        return 'border-l-green-500 bg-green-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6" />
              <h2 className="text-xl font-bold">Notifications</h2>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="mt-3 text-sm text-purple-200 hover:text-white transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No notifications yet</p>
              <p className="text-sm">We'll notify you about challenges, achievements, and more!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-l-4 transition-all duration-200 hover:bg-gray-50 ${
                    getNotificationColor(notification.type)
                  } ${!notification.isRead ? 'bg-opacity-80' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-semibold ${
                          !notification.isRead ? 'text-gray-900' : 'text-gray-600'
                        }`}>
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">
                          {notification.time}
                        </span>
                        
                        {notification.action && (
                          <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors">
                            {notification.action}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{notifications.length} total notifications</span>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              View All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications; 