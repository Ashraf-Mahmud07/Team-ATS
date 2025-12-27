# Rich Text Editor - Complete Feature Guide

## Overview
The enhanced RichTextInput component now supports all the requested features using JoditEditor. This guide explains how to use each feature.

## Features Implemented

### ✅ Basic Formatting
- **Bold, Italic, Underline**: Use toolbar buttons or keyboard shortcuts (Ctrl+B, Ctrl+I, Ctrl+U)
- **Text Color**: Click the brush/color button to select text colors
- **Font Size**: Use the font size dropdown to change text size

### ✅ Content Structure Options
- **Heading Tags (H1-H6)**: Use the paragraph dropdown or type markdown-style headers
- **Blockquote**: Select text and click the quote button for citations
- **Lists**: Use the bullet list and numbered list buttons

### ✅ Links & Media
- **Insert/Edit Links**: 
  - Select text and click link button
  - Options for internal/external links
  - "Open in new tab" checkbox available
- **Insert/Edit Images**:
  - Upload images with drag & drop or file picker
  - Add alt text, captions, and alignment
  - Automatic resizing and optimization
- **Video Embeds**: 
  - Click video button
  - Paste YouTube or Vimeo URLs for automatic embedding
- **File Upload**: 
  - Support for PDFs, images, and documents
  - Configurable file size limits and allowed types

### ✅ Advanced Formatting Features
- **Tables**: 
  - Insert tables with customizable rows/columns
  - Merge cells, add borders
  - Right-click for table context menu
- **Anchor Links**: 
  - Create headings with IDs
  - Link to specific sections using #anchor-name
- **Undo/Redo/Clear Formatting**: Available in toolbar

## Usage Instructions

### Basic Setup
```tsx
import RichTextInput from './path/to/RichTextInput';

const MyComponent = () => {
    const [content, setContent] = useState('');

    return (
        <RichTextInput
            value={content}
            onChange={setContent}
            placeholder="Start typing..."
            maxFileSize={10 * 1024 * 1024} // 10MB
            allowedFileTypes={['jpg', 'jpeg', 'png', 'pdf', 'doc']}
        />
    );
};
```

### Component Props
- `value`: Current HTML content
- `onChange`: Callback when content changes
- `placeholder`: Placeholder text
- `style`: Custom CSS styles
- `maxFileSize`: Maximum file size in bytes
- `allowedFileTypes`: Array of allowed file extensions

### Integration with Existing API
The component is configured to use your existing `/api/images/upload` endpoint from `adminApi.ts`. The uploader expects:
- Field name: `image`
- Method: `POST`
- Response format: `{ data: { url: string } }` or `{ url: string }`

### Integration with Your Existing Upload API

The editor is configured to work with your existing RTK Query upload mutation:

```typescript
// From adminApi.ts
uploadImage: builder.mutation({
  query: (data) => ({
    url: `/images/upload`,
    method: "POST",
    body: data,
  }),
}),
```

**Requirements for your API:**
1. Accept `FormData` with field name `image`
2. Return response in format: `{ data: { url: string } }` or `{ url: string }`
3. Support image types: JPG, JPEG, PNG, GIF, SVG, WebP

### Toolbar Buttons Reference

| Button | Function | Keyboard Shortcut |
|--------|----------|------------------|
| **B** | Bold | Ctrl+B |
| *I* | Italic | Ctrl+I |
| <u>U</u> | Underline | Ctrl+U |
| 🎨 | Text Color | - |
| 📝 | Font Size | - |
| H | Headings | - |
| " | Blockquote | - |
| • | Bullet List | - |
| 1. | Numbered List | - |
| 🔗 | Link | Ctrl+K |
| 🖼️ | Image | - |
| 🎥 | Video | - |
| 📁 | File | - |
| ┌─┐ | Table | - |
| ↶ | Undo | Ctrl+Z |
| ↷ | Redo | Ctrl+Y |

### How to Use Specific Features

#### 1. Creating Anchor Links
```html
<!-- Create a heading with an ID -->
<h2 id="section-1">My Section</h2>

<!-- Link to it from anywhere -->
<a href="#section-1">Go to My Section</a>
```

#### 2. Embedding Videos
- Click the video button
- Paste YouTube URL: `https://www.youtube.com/watch?v=VIDEO_ID`
- Or Vimeo URL: `https://vimeo.com/VIDEO_ID`

#### 3. Table Operations
- Insert table using table button
- Right-click on table for context menu:
  - Add/remove rows and columns
  - Merge/split cells
  - Table properties

#### 4. Image Upload with Caption
- Upload image using image button
- Fill in alt text for accessibility
- Add caption text
- Choose alignment (left, center, right)

#### 5. Custom Styling
The editor supports custom CSS classes and inline styles:
```html
<p style="color: red; font-size: 18px;">Custom styled text</p>
<div class="custom-class">Content with custom class</div>
```

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Bold | Ctrl+B | Cmd+B |
| Italic | Ctrl+I | Cmd+I |
| Underline | Ctrl+U | Cmd+U |
| Link | Ctrl+K | Cmd+K |
| Undo | Ctrl+Z | Cmd+Z |
| Redo | Ctrl+Y | Cmd+Y |
| Select All | Ctrl+A | Cmd+A |
| Copy | Ctrl+C | Cmd+C |
| Paste | Ctrl+V | Cmd+V |
| Cut | Ctrl+X | Cmd+X |

## File Upload Configuration

### Supported File Types
- **Images**: JPG, JPEG, PNG, GIF, SVG, WebP
- **Documents**: PDF, DOC, DOCX
- **Custom**: Configure via `allowedFileTypes` prop

### Security Considerations
1. File type validation on both client and server
2. File size limits to prevent abuse
3. Unique filename generation to prevent conflicts
4. Secure file storage outside web root (recommended)

## Troubleshooting

### Common Issues

1. **File uploads not working**:
   - Check server endpoint is running
   - Verify CORS settings
   - Check file size limits

2. **Styles not applying**:
   - Ensure CSS is properly imported
   - Check for CSS conflicts
   - Verify content security policy

3. **Video embeds not showing**:
   - Check URL format
   - Verify iframe permissions
   - Check content security policy

### Performance Tips
1. Use lazy loading for large content
2. Optimize images before upload
3. Implement caching for uploaded files
4. Consider CDN for media files

## Demo Component
See `RichTextEditorDemo.tsx` for a complete working example with all features demonstrated.

## Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Touch-friendly interface