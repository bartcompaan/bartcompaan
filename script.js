// ===== SPLASH SCREEN =====
document.addEventListener('DOMContentLoaded', function() {
    // Hide splash screen after 2.5 seconds
    setTimeout(function() {
        const splashScreen = document.getElementById('splashScreen');
        splashScreen.classList.add('hidden');
    }, 2500);

    // Form handling
    handleQuoteForm();
    handleAppointmentForm();
    handleSmoothScroll();
});

// ===== QUOTE FORM HANDLING =====
function handleQuoteForm() {
    const form = document.getElementById('quoteForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                naam: document.getElementById('naam').value,
                email: document.getElementById('email').value,
                telefoon: document.getElementById('telefoon').value,
                datum: document.getElementById('datum').value,
                eventtype: document.getElementById('eventtype').value,
                bericht: document.getElementById('bericht').value
            };

            // Log data (in production: send to server)
            console.log('Offerte aanvraag:', formData);
            
            // Show success message
            showNotification('Bedankt! Je offerte aanvraag is ontvangen. Ik neem snel contact op.');
            form.reset();
        });
    }
}

// ===== APPOINTMENT FORM HANDLING =====
function handleAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                naam: document.getElementById('naam2').value,
                email: document.getElementById('email2').value,
                telefoon: document.getElementById('telefoon2').value,
                datum: document.getElementById('datum2').value,
                opmerking: document.getElementById('opmerking').value
            };

            // Log data (in production: send to server)
            console.log('Afspraak aanvraag:', formData);
            
            // Show success message
            showNotification('Afspraak aangevraagd! Ik zal je snel een bevestiging sturen.');
            form.reset();
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification success';
    notification.textContent = message;
    
    // Add styles if not in CSS
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #ff6b00;
        color: #0a0a0a;
        padding: 15px 25px;
        border-radius: 5px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(255, 107, 0, 0.4);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== SMOOTH SCROLL HANDLING =====
function handleSmoothScroll() {
    // Already handled by HTML scroll-behavior: smooth
    // This function can be expanded for more complex scroll behaviors
}

// ===== ADD ANIMATIONS TO CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);