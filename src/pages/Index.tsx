import { useState, useEffect } from 'react';
import { Timeline } from '../components/Timeline';
import { PostDetail } from '../components/PostDetail';
import { CreatePost } from '../components/CreatePost';

type ViewState = 'timeline' | 'detail' | 'create';

interface Post {
  id: string;
  bookTitle: string;
  author: string;
  keywords: string[];
  color: string;
  userId: string;
}

// 初期モックデータ
const initialPosts: Post[] = [
  // ... （ここのデータは変更ありません）
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

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('timeline');
  const [selectedPostId, setSelectedPostId] = useState<string>('');

  // タイムラインに表示される投稿リスト
  const [posts, setPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem('book-palette-posts');
    return savedPosts ? JSON.parse(savedPosts) : initialPosts;
  });

  // ★ 変更点1: ゴミ箱内の投稿リストを管理する新しいstateを追加
  const [trashedPosts, setTrashedPosts] = useState<Post[]>(() => {
    const savedTrashedPosts = localStorage.getItem('book-palette-trashed-posts');
    return savedTrashedPosts ? JSON.parse(savedTrashedPosts) : [];
  });

  // `posts`が変更されたらlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('book-palette-posts', JSON.stringify(posts));
  }, [posts]);

  // ★ 変更点2: `trashedPosts`が変更されたら、それもlocalStorageに保存
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
      // ... (中身は変更なし)
      bookTitle: postData.bookTitle,
      author: postData.author,
      keywords: postData.keywords,
      color: postData.color,
      userId: 'currentUser'
    };
    
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setCurrentView('timeline');
  };

  // ★ 変更点3: handleDeletePostの処理を「削除」から「ゴミ箱への移動」に変更
  const handleDeletePost = (postId: string) => {
    const postToTrash = posts.find(p => p.id === postId);
    if (postToTrash) {
      // タイムラインのリストからは削除
      setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
      // ゴミ箱リストへは追加
      setTrashedPosts(prevTrashed => [postToTrash, ...prevTrashed]);
    }
  };


  if (currentView === 'detail') {
    return (
      <PostDetail 
        postId={selectedPostId} 
        posts={posts}
        onBack={handleBack}
        onDelete={handleDeletePost} // 渡す関数は同じだが、中の処理が変わった
      />
    );
  }

  if (currentView === 'create') {
    return (
      <CreatePost 
        onBack={handleBack}
        onSubmit={handleSubmitPost}
      />
    );
  }

  return (
    <Timeline 
      posts={posts}
      onCreatePost={handleCreatePost}
      onPostClick={handlePostClick}
      // onResetは一旦削除（後でゴミ箱画面に追加します）
    />
  );
};

export default Index;