/**
 * GitHub SSO Clicker - Content Script
 * Automatically clicks the Continue button on GitHub SSO pages
 */

(function() {
    'use strict';

    const EXTENSION_NAME = 'GitHub SSO Clicker';
    const SSO_VERIFICATION_TEXT = 'Single sign-on to';
    const BUTTON_SELECTOR = 'button.Button--primary.Button--medium.Button.Button--fullWidth';
    const BUTTON_LABEL_SELECTOR = '.Button-label';
    const EXPECTED_BUTTON_TEXT = 'Continue';

    /**
     * Verifies that the page contains the SSO verification text
     * @returns {boolean} True if the page is a GitHub SSO page
     */
    function verifySSOPage() {
        const pageText = document.body.innerText || document.body.textContent || '';
        const hasVerificationText = pageText.toLowerCase().includes(SSO_VERIFICATION_TEXT.toLowerCase());
        
        if (!hasVerificationText) {
            console.log(`${EXTENSION_NAME}: Not on SSO page, skipping (verification text not found)`);
            return false;
        }
        
        return true;
    }

    /**
     * Finds the Continue button on the page
     * @returns {HTMLElement|null} The button element or null if not found
     */
    function findContinueButton() {
        // First verify we're on the right page
        if (!verifySSOPage()) {
            return null;
        }

        // Find the button by class combination
        const button = document.querySelector(BUTTON_SELECTOR);
        
        if (!button) {
            console.log(`${EXTENSION_NAME}: Continue button not found (selector: ${BUTTON_SELECTOR})`);
            return null;
        }

        // Verify button contains "Continue" text
        const buttonLabel = button.querySelector(BUTTON_LABEL_SELECTOR);
        if (!buttonLabel) {
            console.log(`${EXTENSION_NAME}: Button label not found`);
            return null;
        }

        const buttonText = buttonLabel.textContent.trim();
        if (buttonText !== EXPECTED_BUTTON_TEXT) {
            console.log(`${EXTENSION_NAME}: Button text mismatch. Expected "${EXPECTED_BUTTON_TEXT}", found "${buttonText}"`);
            return null;
        }

        // Additional verification: check if button is within a form
        const form = button.closest('form');
        if (!form) {
            console.log(`${EXTENSION_NAME}: Button not found within a form`);
            return null;
        }

        return button;
    }

    /**
     * Clicks the Continue button if found and verified
     */
    function clickContinueButton() {
        try {
            const button = findContinueButton();
            if (button) {
                // Check if button is visible and enabled
                if (button.offsetParent === null) {
                    console.log(`${EXTENSION_NAME}: Button is not visible`);
                    return;
                }

                if (button.disabled) {
                    console.log(`${EXTENSION_NAME}: Button is disabled`);
                    return;
                }

                button.click();
                console.log(`${EXTENSION_NAME}: Continue button clicked successfully`);
            }
        } catch (error) {
            console.error(`${EXTENSION_NAME}: Error clicking button:`, error);
        }
    }

    /**
     * Waits for the page to be ready and then attempts to click the button
     */
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', clickContinueButton);
        } else {
            // Page already loaded, try immediately
            clickContinueButton();
            
            // Also try after a short delay in case content loads dynamically
            setTimeout(clickContinueButton, 500);
        }
    }

    // Initialize the extension
    init();
})();

