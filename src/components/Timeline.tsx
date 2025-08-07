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
  onTrashClick: () => void; // ★ onTrashClickプロパティの型定義を追加
}

export const Timeline = ({ posts, onCreatePost, onPostClick, onTrashClick }: TimelineProps) => {
  return (
    <div className="min-h-screen bg-user-bg relative">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">Book Palette</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 pb-40">
        <div className="space-y-4">
          {posts.map((post) => (
            <BookCard key={post.id} post={post} onClick={() => onPostClick(post.id)} />
          ))}
        </div>
      </main>

      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-4 z-20">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full h-14 w-14 shadow-lg"
          aria-label="ゴミ箱を開く"
          onClick={onTrashClick} // ★ クリックされたら onTrashClick を呼び出す
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