
# Background Image Swap for Slide 4 ("Timeless")

## Summary
Replace the background image for the "Timeless" slide (Slide 4 - Side Table) with your uploaded image. All overlay content, slider behavior, and styling will remain exactly as is.

## What Will Change
- The background image for the "Timeless" slide will be updated
- No other visual or structural changes

## What Will Stay the Same
- Text overlay: "Timeless" title, "MEASURED DESIGN, ENDURING APPEAL" subtitle, "Signature Pieces" collection label
- Gradient overlay for text readability
- Ken-burns animation effect on the image
- Slide transitions and auto-play behavior
- Click-through link to the side table product page
- All other slides remain unchanged

---

## Technical Details

### Step 1: Copy Image Asset
Copy the uploaded image to the project assets folder:
- Source: `user-uploads://BOEMM_II.png`
- Destination: `src/assets/slide-lounge.png` (replacing the existing file)

This direct replacement approach means no code changes are needed since the import statement already references this file.

### Alternative Approach (if preserving old image)
If you want to keep the old image for future use:
1. Copy uploaded image as `src/assets/slide-timeless.png`
2. Update `src/pages/Home.tsx`:
   - Add import: `import slideTimeless from "@/assets/slide-timeless.png";`
   - Update slide 4 to use: `image: slideTimeless`

### Files Affected
| File | Change |
|------|--------|
| `src/assets/slide-lounge.png` | Replaced with new image |

### No Changes To
- `src/components/SlideContent.tsx` - Image container, styling, gradients unchanged
- `src/pages/Home.tsx` - Slide structure, text, links unchanged
- Slider functionality, transitions, responsiveness unchanged
