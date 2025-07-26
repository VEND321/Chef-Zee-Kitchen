        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        let lastScroll = 0;
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Enhanced Header Scroll Effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            const currentScroll = window.scrollY;
            
            // Hide header on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            // Change header background after hero section
            if (currentScroll > window.innerHeight - 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Enhanced Form Handling with Validation
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validate inputs
                const name = document.getElementById('name').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const service = document.getElementById('service').value;
                
                if (!name || !phone) {
                    alert('Please fill in all required fields');
                    return;
                }
                
                // Nigerian phone number validation
                const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;
                if (!phoneRegex.test(phone)) {
                    alert('Please enter a valid Nigerian phone number');
                    return;
                }
                
                // Format phone number for WhatsApp
                const formattedPhone = phone.startsWith('0') ? 
                    '234' + phone.substring(1) : 
                    phone.replace('+', '');
                
                // Create WhatsApp message
                const whatsappMessage = `Hi Chef Zee!%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Service:* ${service || 'Not specified'}%0A%0A*Message:*%0A${document.getElementById('message').value.trim()}`;
                
                // Open WhatsApp
                window.open(`https://wa.me/234${formattedPhone}?text=${whatsappMessage}`, '_blank');
                
                // Reset form
                contactForm.reset();
            });
        }
        
        // Animate elements when they come into view
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .flyer-card');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementPosition < windowHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Debounce scroll events for performance
        function debounce(func, wait = 20, immediate = true) {
            let timeout;
            return function() {
                const context = this, args = arguments;
                const later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }
        
        // Set initial state for animated elements
        document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .flyer-card').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.willChange = 'transform, opacity';
        });
        
        // Run animation check on load and scroll
        window.addEventListener('load', animateOnScroll);
        window.addEventListener('scroll', debounce(animateOnScroll));
        
        // Track WhatsApp clicks
        document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
            link.addEventListener('click', function() {
                console.log('WhatsApp link clicked:', this.href);
            });
        });