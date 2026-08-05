/* ===================================
   GMAIL CLONE — APPLICATION LOGIC
   =================================== */

// ============================================
//  DATA: Mock Emails
// ============================================
const AVATAR_COLORS = [
    '#E53935', '#D81B60', '#8E24AA', '#5E35B1',
    '#1E88E5', '#039BE5', '#00ACC1', '#00897B',
    '#43A047', '#7CB342', '#F4511E', '#F6BF26',
    '#C0392B', '#2980B9', '#27AE60', '#8E44AD',
];

const LABEL_COLORS = {
    work: { bg: '#d3e3fd', text: '#1a73e8' },
    personal: { bg: '#ceead6', text: '#188038' },
    finance: { bg: '#fef7e0', text: '#b06000' },
    travel: { bg: '#fce8e6', text: '#c5221f' },
};

function randomAvatarColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// Reference image emails (All inboxes view)
const emails = [
    {
        id: 1, folder: 'inbox', tab: 'primary',
        sender: 'Hostinger',
        senderCount: null,
        email: 'noreply@hostinger.com',
        subject: 'Your Starter Business Email pla…',
        fullSubject: 'Your Starter Business Email plan is ready',
        snippet: 'Act now',
        body: `<p>Your Starter Business Email plan is waiting for you. Act now to get started with professional email hosting from Hostinger.</p>`,
        date: '5 Aug',
        fullDate: 'Aug 5, 2026, 11:17 AM',
        unread: true, starred: false, important: false,
        labels: [], hasAttachment: false,
        avatarType: 'hostinger',
    },
    {
        id: 3, folder: 'inbox', tab: 'primary',
        sender: 'ant.wilson',
        senderCount: null,
        email: 'ant.wilson@supabase.com',
        subject: 'Your Supabase Project mindexis i…',
        fullSubject: 'Your Supabase Project mindexis is using excess resources',
        snippet: 'Hi there, To save on cloud resour…',
        body: `<p>Hi there,</p><p>To save on cloud resources, we recommend upgrading your Supabase project mindexis. This will help optimize performance and reduce costs significantly.</p>`,
        date: '4 Aug',
        fullDate: 'Aug 4, 2026, 10:33 AM',
        unread: false, starred: false, important: false,
        labels: [], hasAttachment: false,
        avatarType: 'default',
    },
    {
        id: 2, folder: 'inbox', tab: 'updates',
        sender: 'Updates',
        senderCount: null,
        email: '',
        subject: 'HighLevel — Haven\'t signe…',
        snippet: 'HighLevel and other service updates',
        body: '',
        date: '',
        fullDate: '',
        unread: true, starred: false, important: false,
        labels: [], hasAttachment: false,
        avatarType: 'updates',
        isCategory: true,
        badgeCount: '41 new',
        badgeColor: 'orange',
    },
    {
        id: 5, folder: 'inbox', tab: 'promotions',
        sender: 'Promotions',
        senderCount: null,
        email: '',
        subject: 'Oracle Cloud — Learn how …',
        snippet: 'Oracle Cloud and other promotions',
        body: '',
        date: '',
        fullDate: '',
        unread: true, starred: false, important: false,
        labels: [], hasAttachment: false,
        avatarType: 'promotions',
        isCategory: true,
        badgeCount: '2 new',
        badgeColor: 'green',
    },
    {
        id: 8, folder: 'inbox', tab: 'primary',
        sender: 'invoicing@aws.com',
        senderCount: null,
        email: 'invoicing@aws.com',
        subject: 'Amazon Web Services GST Invoic…',
        fullSubject: 'Amazon Web Services GST Invoice for July 2026',
        snippet: 'AWS logo Greetings from Amazon…',
        body: `<p>Greetings from Amazon Web Services. Please find your GST invoice attached for this billing period.</p>`,
        date: '2 Aug',
        fullDate: 'Aug 2, 2026, 10:30 AM',
        unread: true, starred: false, important: false,
        labels: [], hasAttachment: true,
        avatarType: 'default',
    },
    {
        id: 9, folder: 'inbox', tab: 'primary',
        sender: 'Bitget',
        senderCount: null,
        email: 'noreply@bitget.com',
        subject: 'Bitget CFD Weekly: How to Trade…',
        fullSubject: 'Bitget CFD Weekly: How to Trade Market Volatility',
        snippet: 'Dear Bitget users: This week\'s un…',
        body: `<p>Dear Bitget users,</p><p>This week's update brings exciting new trading features and market insights for CFD traders.</p>`,
        date: '1 Aug',
        fullDate: 'Aug 1, 2026, 9:15 AM',
        unread: false, starred: false, important: false,
        labels: [], hasAttachment: false,
        avatarType: 'default',
    },
    {
        id: 6, folder: 'inbox', tab: 'primary',
        sender: 'Meta for Business',
        senderCount: null,
        email: 'business@meta.com',
        subject: 'Verification successful for ETERNI…',
        fullSubject: 'Verification successful for ETERNITY TRADING COMPANY',
        snippet: 'ETERNITY TRADING COMPANY P…',
        body: `<p>Verification successful for ETERNITY TRADING COMPANY. Your business has been verified on Meta.</p>`,
        date: '25 Jul',
        fullDate: 'Jul 25, 2026, 12:29 PM',
        unread: false, starred: false, important: false,
        labels: [], hasAttachment: false,
        avatarType: 'facebook',
    },
    {
        id: 10, folder: 'sent', tab: 'primary',
        sender: 'Me',
        senderCount: null,
        email: 'user@gmail.com',
        subject: 'Re: Project Update',
        snippet: 'Thanks for the update, will review...',
        body: `<p>Thanks for the update, will review and get back to you.</p>`,
        date: '30 Jul',
        fullDate: 'Jul 30, 2026, 9:45 AM',
        unread: false, starred: false, important: false,
        labels: [], hasAttachment: false,
        avatarType: 'default',
    },
    {
        id: 11, folder: 'starred', tab: 'primary',
        sender: 'Hostinger',
        senderCount: null,
        email: 'noreply@hostinger.com',
        subject: 'Your domain is expiring soon',
        snippet: 'Renew now to keep your domain active...',
        body: `<p>Your domain is expiring soon. Renew now to keep your domain active.</p>`,
        date: '24 Jul',
        fullDate: 'Jul 24, 2026, 3:45 PM',
        unread: false, starred: true, important: false,
        labels: [], hasAttachment: false,
        avatarType: 'hostinger',
    },
    {
        id: 12, folder: 'drafts', tab: 'primary',
        sender: 'Draft',
        senderCount: null,
        email: '',
        subject: 'Follow up on project proposal',
        snippet: 'Hi, I wanted to follow up on...',
        body: `<p>Hi, I wanted to follow up on the project proposal we discussed.</p>`,
        date: '22 Jul',
        fullDate: 'Jul 22, 2026, 7:00 PM',
        unread: false, starred: false, important: false,
        labels: [], hasAttachment: false,
        avatarType: 'default',
    },
];

// ============================================
//  ACCOUNTS (From field)
// ============================================
const accounts = [
    { name: 'Mindset', email: 'mindsettt369@gmail.com', photo: null, verified: false }
];
let activeAccountIndex = 0;

// ============================================
//  STATE
// ============================================
const state = {
    currentFolder: 'inbox',
    currentTab: 'primary',
    sidebarCollapsed: false,
    sidebarMobileOpen: false,
    composeOpen: false,
    composeMinimized: false,
    composeFullscreen: false,
    selectedEmails: new Set(),
    viewingEmail: null,
    moreNavOpen: false,
    searchQuery: '',
    // Compose advanced state
    _srPendingAction: null,    // 'send' | 'receive'
    _srPendingDateTime: null,  // { date, time } or null
    _toContact: { name: '', email: '' },
};

// ============================================
//  DOM REFERENCES
// ============================================
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {
    hamburgerBtn: $('#hamburger-btn'),
    sidebar: $('#sidebar'),
    navList: $('#nav-list'),
    navMore: $('#nav-more-toggle'),
    navMoreItems: $('#nav-more-items'),
    composeBtn: $('#compose-btn'),
    composeModal: $('#compose-modal'),
    composeMinimizeBtn: $('#compose-minimize-btn'),
    composeFullscreenBtn: $('#compose-fullscreen-btn'),
    composeCloseBtn: $('#compose-close-btn'),
    composeHeader: $('#compose-header'),
    composeTo: $('#compose-to'),
    composeSubject: $('#compose-subject'),
    composeEditor: $('#compose-editor'),
    composeCcToggle: $('#compose-cc-toggle'),
    composeBccToggle: $('#compose-bcc-toggle'),
    composeCcField: $('#compose-cc-field'),
    composeBccField: $('#compose-bcc-field'),
    sendBtn: $('#send-btn'),
    composeDeleteBtn: $('#compose-delete-btn'),
    tabBar: $('#tab-bar'),
    emailList: $('#email-list'),
    emailDetail: $('#email-detail'),
    emailDetailBody: $('#email-detail-body'),
    backToListBtn: $('#back-to-list-btn'),
    toolbar: $('#toolbar'),
    selectAllCheckbox: $('#select-all-checkbox'),
    refreshBtn: $('#refresh-btn'),
    searchInput: $('#search-input'),
    toast: $('#toast'),
    toastMessage: $('#toast-message'),
    toastAction: $('#toast-action'),
    inboxCount: $('#inbox-count'),
    paginationInfo: $('#pagination-info'),
    mainContent: $('#main-content'),
    mainLayout: $('#main-layout'),
    mainHeader: $('#main-header'),
    mobileBottomNav: $('#mobile-bottom-nav'),
};

// ============================================
//  HELPERS
// ============================================
function showToast(message, hasUndo = false) {
    dom.toastMessage.textContent = message;
    dom.toastAction.classList.toggle('hidden', !hasUndo);
    dom.toast.classList.remove('hidden');
    dom.toast.style.animation = 'none';
    requestAnimationFrame(() => {
        dom.toast.style.animation = '';
    });
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => dom.toast.classList.add('hidden'), 4000);
}

function getFilteredEmails() {
    let filtered = emails.filter(e => !e._deleted);

    // Search filter
    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        filtered = filtered.filter(e =>
            e.sender.toLowerCase().includes(q) ||
            e.subject.toLowerCase().includes(q) ||
            e.snippet.toLowerCase().includes(q)
        );
        return filtered;
    }

    // Folder filter
    if (state.currentFolder === 'starred') {
        return filtered.filter(e => e.starred);
    }
    if (state.currentFolder === 'important') {
        return filtered.filter(e => e.important);
    }
    if (state.currentFolder === 'all') {
        return filtered;
    }
    if (state.currentFolder === 'spam' || state.currentFolder === 'trash') {
        return filtered.filter(e => e.folder === state.currentFolder);
    }

    filtered = filtered.filter(e => e.folder === state.currentFolder);

    // Tab filter (only for inbox)
    if (state.currentFolder === 'inbox') {
        filtered = filtered.filter(e => e.tab === state.currentTab);
    }

    return filtered;
}

