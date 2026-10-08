/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, ModalType, BoardMember, CommunityPost, NotificationItem, UserProfile } from './types';
import { INITIAL_USER, BOARD_MEMBERS, INITIAL_ANNOUNCEMENTS, INITIAL_POSTS, INITIAL_PAYMENTS, INITIAL_NOTIFICATIONS, MOSQUE_INFO } from './data/mockData';
import { Language, TRANSLATIONS } from './utils/translations';
import { FeedTab } from './components/tabs/FeedTab';
import { MoscheeTab } from './components/tabs/MoscheeTab';
import { ProfilTab } from './components/tabs/ProfilTab';
import { GlassBottomBar } from './components/common/GlassBottomBar';
import { NewPostModal } from './components/modals/NewPostModal';
import { MemberCardModal } from './components/modals/MemberCardModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { TwintModal } from './components/modals/TwintModal';
import { PhoneCallModal } from './components/modals/PhoneCallModal';
import { ChangeAvatarModal } from './components/modals/ChangeAvatarModal';
import { EditBoardMemberPhotoModal } from './components/modals/EditBoardMemberPhotoModal';
import { KmpCodeViewer } from './components/kmp/KmpCodeViewer';
import { Code2, Smartphone, Monitor, Sun, Moon, Globe } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('moschee');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isKmpOpen, setIsKmpOpen] = useState(false);
  const [selectedCallMember, setSelectedCallMember] = useState<BoardMember | null>(null);
  const [selectedEditMember, setSelectedEditMember] = useState<BoardMember | null>(null);

  // Language state: 'de' is default as requested, with 'sq' (Albanisch) and 'tr' (Türkisch)
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('app_language') as Language;
      if (stored && ['de', 'sq', 'tr'].includes(stored)) return stored;
    }
    return 'de';
  });

  const t = TRANSLATIONS[language];

  // User and board state
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>(BOARD_MEMBERS);
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [pushEnabled, setPushEnabled] = useState(true);

  // Theme state: defaults to dark or system preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme_preference');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  // View frame mode: 'mobile-frame' or 'fullscreen'
  const [viewMode, setViewMode] = useState<'mobile-frame' | 'fullscreen'>('mobile-frame');

  // Sync dark mode class with DOM
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_preference', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_preference', 'light');
    }
  }, [isDarkMode]);

  // Sync language with localStorage
  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  // Feed Actions
  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId: string, text: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            authorName: user.name,
            authorInitials: user.initials,
            text,
            timestamp: language === 'sq' ? 'Sapo' : language === 'tr' ? 'Az önce' : 'Gerade eben',
          };
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (content: string) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: user.name,
      authorInitials: user.initials,
      authorAvatarUrl: user.avatarUrl,
      timestamp: language === 'sq' ? 'Sapo' : language === 'tr' ? 'Az önce' : 'Gerade eben',
      content,
      likes: 0,
      isLiked: false,
      commentsCount: 0,
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  // Notification actions
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Call action
  const handleInitiateCall = (member: BoardMember) => {
    setSelectedCallMember(member);
    setActiveModal('phone_call');
  };

  // Board photo save action
  const handleSaveMemberPhoto = (memberId: string, newPhotoUrl: string | undefined) => {
    setBoardMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, avatarUrl: newPhotoUrl } : m))
    );
  };

  // Twint completed
  const handleCompleteDonation = (amount: number) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'payment',
      title: language === 'sq' ? 'Pagesa përmes TWINT u konfirmua' : language === 'tr' ? 'TWINT ile bağış onaylandı' : 'Spende über TWINT bestätigt',
      description: `CHF ${amount}.00 · ${MOSQUE_INFO.fullName}`,
      timestamp: language === 'sq' ? 'Sapo' : language === 'tr' ? 'Az önce' : 'Gerade eben',
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-slate-200/70 dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors flex flex-col items-center">
      {/* Top Global Control Bar */}
      <header className="w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-black/5 dark:border-white/10 px-4 py-2.5 flex items-center justify-between text-xs z-30">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {MOSQUE_INFO.fullName}
          </span>
          <span className="hidden sm:inline-block text-slate-400">·</span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#A58C6F]/15 text-[#8C7355] dark:text-[#C5B095] border border-[#A58C6F]/30">
            {MOSQUE_INFO.street}, {MOSQUE_INFO.zipCity}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Language Switcher */}
          <div className="flex items-center bg-black/5 dark:bg-white/5 rounded-xl p-0.5 border border-black/5 dark:border-white/10">
            {(['de', 'sq', 'tr'] as Language[]).map((langCode) => (
              <button
                key={langCode}
                onClick={() => setLanguage(langCode)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  language === langCode
                    ? 'bg-[#A58C6F] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title={langCode === 'de' ? 'Deutsch (Standard)' : langCode === 'sq' ? 'Shqip' : 'Türkçe'}
              >
                {langCode.toUpperCase()}
              </button>
            ))}
          </div>

          {/* View mode toggle */}
          <div className="hidden md:flex items-center bg-black/5 dark:bg-white/5 rounded-xl p-0.5 border border-black/5 dark:border-white/10">
            <button
              onClick={() => setViewMode('mobile-frame')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                viewMode === 'mobile-frame'
                  ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Smartphone-Ansicht"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
            <button
              onClick={() => setViewMode('fullscreen')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                viewMode === 'fullscreen'
                  ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Vollbild-Ansicht"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Vollbild</span>
            </button>
          </div>

          {/* Dark Mode Quick Switch */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors"
            title="Design umschalten"
            aria-label="Design umschalten"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* KMP Code Viewer Button */}
          <button
            onClick={() => setIsKmpOpen(true)}
            className="py-1 px-3 rounded-xl bg-gradient-to-r from-[#A58C6F] to-[#8C7355] text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:brightness-105 active:scale-95 transition-all"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>KMP Code</span>
          </button>
        </div>
      </header>

      {/* Main Container: Mobile Frame vs Responsive Fullscreen */}
      <main className="w-full flex-1 flex justify-center py-0 md:py-6 px-0 md:px-4">
        <div
          className={`relative transition-all duration-300 w-full ${
            viewMode === 'mobile-frame'
              ? 'max-w-[430px] min-h-[840px] md:rounded-[44px] shadow-2xl md:ring-1 md:ring-white/20 bg-slate-50/90 dark:bg-[#020617]/95 overflow-hidden flex flex-col border border-black/10 dark:border-white/10'
              : 'max-w-2xl min-h-screen bg-slate-50/90 dark:bg-[#020617]/95 overflow-hidden flex flex-col'
          }`}
        >
          {/* Smartphone Notch / Dynamic Island indicator */}
          {viewMode === 'mobile-frame' && (
            <div className="pt-3 pb-1 flex justify-center items-center pointer-events-none select-none">
              <div className="w-28 h-4 rounded-full bg-black/20 dark:bg-black/60 backdrop-blur-md" />
            </div>
          )}

          {/* Liquid Glass Background Orbs */}
          <div className="absolute top-12 -left-20 w-64 h-64 bg-[#A58C6F]/15 dark:bg-[#A58C6F]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-24 -right-20 w-64 h-64 bg-[#A58C6F]/15 dark:bg-[#A58C6F]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Scrollable Screen Content */}
          <div className="flex-1 px-4 pt-3 overflow-y-auto relative z-10 scrollbar-none">
            {activeTab === 'feed' && (
              <FeedTab
                announcements={INITIAL_ANNOUNCEMENTS}
                posts={posts}
                userAvatarUrl={user.avatarUrl}
                language={language}
                onOpenNewPost={() => setActiveModal('new_post')}
                onToggleLike={handleToggleLike}
                onAddComment={handleAddComment}
              />
            )}

            {activeTab === 'moschee' && (
              <MoscheeTab
                boardMembers={boardMembers}
                language={language}
                onOpenTwintModal={() => setActiveModal('twint_pay')}
                onInitiateCall={handleInitiateCall}
                onEditMemberPhoto={(member) => {
                  setSelectedEditMember(member);
                  setActiveModal('edit_member_photo');
                }}
              />
            )}

            {activeTab === 'profil' && (
              <ProfilTab
                user={user}
                payments={INITIAL_PAYMENTS}
                unreadNotificationsCount={unreadNotifCount}
                language={language}
                onOpenMemberCard={() => setActiveModal('member_card')}
                onOpenNotifications={() => setActiveModal('notifications')}
                onOpenSettings={() => setActiveModal('settings')}
                onOpenChangeAvatar={() => setActiveModal('change_avatar')}
                onLogout={() => {
                  alert(t.logoutAlert);
                }}
              />
            )}
          </div>

          {/* Floating Liquid-Glass Bottom Bar */}
          <GlassBottomBar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            unreadNotifications={unreadNotifCount > 0}
            labels={{
              feed: t.tabFeed,
              moschee: t.tabMosque,
              profil: t.tabProfile,
            }}
          />
        </div>
      </main>

      {/* Interactive Bottom Sheet Modals */}
      <NewPostModal
        isOpen={activeModal === 'new_post'}
        onClose={() => setActiveModal(null)}
        onSubmit={handleCreatePost}
        authorName={user.name}
      />

      <MemberCardModal
        isOpen={activeModal === 'member_card'}
        onClose={() => setActiveModal(null)}
        user={user}
        language={language}
      />

      <NotificationsModal
        isOpen={activeModal === 'notifications'}
        onClose={() => setActiveModal(null)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onClearNotifications={handleClearNotifications}
        onNotificationClick={handleNotificationClick}
      />

      <SettingsModal
        isOpen={activeModal === 'settings'}
        onClose={() => setActiveModal(null)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        pushEnabled={pushEnabled}
        onTogglePush={() => setPushEnabled(!pushEnabled)}
        language={language}
        onChangeLanguage={setLanguage}
        user={user}
        onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
      />

      {/* Profilfoto einstellen Modal */}
      <ChangeAvatarModal
        isOpen={activeModal === 'change_avatar'}
        onClose={() => setActiveModal(null)}
        currentAvatarUrl={user.avatarUrl}
        onSaveAvatar={(newUrl) => setUser((prev) => ({ ...prev, avatarUrl: newUrl }))}
        userName={user.name}
        language={language}
      />

      {/* Vorstandsfoto einstellen Modal */}
      <EditBoardMemberPhotoModal
        isOpen={activeModal === 'edit_member_photo'}
        onClose={() => setActiveModal(null)}
        member={selectedEditMember}
        onSavePhoto={handleSaveMemberPhoto}
        language={language}
      />

      <TwintModal
        isOpen={activeModal === 'twint_pay'}
        onClose={() => setActiveModal(null)}
        onCompleteDonation={handleCompleteDonation}
      />

      <PhoneCallModal
        isOpen={activeModal === 'phone_call'}
        onClose={() => setActiveModal(null)}
        member={selectedCallMember}
      />

      {/* KMP Multiplatform Code Inspector Modal */}
      <KmpCodeViewer
        isOpen={isKmpOpen}
        onClose={() => setIsKmpOpen(false)}
      />
    </div>
  );
}
