import { useState } from 'react';
import { textStyles, textStyleCategories, type TextStyle } from '../../data/textStyles';
import { X } from 'lucide-react';
import './TextStylesModal.css';

interface TextStylesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStyle: (style: TextStyle) => void;
}

const TextStylesModal = ({ isOpen, onClose, onSelectStyle }: TextStylesModalProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('handwritten');

  if (!isOpen) return null;

  const filteredStyles = textStyles.filter(style => style.category === selectedCategory);

  return (
    <div className="text-styles-modal-overlay" onClick={onClose}>
      <div className="text-styles-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Choose Text Style</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        <div className="category-tabs">
          {textStyleCategories.map(category => (
            <button
              key={category.id}
              className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="styles-grid">
          {filteredStyles.map(style => (
            <button
              key={style.id}
              className="style-preview"
              onClick={() => {
                onSelectStyle(style);
                // Delay closing to ensure text is added first
                setTimeout(() => onClose(), 50);
              }}
            >
              <span
                style={{
                  fontFamily: style.fontFamily,
                  fontSize: `${Math.min(style.fontSize * 0.5, 32)}px`,
                  color: style.fill,
                  fontWeight: style.fontWeight,
                  fontStyle: style.fontStyle,
                  textShadow: style.shadow,
                  WebkitTextStroke: style.stroke && style.strokeWidth 
                    ? `${style.strokeWidth * 0.5}px ${style.stroke}` 
                    : undefined,
                }}
              >
                Aa
              </span>
              <span className="style-name">{style.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextStylesModal;
