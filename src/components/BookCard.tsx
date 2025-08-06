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
  onClick: () => void;
}

export const BookCard = ({ post, onClick }: BookCardProps) => {
  return (
    <article 
      className="book-card"
      onClick={onClick}
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