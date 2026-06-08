/* ===================================================
   CONTACT FORM - VALIDATION & INTERACTION LOGIC
   Comprehensive form handling with client-side validation
   =================================================== */

/**
 * ContactForm Class
 * Manages all form validation, error handling, and user interaction
 * Follows modern JavaScript practices with proper encapsulation
 */
class ContactForm {
    /**
     * Constructor - Initialize form elements and set up event listeners
     */
    constructor() {
        // Get form and input elements from the DOM
        this.form = document.getElementById('contactForm');
        this.fullNameInput = document.getElementById('fullName');
        this.emailInput = document.getElementById('email');
        this.messageInput = document.getElementById('message');
        this.submitButton = this.form.querySelector('.form-button');

        // Get error message containers
        this.fullNameError = document.getElementById('fullNameError');
        this.emailError = document.getElementById('emailError');
        this.messageError = document.getElementById('messageError');

        // Get success message container
        this.successMessage = document.getElementById('successMessage');

        // Email validation regex pattern - matches standard email format
        this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Initialize event listeners
        this.setupEventListeners();

        // Show form on page load (hide success message)
        this.showForm();
    }

    /**
     * Setup all event listeners for form interactions
     * Includes real-time validation on input changes
     */
    setupEventListeners() {
        // Form submission - prevent default and validate
        this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Real-time validation on input change - immediate error removal
        this.fullNameInput.addEventListener('input', () => this.clearErrorFor('fullName'));
        this.emailInput.addEventListener('input', () => this.clearErrorFor('email'));
        this.messageInput.addEventListener('input', () => this.clearErrorFor('message'));

        // Optional: Validate on blur (focus loss) for better UX
        this.fullNameInput.addEventListener('blur', () => this.validateField('fullName'));
        this.emailInput.addEventListener('blur', () => this.validateField('email'));
        this.messageInput.addEventListener('blur', () => this.validateField('message'));
    }

    /**
     * Handle form submission
     * @param {Event} e - The form submission event
     */
    handleFormSubmit(e) {
        // Prevent form from actually submitting to a server
        e.preventDefault();

        // Validate all form fields
        const isValid = this.validateForm();

        // If validation passes, show success message
        if (isValid) {
            this.showSuccessMessage();
        }
    }

    /**
     * Validate entire form
     * Checks all fields and displays errors if validation fails
     * @returns {boolean} - True if all fields are valid, false otherwise
     */
    validateForm() {
        // Reset validation state by clearing previous errors
        this.clearAllErrors();

        // Validate each field individually
        const isNameValid = this.validateField('fullName');
        const isEmailValid = this.validateField('email');
        const isMessageValid = this.validateField('message');

        // Return true only if all validations pass
        return isNameValid && isEmailValid && isMessageValid;
    }

    /**
     * Validate individual form field
     * @param {string} fieldName - The name of the field to validate
     * @returns {boolean} - True if field is valid, false otherwise
     */
    validateField(fieldName) {
        // Get the input element based on field name
        const input = this[`${fieldName}Input`];
        
        // Trim whitespace from input value to handle spaces properly
        const value = input.value.trim();

        // Store trimmed value back to input (removes leading/trailing spaces)
        input.value = value;

        let errorMessage = '';

        /**
         * Field-specific validation logic
         */
        if (fieldName === 'fullName') {
            errorMessage = this.validateFullName(value);
        } else if (fieldName === 'email') {
            errorMessage = this.validateEmail(value);
        } else if (fieldName === 'message') {
            errorMessage = this.validateMessage(value);
        }

        // If there's an error message, show it
        if (errorMessage) {
            this.showErrorFor(fieldName, errorMessage);
            return false; // Field validation failed
        }

        // No errors - field is valid
        return true;
    }

    /**
     * Validate full name field
     * Rule: Cannot be empty
     * @param {string} value - The full name input value
     * @returns {string} - Error message if invalid, empty string if valid
     */
    validateFullName(value) {
        // Check if name is empty after trimming
        if (value === '') {
            return 'Please enter your full name.';
        }

        // Name is valid
        return '';
    }

