# Tech Context

## Technology Stack

### Frontend Technologies
- **HTML5**: Semantic markup with modern structure
- **CSS3**: Custom CSS with Bootstrap 5.3.8 framework
- **JavaScript ES6+**: Vanilla JavaScript with modern features
- **Bootstrap 5.3.8**: UI framework for responsive design and components
- **Bootstrap Icons 1.13.1**: Icon library for UI elements

### Development Environment
- **No Build Process**: Direct file development, no package.json
- **Local Server Required**: VS Code Live Server or equivalent for CORS
- **Static File Serving**: All assets served from local filesystem
- **No Dependencies**: Self-contained with vendor libraries included

### Data Management
- **JSON Files**: Consolidated product catalog in single `data/products.json`
- **LocalStorage**: Browser-based cart persistence with size tracking
- **Fetch API**: Dynamic data loading from JSON files
- **CORS Restrictions**: Requires web server for JSON access
- **Client-side Filtering**: JavaScript logic for sale/new item separation

## File Structure
```
Patee/
├── index.html                    # Homepage
├── ChiTietSanPham.html           # Product detail page (NEW)
├── capdoi.html                   # Couples category
├── giadinh.html                  # Family category
├── mevabe.html                   # Mother & child category
├── begai.html                    # Girls category
├── betrai.html                   # Boys category
├── dangnhap.html                 # Login page
├── dangky.html                   # Registration page
├── quenmatkhau.html              # Password recovery
├── thanhtoan.html                # Checkout page
├── css/
│   ├── style.css                 # Main stylesheet
│   └── cart.css                  # Dedicated cart styles (NEW)
├── js/
│   ├── script.js                 # Main application logic
│   ├── cart.js                   # Modular cart system (NEW)
│   └── load-components.js        # Dynamic component loader
├── data/
│   └── products.json             # Consolidated product catalog
├── partials/
│   ├── header.html               # Navigation header
│   ├── footer.html               # Page footer
│   └── cart.html                 # Slide-in cart panel (renamed)
├── assets/
│   ├── images/                   # Product and UI images
│   ├── bootstrap-5.3.8-dist/     # Bootstrap framework
│   └── bootstrap-icons-1.13.1/   # Icon library
└── memory-bank/                  # Project documentation (NEW)
    ├── projectbrief.md
    ├── productContext.md
    ├── activeContext.md
    ├── systemPatterns.md
    ├── techContext.md
    └── progress.md
```

## Technical Constraints

### CORS Limitations
- **Issue**: Browser security blocks direct file:// JSON access
- **Solution**: Local web server (VS Code Live Server)
- **Impact**: Development requires server environment

### No Backend Integration
- **Limitation**: Pure frontend, no server-side processing
- **Workaround**: Client-side operations with localStorage
- **Scope**: Shopping experience only, no payment processing

### Static Data Management
- **Challenge**: Manual product catalog updates
- **Method**: Direct JSON file editing
- **Consideration**: Future admin interface potential

## Key Technical Features

### Dynamic Component Loading
```javascript
// load-components.js pattern
async function loadPart(target, file, position) {
  let response = await fetch(file);
  let html = await response.text();
  document.body.insertAdjacentHTML(position, html);
}
```

### Product Rendering System
```javascript
// Data-driven product cards
function renderProducts(products, containerSelector, badgeType) {
  // Dynamic card generation from JSON data
}
```

### Cart Management
```javascript
// localStorage-based persistence
function setCartItems(items) {
  localStorage.setItem('cart_items', JSON.stringify(items));
  updateCartCount();
}
```

### Modular Cart System
- **Dedicated Module**: `js/cart.js` with 206 lines of organized cart functions
- **Comprehensive Styling**: `css/cart.css` with 306 lines of cart-specific CSS
- **API Architecture**: Functions exposed via `window.cartFunctions` for external access
- **CSS Transitions**: Smooth slide-in/out animations with professional timing
- **Event Delegation**: Efficient event handling for dynamic content
- **Backdrop Management**: Click-outside-to-close functionality
- **Size Support**: Enhanced cart items with size tracking for product details

## Performance Considerations

### Loading Strategy
- **Progressive Enhancement**: Basic functionality without JavaScript
- **Component Lazy Loading**: Header/footer loaded asynchronously
- **Image Optimization**: Product images with proper sizing
- **Caching**: Browser caching of static assets

### Mobile Optimization
- **Responsive Breakpoints**: Bootstrap mobile-first approach
- **Touch Interactions**: Optimized for mobile devices
- **Performance**: Lightweight JavaScript, minimal dependencies

## Development Workflow

### File Management
- **Direct Editing**: No build step, immediate preview
- **Component Reuse**: Header/footer shared across pages
- **Data Separation**: Product data isolated in JSON files
- **Asset Organization**: Structured folders for different asset types

### Testing Approach
- **Browser Testing**: Manual testing across devices
- **Functionality Testing**: Cart operations, component loading
- **Responsive Testing**: Mobile, tablet, desktop layouts
- **CORS Testing**: Local server functionality verification

## Technical Debt
1. **No Automated Testing**: Manual testing only
2. **No Error Handling**: Basic error management needed
3. **Limited Accessibility**: Could improve ARIA labels and keyboard navigation
4. **No API Integration**: Static data limits real-time features
5. **Performance Monitoring**: No performance tracking implemented
6. **Missing Documentation**: Recently addressed with Memory Bank implementation