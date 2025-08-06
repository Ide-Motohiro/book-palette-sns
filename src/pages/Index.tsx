import { useState } from 'react';
import { Timeline } from '../components/Timeline';
import { PostDetail } from '../components/PostDetail';
import { CreatePost } from '../components/CreatePost';

type ViewState = 'timeline' | 'detail' | 'create';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('timeline');
  const [selectedPostId, setSelectedPostId] = useState<string>('');

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
    // 実際の実装時はAPIに投稿
    console.log('新しい投稿:', postData);
    setCurrentView('timeline');
  };

  if (currentView === 'detail') {
    return (
      <PostDetail 
        postId={selectedPostId} 
        onBack={handleBack}
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
      onCreatePost={handleCreatePost}
      onPostClick={handlePostClick}
    />
  );
};

export default Index;