    /**
     * Validate email field
     * Rules: Cannot be empty, must match valid email format
     * @param {string} value - The email input value
     * @returns {string} - Error message if invalid, empty string if valid
     */
    validateEmail(value) {
        // Check if email is empty
        if (value === '') {
            return 'Please enter your email address.';
        }

        // Check if email matches the valid email regex pattern
        if (!this.emailRegex.test(value)) {
            return 'Please enter a valid email address (e.g., name@example.com).';
        }

        // Email is valid
        return '';
    }

    /**
     * Validate message field
     * Rules: Cannot be empty, must contain at least 10 characters
     * @param {string} value - The message input value
     * @returns {string} - Error message if invalid, empty string if valid
     */
    validateMessage(value) {
        // Check if message is empty
        if (value === '') {
            return 'Please enter a message.';
        }

        // Check if message has minimum length of 10 characters
        if (value.length < 10) {
            return `Message must be at least 10 characters (currently ${value.length}).`;
        }

        // Message is valid
        return '';
    }

    /**
     * Display error message for a specific field
     * @param {string} fieldName - The field name (fullName, email, or message)
     * @param {string} message - The error message to display
     */
    showErrorFor(fieldName, message) {
        // Get the input and error message elements
        const input = this[`${fieldName}Input`];
        const errorElement = this[`${fieldName}Error`];

        // Add error styling to the input field (red border)
        input.classList.add('error');

        // Display the error message
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    /**
     * Clear error message for a specific field
     * Remove error styling and hide error message
     * @param {string} fieldName - The field name to clear errors for
     */
    clearErrorFor(fieldName) {
        // Get the input and error message elements
        const input = this[`${fieldName}Input`];
        const errorElement = this[`${fieldName}Error`];

        // Remove error styling from input field
        input.classList.remove('error');

        // Clear error message and hide it
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    /**
     * Clear all error messages and styling
     * Removes errors for all form fields
     */
    clearAllErrors() {
        this.clearErrorFor('fullName');
        this.clearErrorFor('email');
        this.clearErrorFor('message');
    }

    /**
     * Reset form fields to empty state
     * Clears all user input and error states
     */
    resetForm() {
        // Clear all input values
        this.fullNameInput.value = '';
        this.emailInput.value = '';
        this.messageInput.value = '';

        // Clear all error messages and styling
        this.clearAllErrors();

        // Return focus to first input for accessibility
        this.fullNameInput.focus();
    }

    /**
     * Display success message after form submission
     * Hides form, shows success message, and resets form after delay
     */
    showSuccessMessage() {
        // Hide the form
        this.form.classList.remove('active');

        // Show success message with animation
        this.successMessage.classList.add('show');

        // Reset form in background
        this.resetForm();

        // After 3 seconds, reset UI back to form
        setTimeout(() => {
            this.showForm();
        }, 3000);
    }

    /**
     * Show the form and hide success message
     * Called on page load and after success message timeout
     */
    showForm() {
        // Show the form
        this.form.classList.add('active');

        // Hide success message
        this.successMessage.classList.remove('show');

        // Focus on first form field for accessibility
        this.fullNameInput.focus();
    }
}

/**
 * Initialize the contact form when the DOM is fully loaded
 * Ensures all HTML elements are available before JavaScript runs
 */
document.addEventListener('DOMContentLoaded', () => {
    // Create new ContactForm instance to start form handling
    new ContactForm();

    // Optional: Log message for development
    if (process.env.NODE_ENV === 'development') {
        console.log('Contact form initialized successfully');
    }
});

/**
 * ERROR HANDLING & EDGE CASES
 * 
 * The validation system handles:
 * - Empty inputs: Caught by empty string checks
 * - Multiple spaces: Trimmed via .trim() method
 * - Invalid email formats: Validated against regex pattern
 * - Short messages: Length check ensures minimum 10 characters
 * - Leading/trailing whitespace: Trimmed before validation
 * - Special characters: Allowed in all fields (no restriction)
 * - Copy-paste with spaces: Handled by trim() on input
 * 
 * USER EXPERIENCE FEATURES
 * - Real-time error clearing: Errors disappear when user starts typing
 * - Blur validation: Additional validation when user leaves a field
 * - Success feedback: 3-second success display with auto-reset to form
 * - Accessibility focus management: Focus returned to first field after submission
 * - ARIA live regions: Screen readers announce validation errors
 */
