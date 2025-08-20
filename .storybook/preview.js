import './global.css';

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

// Comprehensive ResizeObserver error suppression
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Override console methods to filter ResizeObserver errors
const originalError = console.error;
const originalWarn = console.warn;

console.error = (...args) => {
  if (args[0] && typeof args[0] === 'string') {
    const message = args[0].toLowerCase();
    if (message.includes('resizeobserver') ||
        message.includes('loop completed') ||
        message.includes('undelivered notifications')) {
      return;
    }
  }
  originalError.apply(console, args);
};

console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string') {
    const message = args[0].toLowerCase();
    if (message.includes('resizeobserver') ||
        message.includes('loop completed') ||
        message.includes('undelivered notifications')) {
      return;
    }
  }
  originalWarn.apply(console, args);
};

// Global error handler for uncaught ResizeObserver errors
window.addEventListener('error', (e) => {
  if (e.message && e.message.toLowerCase().includes('resizeobserver')) {
    e.preventDefault();
    return false;
  }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
  if (e.reason && e.reason.toString().toLowerCase().includes('resizeobserver')) {
    e.preventDefault();
    return false;
  }
});

export default preview;
