import { BookCard } from './BookCard';
// ★★★ この行が重要です！ Plus と一緒に Trash2 を読み込みます ★★★
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
}

export const Timeline = ({ posts, onCreatePost, onPostClick }: TimelineProps) => {
  return (
    <div className="min-h-screen bg-user-bg relative">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Book Palette</h1>
        </div>
      </header>

      {/* Timeline Feed */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
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

      {/* フローティングボタンのコンテナ */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3">
        {/* ゴミ箱ボタン */}
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full h-12 w-12 shadow-lg"
          aria-label="ゴミ箱を開く"
        >
          <Trash2 size={20} />
        </Button>
        
        {/* 新規投稿ボタン */}
        <button
          onClick={onCreatePost}
          className="fab"
          aria-label="新しい投稿を作成"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};