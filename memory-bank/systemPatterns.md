# System Patterns

## Architecture Overview
Patee follows a **Static Component Architecture** with dynamic JavaScript-driven behaviors, optimized for simplicity and performance.

## Core Design Patterns

### 1. Component Loading Pattern
```
Page Load → load-components.js → Fetch Partials → Inject DOM → Initialize Behaviors
```
- **Dynamic Header/Footer**: `load-components.js` fetches and injects `partials/header.html` and `partials/footer.html`
- **Cart Panel**: Dynamically loads `partials/cart.html` for slide-in cart functionality
- **Initialization**: Components initialize their own event handlers after DOM injection

### 2. Data-Driven Product System
```
JSON Products → fetch() → Filter Logic → renderProducts() → createProductCard() → DOM Injection
```
- **Product Catalog**: Centralized in `data/products.json` with 25+ items (consolidated from multiple files)
- **Enhanced Product Names**: Marketing-focused descriptions with emotional appeal and benefit-focused language
- **Dynamic Filtering**: JavaScript separates sale items (`isSale: true`) from new items
- **Featured Products**: Homepage sections populated through filtering logic
- **Dynamic Rendering**: JavaScript creates product cards from data templates
- **Simple Event Handling**: Direct onclick functions for beginner-friendly code
- **Clean Data**: Removed fallback debugging code, relies on valid data structure
- **Content Optimization**: Product names enhanced using patterns from `data/name.json` for consistency

### 3. LocalStorage Cart Pattern
```
User Action → addItemToCart() → localStorage → updateCartCount() → UI Update
```
- **State Management**: Cart data stored in localStorage under `cart_items` key
- **Real-time Updates**: Cart count updates across all pages via shared functions
- **Persistence**: Cart survives page refreshes and sessions
- **Quantity Management**: Automatic quantity aggregation for duplicate items

### 4. Modular Cart System Pattern
```
User Action → cart.js Functions → localStorage → UI Update → Cart Panel Toggle
```
- **Modular Architecture**: Dedicated `js/cart.js` (206 lines) with clean function organization
- **Styling Separation**: Comprehensive `css/cart.css` (306 lines) for cart-specific styling
- **Modal-like Behavior**: Overlay with backdrop click-to-close
- **Smooth Animation**: CSS transitions for panel slide-in/out with opacity effects
- **Professional Controls**: Close button, overlay click, and continue shopping button
- **Auto-open**: Panel opens automatically when items added to cart
- **Dynamic Footer Positioning**: Pure CSS flexbox layout for content-aware footer behavior
- **Quantity Controls**: Intuitive +/- buttons with span display for better UX
- **Simple Event Handling**: onclick functions replace complex .closest() methods
- **ID-based Operations**: Reliable cart item management using product IDs
- **API Exposure**: Functions exposed via `window.cartFunctions` for external access

## Component Relationships

### Data Flow
```
products.json → script.js → Product Cards → Cart Actions → localStorage → Cart Panel
```

### File Dependencies
```
HTML Pages → load-components.js → Partials → script.js → Data Files → CSS
```

### Event Flow
```
User Click → Event Handler → Data Update → localStorage → UI Refresh → Cart Count Update
```

### Product Filtering Pattern
```
products.json → JavaScript Filter Logic → Separate Containers → Render Products
```
- **Sale Section**: Only products with `isSale: true` (max 4 items)
- **New Section**: Products WITHOUT `isSale: true` (max 4 items)
- **Dynamic Rendering**: JavaScript creates product cards from filtered data
- **Clear Separation**: Promotional items vs new arrivals distinction
- **Consolidated Data**: Single JSON file with client-side filtering replaces multiple data files

## Key Technical Decisions

### 1. No Framework Approach
- **Rationale**: Simple project, no complex state management needed
- **Benefits**: Fast loading, no build step, easy deployment
- **Trade-offs**: Manual DOM management, no reactive updates

### 2. Component-based Structure
- **Rationale**: Consistent header/footer across all pages
- **Benefits**: Single source of truth, easier maintenance
- **Implementation**: fetch() API with DOM injection

### 3. LocalStorage Cart
- **Rationale**: No backend, need for persistent cart state
- **Benefits**: Works across pages, survives refreshes
- **Limitations**: Local to browser, no cross-device sync

### 4. Bootstrap + Custom CSS
- **Rationale**: Rapid development with responsive design
- **Benefits**: Professional UI, mobile-first approach
- **Customization**: CSS variables for theming consistency

## Data Structures

### Product Schema
```javascript
{
  id: number,
  name: string,           // Enhanced with marketing-focused descriptions
  category: "Gia đình"|"Mẹ và bé"|"Bé trai"|"Bé gái"|"Đồ đôi",
  price: number,
  sizes: ["S", "M", "L", "XL"],
  isSale: boolean,
  image: string
}
```
**Name Enhancement Pattern:**
- Simple names → Descriptive marketing language
- Example: "Áo gia đình mùa hè" → "Set Đồ Gia Đình Mặc Nhà - Gắn Kết Thêm Yêu Thương"
- Integration with `name.json` patterns for consistency

### Enhanced Cart Item Schema (with size support)
```javascript
{
  id: string,
  name: string,
  price: number,
  image: string,
  size: string,        // Added for product detail integration
  qty: number
}
```

### Size Recommendation Algorithm
```javascript
// Height/weight-based size recommendation in product details
function calculateRecommendedSize(height, weight) {
    if (height > 185 || weight > 85) return 'XXL';
    else if (height > 175 || weight > 75) return 'XL';
    else if (height > 165 || weight > 65) return 'L';
    else if (height > 155 || weight > 55) return 'M';
    return 'S';
}
```

### Cart Item Schema
```javascript
{
  id: string,
  name: string,
  price: number,
  image: string,
  qty: number
}
```

## Anti-Patterns Avoided
1. **Global State Pollution**: Encapsulated functions with clear responsibilities
2. **Inline JavaScript**: All behavior in external script files
3. **Hardcoded UI**: Data-driven product rendering
4. **Page Reloads**: Single-page experience with dynamic cart
5. **CSS Inconsistency**: Bootstrap base with custom theme variables
6. **Monolithic Files**: Separated cart logic into dedicated modules
7. **Multiple Data Sources**: Consolidated to single product JSON with filtering
8. **Poor Documentation**: Implemented comprehensive Memory Bank system
9. **Duplicate Code**: Removed duplicate `Patee-hehe/` directory files
10. **Legacy Dependencies**: Cleaned up obsolete files and unused assets
11. **Poor Product Names**: Enhanced with marketing-focused descriptions and emotional appeal