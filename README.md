# 📧 Professional Contact Form

A modern, responsive, and accessible contact form built with vanilla HTML, CSS, and JavaScript. Perfect for portfolios, websites, and academic projects.

## ✨ Features

### Form Functionality
- ✅ **Contact Form Fields**: Full Name, Email, Message
- ✅ **Real-Time Validation**: Immediate error feedback as users type
- ✅ **Error Highlighting**: Invalid fields display red borders with clear error messages
- ✅ **Success Feedback**: Animated success message after valid submission
- ✅ **Auto-Reset**: Form resets automatically after successful submission

### Validation Rules
| Field | Rules |
|-------|-------|
| **Full Name** | • Cannot be empty<br>• Whitespace trimmed before validation |
| **Email** | • Cannot be empty<br>• Must match valid email format (regex)<br>• Accepts standard email patterns |
| **Message** | • Cannot be empty<br>• Minimum 10 characters required<br>• Special characters allowed |

### Design & Accessibility
- 📱 **Fully Responsive**: Desktop, tablet, and mobile optimized
- 🎨 **Modern UI**: Card-style layout with smooth animations
- ♿ **Accessibility**: WCAG AA compliant with:
  - Semantic HTML5 markup
  - ARIA labels and live regions
  - Keyboard navigation support
  - High contrast text
  - Focus indicators
- 🌓 **Dark Mode**: Automatic support via `prefers-color-scheme`
- ⚡ **Performance**: Optimized animations and smooth transitions

## 📁 Project Structure

```
contact-form/
├── index.html          # Semantic HTML structure
├── style.css           # Responsive styling & animations
├── script.js           # Form validation & interaction logic
└── README.md           # This file
```

## 🚀 Quick Start

### 1. Open the Form
Simply open `index.html` in your web browser. No server or build tools required!

```bash
# Option 1: Direct browser open
open index.html

# Option 2: Using a local server (optional)
python -m http.server 8000
# Then navigate to: http://localhost:8000
```

### 2. Test the Form
- **Valid Submission**: Fill all fields correctly and click "Send Message"
- **Validation**: Try leaving fields empty or entering invalid data
- **Responsive**: Resize your browser to see mobile optimization

## 🎯 How It Works

### Validation Logic
```
User Input
    ↓
Real-time Error Clearing (on input)
    ↓
Blur Validation (on field exit)
    ↓
Form Submission Validation (on submit)
    ↓
All Valid? → Show Success Message & Reset Form
    ↓
Invalid? → Display Errors & Highlight Fields
```

### Error Handling Examples

#### Example 1: Empty Full Name
```
User leaves name field empty
→ Error: "Please enter your full name."
→ Red border applied to input
→ Error message displays below field
```

#### Example 2: Invalid Email
```
User enters: "invalidemail"
→ Error: "Please enter a valid email address (e.g., name@example.com)."
→ Red border applied to input
→ Error clears when user starts typing
```

#### Example 3: Short Message
```
User enters: "Hi there" (8 characters)
→ Error: "Message must be at least 10 characters (currently 8)."
→ Error clears once message reaches 10+ characters
```

## 💻 Code Structure

### HTML (`index.html`)
- Semantic form elements with proper labels
- ARIA attributes for screen readers
- Success message container (hidden by default)
- Accessibility-focused markup

### CSS (`style.css`)
- **CSS Variables**: Easy theme customization
- **Responsive Breakpoints**:
  - 768px: Tablet adjustments
  - 480px: Mobile optimizations
- **Animations**:
  - `slideInUp`: Form entry animation
  - `slideDown`: Error message animation
  - `bounce`: Success icon animation
  - `fadeIn`: Success message appearance

### JavaScript (`script.js`)
- **ContactForm Class**: Encapsulated form logic
- **Validation Methods**: Separate validators for each field
- **Event Listeners**: Real-time and blur validation
- **DOM Manipulation**: Clean error/success state management
- **Focus Management**: Keyboard accessibility support

## 🎨 Customization

### Change Primary Color
Edit the CSS variables in `style.css`:

```css
:root {
    --primary-color: #6366f1;      /* Change this */
    --primary-dark: #4f46e5;       /* And this */
    --primary-light: #818cf8;      /* And this */
}
```

### Modify Validation Rules
Edit validation methods in `script.js`:

```javascript
// Example: Change minimum message length
validateMessage(value) {
    if (value.length < 20) {  // Changed from 10 to 20
        return `Message must be at least 20 characters.`;
    }
    return '';
}
```

### Adjust Responsive Breakpoints
Edit media queries in `style.css`:

