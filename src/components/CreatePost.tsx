import { useState } from 'react';
import { ArrowLeft, Plus, X, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Book {
  title: string;
  author: string;
}

interface CreatePostProps {
  onBack: () => void;
  onSubmit: (post: any) => void;
}

export const CreatePost = ({ onBack, onSubmit }: CreatePostProps) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [selectedColor, setSelectedColor] = useState('#6B73FF');

  // モック書籍検索結果
  const mockBooks = [
    { title: '人間失格', author: '太宰治' },
    { title: 'ノルウェイの森', author: '村上春樹' },
    { title: '夜と霧', author: 'ヴィクトール・フランクル' },
    { title: '君の名は。', author: '新海誠' },
    { title: '羊をめぐる冒険', author: '村上春樹' }
  ].filter(book => 
    book.title.includes(searchQuery) || book.author.includes(searchQuery)
  );

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (selectedBook && keywords.length > 0) {
      onSubmit({
        bookTitle: selectedBook.title,
        author: selectedBook.author,
        keywords,
        color: selectedColor
      });
    }
  };

  const presetColors = [
    '#6B73FF', '#34D399', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#F97316', '#84CC16', '#EC4899', '#6366F1'
  ];

  return (
    <div className="min-h-screen bg-user-bg">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="p-2 hover:bg-secondary rounded-lg transition-colors duration-150 mr-3"
              aria-label="戻る"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-semibold">新しい投稿</h1>
          </div>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedBook || keywords.length === 0}
            className="px-6"
          >
            投稿する
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Book Search */}
        <section className="bg-card rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold mb-4">本を選択</h2>
          
          {selectedBook ? (
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div>
                <p className="font-medium">{selectedBook.title}</p>
                <p className="text-sm text-muted-foreground">{selectedBook.author}</p>
              </div>
              <button
                onClick={() => setSelectedBook(null)}
                className="p-1 hover:bg-muted rounded"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  placeholder="書籍名または著者名で検索"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {searchQuery && (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {mockBooks.map((book, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedBook(book)}
                      className="w-full text-left p-3 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Keywords Input */}
        <section className="bg-card rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold mb-4">読後感キーワード</h2>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="キーワードを入力（例: 感動的、切ない、希望）"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                className="flex-1"
              />
              <Button onClick={addKeyword} size="sm" variant="outline">
                <Plus size={16} />
              </Button>
            </div>
            
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="keyword-tag flex items-center gap-1"
                  >
                    {keyword}
                    <button
                      onClick={() => removeKeyword(index)}
                      className="hover:bg-muted-foreground/20 rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Color Selection */}
        <section className="bg-card rounded-xl p-6 border border-border">
          <h2 className="text-lg font-semibold mb-4">イメージカラー</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">選択中:</span>
              <div
                className="w-8 h-8 rounded-full border-2 border-border"
                style={{ backgroundColor: selectedColor }}
              />
              <span className="text-sm font-mono">{selectedColor}</span>
            </div>
            
            <div className="grid grid-cols-5 gap-3">
              {presetColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full border-2 transition-all duration-150 hover:scale-110 ${
                    selectedColor === color ? 'border-foreground ring-2 ring-ring' : 'border-border'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-sm text-muted-foreground">カスタム:</label>
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-12 h-8 rounded border border-border cursor-pointer"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};