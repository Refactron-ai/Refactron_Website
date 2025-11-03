# OG Image Creation Guide

The website references `og-image.png` for social media sharing previews. This file should be created with the following specifications:

## Requirements
- **Dimensions**: 1200 x 630 pixels
- **Format**: PNG or JPEG
- **File size**: Under 1MB (ideally under 300KB)
- **Location**: `public/og-image.png`

## Content Suggestions
Include in the OG image:
1. Refactron logo (from `public/Refactron-logo-TM.png`)
2. Tagline: "AI-Powered Code Refactoring & Optimization"
3. Brand colors: Teal (#20B2AA) gradient
4. Clean, professional design

## Tools to Create OG Image
- **Figma**: Use a template for OG images
- **Canva**: Search for "Open Graph Image" templates
- **Adobe Photoshop/Illustrator**: Create custom design
- **Online tools**: 
  - https://www.opengraph.xyz/
  - https://www.bannerbear.com/

## Temporary Placeholder
Until a custom OG image is created, the current logo.png is used as a fallback.

## Testing
After creating the image, test it using:
- https://www.opengraph.xyz/
- https://cards-dev.twitter.com/validator
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/

## Notes
- The image appears when someone shares your website on social media (Twitter, LinkedIn, Facebook, etc.)
- It's one of the most important assets for social media presence
- Update `public/index.html` to reference the new image file if named differently
