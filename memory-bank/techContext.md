# Technical Context - Patee Development Environment

## Technology Stack

### Frontend Technologies
- **HTML5**: Semantic markup with modern standards
- **CSS3**: Custom properties, flexbox, grid, animations
- **JavaScript (ES6+)**: Modern JavaScript with async/await, fetch API
- **Bootstrap 5.3.8**: CSS framework for responsive design
- **Bootstrap Icons 1.13.1**: Icon library for UI elements

### Development Environment
- **OS**: Linux (WSL2) - Microsoft Standard
- **Shell**: /bin/bash
- **Workspace**: /mnt/d/Patee
- **Editor**: Cursor IDE

## Project Structure
```
/mnt/d/Patee/
├── assets/
│   ├── bootstrap-5.3.8-dist/     # Bootstrap framework
│   ├── bootstrap-icons-1.13.1/    # Icon library
│   └── images/                   # Product and UI images
├── css/
│   └── style.css                # Custom styles
├── data/
│   ├── products.json            # Main product catalog
│   ├── saleProducts.json        # Sale items
│   └── newProducts.json         # New arrivals
├── js/
│   ├── load-components.js       # Component loading
│   └── script.js               # Main application logic
├── MyLinh/                      # Additional pages
├── Thuyet/                      # Additional features
├── header.html                  # Navigation component
├── footer.html                  # Footer component
├── index.html                   # Main homepage
└── memory-bank/                # Documentation
```

## Dependencies

### External Libraries
- **Bootstrap 5.3.8**: CSS framework
  - Responsive grid system
  - Component library (navbar, carousel, buttons)
  - Utility classes
- **Bootstrap Icons 1.13.1**: Icon set
  - Navigation icons
  - UI element icons
  - Social media icons

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## Development Setup

### Local Development
1. **File Structure**: Static files served directly
2. **No Build Process**: Direct HTML/CSS/JS development
3. **Live Server**: Recommended for development
4. **Version Control**: Git repository (if applicable)

### Asset Management
- **Images**: Optimized for web (JPG, SVG, ICO)
- **CSS**: Custom properties for theming
- **JavaScript**: ES6+ features with fallbacks
- **Fonts**: System fonts (Segoe UI, Tahoma, Geneva, Verdana)

## Technical Constraints

### Frontend-Only Implementation
- No backend server required
- No database dependencies
- No server-side processing
- Static file hosting sufficient

### Data Storage
- **JSON Files**: Product data stored in static JSON files
- **Local Storage**: Browser-based data persistence
- **No Database**: Simple file-based data management

### Performance Considerations
- **Image Optimization**: Compressed product images
- **CSS Minification**: Bootstrap minified version
- **JavaScript Optimization**: Efficient DOM manipulation
- **Lazy Loading**: Components loaded on demand

## Development Workflow

### Code Organization
- **Separation of Concerns**: HTML, CSS, JS in separate files
- **Component-Based**: Reusable header/footer components
- **Data-Driven**: JSON-based product management
- **Responsive-First**: Mobile-first design approach

### Styling Approach
- **CSS Custom Properties**: Theme variables
- **Bootstrap Integration**: Framework + custom styles
- **Component Styling**: Scoped CSS for components
- **Responsive Design**: Breakpoint-based layouts

### JavaScript Patterns
- **ES6+ Features**: Modern JavaScript syntax
- **Async/Await**: Promise-based data loading
- **Event Delegation**: Efficient event handling
- **DOM Manipulation**: Minimal, efficient updates

## Deployment Considerations

### Hosting Requirements
- **Static Hosting**: Any static file host (GitHub Pages, Netlify, Vercel)
- **HTTPS**: Recommended for production
- **CDN**: Optional for global performance
- **Domain**: Custom domain for branding

### Performance Optimization
- **Image Compression**: Optimize product images
- **CSS Minification**: Minify custom CSS
- **JavaScript Minification**: Minify custom JS
- **Caching**: Set appropriate cache headers

## Security Considerations
- **Client-Side Only**: No server-side vulnerabilities
- **XSS Prevention**: Proper HTML escaping
- **HTTPS**: Secure data transmission
- **Content Security Policy**: Optional security headers

## Future Technical Considerations
- **Progressive Web App**: PWA features for mobile
- **Service Workers**: Offline functionality
- **API Integration**: Future backend integration
- **Performance Monitoring**: Analytics and monitoring
- **Accessibility**: WCAG compliance improvements