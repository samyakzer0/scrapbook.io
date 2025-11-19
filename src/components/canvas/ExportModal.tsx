import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../../utils/soundManager';
import './ExportModal.css';

interface ExportModalProps {
  canvasRef: React.RefObject<any>;
  onClose: () => void;
}

const ExportModal = ({ canvasRef, onClose }: ExportModalProps) => {
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  const [quality, setQuality] = useState(90);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!canvasRef.current) return;

    setIsExporting(true);

    try {
      const dataURL = await canvasRef.current.exportCanvas(format, quality);
      
      // Create download link
      const link = document.createElement('a');
      const timestamp = new Date().toISOString().split('T')[0];
      const randomId = Math.random().toString(36).substring(7);
      link.download = `scrapbook-${timestamp}-${randomId}.${format}`;
      link.href = dataURL;
      link.click();

      soundManager.play('exportSuccess');
      
      setTimeout(() => {
        setIsExporting(false);
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content paper-texture"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>Export Your Scrapbook</h2>
            <button className="modal-close" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="modal-body">
            <div className="export-option">
              <label className="option-label">Format</label>
              <div className="format-buttons">
                <button
                  className={`format-button ${format === 'png' ? 'active' : ''}`}
                  onClick={() => setFormat('png')}
                >
                  PNG
                  <span className="format-desc">Transparent background</span>
                </button>
                <button
                  className={`format-button ${format === 'jpeg' ? 'active' : ''}`}
                  onClick={() => setFormat('jpeg')}
                >
                  JPEG
                  <span className="format-desc">Smaller file size</span>
                </button>
              </div>
            </div>

            <div className="export-option">
              <label className="option-label">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="60"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="quality-slider"
              />
              <div className="quality-labels">
                <span>Good (60%)</span>
                <span>Better (80%)</span>
                <span>Best (100%)</span>
              </div>
            </div>

            <div className="export-info">
              <p>📐 Resolution: 3840 x 2160 (2x scale)</p>
              <p>💾 Your scrapbook will be downloaded automatically</p>
            </div>
          </div>

          <div className="modal-footer">
            <button className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button
              className="primary-button large"
              onClick={handleExport}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <span className="spinner"></span>
                  Exporting...
                </>
              ) : (
                <>
                  Download {format.toUpperCase()}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExportModal;
