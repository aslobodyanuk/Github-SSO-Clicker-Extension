# GitHub SSO Clicker - Firefox Extension

A Firefox browser extension that automatically clicks the "Continue" button on GitHub's Single Sign-On (SSO) authentication pages.

## Features

- Automatically clicks the Continue button on GitHub SSO pages
- Safety verification ensures it only activates on SSO pages (checks for "Single sign-on to" text)
- No permissions required - runs as a content script only
- Lightweight and fast

## Installation

### Method 1: Temporary Installation (for testing)

1. Open Firefox
2. Navigate to `about:debugging`
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on..."
5. Select the `manifest.json` file from this extension directory
6. The extension is now loaded and will work until you restart Firefox

### Method 2: Permanent Installation (for regular use)

1. Open Firefox
2. Navigate to `about:debugging`
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on..."
5. Select the `manifest.json` file
6. Click the gear icon next to the extension
7. Click "Debug" to open the extension's debug page
8. On the debug page, click "Reload" to keep it loaded after restart

Alternatively, you can package the extension:

1. Zip all the extension files (manifest.json, content-script.js, icons folder)
2. Change the file extension from `.zip` to `.xpi`
3. Open Firefox and go to `about:addons`
4. Click the gear icon and select "Install Add-on From File..."
5. Select your `.xpi` file

## How It Works

1. The extension runs as a content script on all `https://github.com/*` pages
2. When a page loads, it checks for the presence of "Single sign-on to" text
3. If found, it locates the Continue button using the following criteria:
   - Button with classes: `Button--primary Button--medium Button Button--fullWidth`
   - Contains a span with class `Button-label` and text "Continue"
   - Located within a form element
4. If all checks pass, it automatically clicks the button

## Safety Features

- **Page Verification**: Only activates when "Single sign-on to" text is present
- **Button Verification**: Verifies button text matches "Continue" exactly
- **Visibility Check**: Ensures button is visible before clicking
- **Error Handling**: Gracefully handles errors without breaking the page

## File Structure

```
Github-SSO-Clicker-Extension/
├── manifest.json          # Extension manifest (Manifest V3)
├── content-script.js      # Main content script
├── README.md              # This file
└── icons/                 # Extension icons (optional)
    ├── icon-16.png
    ├── icon-48.png
    └── icon-128.png
```

## Testing

To test the extension:

1. Install it using one of the methods above
2. Navigate to a GitHub SSO page (e.g., `https://github.com/enterprises/*/saml/*`)
3. The extension should automatically click the Continue button
4. Check the browser console (F12) for extension logs

## Troubleshooting

- **Extension not working**: Check the browser console for error messages
- **Button not found**: Ensure you're on a GitHub SSO page with "Single sign-on to" text
- **Button not clicked**: Verify the button is visible and enabled

## Development

To modify the extension:

1. Edit `content-script.js` for behavior changes
2. Edit `manifest.json` for configuration changes
3. After making changes, reload the extension in `about:debugging`

To build a packaged ZIP, install `web-ext` globally (requires Node.js and npm):

```powershell
npm install --global web-ext
```

From the extension directory containing `manifest.json`, run:

```powershell
web-ext build
```

This creates or updates `web-ext-artifacts/` with the packaged extension ZIP. Run the build again after changing the extension files to generate an updated package.

## License

This extension is provided as-is for personal use.

