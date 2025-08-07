import { useState, useEffect } from 'react';
import { Timeline } from '../components/Timeline';
import { PostDetail } from '../components/PostDetail';
import { CreatePost } from '../components/CreatePost';
import { TrashView } from '../components/TrashView';
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

const initialPosts: Post[] = [
  { id: '1', bookTitle: '人間失格', author: '太宰治', keywords: ['孤独', '絶望', '人間性'], color: '#6B73FF', userId: 'user1' },
  { id: '2', bookTitle: 'ノルウェイの森', author: '村上春樹', keywords: ['青春', '喪失', '記憶'], color: '#34D399', userId: 'user2' },
  { id: '3', bookTitle: '夜と霧', author: 'ヴィクトール・フランクル', keywords: ['希望', '強さ', '生きる意味'], color: '#F59E0B', userId: 'user3' }
];

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('timeline');
  const [selectedPostId, setSelectedPostId] = useState<string>('');
  
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const savedPosts = localStorage.getItem('book-palette-posts');
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts);
        if (Array.isArray(parsedPosts) && parsedPosts.length > 0) {
          return parsedPosts;
        }
      }
    } catch (error) {
      console.error("Failed to load posts from localStorage", error);
    }
    return initialPosts;
  });

  const [trashedPosts, setTrashedPosts] = useState<Post[]>(() => {
    const savedTrashedPosts = localStorage.getItem('book-palette-trashed-posts');
    return savedTrashedPosts ? JSON.parse(savedTrashedPosts) : [];
  });
  
  const [isTrashOpen, setIsTrashOpen] = useState(false);
  const [selectedTrashIds, setSelectedTrashIds] = useState<string[]>([]);

  useEffect(() => { localStorage.setItem('book-palette-posts', JSON.stringify(posts)); }, [posts]);
  useEffect(() => { localStorage.setItem('book-palette-trashed-posts', JSON.stringify(trashedPosts)); }, [trashedPosts]);
  
  const handleSubmitPost = (postData: any) => {
    const newPost: Post = {
      id: Date.now().toString(),
      bookTitle: postData.bookTitle,
      author: postData.author,
      keywords: postData.keywords,
      color: postData.color,
      userId: 'currentUser'
    };
    setPosts(prevPosts => {
      const userPosts = prevPosts.filter(p => !initialPosts.some(ip => ip.id === p.id));
      return [newPost, ...userPosts];
    });
    setCurrentView('timeline');
  };
  
  // ★★★ ここが修正点です ★★★
  const handleRestoreSelected = () => {
    // 復元する投稿を取得
    const postsToRestore = trashedPosts.filter(p => selectedTrashIds.includes(p.id));
    
    // ゴミ箱から復元対象を削除
    setTrashedPosts(prev => prev.filter(p => !selectedTrashIds.includes(p.id)));

    // タイムラインの投稿を更新
    setPosts(prevPosts => {
      // 現在のタイムラインからサンプル投稿をフィルタリングで除外
      const userPosts = prevPosts.filter(p => !initialPosts.some(ip => ip.id === p.id));
      // ユーザー自身の投稿リストに、復元した投稿を追加
      return [...postsToRestore, ...userPosts];
    });

    // 選択状態をクリア
    setSelectedTrashIds([]);
  };

  // ... (以降のコードは変更ありません) ...
  const handleToggleTrashSelection = (postId: string) => {
    setSelectedTrashIds(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };
  const handleToggleSelectAll = () => {
    if (selectedTrashIds.length === trashedPosts.length) {
      setSelectedTrashIds([]);
    } else {
      setSelectedTrashIds(trashedPosts.map(p => p.id));
    }
  };
  const handlePermanentlyDeleteSelected = () => {
    if (window.confirm(`${selectedTrashIds.length}件の投稿を完全に削除します。この操作は元に戻せません。`)) {
      setTrashedPosts(prev => prev.filter(p => !selectedTrashIds.includes(p.id)));
      setSelectedTrashIds([]);
    }
  };
  const handleTrashOpenChange = (open: boolean) => {
    setIsTrashOpen(open);
    if (!open) {
      setSelectedTrashIds([]);
    }
  };
  const handleDeletePost = (postId: string) => {
    const postToTrash = posts.find(p => p.id === postId);
    if (postToTrash) {
      setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
      setTrashedPosts(prevTrashed => [postToTrash, ...prevTrashed]);
    }
  };
  const handlePostClick = (postId: string) => { setSelectedPostId(postId); setCurrentView('detail'); };
  const handleCreatePost = () => { setCurrentView('create'); };
  const handleBack = () => { setCurrentView('timeline'); };

  if (currentView === 'detail') { return ( <PostDetail postId={selectedPostId} posts={posts} onBack={handleBack} onDelete={handleDeletePost} /> ); }
  if (currentView === 'create') { return ( <CreatePost onBack={handleBack} onSubmit={handleSubmitPost} /> ); }

  return (
    <>
      <Timeline 
        posts={posts}
        onCreatePost={handleCreatePost}
        onPostClick={handlePostClick}
        onTrashClick={() => setIsTrashOpen(true)}
      />
      <Dialog open={isTrashOpen} onOpenChange={handleTrashOpenChange}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>ゴミ箱</DialogTitle>
          </DialogHeader>
          <TrashView 
            trashedPosts={trashedPosts}
            selectedIds={selectedTrashIds}
            onToggleSelect={handleToggleTrashSelection}
            onToggleSelectAll={handleToggleSelectAll}
            onRestoreSelected={handleRestoreSelected}
            onDeleteSelected={handlePermanentlyDeleteSelected}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;