'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LogoutButton() {
  const router = useRouter();

  const emitLogoutEvent = () => {
    const event = new CustomEvent('user-logout');
    window.dispatchEvent(event);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        emitLogoutEvent();
        console.log('Logout event emitted');
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
    >
      <i className="fas fa-sign-out-alt mr-2"></i>
      Logout
    </button>
  );
}
