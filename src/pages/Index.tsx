import { useState } from 'react';
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
  const [posts, setPosts] = useState<Post[]>(initialPosts);

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
