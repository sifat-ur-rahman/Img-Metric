# ImgMetric - Image Optimizer Tool

A modern, user-friendly web application for analyzing, compressing, and optimizing images for web performance. Built with Next.js, React, and Tailwind CSS.

## Features

- **Image Analysis**: Detailed metrics including file size, dimensions, format, and quality scores
- **Performance Scoring**: Intelligent scoring system based on optimization best practices
  - Excellent (80+): Highly optimized for web
  - Good (60-79): Acceptable performance
  - Needs Work (40-59): Recommended optimizations
  - Poor (<40): Significant improvements needed
- **Device Compatibility Indicators**: Visual warnings for mobile and desktop optimization
- **Batch Processing**: Upload multiple images at once
- **Compression**: Advanced image compression with configurable quality settings
- **Download Optimization**: Export compressed images directly from the browser
- **Dark/Light Mode**: Full theme support with persistent preferences
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Drag & Drop**: Intuitive drag-and-drop upload experience

## Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Theme Management**: next-themes
- **Image Processing**: HTML5 Canvas API
- **Type Safety**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sifat-ur-rahman/Img-Metric.git
cd Img-Metric
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Upload Images**:

   - Click the upload area or drag and drop images
   - Supports JPG, PNG, WebP, and other image formats
   - Upload multiple images at once

2. **View Analysis**:

   - See detailed metrics for each image
   - Check quality scores and device compatibility
   - Get compression recommendations

3. **Compress Images**:

   - Click the download button on any image card
   - Images are optimized and compressed automatically
   - Maintains visual quality while reducing file size

4. **Toggle Theme**:
   - Use the sun/moon icon in the top right
   - Switch between dark and light modes
   - Theme preference is saved automatically

## Image Quality Scoring

The application uses a comprehensive algorithm to calculate optimization scores:

### Scoring Factors

- **File Size**: Penalizes images larger than recommended thresholds

  - \> 500 KB: -40 points
  - \> 300 KB: -25 points
  - \> 200 KB: -10 points

- **Image Dimensions**: Penalizes excessively large dimensions
  - \> 2000px width: -15 points
  - \> 1200px width: -5 points

## Features in Detail

### Dark Mode Support

- Uses next-themes for seamless theme switching
- Automatically detects system preferences
- Persists user choice in localStorage

### Responsive Grid Layout

- 1 column on mobile (< 768px)
- 2 columns on tablet and desktop (≥ 768px)
- Adapts to different screen sizes automatically

### Image Card Details

Each analyzed image displays:

- Preview thumbnail with gradient overlay
- Quality score with color-coded badge
- File information (size, dimensions, format)
- Device compatibility status
- Quick action buttons (download, delete)

## Compression Algorithm

The application uses HTML5 Canvas API for image compression:

1. **Quality Adjustment**: Default 70% JPEG quality for optimal file size
2. **Dimension Scaling**: Auto-scales images to max 1200px width
3. **Browser-Side Processing**: All compression happens locally, no server upload required
4. **Format Optimization**: Converts to JPEG for maximum compatibility

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- **Zero Dependencies** for image processing (uses native Canvas API)
- **Client-Side Processing**: No server overhead
- **Lazy Loading**: Images load on demand
- **Optimized Bundles**: Modern JavaScript with tree-shaking

## Credits

**Developed with care by Sifat**

---

_ImgMetric helps web developers and content creators optimize their images for faster loading, better user experience, and improved SEO._
