// Internationalization (i18n) module for SquirreList
const i18n = {
    currentLang: 'en',
    translations: {},

    async init() {
        // Priority: 1. URL query param, 2. Saved preference, 3. Browser language
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        const savedLang = localStorage.getItem('squirrelist-lang');
        const browserLang = navigator.language.slice(0, 2);

        // Validate and set language
        if (urlLang === 'vi' || urlLang === 'en') {
            this.currentLang = urlLang;
            localStorage.setItem('squirrelist-lang', urlLang);
        } else if (savedLang) {
            this.currentLang = savedLang;
        } else {
            this.currentLang = browserLang === 'vi' ? 'vi' : 'en';
        }

        await this.loadTranslations(this.currentLang);
        this.updateContent();
        this.updateLangSwitcher();
    },

    async loadTranslations(lang) {
        try {
            const response = await fetch(`locales/${lang}.json`);
            this.translations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
            // Fallback to English
            if (lang !== 'en') {
                await this.loadTranslations('en');
            }
        }
    },

    async setLanguage(lang) {
        if (lang === this.currentLang) return;

        this.currentLang = lang;
        localStorage.setItem('squirrelist-lang', lang);
        await this.loadTranslations(lang);
        this.updateContent();
        this.updateLangSwitcher();

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    },

    getText(key) {
        const keys = key.split('.');
        let value = this.translations;
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    },

    updateContent() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = this.getText(key);
            if (text) {
                el.textContent = text;
            }
        });

        // Update elements with data-i18n-placeholder attribute
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const text = this.getText(key);
            if (text) {
                el.placeholder = text;
            }
        });
    },

    updateLangSwitcher() {
        const switcher = document.getElementById('langSwitcher');
        if (switcher) {
            switcher.value = this.currentLang;
        }

        // Update active state for button switchers
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });
    }
};

// Initialize i18n when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
});
