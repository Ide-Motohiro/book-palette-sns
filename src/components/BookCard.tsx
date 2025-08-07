import { cn } from "@/lib/utils";

interface Post {
  id: string;
  bookTitle: string;
  author: string;
  keywords: string[];
  color: string;
  userId: string;
}

interface BookCardProps {
  post: Post;
  onClick?: () => void; // ★ onClickを必須ではなくオプショナル（任意）に変更
}

export const BookCard = ({ post, onClick }: BookCardProps) => {
  return (
    <article 
      // ★★★ この部分で、クリックできない時は見た目を調整 ★★★
      className={cn(
        "book-card relative overflow-hidden",
        // onClickが指定されていない場合は、カーソルやホバーエフェクトを無効化
        !onClick && "cursor-default hover:bg-card hover:shadow-sm"
      )}
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${post.color}08, ${post.color}15)`
      }}
    >
      {/* Book Title and Author */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-card-foreground line-clamp-2">
          {post.bookTitle}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          著者: {post.author}
        </p>
      </div>

      {/* Keywords Preview (max 3) */}
      <div className="flex flex-wrap gap-2">
        {post.keywords.slice(0, 3).map((keyword, index) => (
          <span
            key={index}
            className="keyword-tag"
          >
            {keyword}
          </span>
        ))}
        {post.keywords.length > 3 && (
          <span className="keyword-tag opacity-60">
            +{post.keywords.length - 3}
          </span>
        )}
      </div>

      {/* Color indicator */}
      <div className="mt-3 flex items-center justify-end">
        <div
          className="w-6 h-6 rounded-full border-2 border-border"
          style={{ backgroundColor: post.color }}
          aria-label="投稿のイメージカラー"
        />
      </div>
    </article>
  );
};