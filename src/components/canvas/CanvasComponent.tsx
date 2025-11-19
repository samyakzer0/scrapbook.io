import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Canvas, FabricImage, IText, Point, Rect } from 'fabric';
import { soundManager } from '../../utils/soundManager';
import type { Template } from '../../data/templates';
import { textStyles, type TextStyle } from '../../data/textStyles';
import TextStylesModal from '../ui/TextStylesModal';
import './CanvasComponent.css';

interface CanvasComponentProps {
  template?: Template;
}

export interface CanvasComponentRef {
  handleImageUpload: (files: FileList) => void;
  addText: () => void;
  randomizeLayout: () => void;
  setBackgroundColor: (color: string) => void;
  exportCanvas: (format: 'png' | 'jpeg', quality: number) => Promise<string>;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const CanvasComponent = forwardRef<CanvasComponentRef, CanvasComponentProps>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const uploadedImagesRef = useRef<string[]>([]);
  const isPanningRef = useRef(false);
  const lastPosXRef = useRef(0);
  const lastPosYRef = useRef(0);
  const touchStartDistanceRef = useRef(0);
  const lastZoomRef = useRef(1);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; target: any } | null>(null);
  const longPressTimerRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedImageRef = useRef<any>(null);
  const historyRef = useRef<string[]>([]);
  const historyStepRef = useRef(0);
  const activeTemplateRef = useRef<Template | null>(null);
  const templatePlaceholdersRef = useRef<Map<string, any>>(new Map());
  const selectedPlaceholderIdRef = useRef<string | null>(null);
  const [showTextStylesModal, setShowTextStylesModal] = useState(false);

  useImperativeHandle(ref, () => ({
    handleImageUpload,
    addText,
    randomizeLayout,
    setBackgroundColor,
    exportCanvas,
    undo: handleUndo,
    redo: handleRedo,
    canUndo: () => historyStepRef.current > 0,
    canRedo: () => historyStepRef.current < historyRef.current.length - 1,
  }));

  // Initialize template when component mounts or template changes
  useEffect(() => {
    if (props.template && fabricCanvasRef.current) {
      activeTemplateRef.current = props.template;
      
      // Clear any existing placeholders
      templatePlaceholdersRef.current.forEach(placeholder => {
        fabricCanvasRef.current?.remove(placeholder);
      });
      templatePlaceholdersRef.current.clear();
      
      // Render placeholders for photo slots
      renderTemplatePlaceholders();
      
      // Add template guide overlays (text, stickers, etc.)
      addTemplateGuides();
    }
  }, [props.template]);

  const addTemplateGuides = () => {
    if (!fabricCanvasRef.current || !activeTemplateRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const canvasWidth = canvas.width || 1000;
    const canvasHeight = canvas.height || 1000;
    
    // Add non-photo template elements (text, stickers, tape)
    activeTemplateRef.current.elements.forEach((element) => {
      if (element.type === 'text' && element.content) {
        const text = new IText(element.content, {
          left: (element.x / 100) * canvasWidth,
          top: (element.y / 100) * canvasHeight,
          fontSize: 32,
          fontFamily: 'Indie Flower',
          fill: '#ffffff',
          angle: element.rotation,
          opacity: element.style?.opacity || 1,
        });
        canvas.add(text);
      } else if (element.type === 'sticker' && element.content) {
        const sticker = new IText(element.content, {
          left: (element.x / 100) * canvasWidth,
          top: (element.y / 100) * canvasHeight,
          fontSize: 48,
          angle: element.rotation,
        });
        canvas.add(sticker);
      }
    });
  };

  const renderTemplatePlaceholders = () => {
    if (!fabricCanvasRef.current || !activeTemplateRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const canvasWidth = canvas.width || 1000;
    const canvasHeight = canvas.height || 1000;
    
    // Get all photo slots from template
    const photoSlots = activeTemplateRef.current.elements.filter(el => el.type === 'photo');
    
    photoSlots.forEach((slot, index) => {
      const slotWidth = (slot.width / 100) * canvasWidth;
      const slotHeight = (slot.height / 100) * canvasHeight;
      const slotX = (slot.x / 100) * canvasWidth;
      const slotY = (slot.y / 100) * canvasHeight;
      
      // Create placeholder rectangle
      const placeholder = new Rect({
        left: slotX,
        top: slotY,
        width: slotWidth,
        height: slotHeight,
        fill: '#1a1a1a',
        stroke: '#4d9eff',
        strokeWidth: 2,
        strokeDashArray: [10, 5],
        selectable: true,
        hasControls: false,
        hasBorders: false,
        lockMovementX: true,
        lockMovementY: true,
        hoverCursor: 'pointer',
        angle: slot.rotation || 0,
      }) as any;
      
      // Store metadata on the placeholder
      placeholder.placeholderId = `placeholder-${index}`;
      placeholder.templateSlot = slot;
      placeholder.slotIndex = index;
      
      // Add click handler to trigger upload
      placeholder.on('mousedown', () => {
        selectedPlaceholderIdRef.current = placeholder.placeholderId;
        // Create and trigger file input
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
          const files = (e.target as HTMLInputElement).files;
          if (files && files.length > 0) {
            replacePlaceholderWithImage(placeholder, files[0]);
          }
        };
        input.click();
      });
      
      canvas.add(placeholder);
      templatePlaceholdersRef.current.set(placeholder.placeholderId, placeholder);
    });
    
    canvas.renderAll();
  };

  const replacePlaceholderWithImage = (placeholder: any, file: File) => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const slot = placeholder.templateSlot;
    const canvasWidth = canvas.width || 1000;
    const canvasHeight = canvas.height || 1000;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgUrl = e.target?.result as string;
      
      FabricImage.fromURL(imgUrl).then((img) => {
        const slotWidth = (slot.width / 100) * canvasWidth;
        const slotHeight = (slot.height / 100) * canvasHeight;
        const slotX = (slot.x / 100) * canvasWidth;
        const slotY = (slot.y / 100) * canvasHeight;
        
        // Scale image to fit slot while maintaining aspect ratio
        const imgAspect = img.width! / img.height!;
        const slotAspect = slotWidth / slotHeight;
        
        let scale;
        if (imgAspect > slotAspect) {
          scale = slotWidth / img.width!;
        } else {
          scale = slotHeight / img.height!;
        }
        
        img.scale(scale);
        img.rotate(slot.rotation || 0);
        
        // Position at slot location (centered)
        img.set({
          left: slotX + slotWidth / 2,
          top: slotY + slotHeight / 2,
          originX: 'center',
          originY: 'center',
        });
        
        // Apply slot styling
        if (slot.style?.border) {
          img.set({
            stroke: 'white',
            strokeWidth: parseInt(slot.style.border) || 12,
          });
        }
        
        if (slot.style?.shadow) {
          img.set({
            shadow: slot.style.shadow as any,
          });
        }
        
        // Remove placeholder
        canvas.remove(placeholder);
        templatePlaceholdersRef.current.delete(placeholder.placeholderId);
        
        // Add image
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        saveHistory();
        soundManager.play('imageUpload');
      });
    };
    
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: window.innerWidth - 280, // Account for toolbar
      height: window.innerHeight - 80, // Account for header
      backgroundColor: 'transparent',
      selection: true,
      preserveObjectStacking: true,
    });

    fabricCanvasRef.current = canvas;

    // Save initial state
    saveHistory();

    // Track canvas modifications
    canvas.on('object:added', () => saveHistory());
    canvas.on('object:modified', () => saveHistory());
    canvas.on('object:removed', () => saveHistory());

    // Get canvas element for touch events
    const canvasElement = canvas.getElement();

    // Long press detection for images
    let longPressTimer: number | null = null;

    canvas.on('mouse:down', (opt) => {
      const target = opt.target;
      if (target && target.type === 'image') {
        longPressTimer = window.setTimeout(() => {
          // Show context menu at mouse position
          const evt = opt.e as MouseEvent;
          setContextMenu({
            x: evt.clientX,
            y: evt.clientY,
            target: target
          });
          longPressTimer = null;
        }, 500); // 500ms for long press
      }
    });

    canvas.on('mouse:up', () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    });

    canvas.on('mouse:move', () => {
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    });

    // Touch long press
    canvasElement.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        const target = canvas.findTarget(e as any);
        if (target && target.type === 'image') {
          longPressTimerRef.current = window.setTimeout(() => {
            const touch = e.touches[0];
            setContextMenu({
              x: touch.clientX,
              y: touch.clientY,
              target: target
            });
            longPressTimerRef.current = null;
          }, 500);
        }
      }
    }, { passive: true });

    canvasElement.addEventListener('touchend', () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
    }, { passive: true });

    canvasElement.addEventListener('touchmove', () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
    }, { passive: true });

    // Infinite canvas with zoom and pan
    // Mouse wheel zoom
    canvas.on('mouse:wheel', (opt) => {
      const delta = opt.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      
      // Zoom limits
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      
      canvas.zoomToPoint(new Point(opt.e.offsetX, opt.e.offsetY), zoom);
      setZoomLevel(Math.round(zoom * 100));
      
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    // Panning with space key or when no object is selected
    canvas.on('mouse:down', (opt) => {
      const evt = opt.e as MouseEvent;
      
      // Enable panning with space key, middle mouse, or Alt key
      if (evt.altKey || evt.button === 1 || (evt as any).code === 'Space') {
        isPanningRef.current = true;
        lastPosXRef.current = evt.clientX;
        lastPosYRef.current = evt.clientY;
        canvas.selection = false;
        canvas.defaultCursor = 'grabbing';
        canvas.hoverCursor = 'grabbing';
      }
    });

    canvas.on('mouse:move', (opt) => {
      if (isPanningRef.current) {
        const evt = opt.e as MouseEvent;
        const vpt = canvas.viewportTransform;
        if (vpt) {
          vpt[4] += evt.clientX - lastPosXRef.current;
          vpt[5] += evt.clientY - lastPosYRef.current;
          canvas.requestRenderAll();
          lastPosXRef.current = evt.clientX;
          lastPosYRef.current = evt.clientY;
        }
      }
    });

    canvas.on('mouse:up', () => {
      isPanningRef.current = false;
      canvas.selection = true;
      canvas.defaultCursor = 'default';
      canvas.hoverCursor = 'move';
    });

    // Keyboard support for space bar panning
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isPanningRef.current) {
        e.preventDefault();
        canvas.defaultCursor = 'grab';
        canvas.hoverCursor = 'grab';
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        canvas.defaultCursor = 'default';
        canvas.hoverCursor = 'move';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Touch gestures for mobile/tablet
    let touchStartX = 0;
    let touchStartY = 0;
    let isTouchPanning = false;
    
    // Touch start
    canvasElement.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        // Two-finger touch for pinch zoom
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        touchStartDistanceRef.current = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        );
        lastZoomRef.current = canvas.getZoom();
        isTouchPanning = false;
      } else if (e.touches.length === 1) {
        // Single touch - check if on empty space for panning
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        
        // Check if touching an object
        const target = canvas.findTarget(e as any);
        if (!target) {
          // No object touched, enable panning
          isTouchPanning = true;
          e.preventDefault();
        } else {
          isTouchPanning = false;
        }
      }
    }, { passive: false });

    // Touch move
    canvasElement.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2) {
        // Pinch zoom
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch1.clientX - touch2.clientX,
          touch1.clientY - touch2.clientY
        );
        
        if (touchStartDistanceRef.current > 0) {
          const scale = currentDistance / touchStartDistanceRef.current;
          let newZoom = lastZoomRef.current * scale;
          
          // Zoom limits
          if (newZoom > 20) newZoom = 20;
          if (newZoom < 0.01) newZoom = 0.01;
          
          const centerX = (touch1.clientX + touch2.clientX) / 2;
          const centerY = (touch1.clientY + touch2.clientY) / 2;
          
          canvas.zoomToPoint(new Point(centerX, centerY), newZoom);
          setZoomLevel(Math.round(newZoom * 100));
        }
      } else if (e.touches.length === 1 && isTouchPanning) {
        // Single finger pan on empty space
        e.preventDefault();
        const vpt = canvas.viewportTransform;
        if (vpt) {
          vpt[4] += e.touches[0].clientX - touchStartX;
          vpt[5] += e.touches[0].clientY - touchStartY;
          canvas.requestRenderAll();
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }
    }, { passive: false });

    // Touch end
    canvasElement.addEventListener('touchend', () => {
      touchStartDistanceRef.current = 0;
      isTouchPanning = false;
    }, { passive: true });

    // Handle window resize for infinite canvas
    const handleResize = () => {
      canvas.setWidth(window.innerWidth - 280);
      canvas.setHeight(window.innerHeight - 80);
      canvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.dispose();
    };
  }, []);

  const handleImageUpload = async (files: FileList) => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    const imageUrls: string[] = [];
    const imageFiles = Array.from(files).slice(0, 16); // Max 16 images
    
    // Get current viewport center
    const zoom = canvas.getZoom();
    const vpt = canvas.viewportTransform || [1, 0, 0, 1, 0, 0];
    const centerX = (canvas.width! / 2 - vpt[4]) / zoom;
    const centerY = (canvas.height! / 2 - vpt[5]) / zoom;

    // When uploading via FAB (not clicking placeholder), always place freely
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const reader = new FileReader();

      reader.onload = async (e) => {
        const imgUrl = e.target?.result as string;
        imageUrls.push(imgUrl);
        uploadedImagesRef.current.push(imgUrl);

        FabricImage.fromURL(imgUrl).then((img) => {
          placeFreeImage(img, i, imageFiles.length, centerX, centerY);
          canvas.add(img);
          canvas.renderAll();
          soundManager.play('imageUpload');
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const placeFreeImage = (img: FabricImage, index: number, total: number, centerX: number, centerY: number) => {
    // Scale image to reasonable size
    const maxSize = 300;
    const scale = Math.min(maxSize / img.width!, maxSize / img.height!);
    img.scale(scale);

    // Random rotation between -5 and 5 degrees
    const rotation = Math.random() * 10 - 5;
    img.rotate(rotation);

    // Position image relative to viewport center
    if (total === 1) {
      // Single image: center at viewport
      img.set({
        left: centerX,
        top: centerY,
        originX: 'center',
        originY: 'center',
      });
    } else {
      // Multiple images: intelligent placement around center
      const spacing = 100;
      const cols = Math.ceil(Math.sqrt(total));
      const row = Math.floor(index / cols);
      const col = index % cols;
      
      const offsetX = (col - cols / 2) * (maxSize + spacing);
      const offsetY = (row - Math.ceil(total / cols) / 2) * (maxSize + spacing);
      
      img.set({
        left: centerX + offsetX + Math.random() * 50,
        top: centerY + offsetY + Math.random() * 50,
      });
    }

    // Add shadow for depth
    img.set({
      shadow: '0 4px 12px rgba(0,0,0,0.3)' as any,
    });
  };

  const addText = () => {
    setShowTextStylesModal(true);
  };

  const addTextWithStyle = (style: TextStyle) => {
    if (!fabricCanvasRef.current) return;

    // Small delay to ensure modal is closed and canvas is ready
    setTimeout(() => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;
      
      // Get current viewport center
      const zoom = canvas.getZoom();
      const vpt = canvas.viewportTransform || [1, 0, 0, 1, 0, 0];
      const centerX = (canvas.width! / 2 - vpt[4]) / zoom;
      const centerY = (canvas.height! / 2 - vpt[5]) / zoom;
      
      const text = new IText('Add your text here', {
        left: centerX,
        top: centerY,
        originX: 'center',
        originY: 'center',
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fill: style.fill,
        stroke: style.stroke,
        strokeWidth: style.strokeWidth,
        fontWeight: style.fontWeight as any,
        fontStyle: style.fontStyle,
        shadow: style.shadow as any,
        editable: true,
        selectable: true,
      });

      // Add hold-to-delete functionality for text
      let holdTimer: number | null = null;
      
      text.on('mousedown', () => {
        holdTimer = window.setTimeout(() => {
          if (window.confirm('Delete this text?')) {
            canvas.remove(text);
            canvas.renderAll();
            saveHistory();
          }
        }, 1000); // 1 second hold
      });

      text.on('mouseup', () => {
        if (holdTimer) {
          clearTimeout(holdTimer);
          holdTimer = null;
        }
      });

      text.on('mousemove', () => {
        if (holdTimer) {
          clearTimeout(holdTimer);
          holdTimer = null;
        }
      });

      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
      
      // Enter editing mode after a small delay
      setTimeout(() => {
        text.enterEditing();
        text.selectAll();
        canvas.renderAll();
      }, 50);
      
      saveHistory();
    }, 100);
  };

  const randomizeLayout = () => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    const objects = canvas.getObjects().filter((obj) => obj.type === 'image');

    // Get current viewport bounds
    const zoom = canvas.getZoom();
    const vpt = canvas.viewportTransform || [1, 0, 0, 1, 0, 0];
    const viewportLeft = -vpt[4] / zoom;
    const viewportTop = -vpt[5] / zoom;
    const viewportWidth = canvas.width! / zoom;
    const viewportHeight = canvas.height! / zoom;

    objects.forEach((obj) => {
      const newLeft = viewportLeft + 100 + Math.random() * (viewportWidth - 200);
      const newTop = viewportTop + 100 + Math.random() * (viewportHeight - 200);
      const newRotation = Math.random() * 16 - 8;

      obj.set({
        left: newLeft,
        top: newTop,
        angle: newRotation,
      });
    });

    canvas.renderAll();
    soundManager.play('backgroundChange');
  };

  const setBackgroundColor = (_color: string) => {
    // Keep transparent to show grid - background colors disabled
    if (!fabricCanvasRef.current) return;
    // fabricCanvasRef.current.backgroundColor = color;
    // fabricCanvasRef.current.renderAll();
  };

  const exportCanvas = async (format: 'png' | 'jpeg', quality: number): Promise<string> => {
    if (!fabricCanvasRef.current) return '';

    const canvas = fabricCanvasRef.current;
    
    // Temporarily hide grid if needed
    canvas.renderAll();

    const dataURL = canvas.toDataURL({
      format: format === 'png' ? 'png' : 'jpeg',
      quality: quality / 100,
      multiplier: 2, // Higher resolution
    });

    return dataURL;
  };

  const handleZoomIn = () => {
    if (!fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;
    let zoom = canvas.getZoom();
    zoom = zoom * 1.1;
    if (zoom > 20) zoom = 20;
    canvas.setZoom(zoom);
    setZoomLevel(Math.round(zoom * 100));
    canvas.renderAll();
  };

  const handleZoomOut = () => {
    if (!fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;
    let zoom = canvas.getZoom();
    zoom = zoom / 1.1;
    if (zoom < 0.01) zoom = 0.01;
    canvas.setZoom(zoom);
    setZoomLevel(Math.round(zoom * 100));
    canvas.renderAll();
  };

  const handleResetZoom = () => {
    if (!fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;
    canvas.setZoom(1);
    setZoomLevel(100);
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    canvas.renderAll();
  };

  const saveHistory = () => {
    if (!fabricCanvasRef.current) return;
    const json = JSON.stringify(fabricCanvasRef.current.toJSON());
    historyRef.current = historyRef.current.slice(0, historyStepRef.current + 1);
    historyRef.current.push(json);
    historyStepRef.current++;
    if (historyRef.current.length > 50) {
      historyRef.current.shift();
      historyStepRef.current--;
    }
  };

  const handleUndo = () => {
    if (!fabricCanvasRef.current || historyStepRef.current <= 0) return;
    historyStepRef.current--;
    const json = historyRef.current[historyStepRef.current];
    fabricCanvasRef.current.loadFromJSON(json, () => {
      fabricCanvasRef.current?.renderAll();
    });
  };

  const handleRedo = () => {
    if (!fabricCanvasRef.current || historyStepRef.current >= historyRef.current.length - 1) return;
    historyStepRef.current++;
    const json = historyRef.current[historyStepRef.current];
    fabricCanvasRef.current.loadFromJSON(json, () => {
      fabricCanvasRef.current?.renderAll();
    });
  };

  const handleDeleteImage = () => {
    if (!fabricCanvasRef.current || !contextMenu) return;
    
    const canvas = fabricCanvasRef.current;
    const target = contextMenu.target;
    
    canvas.remove(target);
    canvas.renderAll();
    soundManager.play('delete');
    setContextMenu(null);
  };

  const handleReplaceImage = () => {
    if (!contextMenu) return;
    
    selectedImageRef.current = contextMenu.target;
    setContextMenu(null);
    fileInputRef.current?.click();
  };

  const handleReplaceImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !selectedImageRef.current || !fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const imgUrl = event.target?.result as string;
      
      FabricImage.fromURL(imgUrl).then((newImg) => {
        const oldImg = selectedImageRef.current;
        
        // Copy properties from old image
        newImg.set({
          left: oldImg.left,
          top: oldImg.top,
          angle: oldImg.angle,
          scaleX: oldImg.scaleX,
          scaleY: oldImg.scaleY,
          originX: oldImg.originX,
          originY: oldImg.originY,
          shadow: oldImg.shadow,
        });
        
        // Remove old image and add new one
        canvas.remove(oldImg);
        canvas.add(newImg);
        canvas.setActiveObject(newImg);
        canvas.renderAll();
        
        soundManager.play('imageUpload');
        selectedImageRef.current = null;
      });
    };
    
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  return (
    <div className="canvas-wrapper">
      <div className="zoom-controls">
        <button className="zoom-button" onClick={handleZoomOut} title="Zoom Out">
          −
        </button>
        <span className="zoom-level">{zoomLevel}%</span>
        <button className="zoom-button" onClick={handleZoomIn} title="Zoom In">
          +
        </button>
      </div>
      
      <div className="canvas-scroll-area">
        <canvas ref={canvasRef} />
      </div>

      {/* Hidden file input for replace functionality */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleReplaceImageFile}
      />

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div className="context-menu-overlay" onClick={handleCloseContextMenu} />
          <div
            className="context-menu"
            style={{
              left: `${contextMenu.x}px`,
              top: `${contextMenu.y}px`,
            }}
          >
            <button className="context-menu-item" onClick={handleReplaceImage}>
              <span className="context-menu-icon">🔄</span>
              Replace Image
            </button>
            <button className="context-menu-item danger" onClick={handleDeleteImage}>
              <span className="context-menu-icon">🗑️</span>
              Delete Image
            </button>
          </div>
        </>
      )}

      {/* Text Styles Modal */}
      <TextStylesModal
        isOpen={showTextStylesModal}
        onClose={() => setShowTextStylesModal(false)}
        onSelectStyle={addTextWithStyle}
      />
    </div>
  );
});

CanvasComponent.displayName = 'CanvasComponent';

export default CanvasComponent;
