/**
 * Sistem Informasi Portal - Perumahan Sejahtera Desa Hajimena
 * Main JavaScript File
 * Berisi semua fungsi utama untuk aplikasi
 */

// ========== GLOBAL VARIABLES ==========
const APP_NAME = 'Portal Hajimena';
const APP_VERSION = '1.0.0';
const STORAGE_KEYS = {
    PORTALS: 'portals',
    ADMIN_SESSION: 'adminSession',
    ACTIVITY_LOGS: 'activityLogs',
    DARK_MODE: 'darkMode',
    REMEMBERED_USERNAME: 'rememberedUsername',
    CCTV_LINK: 'cctvLink'
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Inisialisasi aplikasi
 */
function initializeApp() {
    // Initialize dark mode
    initializeDarkMode();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize portals data
    initializePortalsData();
    
    // Initialize toast container
    initializeToastContainer();
    
    // Add keyboard shortcuts
    initializeKeyboardShortcuts();
    
    console.log(`${APP_NAME} v${APP_VERSION} initialized`);
}

// ========== DARK MODE FUNCTIONS ==========
/**
 * Inisialisasi dark mode
 */
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    // Load saved preference
    const isDarkMode = localStorage.getItem(STORAGE_KEYS.DARK_MODE) === 'true';
    setDarkMode(isDarkMode);
    
    // Add click handler
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

/**
 * Toggle dark mode
 */
function toggleDarkMode() {
    const html = document.documentElement;
    const isDarkMode = html.classList.contains('dark');
    setDarkMode(!isDarkMode);
}

/**
 * Set dark mode
 */
function setDarkMode(isDark) {
    const html = document.documentElement;
    const darkModeToggle = document.getElementById('darkModeToggle');
    const icon = darkModeToggle?.querySelector('i');
    
    if (isDark) {
        html.classList.add('dark');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    } else {
        html.classList.remove('dark');
        if (icon) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, isDark);
}

// ========== MOBILE MENU FUNCTIONS ==========
/**
 * Inisialisasi mobile menu
 */
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuToggle || !mobileMenu) return;
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Toggle icon
        const icon = mobileMenuToggle.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ========== PORTAL DATA FUNCTIONS ==========
/**
 * Inisialisasi data portal
 */
function initializePortalsData() {
    // Check if portals data exists
    if (!localStorage.getItem(STORAGE_KEYS.PORTALS)) {
        // Create default portals data
        const defaultPortals = [
            {
                id: 'portal-utama',
                name: 'Portal Utama',
                status: 'tutup',
                lastUpdated: new Date().toISOString(),
                updatedBy: 'System'
            },
            {
                id: 'portal-belakang-1',
                name: 'Portal Belakang 1',
                status: 'tutup',
                lastUpdated: new Date().toISOString(),
                updatedBy: 'System'
            },
            {
                id: 'portal-belakang-2',
                name: 'Portal Belakang 2',
                status: 'tutup',
                lastUpdated: new Date().toISOString(),
                updatedBy: 'System'
            },
            {
                id: 'portal-belakang-3',
                name: 'Portal Belakang 3',
                status: 'tutup',
                lastUpdated: new Date().toISOString(),
                updatedBy: 'System'
            }
        ];
        
        localStorage.setItem(STORAGE_KEYS.PORTALS, JSON.stringify(defaultPortals));
    }
    
    // Initialize activity logs
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS)) {
        localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify([]));
    }
}

/**
 * Get portals data
 */
function getPortals() {
    const portalsData = localStorage.getItem(STORAGE_KEYS.PORTALS);
    return portalsData ? JSON.parse(portalsData) : [];
}

/**
 * Update portal status
 */
function updatePortalStatus(portalId, newStatus, updatedBy = 'System') {
    const portals = getPortals();
    const portalIndex = portals.findIndex(p => p.id === portalId);
    
    if (portalIndex !== -1) {
        const oldStatus = portals[portalIndex].status;
        portals[portalIndex].status = newStatus;
        portals[portalIndex].lastUpdated = new Date().toISOString();
        portals[portalIndex].updatedBy = updatedBy;
        
        localStorage.setItem(STORAGE_KEYS.PORTALS, JSON.stringify(portals));
        
        // Add to activity log
        addActivityLog(portals[portalIndex].name, oldStatus, newStatus, updatedBy);
        
        return true;
    }
    
    return false;
}