function updateCounts() {
    const unreadInbox = emails.filter(e => e.folder === 'inbox' && e.unread && !e._deleted).length;
    dom.inboxCount.textContent = unreadInbox || '';
    const draftsCount = emails.filter(e => e.folder === 'drafts' && !e._deleted).length;
    const draftCountEl = $('#drafts-count');
    if (draftCountEl) draftCountEl.textContent = draftsCount || '';

    // Update document title
    document.title = unreadInbox > 0 ? `Inbox (${unreadInbox}) - Gmail Clone` : 'Inbox - Gmail Clone';
}

// ============================================
//  RENDER: Avatar HTML
// ============================================
function renderAvatarHTML(email, isMobile = false, isDetail = false) {
    const size = isDetail ? 64 : (isMobile ? 52 : 40);
    
    if (email.avatarType === 'wati') {
        return `<div class="mobile-avatar" style="background:#25d366; width:${size}px; height:${size}px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5V7.5L16 12L10 16.5Z" fill="white"/>
            </svg>
        </div>`;
    }
    if (email.avatarType === 'facebook') {
        return `<div class="mobile-avatar" style="background:#1877F2; width:${size}px; height:${size}px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; overflow:hidden;">
            <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
        </div>`;
    }
    if (email.avatarType === 'hostinger') {
        // Hostinger brand mark: white circle with violet "H" (slanted crossbar)
        return `<div class="mobile-avatar" style="background:#ffffff; width:${size}px; height:${size}px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; overflow:hidden;">
            <svg width="${Math.round(size * 0.62)}" height="${Math.round(size * 0.62)}" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                <path fill="#673DE6" d="M4 4h5v8.6l8-2.6V4h5v18h-5v-8.6l-8 2.6V22H4z"/>
            </svg>
        </div>`;
    }
    if (email.avatarType === 'updates') {
        return `<div class="mobile-avatar" style="background:transparent; width:${size}px; height:${size}px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <span class="material-icons-outlined" style="font-size:30px; color:#e37400;">info</span>
        </div>`;
    }
    if (email.avatarType === 'initial') {
        const initial = email.sender.charAt(0).toUpperCase();
        const bg = email.avatarColor || randomAvatarColor(email.sender);
        return `<div class="mobile-avatar" style="background:${bg}; width:${size}px; height:${size}px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:white; font-size:${Math.round(size * 0.45)}px; font-weight:600; font-family:var(--font-main);">
            ${initial}
        </div>`;
    }
    if (email.avatarType === 'photo' && email.avatarPhoto) {
        return `<div class="mobile-avatar" style="width:${size}px; height:${size}px; border-radius:50%; overflow:hidden; flex-shrink:0;">
            <img src="${email.avatarPhoto}" style="width:100%; height:100%; object-fit:cover;" alt="${email.sender}">
        </div>`;
    }
    if (email.avatarType === 'promotions') {
        return `<div class="mobile-avatar" style="background:transparent; width:${size}px; height:${size}px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <span class="material-icons-outlined" style="font-size:30px; color:#1e8e3e;">local_offer</span>
        </div>`;
    }
    if (email.avatarType === 'social') {
        return `<div class="mobile-avatar" style="background:transparent; width:${size}px; height:${size}px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <span class="material-icons-outlined" style="font-size:24px; color:var(--text-secondary);">people</span>
        </div>`;
    }
    if (email.avatarType === 'default') {
        // Gmail-style: grey circle, person silhouette anchored to bottom
        return `<div class="mobile-avatar" style="background:#5f6368; width:${size}px; height:${size}px; border-radius:50%; display:flex; align-items:flex-end; justify-content:center; flex-shrink:0; overflow:hidden;">
            <svg width="${Math.round(size * 0.78)}" height="${Math.round(size * 0.78)}" viewBox="0 0 24 24" fill="#bdc1c6" style="margin-bottom:-2px;">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
            </svg>
        </div>`;
    }
    // Fallback — colored initial
    const avatarColor = randomAvatarColor(email.sender);
    const initial = email.sender.charAt(0).toUpperCase();
    return `<div class="mobile-avatar" style="background:${avatarColor}; width:${size}px; height:${size}px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:white; font-size:${Math.round(size * 0.44)}px; font-weight:500; font-family:var(--font-main); line-height:1;">
        ${initial}
    </div>`;
}