```css
@media (max-width: 1024px) {  /* Add new breakpoint */
    /* Your mobile styles */
}
```

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ All versions |
| Firefox | ✅ All versions |
| Safari | ✅ All versions |
| Edge | ✅ All versions |
| IE 11 | ⚠️ Partial (no CSS Grid) |

## ♿ Accessibility Features

### ARIA Implementation
```html
<!-- Labels for screen readers -->
<label for="email">Email Address</label>

<!-- Error announcements -->
<div role="alert" aria-live="polite"></div>

<!-- Input descriptions -->
<input aria-describedby="emailError">
```

### Keyboard Navigation
- **Tab**: Navigate between form fields
- **Shift+Tab**: Navigate backwards
- **Enter**: Submit form
- **Escape**: (Optional) Can be added for clearing form

### Focus Management
- Visual focus indicators on all interactive elements
- Focus automatically returns to first field after submission
- Focus styles have 3px outline for visibility

## 🧪 Testing Checklist

- [ ] **Empty Form**: Try submitting with no data
- [ ] **Single Fields**: Leave each field empty individually
- [ ] **Invalid Email**: Test with `test@`, `test.com`, `@example.com`
- [ ] **Short Message**: Enter 5-9 character message
- [ ] **Whitespace**: Enter spaces only in each field
- [ ] **Special Characters**: Test with `!@#$%^&*()` in message
- [ ] **Copy-Paste**: Paste text with leading/trailing spaces
- [ ] **Mobile View**: Test on 375px, 768px widths
- [ ] **Keyboard Only**: Navigate and submit using Tab and Enter
- [ ] **Screen Reader**: Test with VoiceOver (Mac) or NVDA (Windows)

## 📊 Responsive Breakpoints

| Device | Width | Adjustments |
|--------|-------|------------|
| **Desktop** | > 768px | Full layout, 500px max-width |
| **Tablet** | 481-768px | Adjusted spacing, 85vw max-width |
| **Mobile** | < 480px | Compact padding, full width, 44px min button height |

## 🔒 Security Notes

- ⚠️ **Client-Side Validation Only**: This form validates on the client side. For production, implement server-side validation.
- ⚠️ **No Data Submission**: Currently, the form doesn't send data anywhere. To submit data:
  - Use Fetch API: `fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })`
  - Use FormData: `new FormData(this.form)` and send via Fetch
  - Integrate with backend service (Node.js, PHP, Python, etc.)

## 📝 Example: Adding Server Submission

```javascript
// In script.js, modify showSuccessMessage():
async handleFormSubmit(e) {
    e.preventDefault();
    
    if (this.validateForm()) {
        try {
            // Prepare form data
            const formData = {
                fullName: this.fullNameInput.value,
                email: this.emailInput.value,
                message: this.messageInput.value
            };
            
            // Send to server
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                this.showSuccessMessage();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
```

## 🎓 Use Cases

- ✅ **Portfolio Projects**: Impress with a professional contact form
- ✅ **Academic Submissions**: Meets accessibility and usability standards
- ✅ **Learning Resource**: Great example of vanilla JavaScript patterns
- ✅ **Freelance Work**: Starting point for client websites
- ✅ **GitHub Portfolio**: Showcase web development skills

## 📚 Learning Resources

This project demonstrates:
- DOM manipulation with vanilla JavaScript
- Form validation patterns
- CSS Grid and Flexbox
- CSS animations and transitions
- ARIA accessibility standards
- Responsive design principles
- ES6 class syntax and encapsulation

## 🐛 Known Limitations

- No server-side submission (by design for simplicity)
- Email validation uses regex (accepts most formats but not RFC 5322 compliant)
- Success message shows for fixed 3 seconds (customizable in code)
- Form doesn't persist data across page refreshes

## 🚀 Future Enhancements

- [ ] Add phone number field with format validation
- [ ] Implement reCAPTCHA integration
- [ ] Add file attachment support
- [ ] Create admin dashboard for viewing submissions
- [ ] Add email notification system
- [ ] Implement form analytics
- [ ] Add multi-language support
- [ ] Create dark mode toggle button

## 📄 License

This project is open source and available for personal, educational, and commercial use.

## 👨‍💻 Credits

Built as a professional example of modern web development practices using vanilla HTML, CSS, and JavaScript.

---

## 🤝 Contributing

Feel free to fork, modify, and use this project for your own purposes. If you find improvements, feel free to share them!

### Tips for Modification
1. Keep HTML semantic and accessible
2. Maintain CSS variable usage for consistency
3. Comment JavaScript code thoroughly
4. Test on multiple devices and browsers
5. Validate against WCAG accessibility standards

---

**Happy coding! 🎉**

For questions or issues, refer to the inline comments in each file or test different scenarios to understand the behavior.
