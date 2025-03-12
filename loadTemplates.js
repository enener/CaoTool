const SUPPORTED_LANGS = ['en', 'zh', 'ja'];
let currentTranslations = {};

async function loadLanguage(lang) {
  try {
    const module = await import(`./locales/${lang}.js`);
    currentTranslations = module.default;
  } catch {
    const zhModule = await import('./locales/zh.js');
    currentTranslations = zhModule.default;
  }
}

async function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = 'en';
  
  await loadLanguage(lang);
  document.documentElement.lang = lang;
  
  // 更新模板内容
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const keys = el.dataset.i18n.split('.');
    let value = currentTranslations;
    keys.forEach(key => value = value?.[key]);
    el.textContent = value || el.dataset.default;
  });

  window.dispatchEvent(new CustomEvent('languageChanged'));
  localStorage.setItem('appLang', lang);
}

// 初始化语言
async function initLanguage() {
  const savedLang = localStorage.getItem('appLang');
  const browserLang = navigator.language.split('-')[0];
  const initLang = SUPPORTED_LANGS.includes(savedLang) ? savedLang : 
                  SUPPORTED_LANGS.includes(browserLang) ? browserLang : 'en';
  await setLanguage(initLang);
}

// 加载公共模板
function loadTemplates() {
  fetch('header.html').then(r => r.text()).then(html => {
    document.getElementById('header-container').innerHTML = html;
    // 初始化语言选择器
    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
      langSelect.value = localStorage.getItem('appLang') || 'en';
      langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
    }
  });

  fetch('footer.html').then(r => r.text()).then(html => {
    document.getElementById('footer-container').innerHTML = html;
  });
}

// 启动初始化
document.addEventListener('DOMContentLoaded', () => {
  loadTemplates();
  initLanguage();
});