// ========== AUTHENTICATION FUNCTIONS ==========
/**
 * Check if user is logged in
 */
function isLoggedIn() {
    const session = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
    if (!session) return false;
    
    const sessionData = JSON.parse(session);
    
    // Check if session is not expired (24 hours)
    const loginTime = new Date(sessionData.loginTime);
    const now = new Date();
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
        return false;
    }
    
    return true;
}

/**
 * Get current admin session
 */
function getCurrentAdmin() {
    if (!isLoggedIn()) return null;
    
    const session = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
    return JSON.parse(session);
}

/**
 * Logout admin
 */
function logout() {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    showToast('Logout berhasil!', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// ========== ACTIVITY LOG FUNCTIONS ==========
/**
 * Add activity log
 */
function addActivityLog(portalName, oldStatus, newStatus, adminName) {
    const logs = getActivityLogs();
    
    const newLog = {
        id: Date.now().toString(),
        portalName: portalName,
        oldStatus: oldStatus,
        newStatus: newStatus,
        admin: adminName,
        timestamp: new Date().toISOString(),
        action: `${portalName} diubah dari ${oldStatus === 'buka' ? 'Dibuka' : 'Ditutup'} menjadi ${newStatus === 'buka' ? 'Dibuka' : 'Ditutup'}`
    };
    
    logs.unshift(newLog);
    
    // Keep only last 100 logs
    if (logs.length > 100) {
        logs.splice(100);
    }
    
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(logs));
}

/**
 * Get activity logs
 */
function getActivityLogs() {
    const logsData = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS);
    return logsData ? JSON.parse(logsData) : [];
}

// ========== TOAST NOTIFICATION FUNCTIONS ==========
/**
 * Initialize toast container
 */
function initializeToastContainer() {
    if (!document.getElementById('toastContainer')) {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'fixed top-20 right-4 z-50 space-y-2';
        document.body.appendChild(container);
    }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    const toastId = 'toast-' + Date.now();
    toast.id = toastId;
    
    // Set toast classes based on type
    const baseClasses = 'toast-notification flex items-center p-4 rounded-lg shadow-lg min-w-[300px] max-w-md';
    let typeClasses = '';
    let icon = '';
    
    switch (type) {
        case 'success':
            typeClasses = 'bg-green-500 text-white';
            icon = 'fa-check-circle';
            break;
        case 'error':
            typeClasses = 'bg-red-500 text-white';
            icon = 'fa-exclamation-circle';
            break;
        case 'warning':
            typeClasses = 'bg-yellow-500 text-white';
            icon = 'fa-exclamation-triangle';
            break;
        case 'info':
        default:
            typeClasses = 'bg-blue-500 text-white';
            icon = 'fa-info-circle';
            break;
    }
    
    toast.className = `${baseClasses} ${typeClasses}`;
    toast.innerHTML = `
        <i class="fas ${icon} mr-3 text-xl"></i>
        <div class="flex-1">
            <p class="font-medium">${message}</p>
        </div>
        <button onclick="removeToast('${toastId}')" class="ml-3 hover:opacity-75 transition-opacity">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        removeToast(toastId);
    }, duration);
}

/**
 * Remove toast notification
 */
function removeToast(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

// ========== LOADING FUNCTIONS ==========
/**
 * Show loading spinner
 */
function showLoading(message = 'Memuat...') {
    let spinner = document.getElementById('loadingSpinner');
    
    if (!spinner) {
        spinner = document.createElement('div');
        spinner.id = 'loadingSpinner';
        spinner.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 loading-overlay';
        spinner.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p class="mt-4 text-gray-700 dark:text-gray-300">${message}</p>
            </div>
        `;
        document.body.appendChild(spinner);
    } else {
        const messageElement = spinner.querySelector('p');
        if (messageElement) {
            messageElement.textContent = message;
        }
    }
    
    spinner.classList.remove('hidden');
}

