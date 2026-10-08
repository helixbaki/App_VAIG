import React, { useState } from 'react';
import { Plus, Heart, MessageCircle, Send, Sparkles } from 'lucide-react';
import { Announcement, CommunityPost } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { SectionHeader } from '../common/SectionHeader';
import { Avatar } from '../common/Avatar';
import { RoleBadge } from '../common/RoleBadge';
import { Language, TRANSLATIONS } from '../../utils/translations';

interface FeedTabProps {
  announcements: Announcement[];
  posts: CommunityPost[];
  userAvatarUrl?: string;
  language?: Language;
  onOpenNewPost: () => void;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
}

export const FeedTab: React.FC<FeedTabProps> = ({
  announcements,
  posts,
  userAvatarUrl,
  language = 'de',
  onOpenNewPost,
  onToggleLike,
  onAddComment,
}) => {
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const t = TRANSLATIONS[language];

  const handleSendComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    onAddComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Top Header */}
      <header className="flex items-center justify-between pt-2 px-1">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.feedTitle}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t.feedSub}
          </p>
        </div>

        <button
          onClick={onOpenNewPost}
          className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#A58C6F] to-[#8C7355] text-white flex items-center justify-center shadow-lg shadow-[#A58C6F]/30 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label={t.newPost}
          title={t.newPost}
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>
      </header>

      {/* Sektion A: Wichtige Ankündigungen (Horizontal Carousel) */}
      <section>
        <SectionHeader
          title={t.announcementsTitle}
          subtitle={t.announcementsSub}
        />

        <div className="flex gap-4 overflow-x-auto pb-3 pt-1 -mx-4 px-4 scrollbar-none snap-x snap-mandatory">
          {announcements.map((item) => (
            <div key={item.id} className="min-w-[280px] max-w-[320px] snap-center shrink-0">
              <GlassCard className="h-full flex flex-col overflow-hidden border border-[#A58C6F]/25 hover:border-[#A58C6F]/40 transition-all duration-200">
                {/* Hero banner pattern with warm golden mosque atmosphere */}
                <div className="relative h-28 bg-gradient-to-br from-[#A58C6F] via-[#8C7355] to-[#5C4B38] p-4 flex flex-col justify-between overflow-hidden">
                  {/* Decorative Islamic arch watermark */}
                  <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none translate-x-4 translate-y-2">
                    <svg width="120" height="120" viewBox="0 0 100 100" fill="white">
                      <path d="M 50 10 C 35 30 20 50 20 80 L 80 80 C 80 50 65 30 50 10 Z" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/30 backdrop-blur-md text-amber-200 border border-amber-200/20">
                      <Sparkles className="w-3 h-3" />
                      {item.category}
                    </span>
                    <span className="text-[11px] text-white/80 font-medium">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-1 drop-shadow-sm z-10">
                    {item.title}
                  </h3>
                </div>

                {/* Content body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>

                  <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar
                        initials={item.authorName.split(' ').map((n) => n[0]).join('')}
                        name={item.authorName}
                        imageUrl={item.imageUrl}
                        size="sm"
                      />
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {item.authorName}
                      </span>
                    </div>
                    <RoleBadge role={item.authorRole} />
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </section>

      {/* Sektion B: Community Feed (Vertikal scrollend) */}
      <section className="space-y-3">
        <SectionHeader
          title={t.communityTitle}
          subtitle={t.communitySub}
        />

        <div className="space-y-3.5">
          {posts.map((post) => {
            const isExpanded = expandedPostId === post.id;

            return (
              <GlassCard key={post.id} className="p-4 space-y-3.5">
                {/* Author Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar
                      initials={post.authorInitials}
                      name={post.authorName}
                      imageUrl={post.authorAvatarUrl || (post.authorName === 'Seran Islami' ? userAvatarUrl : undefined)}
                      size="md"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {post.authorName}
                        </span>
                        {post.authorRole && (
                          <RoleBadge role={post.authorRole} className="scale-90 origin-left" />
                        )}
                      </div>
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {post.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {/* Interactive Action Bar: Like & Comments */}
                <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Like button */}
                    <button
                      onClick={() => onToggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-xl transition-all duration-200 active:scale-95 ${
                        post.isLiked
                          ? 'text-rose-600 bg-rose-500/10 dark:text-rose-400 dark:bg-rose-500/20'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform duration-200 ${
                          post.isLiked ? 'fill-rose-500 stroke-rose-500 scale-110' : ''
                        }`}
                      />
                      <span>{post.likes}</span>
                    </button>

                    {/* Comment expand button */}
                    <button
                      onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                      className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/5 transition-all active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments.length}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                    className="text-xs font-medium text-[#A58C6F] hover:underline"
                  >
                    {isExpanded ? t.hide : t.reply}
                  </button>
                </div>

                {/* Expanded Comments Section */}
                {isExpanded && (
                  <div className="pt-3 border-t border-black/5 dark:border-white/5 space-y-3 animate-in fade-in duration-200">
                    {post.comments.length > 0 ? (
                      <div className="space-y-2.5 pl-2 border-l-2 border-[#A58C6F]/30">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-slate-800 dark:text-slate-200">
                                {comment.authorName}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {comment.timestamp}
                              </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300">
                              {comment.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        {t.noReplies}
                      </p>
                    )}

                    {/* Quick reply input */}
                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="text"
                        placeholder={t.replyPlaceholder}
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendComment(post.id);
                        }}
                        className="flex-1 text-xs px-3 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#A58C6F]"
                      />
                      <button
                        onClick={() => handleSendComment(post.id)}
                        className="p-2 rounded-xl bg-[#A58C6F] text-white hover:bg-[#8C7355] transition-colors"
                        title={t.sendReply}
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      </section>
    </div>
  );
};