// ============================================
//  RENDER: Email List
// ============================================
function renderEmailList() {
    const isMobile = window.innerWidth <= 600;
    const filtered = getFilteredEmails();
    dom.paginationInfo.textContent = filtered.length > 0 ? `1–${filtered.length} of ${filtered.length}` : 'No conversations';

    if (filtered.length === 0) {
        dom.emailList.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:60vh;padding-top:10vh;color:var(--text-tertiary);gap:16px;">
                <span class="material-icons-outlined" style="font-size:80px;color:var(--text-tertiary);">markunread_mailbox</span>
                <div style="font-family:var(--font-main);font-size:18px;color:var(--text-primary);font-weight:400;">Nothing here yet</div>
                <div style="font-size:15px;color:var(--text-secondary);">Emails for this view will show up here</div>
            </div>
        `;
        return;
    }

    if (isMobile) {
        renderMobileEmailList(filtered);
    } else {
        renderDesktopEmailList(filtered);
    }
}

function renderMobileEmailList(filtered) {
    // Non-inbox views: just show filtered list
    if (state.currentFolder !== 'inbox') {
        let html = '';
        filtered.filter(e => !e.isCategory).forEach((email, i) => {
            html += renderMobileEmailRow(email, i);
        });
        dom.emailList.innerHTML = html;
        return;
    }

    const allInboxEmails = emails.filter(e => !e._deleted && e.folder === 'inbox');
    const primaryEmails = allInboxEmails.filter(e => !e.isCategory && e.tab === 'primary');
    const categories = allInboxEmails.filter(e => e.isCategory);

    let html = '';

    // "Primary" section label
    html += `<div style="padding:20px 20px 10px 20px; font-size:17px; color:var(--text-primary); font-weight:400; letter-spacing:0.2px;">Primary</div>`;

    // First 2 primary emails (most recent)
    const firstTwo = primaryEmails.slice(0, 2);
    const restPrimary = primaryEmails.slice(2);

    firstTwo.forEach((email, i) => {
        html += renderMobileEmailRow(email, i);
    });

    // Category rows (Updates, Promotions)
    categories.forEach(cat => {
        html += renderMobileCategoryRow(cat);
    });

    // Remaining primary emails
    restPrimary.forEach((email, i) => {
        html += renderMobileEmailRow(email, i + 2);
    });

    dom.emailList.innerHTML = html;
}

function renderMobileCategoryRow(email) {
    let iconHtml, badgeStyle;
    if (email.avatarType === 'updates') {
        iconHtml = `<span class="material-icons-outlined" style="font-size:28px; color:#e37400;">info</span>`;
        badgeStyle = 'background:#f0a878; color:#1a1210;';
    } else if (email.avatarType === 'promotions') {
        iconHtml = `<span class="material-icons-outlined" style="font-size:28px; color:#1e8e3e;">local_offer</span>`;
        badgeStyle = 'background:#a8dcb8; color:#0d2b14;';
    } else {
        iconHtml = `<span class="material-icons-outlined" style="font-size:28px; color:var(--text-secondary);">people</span>`;
        badgeStyle = email.badgeColor === 'orange' ? 'background:#e37400; color:#fff;' : 'background:#1a73e8; color:#fff;';
    }

    return `
    <div class="email-row mobile-category-row" data-email-id="${email.id}" style="animation-delay:0s">
        <div class="mobile-avatar" style="background:transparent; width:52px; height:52px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            ${iconHtml}
        </div>
        <div style="flex:1; min-width:0; margin-left:18px;">
            <div style="font-size:18px; font-weight:700; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; line-height:24px;">${email.sender}</div>
            <div style="font-size:16px; font-weight:700; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:3px; line-height:22px;">${email.subject}</div>
        </div>
        <div style="flex-shrink:0; margin-left:10px;">
            <span style="display:inline-block; padding:5px 12px; border-radius:20px; font-size:14px; font-weight:600; ${badgeStyle}">${email.badgeCount}</span>
        </div>
    </div>`;
}

function renderMobileEmailRow(email, i) {
    const avatarHtml = renderAvatarHTML(email, true);
    const isUnread = email.unread;
    const senderDisplay = email.senderCount
        ? `${email.sender} ${email.senderCount}`
        : email.sender;

    return `
    <div class="email-row ${isUnread ? 'unread' : 'read'}" data-email-id="${email.id}" style="animation-delay:${i * 0.02}s">
        ${avatarHtml}
        <div class="email-sender" style="grid-area:sender;">
            ${senderDisplay}
        </div>
        <div class="email-date" style="grid-area:date;">
            ${email.date ? `${email.date}${isUnread ? ' <span style="color:#ebd1b7; font-size:10px; margin-left:5px; vertical-align:middle;">●</span>' : ''}` : ''}
        </div>
        <div class="email-content" style="grid-area:content;">
            <span class="email-subject">${email.subject}</span>
            <span class="email-snippet">${email.snippet}</span>
        </div>
        <div class="mobile-star ${email.starred ? 'starred' : ''}" data-star-id="${email.id}" onclick="event.stopPropagation()" style="grid-area:star; align-self:flex-end; margin-top:10px;">
            <span class="${email.starred ? 'material-icons' : 'material-icons-outlined'}" style="font-size:26px; color:${email.starred ? '#f9ab00' : 'var(--text-tertiary)'};">
                ${email.starred ? 'star' : 'star_border'}
            </span>
        </div>
    </div>`;
}

function renderDesktopEmailList(filtered) {
    dom.emailList.innerHTML = filtered.map((email, i) => {
        const avatarColor = randomAvatarColor(email.sender);
        const initial = email.sender.charAt(0).toUpperCase();
        const isSelected = state.selectedEmails.has(email.id);
        const labelBadges = (email.labels || []).map(l => {
            const c = LABEL_COLORS[l];
            return c ? `<span class="email-label-badge" style="background:${c.bg};color:${c.text}">${l.charAt(0).toUpperCase() + l.slice(1)}</span>` : '';
        }).join('');

        return `
        <div class="email-row ${email.unread ? 'unread' : 'read'} ${isSelected ? 'selected' : ''}" 
             data-email-id="${email.id}" style="animation-delay:${i * 0.02}s">
            <div class="email-row-start">
                <label class="email-checkbox" onclick="event.stopPropagation()">
                    <input type="checkbox" ${isSelected ? 'checked' : ''} data-check-id="${email.id}">
                    <span class="custom-checkbox"><span class="material-icons check-icon">check</span></span>
                </label>
                <div class="email-star ${email.starred ? 'starred' : ''}" data-star-id="${email.id}" onclick="event.stopPropagation()">
                    <span class="${email.starred ? 'material-icons' : 'material-icons-outlined'}">
                        ${email.starred ? 'star' : 'star_outline'}
                    </span>
                </div>
                <div class="email-important ${email.important ? 'marked' : ''}" data-important-id="${email.id}" onclick="event.stopPropagation()">
                    <span class="material-icons-outlined">label_important</span>
                </div>
            </div>
            
            <div class="mobile-avatar hidden-desktop" style="background:${avatarColor}">${initial}</div>
            
            <div class="email-sender">${email.sender}</div>
            <div class="email-content">
                ${labelBadges}
                <span class="email-subject">${email.subject}</span>
                <span class="email-snippet-separator">&nbsp;—&nbsp;</span>
                <span class="email-snippet">${email.snippet}</span>
            </div>
            ${email.hasAttachment ? '<div class="email-attachment"><span class="material-icons-outlined">attach_file</span></div>' : ''}
            <div class="email-date">${email.date}</div>
            
            <div class="mobile-star hidden-desktop ${email.starred ? 'starred' : ''}" data-star-id="${email.id}" onclick="event.stopPropagation()">
                <span class="${email.starred ? 'material-icons' : 'material-icons-outlined'}">
                    ${email.starred ? 'star' : 'star_outline'}
                </span>
            </div>
            
            <div class="email-hover-actions">
                <button class="icon-btn" data-action="archive" data-action-id="${email.id}" aria-label="Archive" onclick="event.stopPropagation()">
                    <span class="material-icons-outlined">archive</span>
                </button>
                <button class="icon-btn" data-action="delete" data-action-id="${email.id}" aria-label="Delete" onclick="event.stopPropagation()">
                    <span class="material-icons-outlined">delete</span>
                </button>
                <button class="icon-btn" data-action="mark-read" data-action-id="${email.id}" aria-label="Mark as read" onclick="event.stopPropagation()">
                    <span class="material-icons-outlined">${email.unread ? 'drafts' : 'mark_email_unread'}</span>
                </button>
                <button class="icon-btn" data-action="snooze" data-action-id="${email.id}" aria-label="Snooze" onclick="event.stopPropagation()">
                    <span class="material-icons-outlined">schedule</span>
                </button>
            </div>
        </div>
        `;
    }).join('');
}

// Strip ALL inline background colors from HTML email so it blends with our dark theme
function stripEmailBg(html) {
    if (!html || typeof html !== 'string') return html;
    return html
        // Strip ALL background-color inline styles (any value)
        .replace(/background-color\s*:\s*[^;!"'<>]+/gi, 'background-color: transparent')
        // Strip background shorthand styles
        .replace(/(?<![\w-])background\s*:\s*(?!linear|radial|url)[^;!"'<>]+/gi, 'background: transparent')
        // Strip bgcolor attributes
        .replace(/\sbgcolor=['"][^'"]*['"]/gi, '')
        // Strip color styles that make text invisible on dark bg (white/near-white text)
        .replace(/color\s*:\s*(white|#fff|#ffffff|rgb\(255,255,255\))/gi, 'color: #bdc1c6');
}

// ============================================
//  RENDER: Email Detail
// ============================================
function renderEmailDetail(email) {
    const isMobile = window.innerWidth <= 900;
    const avatarHtml = renderAvatarHTML(email, isMobile, true);
    const acc = accounts[activeAccountIndex];
    const myName = acc ? acc.name : 'Me';
    const myEmail = acc ? acc.email : 'user@gmail.com';

    dom.emailDetailBody.innerHTML = `
        <!-- ═══════════════════════════════════
             ZONE 1: Subject row
             bg: #1b1b1b (Warm brown - exactly like screenshot top)
             ═══════════════════════════════════ -->
        <h1 style="
            font-size: 24px; margin: 0;
            padding: 20px 16px 18px 20px;
            font-weight: 400; line-height: 1.35;
            color: var(--text-primary);
            background: var(--detail-bg);
            display: flex; align-items: flex-start;
            justify-content: space-between; gap: 14px;
        ">
            <div style="min-width:0;">
                ${email.fullSubject || email.subject}
                <span style="
                    display:inline-block; vertical-align:middle;
                    margin-left:8px; padding:3px 10px;
                    background:transparent; color:var(--chip-text);
                    border:1px solid var(--chip-border);
                    border-radius:6px; font-size:14px;
                    font-weight:400; line-height:1.4;
                    white-space:nowrap; cursor:pointer;
                ">Add label</span>
            </div>
            <span class="material-icons-outlined ${email.starred ? 'starred' : ''}" data-star-id="${email.id}" style="color:${email.starred ? '#f9ab00' : 'var(--text-secondary)'}; cursor:pointer; flex-shrink:0; margin-top:6px; font-size:26px;">${email.starred ? 'star' : 'star_border'}</span>
        </h1>

        <!-- ZONE 2: Page background — lighter warm brown, same as subject row -->
        <div style="background: var(--detail-bg); padding: 4px 14px 28px 14px; flex: 1;">

            <!-- ZONE 3: Message card — DARKER than the page (matches reference) -->
            <div style="
                background: var(--detail-card);
                border-radius: 18px;
                overflow: hidden;
            ">
                <!-- Avatar + Name + Icons row -->
                <div style="padding: 18px 16px 14px 18px;">
                    <div style="display:flex; align-items:flex-start;">
                        ${avatarHtml}
                        <div style="flex:1; min-width:0; margin-left:16px;">
                            <div style="display:flex; align-items:center; justify-content:space-between;">
                                <div style="display:flex; align-items:center; gap:8px; flex:1; min-width:0; overflow:hidden;">
                                    <span style="font-weight:500; font-size:18px; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:120px;">${email.sender}</span>
                                    ${email.verified ? '<span class="material-icons" style="color:#1d9bf0; font-size:16px; flex-shrink:0;">verified</span>' : ''}
                                    <span style="color:var(--text-secondary); font-size:15px; white-space:nowrap; flex-shrink:0;">${email.date || ''}</span>
                                </div>
                                <div style="display:flex; align-items:center; gap:18px; color:var(--text-secondary); flex-shrink:0; margin-left:10px;">
                                    <span class="material-icons-outlined" style="cursor:pointer; font-size:24px;">mood</span>
                                    <span class="material-icons-outlined" style="cursor:pointer; font-size:24px;">reply</span>
                                    <span class="material-icons" style="cursor:pointer; font-size:24px;">more_vert</span>
                                </div>
                            </div>
                            <!-- "to ..." toggle -->
                            <div id="detail-to-me-btn" style="color:var(--text-secondary); font-size:16px; cursor:pointer; display:flex; align-items:center; margin-top:6px; user-select:none;">
                                to ${email.recipientLabel || 'me'} <span class="material-icons" style="font-size:19px; margin-left:3px;">expand_more</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Expanded "to me" details — slightly lifted warm shade -->
                <div id="detail-expanded-info" class="hidden" style="
                    background: var(--detail-panel);
                    margin: 0;
                    padding: 16px 18px 18px 18px;
                    font-size: 15px;
                ">
                    <table style="width:100%; border-spacing:0; color:var(--text-secondary);">
                        <tr>
                            <td style="padding-bottom:10px; width:80px; vertical-align:top; white-space:nowrap; font-size:15px;">From</td>
                            <td style="padding-bottom:10px; color:#bdc1c6; font-size:15px;"><span style="font-weight:500;">${email.sender}</span> • ${email.email}</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom:10px; vertical-align:top; font-size:15px;">Reply to</td>
                            <td style="padding-bottom:10px; color:#bdc1c6; font-size:15px;">${email.email}</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom:10px; vertical-align:top; font-size:15px;">To</td>
                            <td style="padding-bottom:10px; color:#bdc1c6; font-size:15px;">${myName} &lt;${myEmail}&gt;</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom:10px; vertical-align:top; font-size:15px;">Date</td>
                            <td style="padding-bottom:10px; color:#bdc1c6; font-size:15px;">${email.fullDate || email.date}</td>
                        </tr>
                        <tr>
                            <td style="vertical-align:top; padding-top:2px;">
                                <span class="material-icons-outlined" style="font-size:17px; color:var(--text-secondary); vertical-align:middle;">lock</span>
                            </td>
                            <td style="color:var(--text-secondary); font-size:15px;">
                                Standard encryption (TLS).
                                <a href="#" onclick="return false;" style="color:var(--text-secondary); text-decoration:none; font-weight:500;"> See security details</a>
                            </td>
                        </tr>
                    </table>
                </div>

                <!-- ═══════════════════════════════════
                     ZONE 5: Email body (Inside the Card!)
                     Background is transparent so it takes the 
                     card's #241b16 colour natively.
                     ═══════════════════════════════════ -->
                <div id="email-body-content" style="
                    background: transparent;
                    padding: 14px 18px 28px 18px;
                    color: var(--text-primary);
                    font-size: 17px;
                    line-height: 1.55;
                    overflow-wrap: break-word;
                    word-break: break-word;
                ">
                    ${stripEmailBg(email.body && email.body !== '<p></p>' ? email.body : '<span style="color:var(--text-secondary);">(No content)</span>')}
                </div>
            </div>
        </div>
    `;


    dom.emailDetailFooter = dom.emailDetailFooter || $('#email-detail-footer');
    if (dom.emailDetailFooter) {
        dom.emailDetailFooter.innerHTML = `
            <div style="background: var(--detail-bg); padding: 10px 14px 94px 14px; width: 100%; box-sizing: border-box;">
                <div style="display:flex; gap:8px; align-items:center;">
                    <!-- Reply pill — warm tan with thin stroke curved arrow (matches reference) -->
                    <button id="reply-btn" style="
                        background:var(--reply-pill-bg); color:var(--reply-pill-text); border:none;
                        border-radius:100px; height:52px; padding:0 22px;
                        font-weight:500; font-size:16px;
                        display:flex; align-items:center; gap:9px;
                        flex:1; justify-content:center;
                        cursor:pointer; transition:background 0.15s;
                        font-family:var(--font-main);
                    " onmouseover="this.style.background='#cbb098'" onmouseout="this.style.background='var(--reply-pill-bg)'">
                        <!-- Thin curved reply arrow (like &#8617;) -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                          <polyline points="9 14 4 9 9 4"/>
                          <path d="M4 9h11a5 5 0 0 1 0 10h-1"/>
                        </svg> Reply
                    </button>
                    <!-- Forward pill — mirrored thin stroke curved arrow (matches reference) -->
                    <button id="forward-btn" style="
                        background:var(--reply-pill-bg); color:var(--reply-pill-text); border:none;
                        border-radius:100px; height:52px; padding:0 22px;
                        font-weight:500; font-size:16px;
                        display:flex; align-items:center; gap:9px;
                        flex:1; justify-content:center;
                        cursor:pointer; transition:background 0.15s;
                        font-family:var(--font-main);
                    " onmouseover="this.style.background='#cbb098'" onmouseout="this.style.background='var(--reply-pill-bg)'">
                        <!-- Thin curved forward arrow (like &#8618;, mirror of reply) -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0; transform:scaleX(-1);">
                          <polyline points="9 14 4 9 9 4"/>
                          <path d="M4 9h11a5 5 0 0 1 0 10h-1"/>
                        </svg> Forward
                    </button>
                    <!-- Smiley — filled tan circle, same colour as the pills (matches reference) -->
                    <button aria-label="React" style="
                        background: var(--reply-pill-bg);
                        border: none;
                        border-radius: 50%; width: 52px; height: 52px;
                        flex-shrink: 0; display: flex; align-items: center;
                        justify-content: center; cursor: pointer;
                        color: var(--reply-pill-text);
                        transition: background 0.15s;
                    " onmouseover="this.style.background='#cbb098'" onmouseout="this.style.background='var(--reply-pill-bg)'">
                        <span class="material-icons-outlined" style="font-size:24px;">sentiment_satisfied</span>
                    </button>
                </div>
            </div>
        `;
    }



    const expandBtn = dom.emailDetailBody.querySelector('#detail-to-me-btn');
    const expandInfo = dom.emailDetailBody.querySelector('#detail-expanded-info');
    if (expandBtn && expandInfo) {
        expandBtn.addEventListener('click', () => {
            expandInfo.classList.toggle('hidden');
            const icon = expandBtn.querySelector('.material-icons');
            if (icon) icon.textContent = expandInfo.classList.contains('hidden') ? 'expand_more' : 'expand_less';
        });
    }

    // Mark as read
    email.unread = false;
    updateCounts();
}

// ============================================
//  EVENT: Sidebar Navigation
// ============================================
function setActiveNav(folder) {
    state.currentFolder = folder;
    state.viewingEmail = null;
    state.selectedEmails.clear();

    // Update active nav
    $$('.nav-item[data-folder]').forEach(item => {
        item.classList.toggle('active', item.dataset.folder === folder);
    });

    // Show/hide tabs (only for inbox, and only on desktop)
    if (window.innerWidth > 600) {
        dom.tabBar.style.display = folder === 'inbox' ? 'flex' : 'none';
    } else {
        dom.tabBar.style.display = 'none';
        dom.tabBar.style.setProperty('display', 'none', 'important');
    }

    // Show FAB when returning to list
    const fab = document.getElementById('mobile-compose-btn');
    if (fab) fab.classList.remove('hidden');

    // Show list, hide detail
    dom.emailList.classList.remove('hidden');
    dom.emailDetail.classList.add('hidden');
    dom.toolbar.classList.remove('hidden');

    renderEmailList();
}

dom.navList.addEventListener('click', (e) => {
    const navItemFolder = e.target.closest('.nav-item[data-folder]');
    const navItemAny = e.target.closest('.nav-item');
    
    if (navItemFolder) {
        e.preventDefault();
        setActiveNav(navItemFolder.dataset.folder);
        // Close mobile sidebar
        if (state.sidebarMobileOpen) {
            dom.sidebar.classList.remove('mobile-open');
            state.sidebarMobileOpen = false;
            const backdrop = $('#sidebar-backdrop');
            if (backdrop) backdrop.classList.add('hidden');
        }
    } else if (navItemAny) {
        e.preventDefault();
        showToast('Feature coming soon!');
        // Close mobile sidebar
        if (state.sidebarMobileOpen) {
            dom.sidebar.classList.remove('mobile-open');
            state.sidebarMobileOpen = false;
            const backdrop = $('#sidebar-backdrop');
            if (backdrop) backdrop.classList.add('hidden');
        }
    }
});

// More toggle
if (dom.navMore) {
    dom.navMore.addEventListener('click', (e) => {
        e.preventDefault();
        state.moreNavOpen = !state.moreNavOpen;
        dom.navMoreItems.classList.toggle('hidden', !state.moreNavOpen);
        const icon = dom.navMore.querySelector('.nav-icon');
        if (icon) icon.textContent = state.moreNavOpen ? 'expand_less' : 'expand_more';
        const label = dom.navMore.querySelector('.nav-label');
        if (label) label.textContent = state.moreNavOpen ? 'Less' : 'More';
    });
}

// ============================================
//  EVENT: Sidebar Toggle (Hamburger)
// ============================================
function handleHamburgerClick() {
    if (window.innerWidth <= 900) {
        state.sidebarMobileOpen = !state.sidebarMobileOpen;
        dom.sidebar.classList.toggle('mobile-open', state.sidebarMobileOpen);
        const backdrop = $('#sidebar-backdrop');
        if (backdrop) backdrop.classList.toggle('hidden', !state.sidebarMobileOpen);
    } else {
        state.sidebarCollapsed = !state.sidebarCollapsed;
        dom.sidebar.classList.toggle('collapsed', state.sidebarCollapsed);
    }
}

dom.hamburgerBtn.addEventListener('click', handleHamburgerClick);

const mobileHamburgerBtn = $('#mobile-hamburger-btn');
if (mobileHamburgerBtn) {
    mobileHamburgerBtn.addEventListener('click', handleHamburgerClick);
}

const backdropEl = $('#sidebar-backdrop');
if (backdropEl) {
    backdropEl.addEventListener('click', () => {
        if (state.sidebarMobileOpen) {
            dom.sidebar.classList.remove('mobile-open');
            state.sidebarMobileOpen = false;
            backdropEl.classList.add('hidden');
        }
    });
}

// ============================================
//  EVENT: Tabs
// ============================================
dom.tabBar.addEventListener('click', (e) => {
    const tab = e.target.closest('.tab');
    if (tab) {
        state.currentTab = tab.dataset.tab;
        $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === state.currentTab));
        state.selectedEmails.clear();
        renderEmailList();
    }
});

// ============================================
//  EVENT: Email Clicks
// ============================================
dom.emailList.addEventListener('click', (e) => {
    // Star toggle
    const star = e.target.closest('[data-star-id]');
    if (star) {
        const id = parseInt(star.dataset.starId);
        const email = emails.find(em => em.id === id);
        if (email) {
            email.starred = !email.starred;
            renderEmailList();
        }
        return;
    }


    // Important toggle
    const imp = e.target.closest('[data-important-id]');
    if (imp) {
        const id = parseInt(imp.dataset.importantId);
        const email = emails.find(em => em.id === id);
        if (email) {
            email.important = !email.important;
            renderEmailList();
        }
        return;
    }

    // Checkbox
    const checkbox = e.target.closest('[data-check-id]');
    if (checkbox) {
        const id = parseInt(checkbox.dataset.checkId);
        if (checkbox.checked) {
            state.selectedEmails.add(id);
        } else {
            state.selectedEmails.delete(id);
        }
        renderEmailList();
        return;
    }

    // Hover actions
    const actionBtn = e.target.closest('[data-action]');
    if (actionBtn) {
        const id = parseInt(actionBtn.dataset.actionId);
        const action = actionBtn.dataset.action;
        const email = emails.find(em => em.id === id);
        if (!email) return;
        switch (action) {
            case 'archive':
                email._deleted = true;
                showToast('Conversation archived.', true);
                break;
            case 'delete':
                email._deleted = true;
                showToast('Conversation moved to Trash.', true);
                break;
            case 'mark-read':
                email.unread = !email.unread;
                showToast(email.unread ? 'Conversation marked as unread.' : 'Conversation marked as read.');
                break;
            case 'snooze':
                showToast('Snoozed until tomorrow morning.');
                break;
        }
        updateCounts();
        renderEmailList();
        return;
    }

    // Open email
    const row = e.target.closest('.email-row');
    if (row) {
        const id = parseInt(row.dataset.emailId);
        const email = emails.find(em => em.id === id);
        if (email && !email.isCategory) {
            state.viewingEmail = email;
            dom.emailList.classList.add('hidden');
            dom.toolbar.classList.add('hidden');
            if (dom.tabBar) dom.tabBar.style.display = 'none';
            dom.emailDetail.classList.remove('hidden');
            
            // Mobile specific UI changes for detail view
            if (window.innerWidth <= 900) {
                if (dom.mainHeader) dom.mainHeader.style.setProperty('display', 'none', 'important');
                // Keep mobileBottomNav visible in detail view (matches real Gmail)
                if (dom.mainLayout) {
                    dom.mainLayout.style.setProperty('margin-top', '0px', 'important');
                    dom.mainLayout.style.setProperty('height', '100vh', 'important');
                }
            }
            
            // Hide FAB in detail view
            const fab = document.getElementById('mobile-compose-btn');
            if (fab) { 
                fab.classList.add('hidden'); 
                fab.style.setProperty('display', 'none', 'important'); 
            }

            renderEmailDetail(email);
        }
    }
});

// Back to list
dom.backToListBtn.addEventListener('click', () => {
    state.viewingEmail = null;
    dom.emailDetail.classList.add('hidden');
    dom.emailList.classList.remove('hidden');
    dom.toolbar.classList.remove('hidden');
    
    if (state.currentFolder === 'inbox' && window.innerWidth > 600) {
        if (dom.tabBar) dom.tabBar.style.display = 'flex';
    }
    
    // Restore mobile UI elements
    if (dom.mainHeader) dom.mainHeader.style.removeProperty('display');
    if (dom.mobileBottomNav) dom.mobileBottomNav.style.removeProperty('display');
    if (dom.mainLayout) {
        dom.mainLayout.style.removeProperty('margin-top');
        dom.mainLayout.style.removeProperty('height');
    }
    
    // Show FAB when returning to list
    const fab = document.getElementById('mobile-compose-btn');
    if (fab) { 
        fab.classList.remove('hidden'); 
        fab.style.removeProperty('display'); 
    }

    renderEmailList();
});

// ============================================
//  EVENT: Select All
// ============================================
dom.selectAllCheckbox.addEventListener('change', () => {
    const filtered = getFilteredEmails();
    if (dom.selectAllCheckbox.checked) {
        filtered.forEach(e => state.selectedEmails.add(e.id));
    } else {
        state.selectedEmails.clear();
    }
    renderEmailList();
});

// ============================================
//  EVENT: Refresh
// ============================================
dom.refreshBtn.addEventListener('click', () => {
    const icon = dom.refreshBtn.querySelector('.material-icons-outlined');
    icon.classList.add('spin');
    setTimeout(() => {
        icon.classList.remove('spin');
        showToast('Inbox is up to date.');
    }, 600);
    renderEmailList();
});

// ============================================
//  EVENT: Search
// ============================================
dom.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim();
    if (state.viewingEmail) {
        state.viewingEmail = null;
        dom.emailDetail.classList.add('hidden');
        dom.emailList.classList.remove('hidden');
        dom.toolbar.classList.remove('hidden');
    }
    renderEmailList();
});

dom.searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        dom.searchInput.value = '';
        state.searchQuery = '';
        dom.searchInput.blur();
        renderEmailList();
    }
});

// ============================================
//  COMPOSE
// ============================================
function openCompose(prefill = {}) {
    if (window.innerWidth <= 600) {
        // Mobile full-screen compose
        const mcScreen = $('#mobile-compose-screen');
        if (mcScreen) {
            mcScreen.classList.remove('hidden');
            const mcTo = $('#mc-to-input');
            const mcSub = $('#mc-subject-input');
            const mcBody = $('#mc-body');
            if (mcTo) mcTo.value = prefill.to || '';
            if (mcSub) mcSub.value = prefill.subject || '';
            if (mcBody) mcBody.innerHTML = prefill.body || '';
            setTimeout(() => { if (mcTo) mcTo.focus(); }, 300);
        }
        return;
    }

    // Desktop compose modal
    state.composeOpen = true;
    state.composeMinimized = false;
    state.composeFullscreen = false;
    dom.composeModal.classList.remove('hidden', 'minimized', 'fullscreen');
    dom.composeTo.value = prefill.to || '';
    dom.composeSubject.value = prefill.subject || '';
    dom.composeEditor.innerHTML = prefill.body || '';
    dom.composeTo.focus();
}

function closeCompose() {
    state.composeOpen = false;
    dom.composeModal.classList.add('hidden');
    dom.composeTo.value = '';
    dom.composeSubject.value = '';
    dom.composeEditor.innerHTML = '';
}

dom.composeBtn.addEventListener('click', () => openCompose());
dom.composeCloseBtn.addEventListener('click', closeCompose);

dom.composeMinimizeBtn.addEventListener('click', () => {
    state.composeMinimized = !state.composeMinimized;
    dom.composeModal.classList.toggle('minimized', state.composeMinimized);
});

dom.composeFullscreenBtn.addEventListener('click', () => {
    state.composeFullscreen = !state.composeFullscreen;
    dom.composeModal.classList.toggle('fullscreen', state.composeFullscreen);
    const icon = dom.composeFullscreenBtn.querySelector('.material-icons-outlined');
    icon.textContent = state.composeFullscreen ? 'close_fullscreen' : 'open_in_full';
});

dom.composeHeader.addEventListener('click', (e) => {
    if (e.target.closest('.icon-btn')) return;
    if (state.composeMinimized) {
        state.composeMinimized = false;
        dom.composeModal.classList.remove('minimized');
    }
});

dom.composeCcToggle.addEventListener('click', () => {
    dom.composeCcField.classList.toggle('hidden');
});
dom.composeBccToggle.addEventListener('click', () => {
    dom.composeBccField.classList.toggle('hidden');
});

// Send email
dom.sendBtn.addEventListener('click', () => {
    const to = dom.composeTo.value.trim();
    const subject = dom.composeSubject.value.trim();
    const body = dom.composeEditor.innerHTML.trim();

    if (!to) {
        dom.composeTo.focus();
        showToast('Please specify at least one recipient.');
        return;
    }

    // Add to sent
    emails.push({
        id: Date.now(),
        folder: 'sent',
        tab: 'primary',
        sender: 'Me',
        email: 'user@gmail.com',
        subject: subject || '(no subject)',
        snippet: body.replace(/<[^>]*>/g, '').substring(0, 100),
        body: body || '<p></p>',
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        fullDate: new Date().toLocaleString(),
        unread: false,
        starred: false,
        important: false,
        labels: [],
        hasAttachment: false,
        avatarType: 'default',
    });

    closeCompose();
    showToast('Message sent.', true);
});

dom.composeDeleteBtn.addEventListener('click', () => {
    closeCompose();
    showToast('Draft discarded.');
});

// Mobile compose FAB
const mobileComposeBtn = $('#mobile-compose-btn');
if (mobileComposeBtn) {
    mobileComposeBtn.addEventListener('click', () => openCompose());
}

// ============================================
//  EVENT: Reply / Forward
// ============================================
dom.emailDetailBody.addEventListener('click', (e) => {
    const replyBtn = e.target.closest('#reply-btn');
    if (replyBtn && state.viewingEmail) {
        openCompose({
            to: state.viewingEmail.email,
            subject: 'Re: ' + state.viewingEmail.subject,
            body: '',
        });
        return;
    }
    const forwardBtn = e.target.closest('#forward-btn');
    if (forwardBtn && state.viewingEmail) {
        openCompose({
            to: '',
            subject: 'Fwd: ' + state.viewingEmail.subject,
            body: `<br><br>---------- Forwarded message ----------<br>From: ${state.viewingEmail.sender} &lt;${state.viewingEmail.email}&gt;<br>Subject: ${state.viewingEmail.subject}<br><br>${state.viewingEmail.body}`,
        });
        return;
    }
});

// ============================================
//  EVENT: Toast Undo
// ============================================
dom.toastAction.addEventListener('click', () => {
    // Simple undo — restore all deleted
    emails.forEach(e => { if (e._deleted) e._deleted = false; });
    dom.toast.classList.add('hidden');
    updateCounts();
    renderEmailList();
    showToast('Action undone.');
});

// ============================================
//  KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Don't trigger shortcuts when typing in inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.contentEditable === 'true') return;

    switch (e.key) {
        case 'c':
            e.preventDefault();
            openCompose();
            break;
        case '/':
            e.preventDefault();
            dom.searchInput.focus();
            break;
        case 'Escape':
            if (state.composeOpen) closeCompose();
            if (state.viewingEmail) dom.backToListBtn.click();
            break;
        case 'j': // Next email
            if (!state.viewingEmail) {
                const filtered = getFilteredEmails();
                if (filtered.length > 0) {
                    state.viewingEmail = filtered[0];
                    dom.emailList.classList.add('hidden');
                    dom.toolbar.classList.add('hidden');
                    dom.tabBar.style.display = 'none';
                    dom.emailDetail.classList.remove('hidden');
                    renderEmailDetail(filtered[0]);
                }
            }
            break;
    }
});

// ============================================
//  SETTINGS BUTTON (theme toggle placeholder)
// ============================================
const settingsNavBtn = document.getElementById('settings-nav-btn');
if (settingsNavBtn) {
    settingsNavBtn.addEventListener('click', () => {
        showToast('Settings panel — coming soon!');
    });
}

// ============================================
//  INITIALIZE
// ============================================
function init() {
    updateCounts();
    renderEmailList();
    updateActiveAccountUI();

    // Set placeholder on compose editor
    dom.composeEditor.setAttribute('data-placeholder', 'Compose your message...');
    
    // Re-render on resize
    window.addEventListener('resize', () => {
        renderEmailList();
    });
}

// ============================================
//  ACCOUNT SWITCHER MODAL (Full Feature)
// ============================================
const accountModal = $('#account-modal');
const accountBackdrop = $('#account-backdrop');
const accountCloseBtn = $('#account-close-btn');
const avatarBtn = $('#avatar-btn');
const mobileAvatarBtn = $('#mobile-avatar-btn');
const accountListEl = $('#account-list');
const addAccountBtn = $('#add-account-btn');
const addAccountModal = $('#add-account-modal');
const addAccountBackBtn = $('#add-account-back-btn');

// Default accounts (seeded)
const DEFAULT_ACCOUNTS = [
    { name: 'Aryan', email: 'mindsettt369@gmail.com', color: '#e8590c', photo: null },
];

// Load accounts from localStorage or seed defaults
function loadAccounts() {
    const stored = localStorage.getItem('gmail_accounts_v3');
    if (stored) {
        try { return JSON.parse(stored); } catch(e) { /* fall through */ }
    }
    // Seed defaults on first load
    localStorage.setItem('gmail_accounts_v3', JSON.stringify(DEFAULT_ACCOUNTS));
    return [...DEFAULT_ACCOUNTS];
}

function saveAccounts(accounts) {
    localStorage.setItem('gmail_accounts_v3', JSON.stringify(accounts));
}

let userAccounts = loadAccounts();
let currentActiveAccount = userAccounts[0] || DEFAULT_ACCOUNTS[0];

function updateActiveAccountUI() {
    const mainAvatar = $('#main-account-avatar');
    const userAvatar = $('#user-avatar');
    const mobileAvatar = $('#mobile-user-avatar');
    const accountEmailDisplay = document.querySelector('.account-email');
    const accountNameDisplay = document.querySelector('.account-name');
    
    const initial = currentActiveAccount.name.charAt(0).toUpperCase();
    const bgStyle = currentActiveAccount.photo ? 
        `background: url(${currentActiveAccount.photo}) center/cover no-repeat; color: transparent;` : 
        `background: ${currentActiveAccount.color || '#f44336'}; color: #fff;`;
    
    if (mainAvatar) {
        mainAvatar.textContent = currentActiveAccount.photo ? '' : initial;
        mainAvatar.setAttribute('style', bgStyle + ' overflow: hidden;');
    }
    if (userAvatar) {
        userAvatar.textContent = currentActiveAccount.photo ? '' : initial;
        userAvatar.setAttribute('style', bgStyle + ' overflow: hidden;');
    }
    if (mobileAvatar) {
        mobileAvatar.textContent = currentActiveAccount.photo ? '' : initial;
        mobileAvatar.setAttribute('style', bgStyle + ' overflow: hidden;');
    }
    if (accountEmailDisplay) {
        accountEmailDisplay.textContent = currentActiveAccount.email;
    }
    if (accountNameDisplay) {
        accountNameDisplay.textContent = `Hi, ${currentActiveAccount.name}!`;
    }
}

// Render account list in the modal
function renderAccountList() {
    if (!accountListEl) return;
    accountListEl.innerHTML = '';
    if (userAccounts.length === 0) {
        accountListEl.innerHTML = '<div style="padding:16px 24px;color:var(--text-secondary);font-size:14px;text-align:center;">No accounts added yet</div>';
        return;
    }
    userAccounts.forEach((acc, idx) => {
        const initial = acc.name.charAt(0).toUpperCase();
        const avatarHTML = acc.photo
            ? `<div class="avatar" style="overflow:hidden"><img src="${acc.photo}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></div>`
            : `<div class="avatar" style="background:${acc.color || randomAvatarColor(acc.name)}">${initial}</div>`;
        
        const item = document.createElement('div');
        item.className = 'account-item';
        item.style.cursor = 'pointer';
        item.innerHTML = `
            ${avatarHTML}
            <div class="account-info">
                <div class="account-item-name">${acc.name}</div>
                <div class="account-item-email">${acc.email}</div>
            </div>
            <div class="account-count">99+</div>
            <div class="account-remove-btn" data-idx="${idx}" title="Remove account">
                <span class="material-icons">close</span>
            </div>
        `;
        
        // Switch account handler
        item.addEventListener('click', (e) => {
            if (e.target.closest('.account-remove-btn')) return;
            currentActiveAccount = userAccounts[idx];
            updateActiveAccountUI();
            toggleAccountModal();
            showToast(`Switched to ${acc.email}`);
        });

        accountListEl.appendChild(item);
    });

    // Remove account handler
    accountListEl.querySelectorAll('.account-remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.dataset.idx);
            const acc = userAccounts[idx];
            if (confirm(`Remove "${acc.name}" (${acc.email})?`)) {
                userAccounts.splice(idx, 1);
                saveAccounts(userAccounts);
                if (currentActiveAccount.email === acc.email && userAccounts.length > 0) {
                    currentActiveAccount = userAccounts[0];
                    updateActiveAccountUI();
                }
                renderAccountList();
                showToast(`Account "${acc.name}" removed.`);
            }
        });
    });
}

