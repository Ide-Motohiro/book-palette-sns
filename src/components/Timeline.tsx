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
      <main className="max-w-2xl mx-auto px-4 py-6 pb-40"> {/* ★ ボタンと重ならないように余白を調整 */}
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

      {/* ★★★ 修正箇所: フローティングボタンのコンテナ ★★★ */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-4 z-20">
        {/* ゴミ箱ボタン */}
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full h-14 w-14 shadow-lg"
          aria-label="ゴミ箱を開く"
          // onClickはまだ設定しない
        >
          <Trash2 size={24} />
        </Button>
        
        {/* 新規投稿ボタン (Buttonコンポーネントに統一) */}
        <Button
          onClick={onCreatePost}
          aria-label="新しい投稿を作成"
          size="icon"
          className="rounded-full h-14 w-14 shadow-lg" // fabクラスの代わりに直接スタイルを指定
        >
          <Plus size={28} />
        </Button>
      </div>
    </div>
  );
};