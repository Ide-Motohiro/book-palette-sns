import { BookCard } from './BookCard'; // BookCardをインポート

// Postの型定義
interface Post {
  id: string;
  bookTitle: string;
  author: string;
  keywords: string[];
  color: string;
  userId: string;
}

interface TrashViewProps {
  trashedPosts: Post[];
}

export const TrashView = ({ trashedPosts }: TrashViewProps) => {
  // ゴミ箱が空の場合
  if (trashedPosts.length === 0) {
    return <p className="text-center text-muted-foreground py-8">ゴミ箱は空です</p>;
  }

  // ゴミ箱に投稿がある場合
  return (
    // ★ リスト全体の見た目を調整
    <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1 -mr-2">
      {trashedPosts.map(post => (
        <BookCard
          key={post.id}
          post={post}
          // ここではonClickを渡さないことで、クリックできないカードとして表示
        />
      ))}
    </div>
  );
};