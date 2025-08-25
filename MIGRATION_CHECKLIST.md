# CRM IQ Styling Migration Checklist

## 🎯 Pre-Migration Setup

- [ ] Back up current files
- [ ] Create feature branch for styling updates  
- [ ] Add `text-muted` class to CSS if not present
- [ ] Add CSS custom properties for colors
- [ ] Test validation script on sample files

## 📋 File-by-File Checklist

For each HTML file being migrated:

### Color Classes
- [ ] Replace `style="color: rgba(0,0,0,0.6);"` with `class="text-muted"`
- [ ] Replace `text-gray-500` with `text-muted` (for secondary text)
- [ ] Replace `text-gray-600` with `text-muted` (for secondary text)  
- [ ] Replace `text-gray-700` with `text-muted` (for secondary text)
- [ ] Remove unnecessary `text-gray-900` classes
- [ ] Check for other inline color styles

### Button Updates
- [ ] Replace complex utility button classes with `btn btn-light`
- [ ] Replace primary button utilities with `btn btn-primary`
- [ ] Update link-style buttons to `btn btn-link`
- [ ] Ensure proper button sizing classes if needed

### Card & Layout
- [ ] Add `border-0` to card headers where appropriate
- [ ] Check for consistent spacing classes
- [ ] Verify icon + text combinations use proper classes

### Icon Classes  
- [ ] Update icon classes to use `text-muted` instead of gray variants
- [ ] Ensure proper combination: `fas fa-icon-name text-muted`
- [ ] Remove inline icon color styles

## 🔍 CSS File Migration

For each CSS file:

- [ ] Replace hardcoded `rgba(0,0,0,0.6)` with `var(--text-muted-color)`
- [ ] Add CSS custom properties if missing
- [ ] Update button classes to use custom properties
- [ ] Remove duplicate color definitions
- [ ] Verify cascade and specificity

## ✅ Validation Steps

After each file:

- [ ] Run style validation script
- [ ] Visual check in browser
- [ ] Test button hover states  
- [ ] Check responsive behavior
- [ ] Verify accessibility (contrast ratios)

## 🧪 Testing Checklist

Before committing changes:

### Visual Testing
- [ ] Load pages in browser
- [ ] Check all interactive states (hover, focus, active)
- [ ] Test different screen sizes
- [ ] Compare before/after screenshots

### Functionality Testing  
- [ ] Click all buttons to ensure they work
- [ ] Test form submissions
- [ ] Verify dropdown menus function
- [ ] Check modal/popover interactions

### Accessibility Testing
- [ ] Tab through interactive elements
- [ ] Test with screen reader
- [ ] Verify color contrast ratios
- [ ] Check focus indicators

### Cross-Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox  
- [ ] Safari (if applicable)
- [ ] Mobile browsers

## 📊 Batch Processing Commands

Use these for large-scale updates:

```bash
# Find all inline color styles
grep -r 'style="[^"]*color:' . --include="*.html"

# Find gray color classes
grep -r 'text-gray-[567]00' . --include="*.html"

# Count violations before/after
grep -c 'rgba(0,0,0,0.6)' *.css

# Validate all files
node validate-styles.js . 
```

## 🚀 Deployment Checklist

Before deploying:

- [ ] All validation scripts pass
- [ ] No console errors in browser
- [ ] Performance impact assessed
- [ ] Peer review completed
- [ ] Documentation updated
- [ ] Changelog updated

## 📈 Success Metrics

Track these improvements:

- [ ] Number of inline styles eliminated
- [ ] Consistency score improved
- [ ] CSS file size impact
- [ ] Development velocity increase
- [ ] Reduced design system violations

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|--------|----------|
| Text too light | Wrong muted color | Check CSS custom property value |
| Buttons not styled | Missing CSS import | Ensure design-system-classes.css is loaded |
| Hover states broken | Removed necessary classes | Re-add hover: utilities |
| Icons misaligned | Changed class combinations | Verify icon + text spacing |

## 📝 Notes Template

Use this for tracking progress:

```
File: [filename]
Date: [date]
Changes:
- [ ] Inline styles: [count] removed
- [ ] Button classes: [count] updated  
- [ ] Text muted: [count] applied
- [ ] Issues found: [list]
- [ ] Testing status: [passed/failed]

Next steps:
- [ ] [action item 1]
- [ ] [action item 2]
```

---

## 🎉 Completion Criteria

Migration is complete when:

- ✅ No inline color styles remain
- ✅ Consistent use of `text-muted` class
- ✅ All buttons use standard classes
- ✅ Validation script passes with 0 errors
- ✅ Visual regression tests pass
- ✅ Team review and approval obtained
