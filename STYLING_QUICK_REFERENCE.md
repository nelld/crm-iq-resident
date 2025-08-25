# Quick Styling Reference

## 🎯 Quick Replacements

### Text Colors
```html
<!-- OLD → NEW -->
style="color: rgba(0,0,0,0.6);" → class="text-muted"
text-gray-500 → text-muted
text-gray-600 → text-muted  
text-gray-700 → text-muted (for secondary text)
text-gray-900 → "" (remove, use default)
```

### Buttons
```html
<!-- OLD → NEW -->
class="btn btn-sm text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700" 
→ class="btn btn-light"

class="bg-primary text-white px-4 py-2 rounded-lg"
→ class="btn btn-primary"
```

### Card Headers
```html
<!-- OLD → NEW -->
<div class="card-header"> → <div class="card-header border-0">
```

### Icons
```html
<!-- OLD → NEW -->
<i class="fas fa-home text-gray-500"> → <i class="fas fa-home text-muted">
<i class="fas fa-home" style="color: rgba(0,0,0,0.6);"> → <i class="fas fa-home text-muted">
```

## ⚡ Search Patterns

Find issues in your code:

```bash
# Inline color styles
grep -r 'style="[^"]*color:' .

# Gray color classes to review
grep -r 'text-gray-[567]00' .

# Old button patterns  
grep -r 'bg-gray-100 hover:bg-gray-200' .
```

## ✅ Common Classes

| Purpose | Class | Example |
|---------|-------|---------|
| Secondary text | `text-muted` | Dates, descriptions, metadata |
| Primary buttons | `btn btn-primary` | Save, Submit, Create |
| Light buttons | `btn btn-light` | Cancel, Edit, Add |
| Link buttons | `btn btn-link` | Read more, View details |
| Card headers | `card-header border-0` | Clean card appearance |

## 🚫 Avoid These

- `style="color: rgba(0,0,0,0.6);"`
- `text-gray-900` (usually unnecessary)
- Long utility class chains for buttons
- Inconsistent gray color usage
- Inline styles for any colors