function toggleAccountModal() {
    if (!accountModal) return;
    if (accountModal.classList.contains('hidden')) {
        renderAccountList();
        accountModal.classList.remove('hidden');
        accountBackdrop.classList.remove('hidden');
    } else {
        accountModal.classList.add('hidden');
        accountBackdrop.classList.add('hidden');
    }
}

if (avatarBtn) avatarBtn.addEventListener('click', toggleAccountModal);
if (mobileAvatarBtn) mobileAvatarBtn.addEventListener('click', toggleAccountModal);
if (accountCloseBtn) accountCloseBtn.addEventListener('click', toggleAccountModal);
if (accountBackdrop) accountBackdrop.addEventListener('click', toggleAccountModal);

// Toggle switch account section
const switchAccountToggle = $('#switch-account-toggle');
if (switchAccountToggle) {
    switchAccountToggle.addEventListener('click', () => {
        switchAccountToggle.classList.toggle('collapsed');
        accountListEl.classList.toggle('collapsed');
    });
}

// ============================================
//  PROFILE PHOTO CHANGE (camera icon in modal)
// ============================================
const accountAvatarCamera = $('#account-avatar-camera');
const profilePhotoInput = $('#profile-photo-input');

if (accountAvatarCamera && profilePhotoInput) {
    accountAvatarCamera.addEventListener('click', () => {
        profilePhotoInput.click();
    });

    profilePhotoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            // Update current active account photo
            currentActiveAccount.photo = ev.target.result;
            // Save to localStorage
            const idx = userAccounts.findIndex(a => a.email === currentActiveAccount.email);
            if (idx !== -1) {
                userAccounts[idx].photo = ev.target.result;
                saveAccounts(userAccounts);
            }
            // Refresh all avatars
            updateActiveAccountUI();
            renderAccountList();
            showToast('Profile photo updated!');
        };
        reader.readAsDataURL(file);
        // Reset input so same file can be selected again
        profilePhotoInput.value = '';
    });
}

