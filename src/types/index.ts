export type TabType = 'feed' | 'moschee' | 'profil';

export type ModalType = 
  | 'new_post' 
  | 'member_card' 
  | 'notifications' 
  | 'settings' 
  | 'edit_profile'
  | 'change_avatar'
  | 'edit_member_photo'
  | 'twint_pay'
  | 'phone_call'
  | null;

export interface PrayerTimeItem {
  id: string;
  name: string;
  arabicName: string;
  time: string; // "05:42"
  timestamp: Date;
  isNext?: boolean;
}

export interface BoardMember {
  id: string;
  name: string;
  role: 'Präsident' | 'Vize-Präsident' | 'Imam' | 'Kassier';
  phone: string;
  avatarUrl?: string;
  initials: string;
  email: string;
}

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  authorName: string;
  authorRole: string;
  category: 'Veranstaltung' | 'Gemeinschaft' | 'Wichtig';
  imageUrl?: string;
}

export interface CommunityComment {
  id: string;
  authorName: string;
  authorInitials: string;
  text: string;
  timestamp: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorInitials: string;
  authorAvatarUrl?: string;
  authorRole?: string;
  timestamp: string;
  content: string;
  likes: number;
  isLiked: boolean;
  commentsCount: number;
  comments: CommunityComment[];
}

export interface NotificationItem {
  id: string;
  type: 'announcement' | 'payment' | 'prayer' | 'community';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface PaymentRecord {
  id: string;
  year: number;
  period: string;
  amount: number;
  currency: string;
  status: 'Bezahlt' | 'Ausstehend';
  date: string;
  receiptNumber: string;
}

export interface UserProfile {
  id: string;
  name: string;
  initials: string;
  avatarUrl?: string;
  email: string;
  phone: string;
  status: string;
  memberId: string;
  memberSince: string;
  isOnline: boolean;
}
