// Postの型定義をIndex.tsxからコピー
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
  // ゴミ箱が空の場合の表示
  if (trashedPosts.length === 0) {
    return <p className="text-center text-muted-foreground py-8">ゴミ箱は空です</p>;
  }

  // ゴミ箱に投稿がある場合の表示
  return (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
      {trashedPosts.map(post => (
        <div key={post.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
          <div>
            <p className="font-semibold">{post.bookTitle}</p>
            <p className="text-sm text-muted-foreground">{post.author}</p>
          </div>
          {/* ここにはまだボタンを配置しません */}
        </div>
      ))}
    </div>
  );
};