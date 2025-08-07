import { useState, useEffect } from 'react';
import { Timeline } from '../components/Timeline';
import { PostDetail } from '../components/PostDetail';
import { CreatePost } from '../components/CreatePost';
// ★ Dialog関連の部品をインポートします
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

type ViewState = 'timeline' | 'detail' | 'create';

interface Post {
  id: string;
  bookTitle: string;
  author: string;
  keywords: string[];
  color: string;
  userId: string;
}

// 初期モックデータ（ここは変更ありません）
const initialPosts: Post[] = [
  { id: '1', bookTitle: '人間失格', author: '太宰治', keywords: ['孤独', '絶望', '人間性'], color: '#6B73FF', userId: 'user1' },
  { id: '2', bookTitle: 'ノルウェイの森', author: '村上春樹', keywords: ['青春', '喪失', '記憶'], color: '#34D399', userId: 'user2' },
  { id: '3', bookTitle: '夜と霧', author: 'ヴィクトール・フランクル', keywords: ['希望', '強さ', '生きる意味'], color: '#F59E0B', userId: 'user3' }
];


const Index = () => {
  // 以前追加したstateや関数はそのまま残します
  const [currentView, setCurrentView] = useState<ViewState>('timeline');
  const [selectedPostId, setSelectedPostId] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem('book-palette-posts');
    return savedPosts ? JSON.parse(savedPosts) : initialPosts;
  });
  const [trashedPosts, setTrashedPosts] = useState<Post[]>(() => {
    const savedTrashedPosts = localStorage.getItem('book-palette-trashed-posts');
    return savedTrashedPosts ? JSON.parse(savedTrashedPosts) : [];
  });
  
  // ★ ゴミ箱モーダルの表示・非表示を管理するための新しいstateを追加
  const [isTrashOpen, setIsTrashOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('book-palette-posts', JSON.stringify(posts));
  }, [posts]);
  useEffect(() => {
    localStorage.setItem('book-palette-trashed-posts', JSON.stringify(trashedPosts));
  }, [trashedPosts]);

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    setCurrentView('detail');
  };
  const handleCreatePost = () => {
    setCurrentView('create');
  };
  const handleBack = () => {
    setCurrentView('timeline');
  };
  const handleSubmitPost = (postData: any) => {
    const newPost: Post = {
      id: Date.now().toString(),
      bookTitle: postData.bookTitle,
      author: postData.author,
      keywords: postData.keywords,
      color: postData.color,
      userId: 'currentUser'
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setCurrentView('timeline');
  };
  const handleDeletePost = (postId: string) => {
    const postToTrash = posts.find(p => p.id === postId);
    if (postToTrash) {
      setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
      setTrashedPosts(prevTrashed => [postToTrash, ...prevTrashed]);
    }
  };


  if (currentView === 'detail') {
    return ( <PostDetail postId={selectedPostId} posts={posts} onBack={handleBack} onDelete={handleDeletePost} /> );
  }

  if (currentView === 'create') {
    return ( <CreatePost onBack={handleBack} onSubmit={handleSubmitPost} /> );
  }

  return (
    // ★ React Fragment (<> ... </>)で全体を囲む
    <>
      <Timeline 
        posts={posts}
        onCreatePost={handleCreatePost}
        onPostClick={handlePostClick}
        // ★ ゴミ箱ボタンがクリックされたらモーダルを開く関数を渡す
        onTrashClick={() => setIsTrashOpen(true)}
      />

      {/* ★★★ ゴミ箱モーダルをここに追加 ★★★ */}
      <Dialog open={isTrashOpen} onOpenChange={setIsTrashOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ゴミ箱</DialogTitle>
          </DialogHeader>
          {/* 中身はまだ空なので、メッセージだけ表示 */}
          <p className="text-center text-muted-foreground py-8">
            (ここにゴミ箱の中身が表示されます)
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;