// ============================================
//  ADD ACCOUNT FLOW (Multi-Step Form)
// ============================================
let newAccountData = { name: '', email: '', photo: null };

function showStep(stepId) {
    if (!addAccountModal) return;
    addAccountModal.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    const step = $(`#${stepId}`);
    if (step) step.classList.add('active');
}

function openAddAccountForm() {
    // Reset form
    newAccountData = { name: '', email: '', photo: null };
    const nameInput = $('#acc-name-input');
    const emailInput = $('#acc-email-input');
    const photoPreview = $('#photo-preview');
    if (nameInput) nameInput.value = '';
    if (emailInput) emailInput.value = '';
    if (photoPreview) photoPreview.innerHTML = '<span class="material-icons-outlined">add_a_photo</span>';
    
    // Hide account modal, show add-account modal
    if (accountModal) accountModal.classList.add('hidden');
    if (addAccountModal) addAccountModal.classList.remove('hidden');
    showStep('step-name');
    
    // Focus name input after animation
    setTimeout(() => { if (nameInput) nameInput.focus(); }, 300);
}

function closeAddAccountForm() {
    if (addAccountModal) addAccountModal.classList.add('hidden');
    // Show account modal back
    renderAccountList();
    if (accountModal) accountModal.classList.remove('hidden');
}

