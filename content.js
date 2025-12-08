// Content script for Doc_HEMA Team Extension
console.log('Doc_HEMA Team Extension content script loaded');

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fillCardForm') {
        const result = fillCardForm(request.cardData);
        sendResponse(result);
    } else if (request.action === 'getFormData') {
        const formData = getFormData();
        sendResponse(formData);
    }
});

// Fill card form function
function fillCardForm(cardData) {
    try {
        console.log('Filling card form with data:', cardData);

        // Common card input selectors
        const cardSelectors = [
            'input[name*="card"]',
            'input[name*="number"]',
            'input[name*="cc"]',
            'input[name*="credit"]',
            'input[name*="debit"]',
            'input[placeholder*="card"]',
            'input[placeholder*="number"]',
            'input[placeholder*="cc"]',
            'input[placeholder*="credit"]',
            'input[placeholder*="debit"]',
            'input[type="text"][maxlength="16"]',
            'input[type="text"][maxlength="19"]',
            'input[type="tel"][maxlength="16"]',
            'input[type="tel"][maxlength="19"]'
        ];

        const expirySelectors = [
            'input[name*="expiry"]',
            'input[name*="exp"]',
            'input[name*="month"]',
            'input[name*="year"]',
            'input[placeholder*="expiry"]',
            'input[placeholder*="exp"]',
            'input[placeholder*="MM/YY"]',
            'input[placeholder*="MM/YYYY"]',
            'input[placeholder*="MM/YY"]',
            'input[placeholder*="MM/YYYY"]'
        ];

        const cvvSelectors = [
            'input[name*="cvv"]',
            'input[name*="cvc"]',
            'input[name*="security"]',
            'input[placeholder*="cvv"]',
            'input[placeholder*="cvc"]',
            'input[placeholder*="security"]',
            'input[type="text"][maxlength="3"]',
            'input[type="text"][maxlength="4"]',
            'input[type="tel"][maxlength="3"]',
            'input[type="tel"][maxlength="4"]'
        ];

        let filledCount = 0;

        // Fill card number
        for (const selector of cardSelectors) {
            const inputs = document.querySelectorAll(selector);
            for (const input of inputs) {
                if (isVisibleInput(input) && !input.value) {
                    input.value = cardData.cardNumber;
                    triggerEvents(input);
                    filledCount++;
                    console.log('Filled card number:', cardData.cardNumber);
          break;
        }
      }
            if (filledCount > 0) break;
        }

        // Fill expiry date
        for (const selector of expirySelectors) {
            const inputs = document.querySelectorAll(selector);
            for (const input of inputs) {
                if (isVisibleInput(input) && !input.value) {
                    input.value = cardData.expiryDate;
                    triggerEvents(input);
                    filledCount++;
                    console.log('Filled expiry date:', cardData.expiryDate);
                    break;
                }
            }
            if (filledCount > 1) break;
        }

        // Fill CVV
        for (const selector of cvvSelectors) {
            const inputs = document.querySelectorAll(selector);
            for (const input of inputs) {
                if (isVisibleInput(input) && !input.value) {
                    input.value = cardData.cvv;
                    triggerEvents(input);
                    filledCount++;
                    console.log('Filled CVV:', cardData.cvv);
                    break;
                }
            }
            if (filledCount > 2) break;
        }

        return { 
            success: true, 
            message: `تم ملء ${filledCount} حقل بنجاح`,
            filledCount: filledCount
        };
    } catch (error) {
        console.error('Fill form error:', error);
        return { success: false, error: error.message };
    }
}

// Check if input is visible and fillable
function isVisibleInput(input) {
    return input.offsetParent !== null && 
           input.type !== 'hidden' && 
           input.style.display !== 'none' && 
           input.style.visibility !== 'hidden' &&
           input.disabled === false;
}

// Trigger events on input
function triggerEvents(input) {
    const events = ['input', 'change', 'blur', 'focus'];
    events.forEach(eventType => {
        input.dispatchEvent(new Event(eventType, { bubbles: true }));
    });
}

// Get form data from current page
function getFormData() {
    try {
        const forms = document.querySelectorAll('form');
        const formData = [];

        forms.forEach((form, index) => {
            const inputs = form.querySelectorAll('input, select, textarea');
            const formInfo = {
                index: index,
                action: form.action,
                method: form.method,
                inputs: []
            };

            inputs.forEach(input => {
                if (isVisibleInput(input)) {
                    formInfo.inputs.push({
                        name: input.name,
                        type: input.type,
                        placeholder: input.placeholder,
                        value: input.value,
                        maxLength: input.maxLength,
                        required: input.required
                    });
                }
            });

            if (formInfo.inputs.length > 0) {
                formData.push(formInfo);
            }
        });

        return { success: true, formData: formData };
    } catch (error) {
        console.error('Get form data error:', error);
        return { success: false, error: error.message };
    }
}

// Auto-fill on page load for specific sites
function autoFillOnLoad() {
    // Check if we're on a supported payment site
    const currentUrl = window.location.href.toLowerCase();
    const paymentKeywords = ['payment', 'checkout', 'billing', 'card', 'credit', 'debit'];
    
    const isPaymentPage = paymentKeywords.some(keyword => currentUrl.includes(keyword));
    
    if (isPaymentPage) {
        console.log('Payment page detected, ready for auto-fill');
        // You can add specific logic here for different payment sites
    }
}

// Listen for page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoFillOnLoad);
} else {
    autoFillOnLoad();
}

// Listen for dynamic content changes
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            // Check if new forms were added
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const forms = node.querySelectorAll ? node.querySelectorAll('form') : [];
                    if (forms.length > 0) {
                        console.log('New forms detected on page');
                    }
                }
            });
        }
    });
});

// Start observing
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Keyboard shortcuts for manual trigger
document.addEventListener('keydown', (e) => {
    // Ctrl+Shift+V for active bin
    if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        e.preventDefault();
        chrome.runtime.sendMessage({ action: 'executeActiveBin' });
    }
    // Ctrl+Shift+X for decline bin
    else if (e.ctrlKey && e.shiftKey && e.key === 'X') {
        e.preventDefault();
        chrome.runtime.sendMessage({ action: 'executeDeclineBin' });
    }
});

// Context menu integration
document.addEventListener('contextmenu', (e) => {
    // You can add context menu logic here if needed
    const target = e.target;
    if (target.tagName === 'INPUT' && target.type === 'text') {
        console.log('Right-clicked on input field');
    }
});

// Export functions for testing
window.docHemaExtension = {
    fillCardForm,
    getFormData,
    isVisibleInput
}; 