/**
 * Hide loading spinner
 */
function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        spinner.classList.add('hidden');
    }
}

// ========== UTILITY FUNCTIONS ==========
/**
 * Format last updated time
 */
function formatLastUpdated(timestamp) {
    if (!timestamp) return 'Tidak tersedia';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) {
        return 'Baru saja';
    } else if (diffMins < 60) {
        return `${diffMins} menit yang lalu`;
    } else if (diffHours < 24) {
        return `${diffHours} jam yang lalu`;
    } else if (diffDays < 7) {
        return `${diffDays} hari yang lalu`;
    } else {
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

/**
 * Format date time
 */
function formatDateTime(timestamp) {
    if (!timestamp) return '-';
    
    const date = new Date(timestamp);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Generate random ID
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Teks berhasil disalin!', 'success');
    } catch (err) {
        console.error('Failed to copy text: ', err);
        showToast('Gagal menyalin teks', 'error');
    }
}

// ========== KEYBOARD SHORTCUTS ==========
/**
 * Initialize keyboard shortcuts
 */
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Ctrl/Cmd + D: Toggle dark mode
        if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
            event.preventDefault();
            toggleDarkMode();
        }
        
        // Ctrl/Cmd + K: Focus search (if search exists)
        if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
            event.preventDefault();
            const searchInput = document.querySelector('input[type="search"], input[placeholder*="cari"], input[placeholder*="search"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape: Close modals and mobile menu
        if (event.key === 'Escape') {
            // Close modals
            const modals = document.querySelectorAll('.fixed.inset-0');
            modals.forEach(modal => {
                if (!modal.classList.contains('hidden')) {
                    modal.classList.add('hidden');
                }
            });
            
            // Close mobile menu
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const mobileMenuToggle = document.getElementById('mobileMenuToggle');
                const icon = mobileMenuToggle?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
}

// ========== ERROR HANDLING ==========
/**
 * Global error handler
 */
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    showToast('Terjadi kesalahan. Silakan coba lagi.', 'error');
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    showToast('Terjadi kesalahan. Silakan coba lagi.', 'error');
});

// ========== PERFORMANCE MONITORING ==========
/**
 * Simple performance monitoring
 */
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            console.log(`Page load time: ${loadTime}ms`);
        });
    }
}

// Initialize performance monitoring
logPerformance();

// ========== CCTV FUNCTIONS ==========
/**
 * Get CCTV link
 */
function getCCTVLink() {
    const link = localStorage.getItem(STORAGE_KEYS.CCTV_LINK);
    return link || 'https://www.youtube.com/embed/4YeEfMuq8Iw'; // Default link
}

/**
 * Set CCTV link
 */
function setCCTVLink(link) {
    localStorage.setItem(STORAGE_KEYS.CCTV_LINK, link);
    return true;
}

/**
 * Validate YouTube embed URL
 */
function isValidYouTubeEmbedUrl(url) {
    const youtubeRegex = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+(\?.*)?$/;
    return youtubeRegex.test(url);
}

// ========== EXPORT FUNCTIONS FOR GLOBAL USE ==========
// Make functions globally available
window.showToast = showToast;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.formatLastUpdated = formatLastUpdated;
window.formatDateTime = formatDateTime;
window.isLoggedIn = isLoggedIn;
window.getCurrentAdmin = getCurrentAdmin;
window.logout = logout;
window.getPortals = getPortals;
window.updatePortalStatus = updatePortalStatus;
window.addActivityLog = addActivityLog;
window.getActivityLogs = getActivityLogs;
window.copyToClipboard = copyToClipboard;
window.toggleDarkMode = toggleDarkMode;
window.removeToast = removeToast;
window.getCCTVLink = getCCTVLink;
window.setCCTVLink = setCCTVLink;
window.isValidYouTubeEmbedUrl = isValidYouTubeEmbedUrl;