// "Add another account" button
if (addAccountBtn) addAccountBtn.addEventListener('click', openAddAccountForm);

// Back arrow in add-account header
if (addAccountBackBtn) addAccountBackBtn.addEventListener('click', closeAddAccountForm);

// Step 1: Name -> Next
const stepNameNext = $('#step-name-next');
const stepNameCancel = $('#step-name-cancel');
if (stepNameNext) {
    stepNameNext.addEventListener('click', () => {
        const nameInput = $('#acc-name-input');
        const name = nameInput.value.trim();
        if (!name) {
            nameInput.style.borderColor = '#f28b82';
            nameInput.focus();
            return;
        }
        nameInput.style.borderColor = '';
        newAccountData.name = name;
        showStep('step-email');
        setTimeout(() => { const ei = $('#acc-email-input'); if (ei) ei.focus(); }, 300);
    });
}
if (stepNameCancel) {
    stepNameCancel.addEventListener('click', closeAddAccountForm);
}

// Step 2: Email -> Next
const stepEmailNext = $('#step-email-next');
const stepEmailBack = $('#step-email-back');
if (stepEmailNext) {
    stepEmailNext.addEventListener('click', () => {
        const emailInput = $('#acc-email-input');
        const email = emailInput.value.trim();
        if (!email || !email.includes('@')) {
            emailInput.style.borderColor = '#f28b82';
            emailInput.focus();
            return;
        }
        emailInput.style.borderColor = '';
        newAccountData.email = email;
        showStep('step-photo');
    });
}
if (stepEmailBack) {
    stepEmailBack.addEventListener('click', () => {
        showStep('step-name');
        setTimeout(() => { const ni = $('#acc-name-input'); if (ni) ni.focus(); }, 300);
    });
}

// Step 3: Photo
const photoPreviewEl = $('#photo-preview');
const photoFileInput = $('#acc-photo-input');
const stepPhotoSkip = $('#step-photo-skip');
const stepPhotoDone = $('#step-photo-done');

if (photoPreviewEl && photoFileInput) {
    photoPreviewEl.addEventListener('click', () => photoFileInput.click());
    
    photoFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                newAccountData.photo = ev.target.result;
                photoPreviewEl.innerHTML = `<img src="${ev.target.result}" alt="Profile">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

function finalizeGlobalAddAccount() {
    // Generate a color for the avatar
    const colors = ['#D50000','#C51162','#AA00FF','#6200EA','#304FFE','#2962FF','#0091EA','#00B8D4','#00BFA5','#00C853','#FFD600','#FF6D00'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const newAcc = {
        name: newAccountData.name,
        email: newAccountData.email,
        color: color,
        photo: newAccountData.photo || null,
    };
    
    userAccounts.push(newAcc);
    saveAccounts(userAccounts);
    
    // Show success
    const successEmail = $('#success-email-text');
    if (successEmail) successEmail.textContent = newAcc.email;
    showStep('step-success');
}

if (stepPhotoSkip) {
    stepPhotoSkip.addEventListener('click', () => {
        showToast('Skip clicked!');
        try {
            newAccountData.photo = null;
            finalizeGlobalAddAccount();
        } catch(e) {
            showToast('Error in Skip: ' + e.message);
        }
    });
}
if (stepPhotoDone) {
    stepPhotoDone.addEventListener('click', () => {
        showToast('Done clicked!');
        try {
            finalizeGlobalAddAccount();
        } catch(e) {
            showToast('Error in Done: ' + e.message);
        }
    });
}

// Step 4: Success -> Done
const stepSuccessDone = $('#step-success-done');
if (stepSuccessDone) {
    stepSuccessDone.addEventListener('click', () => {
        if (addAccountModal) addAccountModal.classList.add('hidden');
        renderAccountList();
        if (accountModal) accountModal.classList.remove('hidden');
        showToast(`Account "${newAccountData.name}" added!`);
    });
}

// Enter key support for form inputs
$('#acc-name-input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') stepNameNext?.click(); });
$('#acc-email-input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') stepEmailNext?.click(); });

// Initialize account list on first load
renderAccountList();

// ============================================
//  MOBILE FULL-SCREEN COMPOSE LOGIC
// ============================================
const mcScreen = $('#mobile-compose-screen');
const mcBackBtn = $('#mc-back-btn');
const mcToExpandBtn = $('#mc-to-expand-btn');
const mcCcField = $('#mc-cc-field');
const mcBccField = $('#mc-bcc-field');
const mcSendBtn = $('#mc-send-btn');
const mcToInput = $('#mc-to-input');
const mcSubjectInput = $('#mc-subject-input');
const mcBody = $('#mc-body');

if (mcBackBtn) {
    mcBackBtn.addEventListener('click', () => {
        if (mcScreen) mcScreen.classList.add('hidden');
    });
}
if (mcToExpandBtn) {
    mcToExpandBtn.addEventListener('click', () => {
        mcCcField.classList.toggle('hidden');
        mcBccField.classList.toggle('hidden');
        const icon = mcToExpandBtn.querySelector('.material-icons');
        if (icon) icon.textContent = mcCcField.classList.contains('hidden') ? 'expand_more' : 'expand_less';
    });
}

// ============================================
//  ADD CUSTOM EMAIL FLOW LOGIC
// ============================================
const aeOverlay = $('#add-email-overlay');
const aeModal = $('#add-email-modal');
const customEmailData = { name: '', email: '', subject: '', snippet: '', photo: null, verified: false };

function showAeStep(stepId) {
    if (!aeModal) return;
    aeModal.querySelectorAll('.ae-step').forEach(s => s.classList.remove('active'));
    const step = $(`#${stepId}`);
    if (step) step.classList.add('active');
}

