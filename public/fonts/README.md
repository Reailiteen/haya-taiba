# FF Shamel Font Files

## Available Font Files:
✅ **Currently Available:**
- FF Shamel Family Sans One Book.ttf (Font Weight: 400 - Regular)
- FF Shamel Family Sans One Bold.ttf (Font Weight: 700 - Bold)

## Font Usage:
- **Navigation Buttons**: Uses FF Shamel Book (regular weight)
- **Active Section**: Uses FF Shamel Bold for emphasis
- **Fallback**: Noto Sans Arabic if FF Shamel is unavailable

## Current Status:
✅ Font files are present and configured
✅ Navigation will use FF Shamel when available
✅ Error notification will appear if font loading fails
✅ Automatic fallback to Noto Sans Arabic

## Font Configuration:
The fonts are loaded via @font-face declarations in globals.css:
- Book variant mapped to font-weight: 400
- Bold variant mapped to font-weight: 700
