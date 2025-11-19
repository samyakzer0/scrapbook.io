# Scrapbook.io - Quick Start Guide

## 🎉 Your Digital Scrapbook Creator is Ready!

The application is now running at: **http://localhost:5173**

## What's Been Built

### ✅ Complete Features Implemented

1. **Landing Page** (`/`)
   - Hero section with animated visuals
   - "Create Now" CTA button with hover effects
   - Feature showcase cards
   - Fully responsive design

2. **Canvas Editor** (`/create`)
   - Fabric.js powered canvas (1920x1080)
   - Zoom and pan support (mouse wheel to zoom)
   - Grid background (toggle on/off)
   - Smart image positioning and rotation

3. **Image Upload & Management**
   - Upload up to 16 images
   - Drag-drop support via Floating Action Button (bottom-right)
   - Automatic color extraction from images
   - Intelligent layout distribution
   - Individual image manipulation (drag, rotate, resize)

4. **Toolbar** (Left Sidebar)
   - **Add Images**: Upload photos from your device
   - **Add Text**: Insert customizable text with aesthetic fonts
   - **Background**: Change canvas background color
   - **Randomize**: Shuffle image positions creatively
   - **Elements**: Placeholder for future stickers/decorations

5. **Text Tool**
   - Editable text boxes with "Indie Flower" font
   - White stroke for readability
   - Drag, rotate, and resize
   - Double-click to edit

6. **Export Modal**
   - PNG or JPEG format
   - Quality slider (60-100%)
   - 2x resolution multiplier (3840x2160)
   - Automatic file naming with timestamps

7. **Design System**
   - Nostalgic scrapbook aesthetic
   - Paper textures and warm color palette
   - Smooth Framer Motion animations
   - Sound effects system (Howler.js integrated)
   - Responsive for desktop, tablet, and mobile

## How to Use

### Creating Your First Scrapbook

1. **Start Creating**
   - Click "Create Now" on the landing page
   - You'll be taken to the canvas editor

2. **Upload Images**
   - Click the **+** button (bottom-right) or use the toolbar
   - Select multiple images (up to 16)
   - Images will appear with intelligent placement

3. **Arrange Images**
   - Click and drag to move
   - Use corner handles to resize
   - Rotation handle appears on selection

4. **Add Text**
   - Click "Add Text" in toolbar
   - Text appears in center
   - Double-click to edit content
   - Drag and resize as needed

5. **Customize Background**
   - Click "Background" in toolbar
   - Choose from preset colors or custom color
   - Auto-theming extracts colors from your images

6. **Randomize Layout**
   - Click "Randomize" to shuffle image positions
   - Creates new artistic arrangements

7. **Export Your Scrapbook**
   - Click "Export" in header
   - Choose PNG or JPEG
   - Adjust quality slider
   - Click "Download"

## Keyboard Shortcuts & Controls

### Mouse Controls
- **Mouse Wheel**: Zoom in/out on canvas (up to 2000% zoom!)
- **Shift + Drag**: Pan around the infinite canvas
- **Middle Mouse Button + Drag**: Alternative panning method
- **Delete**: Remove selected object
- **Click & Drag**: Move selected objects
- **Corner Handles**: Resize objects
- **Rotation Handle**: Rotate objects

### Touch Gestures (Mobile/Tablet)
- **Pinch**: Zoom in/out (two-finger pinch gesture)
- **Two-Finger Drag**: Pan around the canvas
- **Single Finger**: Select and drag objects
- **Double Tap**: Edit text objects

### Zoom Controls
- **+ Button**: Zoom in by 10%
- **− Button**: Zoom out by 10%
- **Reset Button (🏠)**: Return to 100% zoom and center position
- **Zoom Display**: Shows current zoom level (1% to 2000%)

## Infinite Canvas Features

The canvas is now **infinite** - you can zoom out to see the entire workspace or zoom in up to 2000% for precise editing:

- **Auto-Resize**: Canvas automatically adjusts to your window size
- **Smart Positioning**: All elements (images, text) position relative to your current viewport
- **Grid System**: Toggle-able grid adapts to zoom level for alignment
- **Performance**: Smooth rendering even at extreme zoom levels

## Design Features

### Typography
7 aesthetic fonts available:
- Indie Flower (handwritten)
- Permanent Marker (bold marker)
- Dancing Script (elegant calligraphy)
- Chewy (chunky rounded)
- Schoolbell (naive childlike)
- Inter (UI elements)

### Color Palette
- **Coral Pink**: #FF7E67 (primary)
- **Sky Blue**: #84C7E8 (secondary)
- **Mint Green**: #B5E7D3 (success)
- **Kraft Paper**: #D4A574 (toolbar)
- **Canvas White**: #FEFBF6 (background)

### Animations
- Smooth page transitions
- Image drop-in effects
- Button hover animations
- Floating Action Button pulse (on load)
- Export modal scale animation

## Sound Effects

The app includes sound effect hooks for:
- Image upload (paper crumble)
- Text addition (marker scribble)
- Delete action (paper tear)
- Background change (page turn)
- Export success (camera click)

*Note: Sound files need to be added to `/public/sounds/` directory for audio playback*

## Future Enhancements (Not Yet Implemented)

The following features are ready to be added:
- Decorative elements library (stickers, frames, washi tape)
- Pre-made templates
- Save/Load projects (localStorage)
- Undo/Redo history
- Image filters and effects
- Additional font options
- Touch gestures for mobile
- Collaborative editing

## Technical Details

### Project Structure
```
src/
├── components/
│   ├── canvas/          # Canvas and export modal
│   └── toolbar/         # Sidebar tools and FAB
├── pages/              # Landing and Editor pages
├── utils/              # Sound and color utilities
└── index.css           # Design system
```

### Libraries Used
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Fabric.js**: Canvas manipulation
- **Framer Motion**: Animations
- **Howler.js**: Audio management
- **React Router**: Navigation

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Troubleshooting

### Images Not Uploading
- Ensure file format is JPG, PNG, WebP, or HEIC
- Check file size (large images may take time to load)

### Canvas Not Responding
- Try refreshing the page
- Check browser console for errors

### Export Not Working
- Ensure canvas has content
- Try different format (PNG vs JPEG)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Customization

### Adding Your Own Fonts
Edit `src/index.css` to add Google Fonts or custom fonts.

### Changing Color Palette
Modify CSS variables in `src/index.css`:
```css
:root {
  --color-coral: #FF7E67;
  --color-sky-blue: #84C7E8;
  /* Add your colors */
}
```

### Adding Sound Effects
1. Add `.mp3` files to `/public/sounds/`
2. Update `soundManager.ts` with file paths

## Support

For issues or feature requests, check the project README.md

---

**Enjoy creating beautiful digital scrapbooks! 🎨📸✨**