function openAddEmailFlow() {
    customEmailData.name = ''; customEmailData.email = ''; customEmailData.subject = ''; customEmailData.snippet = ''; customEmailData.photo = null; customEmailData.verified = false;
    
    if ($('#ae-name-input')) $('#ae-name-input').value = '';
    if ($('#ae-email-input')) $('#ae-email-input').value = '';
    if ($('#ae-subject-input')) $('#ae-subject-input').value = '';
    if ($('#ae-snippet-input')) $('#ae-snippet-input').value = '';
    if ($('#ae-preview-avatar')) $('#ae-preview-avatar').innerHTML = '<span class="material-icons" style="font-size:28px; color:#bdc1c6;">account_circle</span>';
    if ($('#ae-tick-icon')) $('#ae-tick-icon').classList.remove('active');
    
    if (aeOverlay) aeOverlay.classList.remove('hidden');
    if (aeModal) aeModal.classList.remove('hidden');
    showAeStep('ae-step-name');
    setTimeout(() => { if ($('#ae-name-input')) $('#ae-name-input').focus(); }, 300);
}

function closeAddEmailFlow() {
    if (aeOverlay) aeOverlay.classList.add('hidden');
    if (aeModal) aeModal.classList.add('hidden');
}

// Make sure the bottom navigation Add button triggers this
const aeNavBtn = document.querySelectorAll('.bottom-nav-item')[1]; // the video icon
if (aeNavBtn) {
    // Keep the video icon to match the UI perfectly, but use it to trigger the flow
    aeNavBtn.addEventListener('click', openAddEmailFlow);
}

// Step 1: Name
$('#ae-name-cancel')?.addEventListener('click', closeAddEmailFlow);
$('#ae-name-next')?.addEventListener('click', () => {
    const input = $('#ae-name-input');
    const val = input.value.trim();
    if (!val) { input.style.borderColor = '#f28b82'; input.focus(); return; }
    input.style.borderColor = '';
    customEmailData.name = val;
    showAeStep('ae-step-email');
    setTimeout(() => { if ($('#ae-email-input')) $('#ae-email-input').focus(); }, 300);
});

// Step 2: Email
$('#ae-email-back')?.addEventListener('click', () => showAeStep('ae-step-name'));
$('#ae-email-next')?.addEventListener('click', () => {
    const input = $('#ae-email-input');
    const val = input.value.trim();
    if (!val || !val.includes('@')) { input.style.borderColor = '#f28b82'; input.focus(); return; }
    input.style.borderColor = '';
    customEmailData.email = val;
    showAeStep('ae-step-text');
    setTimeout(() => { if ($('#ae-subject-input')) $('#ae-subject-input').focus(); }, 300);
});

// Step 3: Text
$('#ae-text-back')?.addEventListener('click', () => showAeStep('ae-step-email'));
$('#ae-text-next')?.addEventListener('click', () => {
    customEmailData.subject = $('#ae-subject-input')?.value.trim() || '(no subject)';
    customEmailData.snippet = $('#ae-snippet-input')?.value.trim() || 'No preview available.';
    
    // Update preview card
    if ($('#ae-preview-name')) $('#ae-preview-name').textContent = customEmailData.name;
    if ($('#ae-preview-email-display')) $('#ae-preview-email-display').textContent = customEmailData.email;
    const initial = customEmailData.name.charAt(0).toUpperCase();
    if ($('#ae-preview-avatar')) $('#ae-preview-avatar').innerHTML = `<div style="background:${randomAvatarColor(customEmailData.name)};width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:white;font-size:18px;">${initial}</div>`;
    
    showAeStep('ae-step-photo');
});

// Step 4: Photo & Tick
$('#ae-photo-back')?.addEventListener('click', () => showAeStep('ae-step-text'));

const aeUploadArea = $('#ae-upload-area');
const aePreviewAvatar = $('#ae-preview-avatar');
const aePhotoFile = $('#ae-photo-file');
const triggerPhotoUpload = () => { if (aePhotoFile) aePhotoFile.click(); };
if (aeUploadArea) aeUploadArea.addEventListener('click', triggerPhotoUpload);
if (aePreviewAvatar) aePreviewAvatar.addEventListener('click', triggerPhotoUpload);

