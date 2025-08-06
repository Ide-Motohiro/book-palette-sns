import { ArrowLeft } from 'lucide-react';

// モックデータの型定義
interface Post {
  id: string;
  bookTitle: string;
  author: string;
  keywords: string[];
  color: string;
  userId: string;
}

interface PostDetailProps {
  postId: string;
  onBack: () => void;
}

// モックデータ（実際の実装時はAPIから取得）
const getPostById = (id: string): Post | undefined => {
  const posts = [
    {
      id: '1',
      bookTitle: '人間失格',
      author: '太宰治',
      keywords: ['孤独', '絶望', '人間性', '自己嫌悪', '内省', '文学的', '重厚', '心理描写'],
      color: '#6B73FF',
      userId: 'user1'
    },
    {
      id: '2',
      bookTitle: 'ノルウェイの森',
      author: '村上春樹',
      keywords: ['青春', '喪失', '記憶', 'ノスタルジア', '恋愛', '成長', '哀愁'],
      color: '#34D399',
      userId: 'user2'
    },
    {
      id: '3',
      bookTitle: '夜と霧',
      author: 'ヴィクトール・フランクル',
      keywords: ['希望', '強さ', '生きる意味', '困難', '人間の尊厳', '哲学的', '深い'],
      color: '#F59E0B',
      userId: 'user3'
    }
  ];
  
  return posts.find(post => post.id === id);
};

export const PostDetail = ({ postId, onBack }: PostDetailProps) => {
  const post = getPostById(postId);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">投稿が見つかりません</p>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative transition-colors duration-300"
      style={{ backgroundColor: post.color + '20' }} // 20% opacity
    >
      {/* Header with back button */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={onBack}
            className="p-2 hover:bg-secondary rounded-lg transition-colors duration-150 mr-3"
            aria-label="戻る"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">投稿詳細</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Book Info */}
        <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6 border border-border mb-8">
          <h1 className="text-2xl font-bold text-card-foreground mb-2">
            {post.bookTitle}
          </h1>
          <p className="text-muted-foreground mb-4">
            著者: {post.author}
          </p>
          
          {/* Color indicator */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">イメージカラー:</span>
            <div
              className="w-8 h-8 rounded-full border-2 border-border shadow-sm"
              style={{ backgroundColor: post.color }}
            />
          </div>
        </div>

        {/* Keywords Tag Cloud */}
        <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold text-card-foreground mb-4 text-center">
            読後感キーワード
          </h2>
          <div className="tag-cloud">
            {post.keywords.map((keyword, index) => (
              <span
                key={index}
                className="keyword-tag text-base py-2 px-4"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.5s ease-out forwards'
                }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};