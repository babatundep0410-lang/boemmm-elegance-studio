
# Product Page Redesign - Scrollable Image Gallery with Custom Scroll Indicator

## Overview

Redesign the product page to match the reference exactly, with the key insight that the vertical line on the right edge of the left column is a **scroll indicator** for the product images gallery, not a static border.

---

## Architecture Changes

### Current Layout Issue
The current implementation has:
- A static `border-r border-border` on the left column
- Images stacked vertically with no scroll behavior
- Right column is sticky while left scrolls with page

### Target Layout
The reference shows:
- Left column is a **scrollable image gallery** with a custom thin scroll indicator on its left edge
- Right column remains fixed/sticky with product information
- The scroll indicator shows position within the image gallery

---

## Technical Implementation

### 1. Left Column - Scrollable Image Gallery

Wrap the left column content in a custom scroll area that:
- Uses `overflow-y-auto` for vertical scrolling
- Has a custom styled scrollbar on the right edge (thin line)
- Contains all product images stacked vertically
- Takes up the full viewport height on desktop

```text
Implementation approach:
- Use Radix ScrollArea component for custom scrollbar styling
- OR create a custom scroll indicator using CSS/JavaScript
- Thin scrollbar track on the right edge
- Minimal scrollbar thumb that indicates position
```

### 2. Custom Scroll Indicator Styling

The scroll indicator should be:
- A thin vertical line (1-2px wide)
- Positioned on the right edge of the left column
- Shows scroll position with a darker/highlighted segment
- Minimal and refined appearance

```text
CSS approach for custom scrollbar:
- Hide default scrollbar
- Create custom scrollbar track (thin line)
- Scrollbar thumb matches the scroll position
- Smooth scroll behavior
```

### 3. Layout Structure Update

```text
Grid Layout:
+----------------------------------+------------------+
|                                  |                  |
|   Left Column (Scrollable)     ||| Right Column    |
|   - Image 1                    ||| (Sticky)        |
|   - Image 2                    |||                 |
|   - Image 3 (future)           ||| Product Info    |
|   - etc.                       ||| Price, Qty      |
|                                ||| Add to Cart     |
|   [Scroll Indicator on right]  ||| Accordions      |
|                                  |                  |
+----------------------------------+------------------+

||| = thin scroll indicator line
```

---

## File Modifications

### `src/pages/ProductPage.tsx`

**Changes Required:**

1. **Import ScrollArea** from `@/components/ui/scroll-area`

2. **Restructure left column layout:**
   - Wrap image containers in ScrollArea
   - Set fixed height (`h-screen`) on desktop
   - Configure custom scrollbar appearance

3. **Update scrollbar styling:**
   - Override ScrollBar component styles for thin appearance
   - Position on right edge as scroll indicator
   - Minimal track, thin thumb

4. **Image container adjustments:**
   - Remove the `border-r border-border` from left column container
   - Keep thin horizontal dividers between images
   - Maintain aspect ratios and padding

5. **Right column refinements:**
   - Keep sticky positioning
   - Refine typography and spacing per reference
   - Update button styling to match reference

---

## CSS/Styling Details

### Custom Scroll Indicator

```text
Scrollbar styling:
- Track: transparent or very light (almost invisible)
- Thumb: thin (2-3px width), dark color matching text
- Width: Much thinner than default (w-1 or w-0.5)
- No rounded corners (sharp, minimal)
```

### Implementation Options

**Option A: Custom ScrollArea Styling**
- Use the existing ScrollArea component
- Override scrollbar width and thumb styling
- Add custom className for thin appearance

**Option B: CSS-only Custom Scrollbar**
- Use `scrollbar-width: thin` and custom webkit styles
- Create ultra-minimal scrollbar appearance
- More cross-browser control

**Recommended: Option A** - Leverage existing ScrollArea component with custom styling overrides for consistency with the design system.

---

## Additional Refinements (per reference)

1. **Typography adjustments:**
   - Title: Slightly smaller, refined serif
   - Description: Proper paragraph spacing
   - Price label: Bold "Price" above value

2. **Quantity selector:**
   - Thinner borders
   - Smaller +/- icons
   - More compact appearance

3. **Add to Cart button:**
   - Solid charcoal/brown background (`bg-[#7a7a7a]`)
   - Slight rounding
   - White text

4. **Accordion sections:**
   - Clean horizontal dividers
   - Proper spacing between items

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/ProductPage.tsx` | Add ScrollArea, restructure layout, update styling |
| `src/components/ui/scroll-area.tsx` | Potentially add variant for thin scrollbar (optional) |

---

## Expected Result

After implementation:
- Left column becomes a scrollable image gallery
- Thin vertical scroll indicator appears on right edge of left column
- Scroll indicator moves as user scrolls through images
- Right column remains fixed with product information
- Overall appearance matches reference exactly
- Calm, editorial, luxury aesthetic maintained