if (aePhotoFile) {
    aePhotoFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                customEmailData.photo = ev.target.result;
                if (aePreviewAvatar) aePreviewAvatar.innerHTML = `<img src="${ev.target.result}">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

const aeVerifiedToggle = $('#ae-verified-toggle');
if (aeVerifiedToggle) {
    aeVerifiedToggle.addEventListener('click', () => {
        customEmailData.verified = !customEmailData.verified;
        const tickIcon = $('#ae-tick-icon');
        if (tickIcon) tickIcon.classList.toggle('active', customEmailData.verified);
    });
}

$('#ae-photo-done')?.addEventListener('click', () => {
    // Add to emails array
    const newEmail = {
        id: Date.now(),
        folder: 'inbox',
        tab: 'primary',
        sender: customEmailData.name,
        senderCount: null,
        email: customEmailData.email,
        subject: customEmailData.subject,
        snippet: customEmailData.snippet,
        body: `<p>${customEmailData.snippet}</p>`,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        fullDate: new Date().toLocaleString(),
        unread: true, starred: false, important: false,
        labels: [], hasAttachment: false,
        avatarType: customEmailData.photo ? 'photo' : 'default',
        avatarPhoto: customEmailData.photo,
        verified: customEmailData.verified
    };
    emails.unshift(newEmail);
    updateCounts();
    renderEmailList();
    
    // Show success step
    if ($('#ae-success-avatar')) $('#ae-success-avatar').innerHTML = customEmailData.photo 
        ? `<img src="${customEmailData.photo}" style="width:100%;height:100%;object-fit:cover;">`
        : `<div style="background:${randomAvatarColor(customEmailData.name)};width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:white;font-size:32px;">${customEmailData.name.charAt(0).toUpperCase()}</div>`;
    if ($('#ae-success-name')) $('#ae-success-name').textContent = customEmailData.name;
    if ($('#ae-success-email')) $('#ae-success-email').textContent = customEmailData.email;
    if ($('#ae-success-tick')) $('#ae-success-tick').classList.toggle('hidden', !customEmailData.verified);
    
    showAeStep('ae-step-success');
});

$('#ae-done-final')?.addEventListener('click', closeAddEmailFlow);

// Enter key support for Add Email steps
$('#ae-name-input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') $('#ae-name-next')?.click(); });
$('#ae-email-input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') $('#ae-email-next')?.click(); });

// ==============================================
//  ADVANCED COMPOSE: From field → Add Account
// ==============================================
function updateFromField() {
    const acc = accounts[activeAccountIndex];
    const el = document.getElementById('mc-from-email');
    if (el) el.textContent = acc.email;
}

function showAcStep(stepId) {
    document.querySelectorAll('.ac-step').forEach(s => s.classList.remove('active'));
    const step = document.getElementById(stepId);
    if (step) step.classList.add('active');
}

function openAddAccount() {
    document.getElementById('ac-modal')?.classList.remove('hidden');
    document.getElementById('ac-overlay')?.classList.remove('hidden');
    showAcStep('ac-step-name');
    const nameInput = document.getElementById('ac-name-input');
    if (nameInput) { nameInput.value = ''; nameInput.focus(); }
    const gmailInput = document.getElementById('ac-gmail-input');
    if (gmailInput) gmailInput.value = '';
    const avatarImg = document.getElementById('ac-avatar-img');
    const avatarIcon = document.getElementById('ac-avatar-icon');
    if (avatarImg) { avatarImg.style.display = 'none'; avatarImg.src = ''; }
    if (avatarIcon) avatarIcon.style.display = '';
    window._acNewAccount = { name: '', email: '', photo: null, verified: false };
}

function closeAddAccount() {
    document.getElementById('ac-modal')?.classList.add('hidden');
    document.getElementById('ac-overlay')?.classList.add('hidden');
}

document.getElementById('mc-from-email')?.addEventListener('click', openAddAccount);
document.querySelector('.mc-from-field')?.addEventListener('click', openAddAccount);
document.getElementById('mc-chevron')?.addEventListener('click', openAddAccount);
document.querySelector('.mc-chevron')?.addEventListener('click', openAddAccount);

document.getElementById('ac-name-cancel')?.addEventListener('click', closeAddAccount);
document.getElementById('ac-overlay')?.addEventListener('click', closeAddAccount);

document.getElementById('ac-name-next')?.addEventListener('click', () => {
    const val = document.getElementById('ac-name-input')?.value.trim();
    if (!val) { showToast('Please enter a name.'); return; }
    window._acNewAccount.name = val;
    showAcStep('ac-step-gmail');
    document.getElementById('ac-gmail-input')?.focus();
});

document.getElementById('ac-gmail-back')?.addEventListener('click', () => showAcStep('ac-step-name'));
document.getElementById('ac-gmail-next')?.addEventListener('click', () => {
    const val = document.getElementById('ac-gmail-input')?.value.trim();
    if (!val || !val.includes('@')) { showToast('Please enter a valid email.'); return; }
    window._acNewAccount.email = val;
    showAcStep('ac-step-photo');
});

document.getElementById('ac-photo-back')?.addEventListener('click', () => showAcStep('ac-step-gmail'));
document.getElementById('ac-upload-btn')?.addEventListener('click', () => document.getElementById('ac-photo-file')?.click());
document.getElementById('ac-photo-file')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        window._acNewAccount.photo = ev.target.result;
        const img = document.getElementById('ac-avatar-img');
        const icon = document.getElementById('ac-avatar-icon');
        if (img) { img.src = ev.target.result; img.style.display = ''; }
        if (icon) icon.style.display = 'none';
    };
    reader.readAsDataURL(file);
});
document.getElementById('ac-photo-next')?.addEventListener('click', () => showAcStep('ac-step-tick'));

document.getElementById('ac-tick-back')?.addEventListener('click', () => showAcStep('ac-step-photo'));

function finishAddAccount(withTick) {
    window._acNewAccount.verified = withTick;
    accounts.push({ ...window._acNewAccount });
    activeAccountIndex = accounts.length - 1;
    updateFromField();
    closeAddAccount();
    showToast(`Account "${window._acNewAccount.name}" added!`);
}
document.getElementById('ac-tick-yes')?.addEventListener('click', () => finishAddAccount(true));
document.getElementById('ac-tick-no')?.addEventListener('click', () => finishAddAccount(false));

document.getElementById('ac-name-input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') document.getElementById('ac-name-next')?.click(); });
document.getElementById('ac-gmail-input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') document.getElementById('ac-gmail-next')?.click(); });

// ==============================================
//  ADVANCED COMPOSE: To field → Add Recipient
// ==============================================
function showTcStep(stepId) {
    document.querySelectorAll('.tc-step').forEach(s => s.classList.remove('active'));
    const step = document.getElementById(stepId);
    if (step) step.classList.add('active');
}
function openToContact() {
    document.getElementById('tc-modal')?.classList.remove('hidden');
    document.getElementById('tc-overlay')?.classList.remove('hidden');
    showTcStep('tc-step-name');
    const nameInput = document.getElementById('tc-name-input');
    if (nameInput) { nameInput.value = ''; nameInput.focus(); }
    const emailInput = document.getElementById('tc-email-input');
    if (emailInput) emailInput.value = '';
    state._toContact = { name: '', email: '' };
}
function closeToContact() {
    document.getElementById('tc-modal')?.classList.add('hidden');
    document.getElementById('tc-overlay')?.classList.add('hidden');
}

document.querySelector('.mc-to-field')?.addEventListener('click', (e) => {
    if (e.target.closest('#mc-to-expand-btn')) return;
    const toInput = document.getElementById('mc-to-input');
    if (toInput && document.activeElement !== toInput) openToContact();
});

document.getElementById('tc-name-cancel')?.addEventListener('click', closeToContact);
document.getElementById('tc-overlay')?.addEventListener('click', closeToContact);

document.getElementById('tc-name-next')?.addEventListener('click', () => {
    const val = document.getElementById('tc-name-input')?.value.trim();
    if (!val) { showToast('Please enter recipient name.'); return; }
    state._toContact.name = val;
    showTcStep('tc-step-email');
    document.getElementById('tc-email-input')?.focus();
});
document.getElementById('tc-email-back')?.addEventListener('click', () => showTcStep('tc-step-name'));
document.getElementById('tc-email-next')?.addEventListener('click', () => {
    const val = document.getElementById('tc-email-input')?.value.trim();
    if (!val || !val.includes('@')) { showToast('Please enter a valid email.'); return; }
    state._toContact.email = val;
    // Go to photo step
    const tcAvatarImg = document.getElementById('tc-avatar-img');
    const tcAvatarIcon = document.getElementById('tc-avatar-icon');
    if (tcAvatarImg) { tcAvatarImg.style.display = 'none'; tcAvatarImg.src = ''; }
    if (tcAvatarIcon) tcAvatarIcon.style.display = '';
    state._toContact.photo = null;
    showTcStep('tc-step-photo');
});

// Photo step handlers
document.getElementById('tc-photo-back')?.addEventListener('click', () => showTcStep('tc-step-email'));
document.getElementById('tc-upload-btn')?.addEventListener('click', () => document.getElementById('tc-photo-file')?.click());
document.getElementById('tc-photo-file')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        state._toContact.photo = ev.target.result;
        const img = document.getElementById('tc-avatar-img');
        const icon = document.getElementById('tc-avatar-icon');
        if (img) { img.src = ev.target.result; img.style.display = ''; }
        if (icon) icon.style.display = 'none';
    };
    reader.readAsDataURL(file);
});

document.getElementById('tc-photo-done')?.addEventListener('click', () => {
    // Fill To input
    const toInput = document.getElementById('mc-to-input');
    if (toInput) toInput.value = `${state._toContact.name} <${state._toContact.email}>`;
    closeToContact();
    showToast(`Recipient added: ${state._toContact.name}`);
});

document.getElementById('tc-name-input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') document.getElementById('tc-name-next')?.click(); });
document.getElementById('tc-email-input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') document.getElementById('tc-email-next')?.click(); });

// ==============================================
//  SEND / RECEIVE POPUP + DATE TIME PICKER
// ==============================================
const srPopup = document.getElementById('sr-popup');

document.getElementById('mc-send-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (srPopup) srPopup.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
    if (srPopup && !srPopup.classList.contains('hidden')) {
        if (!e.target.closest('#sr-popup') && !e.target.closest('#mc-send-btn')) {
            srPopup.classList.add('hidden');
        }
    }
});

function openDateTimePicker(action) {
    state._srPendingAction = action;
    srPopup?.classList.add('hidden');
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().slice(0,5);
    const dateInput = document.getElementById('dt-date-input');
    const timeInput = document.getElementById('dt-time-input');
    if (dateInput) dateInput.value = dateStr;
    if (timeInput) timeInput.value = timeStr;
    const titleEl = document.getElementById('dt-title');
    if (titleEl) titleEl.textContent = action === 'send' ? 'Select Send Date & Time' : 'Select Receive Date & Time';
    document.getElementById('dt-overlay')?.classList.remove('hidden');
    document.getElementById('dt-modal')?.classList.remove('hidden');
}

document.getElementById('sr-send-option')?.addEventListener('click', () => openDateTimePicker('send'));
document.getElementById('sr-receive-option')?.addEventListener('click', () => openDateTimePicker('receive'));

document.getElementById('dt-cancel-btn')?.addEventListener('click', () => {
    document.getElementById('dt-overlay')?.classList.add('hidden');
    document.getElementById('dt-modal')?.classList.add('hidden');
    state._srPendingAction = null;
});

document.getElementById('dt-confirm-btn')?.addEventListener('click', () => {
    const dateInput = document.getElementById('dt-date-input');
    const timeInput = document.getElementById('dt-time-input');
    const dateVal = dateInput?.value;
    const timeVal = timeInput?.value;
    if (!dateVal || !timeVal) { showToast('Please select date and time.'); return; }

    document.getElementById('dt-overlay')?.classList.add('hidden');
    document.getElementById('dt-modal')?.classList.add('hidden');

    // Build display date
    const dt = new Date(`${dateVal}T${timeVal}`);
    // List rows show a short date (e.g. "5 Aug"), never a clock time
    const displayTime = dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const displayFull = dt.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
        + ', ' + dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Gather compose data
    const acc = accounts[activeAccountIndex];
    const toInput = document.getElementById('mc-to-input');
    const subjectInput = document.getElementById('mc-subject-input');
    const bodyEl = document.getElementById('mc-body');
    const subject = subjectInput?.value.trim() || '(No Subject)';
    const bodyText = bodyEl?.innerText.trim() || '';
    const snippet = bodyText.slice(0, 80) || '(no content)';
    const toRaw = toInput?.value.trim() || '';
    
    // Parse to name from "Name <email>" or just email
    let toName = state._toContact.name || toRaw.split('<')[0].trim() || toRaw;
    let toEmail = state._toContact.email || (toRaw.includes('<') ? toRaw.match(/<(.+)>/)?.[1] : toRaw) || toRaw;

    const action = state._srPendingAction;
    const maxId = Math.max(0, ...emails.map(e => e.id));

    if (action === 'send') {
        // Email goes to Sent folder — sender is the recipient (To) for display
        const toPhoto = state._toContact.photo || null;
        const sentEmail = {
            id: maxId + 1,
            folder: 'sent',
            tab: 'primary',
            sender: `To: ${toName}`,
            email: toEmail,
            subject: subject,
            snippet: snippet,
            body: `<p>${bodyText.replace(/\n/g, '<br>')}</p>`,
            date: displayTime,
            fullDate: displayFull,
            unread: false,
            starred: false,
            important: false,
            labels: [],
            hasAttachment: false,
            avatarType: toPhoto ? 'photo' : 'initial',
            avatarPhoto: toPhoto,
            verified: false,
        };
        emails.unshift(sentEmail);
        showToast('Email sent! ✓');
        
        // Close compose
        const composeScreen = document.getElementById('mobile-compose-screen');
        if (composeScreen) composeScreen.classList.add('hidden');
        setActiveNav('sent');
        
    } else if (action === 'receive') {
        // Email arrives in Inbox — sender is FROM account (the user set up with name/photo/verified)
        const acc = accounts[activeAccountIndex];
        const inboxEmail = {
            id: maxId + 1,
            folder: 'inbox',
            tab: 'primary',
            sender: acc.name || acc.email.split('@')[0],
            email: acc.email,
            subject: subject,
            snippet: bodyText.length > 0 ? snippet : '(no content)',
            body: `<p>${bodyText.replace(/\n/g, '<br>')}</p>`,
            date: displayTime,
            fullDate: displayFull,
            unread: true,
            starred: false,
            important: false,
            labels: [],
            hasAttachment: false,
            avatarType: acc.photo ? 'photo' : 'initial',
            avatarPhoto: acc.photo || null,
            verified: acc.verified || false,
        };
        emails.unshift(inboxEmail);
        updateCounts();
        showToast('Email received in Inbox! ✓');
        
        // Close compose
        const composeScreen = document.getElementById('mobile-compose-screen');
        if (composeScreen) composeScreen.classList.add('hidden');
        setActiveNav('inbox');
    }
    
    renderEmailList();
    state._srPendingAction = null;
});

// Initialize from field on load
updateFromField();

// Initialize application
init();

// =============================================
// SPLASH SCREEN: Auto-dismiss after app loads
// =============================================
(function() {
    var splash = document.getElementById('app-splash');
    if (!splash) return;

    // Minimum display time so it doesn't flash too quickly
    var MIN_SPLASH_MS = 1500;
    var startTime = Date.now();

    function hideSplash() {
        var elapsed = Date.now() - startTime;
        var remaining = Math.max(0, MIN_SPLASH_MS - elapsed);
        setTimeout(function() {
            splash.style.opacity = '0';
            // Remove from DOM after fade completes
            setTimeout(function() {
                if (splash.parentNode) splash.parentNode.removeChild(splash);
            }, 450);
        }, remaining);
    }

    // Hide once page is fully loaded (fonts, images, etc.)
    if (document.readyState === 'complete') {
        hideSplash();
    } else {
        window.addEventListener('load', hideSplash, { once: true });
    }
})();
