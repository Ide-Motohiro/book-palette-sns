import { BookCard } from './BookCard';
import { Plus } from 'lucide-react';

// モックデータ
const mockPosts = [
  {
    id: '1',
    bookTitle: '人間失格',
    author: '太宰治',
    keywords: ['孤独', '絶望', '人間性'],
    color: '#6B73FF',
    userId: 'user1'
  },
  {
    id: '2',
    bookTitle: 'ノルウェイの森',
    author: '村上春樹',
    keywords: ['青春', '喪失', '記憶'],
    color: '#34D399',
    userId: 'user2'
  },
  {
    id: '3',
    bookTitle: '夜と霧',
    author: 'ヴィクトール・フランクル',
    keywords: ['希望', '強さ', '生きる意味'],
    color: '#F59E0B',
    userId: 'user3'
  }
];

interface TimelineProps {
  onCreatePost: () => void;
  onPostClick: (postId: string) => void;
}

export const Timeline = ({ onCreatePost, onPostClick }: TimelineProps) => {
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
          {mockPosts.map((post) => (
            <BookCard
              key={post.id}
              post={post}
              onClick={() => onPostClick(post.id)}
            />
          ))}
        </div>
      </main>

      {/* Floating Action Button */}
      <button
        onClick={onCreatePost}
        className="fab"
        aria-label="新しい投稿を作成"
      >
        <Plus size={24} />
      </button>
    </div>
  );
};