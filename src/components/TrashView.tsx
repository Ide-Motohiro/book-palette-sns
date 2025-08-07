import { Button } from './ui/button';
import { RefreshCw, Trash2 } from 'lucide-react';
import { Checkbox } from './ui/checkbox'; // ★ Checkboxをインポート

// Postの型定義
interface Post {
  id: string;
  bookTitle: string;
  author: string;
  // ... (他のプロパティは変更なし)
}

// TrashViewが受け取るプロパティを拡張
interface TrashViewProps {
  trashedPosts: Post[];
  selectedIds: string[]; // ★ 選択されている投稿IDの配列
  onToggleSelect: (postId: string) => void; // ★ 個別選択を切り替える関数
  onToggleSelectAll: () => void; // ★ 全選択を切り替える関数
  onRestoreSelected: () => void; // ★ 選択項目を復元する関数
  onDeleteSelected: () => void; // ★ 選択項目を完全削除する関数
}

export const TrashView = ({ 
  trashedPosts, 
  selectedIds, 
  onToggleSelect, 
  onToggleSelectAll,
  onRestoreSelected,
  onDeleteSelected
}: TrashViewProps) => {

  const allSelected = trashedPosts.length > 0 && selectedIds.length === trashedPosts.length;
  const isIndeterminate = selectedIds.length > 0 && !allSelected;

  if (trashedPosts.length === 0) {
    return <p className="text-center text-muted-foreground py-8">ゴミ箱は空です</p>;
  }

  return (
    <div>
      {/* ★ ヘッダー：全選択チェックボックス */}
      <div className="flex items-center p-2 border-b">
        <Checkbox 
          id="select-all"
          checked={allSelected}
          onCheckedChange={onToggleSelectAll}
          aria-label="すべて選択"
          className="mr-3"
        />
        <label htmlFor="select-all" className="text-sm font-medium">
          {selectedIds.length} / {trashedPosts.length} 件選択中
        </label>
      </div>

      {/* ★ 投稿リスト */}
      <div className="space-y-1 py-2 max-h-[50vh] overflow-y-auto">
        {trashedPosts.map(post => (
          <div 
            key={post.id} 
            className="flex items-center p-2 rounded-md hover:bg-secondary"
          >
            <Checkbox 
              id={`select-${post.id}`}
              checked={selectedIds.includes(post.id)}
              onCheckedChange={() => onToggleSelect(post.id)}
              className="mr-3"
            />
            <label htmlFor={`select-${post.id}`} className="flex-1 cursor-pointer">
              <p className="font-semibold">{post.bookTitle}</p>
              <p className="text-sm text-muted-foreground">{post.author}</p>
            </label>
          </div>
        ))}
      </div>

      {/* ★ フッター：一括操作ボタン */}
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button 
          variant="outline" 
          onClick={onRestoreSelected}
          disabled={selectedIds.length === 0}
        >
          <RefreshCw size={16} className="mr-2" /> 復元
        </Button>
        <Button 
          variant="destructive" 
          onClick={onDeleteSelected}
          disabled={selectedIds.length === 0}
        >
          <Trash2 size={16} className="mr-2" /> 完全に削除
        </Button>
      </div>
    </div>
  );
};