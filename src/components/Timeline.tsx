import { BookCard } from './BookCard';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

interface Post {
  id: string;
  bookTitle: string;
  author: string;
  keywords: string[];
  color: string;
  userId: string;
}

interface TimelineProps {
  posts: Post[];
  onCreatePost: () => void;
  onPostClick: (postId: string) => void;
  onTrashClick: () => void;
}

export const Timeline = ({ posts, onCreatePost, onPostClick, onTrashClick }: TimelineProps) => {
  return (
    <div className="min-h-screen bg-user-bg relative">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        {/* ★★★ このdivから justify-between とゴミ箱ボタンを削除 ★★★ */}
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center">
          
          <div className="flex items-center gap-3">
            <img src="/favicon.ico" alt="Book Palette Favicon" className="h-8 w-8" />
            <h1 className="text-2xl font-bold text-foreground">Book Palette</h1>
          </div>
          
          {/* ヘッダー右端のゴミ箱ボタンはここに無くなりました */}

        </div>
      </header>

      {/* Timeline Feed */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-40">
        <div className="space-y-4">
          {posts.map((post) => (
            <BookCard
              key={post.id}
              post={post}
              onClick={() => onPostClick(post.id)}
            />
          ))}
        </div>
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-4 z-20">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full h-14 w-14 shadow-lg"
          aria-label="ゴミ箱を開く"
          onClick={onTrashClick}
        >
          <Trash2 size={24} />
        </Button>
        <Button
          onClick={onCreatePost}
          aria-label="新しい投稿を作成"
          size="icon"
          className="rounded-full h-14 w-14 shadow-lg"
        >
          <Plus size={28} />
        </Button>
      </div>
    </div>
  );
};