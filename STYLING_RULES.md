# CRM IQ Styling Rules & Guidelines

## Overview
This document establishes consistent styling rules for the CRM IQ Resident application to ensure maintainability, accessibility, and design consistency.

## 1. Color Usage Rules

### 1.1 Muted Text
- **USE** `text-muted` class for all secondary/muted text instead of inline styles or gray variants
- **REPLACE** `color: rgba(0,0,0,0.6)` inline styles with `text-muted` class
- **REPLACE** `text-gray-500`, `text-gray-600`, `text-gray-700` with `text-muted` where appropriate
- **EXAMPLES:**
  ```html
  <!-- ✅ CORRECT -->
  <span class="text-muted">Secondary information</span>
  
  <!-- ❌ AVOID -->
  <span style="color: rgba(0,0,0,0.6);">Secondary information</span>
  <span class="text-gray-600">Secondary information</span>
  ```

### 1.2 Primary Text
- **REMOVE** unnecessary `text-gray-900` classes for primary text (default color is sufficient)
- **USE** empty class attribute or remove entirely for primary text color
- **EXAMPLES:**
  ```html
  <!-- ✅ CORRECT -->
  <h4 class="font-semibold">Primary heading</h4>
  
  <!-- ❌ AVOID -->
  <h4 class="font-semibold text-gray-900">Primary heading</h4>
  ```

### 1.3 CSS Color Management
- **USE** CSS custom properties for consistent colors:
  ```css
  :root {
    --text-muted-color: rgba(0,0,0,0.6);
    --primary-color: #0072ce;
    --primary-hover-color: #005aa3;
  }
  ```
- **REPLACE** `rgba(0,0,0,0.6)` in CSS with `var(--text-muted-color)`

## 2. Button Styling Rules

### 2.1 Standard Button Classes
- **USE** `btn btn-light` for light gray buttons instead of custom utility classes
- **USE** `btn btn-primary` for primary action buttons
- **REPLACE** complex utility combinations with semantic button classes

**Button Class Reference:**
```html
<!-- Light gray buttons -->
<button class="btn btn-light">Action</button>

<!-- Primary buttons -->
<button class="btn btn-primary">Primary Action</button>

<!-- Link-style buttons -->
<button class="btn btn-link">Link Action</button>
```

### 2.2 Deprecated Button Patterns
- **AVOID** `btn btn-sm text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700`
- **AVOID** Custom utility combinations for standard button styles

## 3. Border Rules

### 3.1 Card Headers
- **USE** `border-0` class on card headers for cleaner appearance
- **EXAMPLE:**
  ```html
  <!-- ✅ CORRECT -->
  <div class="card-header border-0">
  
  <!-- ❌ AVOID -->
  <div class="card-header">
  ```

## 4. Icon Styling Rules

### 4.1 Muted Icons
- **USE** `text-muted` class for secondary/decorative icons
- **COMBINE** icon classes properly: `fas fa-icon-name text-muted`
- **EXAMPLES:**
  ```html
  <!-- ✅ CORRECT -->
  <i class="fas fa-home text-muted mr-2"></i>
  
  <!-- ❌ AVOID -->
  <i class="fas fa-home text-gray-500 mr-2"></i>
  <i class="fas fa-home mr-2" style="color: rgba(0,0,0,0.6);"></i>
  ```

## 5. Inline Style Elimination

### 5.1 General Rule
- **NEVER** use inline `style` attributes for colors
- **ALWAYS** use CSS classes instead
- **EXCEPTION:** Dynamic styles that must be calculated at runtime

### 5.2 Migration Pattern
```html
<!-- ❌ BEFORE -->
<span style="color: rgba(0,0,0,0.6);">Text</span>

<!-- ✅ AFTER -->
<span class="text-muted">Text</span>
```

## 6. CSS Architecture Rules

### 6.1 Custom Properties
- **DEFINE** color values once in `:root` selector
- **REFERENCE** colors using `var()` function
- **MAINTAIN** single source of truth for colors

### 6.2 Class Naming
- **USE** semantic class names (`.text-muted` vs `.text-gray-600`)
- **PREFER** utility classes over custom styles where appropriate
- **MAINTAIN** consistency with existing design system

## 7. Implementation Checklist

When making styling changes, verify:

- [ ] No inline `style` attributes for colors
- [ ] Consistent use of `text-muted` for secondary text
- [ ] Proper button classes (`btn btn-light`, `btn btn-primary`)
- [ ] Card headers use `border-0` where appropriate
- [ ] Icons use consistent color classes
- [ ] CSS uses custom properties for colors
- [ ] No deprecated utility combinations

## 8. Code Review Guidelines

### 8.1 Required Checks
- Verify adherence to color usage rules
- Check for inline style elimination
- Confirm button class consistency
- Validate icon styling patterns

### 8.2 Red Flags
- Any `style="color: ..."` attributes
- Mixed use of gray color classes
- Complex utility combinations for standard buttons
- Hardcoded color values in CSS

## 9. Migration Strategy

### 9.1 Priority Order
1. **High Priority:** Inline style elimination
2. **Medium Priority:** Button class standardization  
3. **Low Priority:** Border and spacing refinements

### 9.2 Testing
- Visual regression testing after bulk changes
- Accessibility testing for color contrast
- Cross-browser compatibility verification

## 10. Tools & Automation

### 10.1 Recommended Linting Rules
```json
{
  "rules": {
    "no-inline-styles": "error",
    "prefer-semantic-classes": "warning",
    "consistent-color-usage": "error"
  }
}
```

### 10.2 Search & Replace Patterns
```bash
# Find inline color styles
grep -r 'style="[^"]*color:' src/

# Find deprecated gray classes
grep -r 'text-gray-[56]00' src/
```

---

## Questions or Updates?

If you encounter scenarios not covered by these rules, please:
1. Document the use case
2. Propose a solution following existing patterns
3. Update these rules accordingly
4. Communicate changes to the team
