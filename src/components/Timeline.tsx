import { BookCard } from './BookCard';
import { Plus, Trash2 } from 'lucide-react'; // Trash2 アイコンをインポート
import { Button } from './ui/button'; // Buttonコンポーネントをインポート

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
        {/* ★ ヘッダーからゴミ箱ボタンを削除 */}
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

      {/* ★★★ 変更点: フローティングボタンのコンテナ ★★★ */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3">
        {/* ゴミ箱ボタン */}
        <Button
          variant="secondary" // スタイルを少し変更
          size="icon"
          className="rounded-full h-12 w-12 shadow-lg"
          aria-label="ゴミ箱を開く"
          // onClickはまだ設定しない
        >
          <Trash2 size={20} />
        </Button>
        
        {/* 新規投稿ボタン */}
        <button
          onClick={onCreatePost}
          className="fab" // fabクラスはそのまま利用
          aria-label="新しい投稿を作成"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};