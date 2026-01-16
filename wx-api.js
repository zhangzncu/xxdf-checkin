// 模拟微信小程序API
const wx = {
  // 本地存储 - 替代wx.setStorageSync
  setStorageSync: function(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('setStorageSync failed:', e);
      return false;
    }
  },
  
  // 本地存储获取 - 替代wx.getStorageSync
  getStorageSync: function(key) {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    } catch (e) {
      console.error('getStorageSync failed:', e);
      return null;
    }
  },
  
  // 提示框 - 替代wx.showToast
  showToast: function(options) {
    const title = options.title || '';
    const duration = options.duration || 1500;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = title;
    
    const style = document.createElement('style');
    style.id = 'toast-style';
    style.textContent = `
      .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        z-index: 9999;
        font-size: 14px;
      }
    `;
    
    if (!document.getElementById('toast-style')) {
      document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, duration);
  },
  
  // 确认框 - 替代wx.showModal
  showModal: function(options) {
    return new Promise((resolve) => {
      const confirmed = confirm(options.content || '');
      resolve({ confirm: confirmed });
    });
  },
  
  // 导航到页面
  navigateTo: function(options) {
    window.location.href = options.url;
  },
  
  // 切换Tab
  switchTab: function(options) {
    window.location.href = options.url;
  },
  
  // 返回上一页
  navigateBack: function() {
    window.history.back();
  }
};

window.wx = wx;
