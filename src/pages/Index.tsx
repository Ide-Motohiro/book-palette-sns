import { useState, useEffect } from 'react'; // useEffectをインポート
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

// 初期モックデータ（localStorageが空の場合の初回データとして利用）
const initialPosts: Post[] = [
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
  
  // ★ 変更点1: localStorageから投稿データを読み込んでstateを初期化
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const savedPosts = localStorage.getItem('book-palette-posts');
      // 保存されたデータがあればそれを使い、なければ初期モックデータを使う
      return savedPosts ? JSON.parse(savedPosts) : initialPosts;
    } catch (error) {
      console.error("Failed to parse posts from localStorage", error);
      return initialPosts;
    }
  });

  // ★ 変更点2: postsのstateが変更されるたびにlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('book-palette-posts', JSON.stringify(posts));
  }, [posts]); // postsが変更された時だけこの処理が実行される

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
      userId: 'currentUser' // 本来はログインユーザーのIDなどが入ります
    };
    
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setCurrentView('timeline');
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  if (currentView === 'detail') {
    return (
      <PostDetail 
        postId={selectedPostId} 
        posts={posts}
        onBack={handleBack}
        onDelete={handleDeletePost}
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
    />
  );
};

export default Index;
