import { useState } from 'react';
import './Toolbar.css';

interface ToolbarProps {
  onUpload: (files: FileList | null) => void;
  onAddText: () => void;
  onRandomize: () => void;
  onBackgroundChange: (color: string) => void;
}

const Toolbar = ({ onUpload, onAddText, onRandomize, onBackgroundChange }: ToolbarProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files);
    }
  };

  const predefinedColors = [
    '#FDFBF5', // Canvas Cream
    '#FFE5E5', // Soft Pink
    '#E5F4FF', // Soft Blue
    '#E5FFE5', // Soft Green
    '#FFF9E5', // Soft Yellow
    '#F5E5FF', // Soft Purple
    '#FFE5F0', // Soft Rose
    '#E8E8E8', // Gray
  ];

  return (
    <aside className="modern-toolbar">
      <div className="toolbar-content">
        <h3 className="toolbar-title">Tools</h3>
        
        <div className="tool-list">
          <button className="tool-item" onClick={onAddText} title="Add Text">
            <span className="material-icon">📝</span>
            <span className="tool-label">Add Text</span>
          </button>

          <label className="tool-item tool-item-active" title="Upload Image">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
            <span className="material-icon">🖼️</span>
            <span className="tool-label">Upload Image</span>
          </label>

          <button className="tool-item" title="Stickers (Coming Soon)">
            <span className="material-icon">😊</span>
            <span className="tool-label">Stickers</span>
          </button>

          <button className="tool-item" onClick={onRandomize} title="Shapes">
            <span className="material-icon">🔷</span>
            <span className="tool-label">Shapes</span>
          </button>

          <button 
            className="tool-item"
            onClick={() => setShowColorPicker(!showColorPicker)}
            title="Backgrounds"
          >
            <span className="material-icon">🎨</span>
            <span className="tool-label">Backgrounds</span>
          </button>

          {showColorPicker && (
            <div className="color-picker-panel">
              <div className="color-grid">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    className="color-swatch"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      onBackgroundChange(color);
                      setShowColorPicker(false);
                    }}
                    title={color}
                  />
                ))}
              </div>
              <div className="custom-color">
                <label>
                  Custom:
                  <input
                    type="color"
                    onChange={(e) => onBackgroundChange(e.target.value)}
                    className="color-input"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Toolbar;
