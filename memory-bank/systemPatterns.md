# System Patterns - Patee Architecture

## System Architecture

### Frontend Architecture
```
┌─────────────────────────────────────────┐
│                Browser                   │
├─────────────────────────────────────────┤
│  HTML Pages (index.html, header.html)   │
├─────────────────────────────────────────┤
│  CSS Styling (Bootstrap + Custom)       │
├─────────────────────────────────────────┤
│  JavaScript (Dynamic Loading)          │
├─────────────────────────────────────────┤
│  JSON Data (Products, Sales, New)      │
└─────────────────────────────────────────┘
```

### Component Structure
- **Modular HTML**: Separate header.html and footer.html components
- **Dynamic Loading**: JavaScript-based component injection
- **Data-Driven**: JSON files control product display
- **Responsive Design**: Bootstrap grid system with custom CSS

## Key Technical Decisions

### 1. Component-Based Architecture
**Pattern**: Modular HTML Components
```javascript
// load-components.js
async function loadPart(target, file, position = "beforeend") {
  let response = await fetch(file);
  let html = await response.text();
  document.body.insertAdjacentHTML(position, html);
}
```

**Benefits**:
- Reusable header/footer across pages
- Easy maintenance and updates
- Consistent navigation experience

### 2. Data-Driven Product Display
**Pattern**: JSON-First Product Management
```javascript
// script.js - Product Loading
function loadProducts() {
    fetch("./data/saleProducts.json")
        .then(response => response.json())
        .then(saleProducts => {
            renderProducts(saleProducts, "#sale-items .products-json", "SALE", "bg-danger");
        });
}
```

**Benefits**:
- Easy product management without code changes
- Flexible product data structure
- Simple content updates

### 3. Dynamic Product Rendering
**Pattern**: Template-Based Card Generation
```javascript
function createProductCard(product, badgeText, badgeClass) {
    // Dynamic HTML generation based on product data
    return `<div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
        <div class="product-card">
            <!-- Product content -->
        </div>
    </div>`;
}
```

**Benefits**:
- Consistent product display
- Easy styling updates
- Scalable product addition

## Design Patterns

### 1. CSS Custom Properties
**Pattern**: Design System Variables
```css
:root {
    --primary-red: #e74c3c;
    --coral-pink: #ff7c7c;
    --text-dark: #2d3436;
    --ui-color: #198754;
}
```

**Benefits**:
- Consistent color scheme
- Easy theme updates
- Maintainable styling

### 2. Responsive Grid System
**Pattern**: Bootstrap Grid with Custom Breakpoints
```html
<div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
    <!-- Product cards adapt to screen size -->
</div>
```

**Benefits**:
- Mobile-first responsive design
- Consistent spacing and layout
- Cross-device compatibility

### 3. Interactive State Management
**Pattern**: Event-Driven Color Selection
```javascript
function addColorClickEvents(container) {
    const swatches = container.querySelectorAll(".color-swatch");
    swatches.forEach(swatch => {
        swatch.addEventListener("click", function() {
            // Update active state
        });
    });
}
```

**Benefits**:
- Interactive user experience
- Visual feedback for selections
- Accessible color options

## Component Relationships

### Data Flow
```
JSON Files → JavaScript Loader → DOM Renderer → User Interface
     ↓              ↓                ↓              ↓
saleProducts.json → loadProducts() → renderProducts() → Product Cards
newProducts.json → loadProducts() → renderProducts() → Product Cards
products.json → (Future use) → (Future use) → (Future use)
```

### File Dependencies
```
index.html
├── header.html (loaded dynamically)
├── footer.html (loaded dynamically)
├── css/style.css
├── js/load-components.js
├── js/script.js
└── data/
    ├── saleProducts.json
    ├── newProducts.json
    └── products.json
```

## Performance Patterns

### 1. Lazy Loading
- Components loaded after DOM ready
- Product data fetched asynchronously
- Images loaded on demand

### 2. Efficient DOM Manipulation
- Batch DOM updates
- Event delegation for dynamic content
- Minimal reflows and repaints

### 3. Asset Optimization
- Bootstrap CSS/JS from CDN
- Optimized image assets
- Minified JavaScript files

## Security Considerations
- Client-side only implementation
- No sensitive data handling
- XSS prevention through proper HTML escaping
- HTTPS recommended for production

## Scalability Patterns
- Modular component architecture
- JSON-based content management
- CSS custom properties for theming
- Responsive design for all devices