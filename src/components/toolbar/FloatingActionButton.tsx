import './FloatingActionButton.css';

interface FloatingActionButtonProps {
  onUpload: (files: FileList | null) => void;
}

const FloatingActionButton = ({ onUpload }: FloatingActionButtonProps) => {
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files);
    }
  };

  return (
    <div className="fab-container">
      <label className="fab">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
        <svg
          width="36"
          height="36"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 8V24M8 16H24"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </label>
    </div>
  );
};

export default FloatingActionButton;
