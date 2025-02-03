(function(window, document, undefined) {
    // Ensure console logging works
    const debugLog = function(message) {
        if (window.console && window.console.log) {
            console.log(`[Project Verification Modal] ${message}`);
        }
    };

    // Wait for DOM to be fully loaded
    function domReady(fn) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            setTimeout(fn, 1);
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    // Main initialization function
    domReady(function() {
        document.addEventListener('DOMContentLoaded', () => {
            const typingText = document.querySelector('.typing-text');
            const roles = ['AI & Machine Learning Engineer'];
            let roleIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function typeRole() {
                const currentRole = roles[roleIndex];
                
                if (isDeleting) {
                    typingText.textContent = currentRole.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typingText.textContent = currentRole.substring(0, charIndex + 1);
                    charIndex++;
                }

                if (!isDeleting && charIndex === currentRole.length) {
                    setTimeout(() => isDeleting = true, 2000);
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                }

                setTimeout(typeRole, isDeleting ? 50 : 100);
            }

            typeRole();

            // Profile Image Cycling
            const profileImages = document.querySelectorAll('.profile-image');
            let currentImageIndex = 0;

            function cycleProfileImages() {
                profileImages.forEach((img, index) => {
                    if (index === currentImageIndex) {
                        img.style.display = 'block';
                    } else {
                        img.style.display = 'none';
                    }
                });

                currentImageIndex = (currentImageIndex + 1) % profileImages.length;
            }

            profileImages.forEach((img, index) => {
                img.style.display = index === 0 ? 'block' : 'none';
            });

            setInterval(cycleProfileImages, 3000);

            const contactForm = document.getElementById('contact-form');
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Message received! We will contact you soon.');
                contactForm.reset();
            });

            // CV Download Functionality
            const downloadCvBtn = document.querySelector('.btn-secondary');
            downloadCvBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior
                
                // Create a temporary anchor element
                const link = document.createElement('a');
                
                // Set the href to your PDF file path
                link.href = 'image/rohit-kumar-cv.pdf';
                
                // Set the download attribute with desired filename
                link.download = 'Rohit_Kumar_CV.pdf';
                
                // Append to body, click, and remove
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });

            // Mobile Menu Toggle
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const mobileMenu = document.querySelector('.mobile-menu');
            const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');

            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
            });

            // Close mobile menu when a link is clicked
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                });
            });

            // Education & Certifications section functionality removed

            // Professional Journey section functionality
            const journeySection = document.querySelector('.professional-journey-section');
            const journeyCards = document.querySelectorAll('.journey-card');

            // Advanced card interactions
            journeyCards.forEach(card => {
                const header = card.querySelector('.journey-header');
                const details = card.querySelector('.journey-details');
                const tags = card.querySelector('.journey-tags');

                // Staggered reveal animation
                gsap.set([header, details, tags], { opacity: 0, y: 20 });

                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 80%',
                    onEnter: () => {
                        gsap.timeline()
                            .to(header, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
                            .to(details, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.2)
                            .to(tags, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.4);
                    }
                });

                // Interactive hover effects
                card.addEventListener('mouseenter', () => {
                    gsap.to(card, { 
                        scale: 1.03, 
                        boxShadow: '0 20px 50px rgba(0,0,0,0.15)', 
                        duration: 0.3,
                        ease: 'power1.inOut'
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, { 
                        scale: 1, 
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
                        duration: 0.3,
                        ease: 'power1.inOut'
                    });
                });
            });

            // Category filtering with smooth transitions
            const categoryFilter = document.createElement('div');
            categoryFilter.classList.add('journey-category-filter');
            categoryFilter.innerHTML = `
                <div class="filter-buttons">
                    <button data-category="all" class="active">All Experiences</button>
                    <button data-category="Government Tech">Government Tech</button>
                    <button data-category="Cloud Computing">Cloud Computing</button>
                    <button data-category="AI & Robotics">AI & Robotics</button>
                    <button data-category="Cybersecurity">Cybersecurity</button>
                    <button data-category="Web Development">Web Development</button>
                    <button data-category="Emerging Technologies">Emerging Tech</button>
                </div>
            `;

            journeySection.querySelector('.container').insertBefore(categoryFilter, document.querySelector('.journey-timeline'));

            const filterButtons = categoryFilter.querySelectorAll('button');
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.getAttribute('data-category');
                    
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    journeyCards.forEach(card => {
                        const isMatch = category === 'all' || card.getAttribute('data-category') === category;
                        
                        gsap.to(card, {
                            opacity: isMatch ? 1 : 0,
                            height: isMatch ? 'auto' : 0,
                            scale: isMatch ? 1 : 0.9,
                            duration: 0.5,
                            ease: 'power2.inOut',
                            onComplete: () => {
                                card.style.display = isMatch ? 'block' : 'none';
                            }
                        });
                    });
                });
            });

            // Digital Creations section functionality
            const creationsSection = document.querySelector('.digital-creations-section');
            const creationCards = document.querySelectorAll('.creation-card');
            const creationsFilterButtons = document.querySelectorAll('.creations-filter button');

            // Advanced card interactions
            creationCards.forEach(card => {
                const icon = card.querySelector('.creation-icon');
                const details = card.querySelector('.creation-details');
                const visitBtn = card.querySelector('.visit-btn');

                // Staggered reveal animation
                gsap.set([icon, details, visitBtn], { opacity: 0, y: 20 });

                ScrollTrigger.create({
                    trigger: card,
                    start: 'top 80%',
                    onEnter: () => {
                        gsap.timeline()
                            .to(icon, { 
                                opacity: 1, 
                                y: 0, 
                                scale: 1, 
                                rotation: 360,
                                duration: 0.7, 
                                ease: 'back.out(1.7)' 
                            })
                            .to(details, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.3)
                            .to(visitBtn, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.5);
                    }
                });

                // Interactive hover effects
                card.addEventListener('mouseenter', () => {
                    gsap.timeline()
                        .to(card, { 
                            scale: 1.05, 
                            boxShadow: '0 25px 50px rgba(0,0,0,0.15)', 
                            duration: 0.3,
                            ease: 'power1.inOut'
                        })
                        .to(icon, {
                            rotation: '+=360',
                            scale: 1.1,
                            duration: 0.5,
                            ease: 'power1.inOut'
                        }, 0);
                });

                card.addEventListener('mouseleave', () => {
                    gsap.timeline()
                        .to(card, { 
                            scale: 1, 
                            boxShadow: '0 15px 30px rgba(0,0,0,0.1)', 
                            duration: 0.3,
                            ease: 'power1.inOut'
                        })
                        .to(icon, {
                            rotation: 0,
                            scale: 1,
                            duration: 0.5,
                            ease: 'power1.inOut'
                        }, 0);
                });
            });

            // Category filtering with advanced transitions
            creationsFilterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.getAttribute('data-category');
                    
                    // Remove active class from all buttons
                    creationsFilterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    creationCards.forEach(card => {
                        const isMatch = category === 'all' || card.getAttribute('data-category') === category;
                        
                        gsap.to(card, {
                            opacity: isMatch ? 1 : 0,
                            height: isMatch ? 'auto' : 0,
                            scale: isMatch ? 1 : 0.9,
                            duration: 0.5,
                            ease: 'power2.inOut',
                            onComplete: () => {
                                card.style.display = isMatch ? 'flex' : 'none';
                            }
                        });
                    });
                });
            });

            // Create project verification modal with unique identifier
            const verificationModal = document.createElement('div');
            verificationModal.id = 'projectVerificationModal';
            verificationModal.classList.add('project-verification-modal');
            verificationModal.setAttribute('data-modal', 'project-verification');
            verificationModal.innerHTML = `
                <div class="modal-overlay">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>Project Verification</h2>
                            <span class="modal-close">&times;</span>
                        </div>
                        <div class="modal-body">
                            <div class="verification-icon">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <h3>Developed and Secured by Me</h3>
                            <p>This website has been meticulously crafted and secured by a professional developer. 
                               I ensure top-notch security, performance, and user experience for every project.</p>
                            <div class="verification-details">
                                <div class="detail">
                                    <i class="fas fa-code"></i>
                                    <span>Custom Development</span>
                                </div>
                                <div class="detail">
                                    <i class="fas fa-lock"></i>
                                    <span>Advanced Security Measures</span>
                                </div>
                                <div class="detail">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Performance Optimized</span>
                                </div>
                            </div>
                            <button class="continue-btn">Continue to Website</button>
                        </div>
                    </div>
                </div>
            `;

            // Append modal to body with error handling
            try {
                document.body.appendChild(verificationModal);
                debugLog('Modal successfully added to document body');
            } catch (error) {
                debugLog(`Error adding modal to document body: ${error.message}`);
            }

            // Create modal styles
            const modalStyle = document.createElement('style');
            modalStyle.textContent = `
                .project-verification-modal {
                    display: none;
                    position: fixed;
                    z-index: 99999;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.6);
                    opacity: 0;
                    visibility: hidden;
                    transition: 
                        opacity 0.3s ease,
                        visibility 0.3s ease;
                }

                .project-verification-modal .modal-overlay {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                }

                .project-verification-modal .modal-content {
                    background-color: white;
                    border-radius: 20px;
                    max-width: 500px;
                    width: 90%;
                    padding: 2rem;
                    text-align: center;
                    position: relative;
                    transform: scale(0.7);
                    opacity: 0;
                    transition: 
                        transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                        opacity 0.3s ease;
                }

                .project-verification-modal.show {
                    display: block;
                    opacity: 1;
                    visibility: visible;
                }

                .project-verification-modal.show .modal-content {
                    transform: scale(1);
                    opacity: 1;
                }
            `;
            document.head.appendChild(modalStyle);

            // Modal interaction function
            function showVerificationModal(targetUrl) {
                debugLog(`Attempting to show modal for URL: ${targetUrl}`);
                
                const modal = document.getElementById('projectVerificationModal');
                if (!modal) {
                    debugLog('Modal element not found');
                    window.open(targetUrl, '_blank');
                    return;
                }

                // Prevent default scrolling
                document.body.style.overflow = 'hidden';

                // Show modal with animation
                modal.classList.add('show');

                // Close modal function
                function closeModal() {
                    modal.classList.remove('show');
                    document.body.style.overflow = '';
                    debugLog('Modal closed');
                }

                // Close button
                const closeButton = modal.querySelector('.modal-close');
                if (closeButton) {
                    closeButton.onclick = closeModal;
                }

                // Continue button
                const continueButton = modal.querySelector('.continue-btn');
                if (continueButton) {
                    continueButton.onclick = () => {
                        closeModal();
                        window.open(targetUrl, '_blank');
                        debugLog(`Redirecting to: ${targetUrl}`);
                    };
                }

                // Close on outside click
                modal.onclick = (e) => {
                    if (e.target === modal) {
                        closeModal();
                    }
                };
            }

            // Add event listeners to all explore buttons with error handling
            function setupExploreButtonListeners() {
                const exploreButtons = document.querySelectorAll('.visit-btn');
                debugLog(`Found ${exploreButtons.length} explore buttons`);

                exploreButtons.forEach((button, index) => {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        const targetUrl = button.getAttribute('href');
                        debugLog(`Button ${index + 1} clicked, URL: ${targetUrl}`);
                        
                        // Ensure URL exists before showing modal
                        if (targetUrl) {
                            showVerificationModal(targetUrl);
                        } else {
                            debugLog(`No URL found for button ${index + 1}`);
                        }
                    });
                });
            }

            // Retry setup if buttons not found immediately
            function initializeModalListeners() {
                try {
                    setupExploreButtonListeners();
                } catch (error) {
                    debugLog(`Initial setup failed: ${error.message}. Retrying...`);
                    setTimeout(initializeModalListeners, 1000);
                }
            }

            // Start initialization
            initializeModalListeners();

            // Why Hire Me Section Interactions
            function initWhyHireMeSection() {
                const hireCards = document.querySelectorAll('.hire-me-card');

                hireCards.forEach(card => {
                    const icon = card.querySelector('.hire-me-icon');
                    const content = card.querySelector('.hire-me-content');
                    const tags = card.querySelector('.hire-me-tags');

                    // Staggered reveal animation
                    gsap.set([icon, content, tags], { opacity: 0, y: 20 });

                    ScrollTrigger.create({
                        trigger: card,
                        start: 'top 80%',
                        onEnter: () => {
                            gsap.timeline()
                                .to(icon, { 
                                    opacity: 1, 
                                    y: 0, 
                                    scale: 1, 
                                    rotation: 360,
                                    duration: 0.7, 
                                    ease: 'back.out(1.7)' 
                                })
                                .to(content, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.3)
                                .to(tags, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.5);
                        }
                    });

                    // Interactive hover effects
                    card.addEventListener('mouseenter', () => {
                        gsap.timeline()
                            .to(card, { 
                                scale: 1.05, 
                                boxShadow: '0 25px 50px rgba(0,0,0,0.15)', 
                                duration: 0.3,
                                ease: 'power1.inOut'
                            })
                            .to(icon, {
                                rotation: '+=360',
                                scale: 1.1,
                                duration: 0.5,
                                ease: 'power1.inOut'
                            }, 0);
                    });

                    card.addEventListener('mouseleave', () => {
                        gsap.timeline()
                            .to(card, { 
                                scale: 1, 
                                boxShadow: '0 15px 30px rgba(0,0,0,0.1)', 
                                duration: 0.3,
                                ease: 'power1.inOut'
                            })
                            .to(icon, {
                                rotation: 0,
                                scale: 1,
                                duration: 0.5,
                                ease: 'power1.inOut'
                            }, 0);
                    });
                });

                // CTA Button Interaction
                const ctaButton = document.querySelector('.hire-me-cta .btn-primary');
                if (ctaButton) {
                    ctaButton.addEventListener('mouseenter', () => {
                        gsap.to(ctaButton, {
                            scale: 1.05,
                            boxShadow: '0 8px 15px rgba(0,0,0,0.2)',
                            duration: 0.3,
                            ease: 'power1.inOut'
                        });
                    });

                    ctaButton.addEventListener('mouseleave', () => {
                        gsap.to(ctaButton, {
                            scale: 1,
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            duration: 0.3,
                            ease: 'power1.inOut'
                        });
                    });
                }
            }

            // Initialize Why Hire Me Section
            initWhyHireMeSection();

            // Advanced Why Hire Me Section Interactions
            function initAdvancedWhyHireMeSection() {
                const interactiveCards = document.querySelectorAll('.interactive-card');
                const ctaSection = document.querySelector('.advanced-cta');

                // Card Hover 3D Effect
                interactiveCards.forEach(card => {
                    const cardWrapper = card.querySelector('.card-wrapper');
                    
                    card.addEventListener('mousemove', (e) => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        
                        const rotateX = (y - centerY) / 10;
                        const rotateY = -(x - centerX) / 10;
                        
                        gsap.to(cardWrapper, {
                            rotationX: rotateX,
                            rotationY: rotateY,
                            scale: 1.05,
                            duration: 0.5,
                            ease: 'power1.out'
                        });
                    });

                    card.addEventListener('mouseleave', () => {
                        gsap.to(cardWrapper, {
                            rotationX: 0,
                            rotationY: 0,
                            scale: 1,
                            duration: 0.5,
                            ease: 'power1.out'
                        });
                    });

                    // Staggered Reveal Animation
                    const cardElements = [
                        card.querySelector('.hire-me-icon'),
                        card.querySelector('.hire-me-content'),
                        card.querySelector('.card-back')
                    ];

                    gsap.set(cardElements, { opacity: 0, y: 50 });

                    ScrollTrigger.create({
                        trigger: card,
                        start: 'top 80%',
                        onEnter: () => {
                            gsap.timeline()
                                .to(cardElements[0], { 
                                    opacity: 1, 
                                    y: 0, 
                                    duration: 0.6, 
                                    ease: 'back.out(1.7)' 
                                })
                                .to(cardElements[1], { 
                                    opacity: 1, 
                                    y: 0, 
                                    duration: 0.5, 
                                    ease: 'power2.out' 
                                }, 0.3)
                                .to(cardElements[2], { 
                                    opacity: 1, 
                                    y: 0, 
                                    duration: 0.5, 
                                    ease: 'power2.out' 
                                }, 0.5);
                        }
                    });
                });

                // CTA Section Parallax and Interaction
                if (ctaSection) {
                    const ctaContent = ctaSection.querySelector('.cta-content');
                    const ctaIllustration = ctaSection.querySelector('.cta-illustration');
                    const ctaButtons = ctaSection.querySelectorAll('.btn-primary, .btn-secondary');

                    // Parallax Effect
                    gsap.set(ctaIllustration, { scale: 1.1, transformOrigin: 'center center' });

                    ScrollTrigger.create({
                        trigger: ctaSection,
                        start: 'top 70%',
                        end: 'bottom 30%',
                        scrub: true,
                        animation: gsap.timeline()
                            .to(ctaIllustration, { 
                                y: -100, 
                                scale: 1, 
                                ease: 'none' 
                            })
                            .to(ctaContent, { 
                                y: 50, 
                                ease: 'none' 
                            }, 0)
                    });

                    // Button Interactions
                    ctaButtons.forEach(button => {
                        button.addEventListener('mouseenter', () => {
                            gsap.to(button, {
                                scale: 1.05,
                                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                                duration: 0.3,
                                ease: 'power1.inOut'
                            });
                        });

                        button.addEventListener('mouseleave', () => {
                            gsap.to(button, {
                                scale: 1,
                                boxShadow: 'none',
                                duration: 0.3,
                                ease: 'power1.inOut'
                            });
                        });
                    });
                }
            }

            // Initialize Advanced Why Hire Me Section
            initAdvancedWhyHireMeSection();

            // Contact Information Section Interactions
            function initContactInfoSection() {
                const contactCards = document.querySelectorAll('.contact-info-card');
                const contactCTA = document.querySelector('.contact-cta');

                // Card Hover Animations
                contactCards.forEach(card => {
                    const icon = card.querySelector('.contact-icon');
                    const content = card.querySelector('.contact-content');

                    // Staggered Reveal Animation
                    gsap.set([icon, content], { opacity: 0, y: 50 });

                    ScrollTrigger.create({
                        trigger: card,
                        start: 'top 80%',
                        onEnter: () => {
                            gsap.timeline()
                                .to(icon, { 
                                    opacity: 1, 
                                    y: 0, 
                                    duration: 0.6, 
                                    ease: 'back.out(1.7)' 
                                })
                                .to(content, { 
                                    opacity: 1, 
                                    y: 0, 
                                    duration: 0.5, 
                                    ease: 'power2.out' 
                                }, 0.3);
                        }
                    });

                    // Hover Interactions
                    card.addEventListener('mouseenter', () => {
                        gsap.to(icon, {
                            rotation: 360,
                            scale: 1.1,
                            duration: 0.5,
                            ease: 'power1.inOut'
                        });
                    });

                    card.addEventListener('mouseleave', () => {
                        gsap.to(icon, {
                            rotation: 0,
                            scale: 1,
                            duration: 0.5,
                            ease: 'power1.inOut'
                        });
                    });
                });

                // CTA Button Interactions
                if (contactCTA) {
                    const ctaButton = contactCTA.querySelector('.btn-primary');
                    
                    ctaButton.addEventListener('mouseenter', () => {
                        gsap.to(ctaButton, {
                            scale: 1.05,
                            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                            duration: 0.3,
                            ease: 'power1.inOut'
                        });
                    });

                    ctaButton.addEventListener('mouseleave', () => {
                        gsap.to(ctaButton, {
                            scale: 1,
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            duration: 0.3,
                            ease: 'power1.inOut'
                        });
                    });

                    // Parallax Effect for CTA
                    gsap.set(contactCTA, { y: 50, opacity: 0 });

                    ScrollTrigger.create({
                        trigger: contactCTA,
                        start: 'top 90%',
                        animation: gsap.timeline()
                            .to(contactCTA, {
                                y: 0,
                                opacity: 1,
                                duration: 0.7,
                                ease: 'power2.out'
                            })
                    });
                }

                // Copy to Clipboard Functionality
                const emailLink = document.querySelector('.email-link');
                if (emailLink) {
                    emailLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        const email = emailLink.closest('.contact-content').querySelector('p').textContent;
                        
                        navigator.clipboard.writeText(email).then(() => {
                            // Temporary tooltip or notification
                            const originalText = emailLink.textContent;
                            emailLink.textContent = 'Copied!';
                            emailLink.style.color = 'var(--accent-color)';
                            
                            setTimeout(() => {
                                emailLink.textContent = originalText;
                                emailLink.style.color = '';
                            }, 2000);
                        }).catch(err => {
                            console.error('Failed to copy email: ', err);
                        });
                    });
                }
            }

            // Initialize Contact Information Section
            initContactInfoSection();

            // Advanced Contact Information Section Interactions
            function initAdvancedContactSection() {
                const contactCards = document.querySelectorAll('.contact-info-card');
                const copyEmailButtons = document.querySelectorAll('.copy-email-btn');
                const callLinks = document.querySelectorAll('.call-link');
                const viewMapLinks = document.querySelectorAll('.view-map-link');

                // Card Reveal and Interaction Animations
                contactCards.forEach(card => {
                    const icon = card.querySelector('.contact-icon');
                    const content = card.querySelector('.contact-content');

                    // Initial state
                    gsap.set([icon, content], { opacity: 0, y: 50 });

                    // Scroll-triggered reveal
                    ScrollTrigger.create({
                        trigger: card,
                        start: 'top 80%',
                        onEnter: () => {
                            gsap.timeline()
                                .to(icon, { 
                                    opacity: 1, 
                                    y: 0, 
                                    duration: 0.7, 
                                    ease: 'back.out(1.7)',
                                    onComplete: () => {
                                        // Subtle pulsing animation after reveal
                                        gsap.to(icon, {
                                            scale: [1, 1.05, 1],
                                            duration: 1.5,
                                            repeat: -1,
                                            ease: 'power1.inOut'
                                        });
                                    }
                                })
                                .to(content, { 
                                    opacity: 1, 
                                    y: 0, 
                                    duration: 0.6, 
                                    ease: 'power2.out' 
                                }, 0.3);
                        }
                    });

                    // 3D Tilt Effect
                    card.addEventListener('mousemove', (e) => {
                        const rect = card.getBoundingClientRect();
                        const centerX = rect.left + rect.width / 2;
                        const centerY = rect.top + rect.height / 2;
                        const mouseX = e.clientX - centerX;
                        const mouseY = e.clientY - centerY;

                        gsap.to(card, {
                            rotationX: -mouseY / 20,
                            rotationY: mouseX / 20,
                            transformPerspective: 500,
                            ease: 'power1.out',
                            duration: 0.6
                        });
                    });

                    card.addEventListener('mouseleave', () => {
                        gsap.to(card, {
                            rotationX: 0,
                            rotationY: 0,
                            ease: 'power1.out',
                            duration: 0.6
                        });
                    });
                });

                // Copy Email Functionality
                copyEmailButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const email = this.getAttribute('data-email');
                        
                        navigator.clipboard.writeText(email).then(() => {
                            // Visual feedback
                            gsap.timeline()
                                .to(this, {
                                    scale: 1.2,
                                    color: 'var(--accent-color)',
                                    duration: 0.2
                                })
                                .to(this, {
                                    scale: 1,
                                    color: 'var(--text-secondary)',
                                    duration: 0.2
                                });

                            // Toast notification
                            const toast = document.createElement('div');
                            toast.textContent = 'Email Copied!';
                            toast.classList.add('toast-notification');
                            document.body.appendChild(toast);

                            setTimeout(() => {
                                toast.remove();
                            }, 2000);
                        }).catch(err => {
                            console.error('Copy failed:', err);
                        });
                    });
                });

                // Add CSS for toast notification
                const toastStyle = document.createElement('style');
                toastStyle.textContent = `
                    .toast-notification {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        background-color: var(--accent-color);
                        color: var(--bg-primary);
                        padding: 10px 20px;
                        border-radius: 5px;
                        z-index: 1000;
                        animation: toast-in 0.3s ease-out;
                    }
                    @keyframes toast-in {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `;
                document.head.appendChild(toastStyle);
            }

            // Initialize Advanced Contact Section
            initAdvancedContactSection();

            // Advanced Holographic Contact Section Interactions
            function initHolographicContactSection() {
                const holographicCards = document.querySelectorAll('.holographic-card');
                const copyEmailButtons = document.querySelectorAll('.copy-email-btn');
                const callActions = document.querySelectorAll('.call-action');
                const exploreLocationButtons = document.querySelectorAll('.explore-location-btn');

                // Tilt.js Alternative for 3D Card Effect
                function applyCardTilt() {
                    holographicCards.forEach(card => {
                        const tiltAmount = 10;
                        
                        card.addEventListener('mousemove', (e) => {
                            const rect = card.getBoundingClientRect();
                            const centerX = rect.left + rect.width / 2;
                            const centerY = rect.top + rect.height / 2;
                            const mouseX = e.clientX - centerX;
                            const mouseY = e.clientY - centerY;

                            const rotateX = (mouseY / rect.height) * tiltAmount;
                            const rotateY = -(mouseX / rect.width) * tiltAmount;

                            gsap.to(card, {
                                rotationX: rotateX,
                                rotationY: rotateY,
                                transformPerspective: 1000,
                                ease: 'power1.out',
                                duration: 0.6
                            });
                        });

                        card.addEventListener('mouseleave', () => {
                            gsap.to(card, {
                                rotationX: 0,
                                rotationY: 0,
                                ease: 'power1.out',
                                duration: 0.6
                            });
                        });
                    });
                }

                // Holographic Card Reveal Animation
                function animateCardReveal() {
                    holographicCards.forEach(card => {
                        const icon = card.querySelector('.holographic-icon');
                        const content = card.querySelector('.holographic-content');

                        gsap.set([icon, content], { opacity: 0, y: 50 });

                        ScrollTrigger.create({
                            trigger: card,
                            start: 'top 80%',
                            onEnter: () => {
                                gsap.timeline()
                                    .to(icon, { 
                                        opacity: 1, 
                                        y: 0, 
                                        duration: 0.7, 
                                        ease: 'back.out(1.7)',
                                        onComplete: () => {
                                            // Subtle pulsing animation
                                            gsap.to(icon, {
                                                scale: [1, 1.05, 1],
                                                duration: 1.5,
                                                repeat: -1,
                                                ease: 'power1.inOut'
                                            });
                                        }
                                    })
                                    .to(content, { 
                                        opacity: 1, 
                                        y: 0, 
                                        duration: 0.6, 
                                        ease: 'power2.out' 
                                    }, 0.3);
                            }
                        });
                    });
                }

                // Email Copy Functionality with Advanced Feedback
                function setupEmailCopy() {
                    copyEmailButtons.forEach(button => {
                        button.addEventListener('click', function() {
                            const email = this.getAttribute('data-email');
                            
                            navigator.clipboard.writeText(email).then(() => {
                                // Advanced Visual Feedback
                                const timeline = gsap.timeline();
                                
                                timeline
                                    .to(this, {
                                        scale: 1.3,
                                        rotation: 360,
                                        color: 'var(--accent-color)',
                                        duration: 0.3
                                    })
                                    .to(this, {
                                        scale: 1,
                                        rotation: 0,
                                        color: 'var(--text-secondary)',
                                        duration: 0.3
                                    });

                                // Holographic Toast Notification
                                const toast = document.createElement('div');
                                toast.classList.add('holographic-toast');
                                toast.innerHTML = `
                                    <i class="fas fa-copy"></i>
                                    <span>Email Copied to Clipboard</span>
                                `;
                                document.body.appendChild(toast);

                                gsap.fromTo(toast, 
                                    { opacity: 0, y: 50 }, 
                                    { 
                                        opacity: 1, 
                                        y: 0, 
                                        duration: 0.5,
                                        onComplete: () => {
                                            setTimeout(() => {
                                                gsap.to(toast, {
                                                    opacity: 0,
                                                    y: 50,
                                                    duration: 0.5,
                                                    onComplete: () => toast.remove()
                                                });
                                            }, 2000);
                                        }
                                    }
                                );
                            }).catch(err => {
                                console.error('Email Copy Failed:', err);
                            });
                        });
                    });

                    // Holographic Toast Styling
                    const toastStyle = document.createElement('style');
                    toastStyle.textContent = `
                        .holographic-toast {
                            position: fixed;
                            bottom: 20px;
                            right: 20px;
                            background: rgba(255, 255, 255, 0.1);
                            backdrop-filter: blur(10px);
                            color: var(--text-primary);
                            padding: 15px 25px;
                            border-radius: 15px;
                            display: flex;
                            align-items: center;
                            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                            z-index: 1000;
                        }
                        .holographic-toast i {
                            margin-right: 10px;
                            color: var(--accent-color);
                        }
                    `;
                    document.head.appendChild(toastStyle);
                }

                // Call Action Hover Effects
                function setupCallActionEffects() {
                    callActions.forEach(action => {
                        action.addEventListener('mouseenter', () => {
                            gsap.to(action, {
                                scale: 1.2,
                                color: 'var(--accent-color)',
                                duration: 0.3
                            });
                        });

                        action.addEventListener('mouseleave', () => {
                            gsap.to(action, {
                                scale: 1,
                                color: 'var(--text-secondary)',
                                duration: 0.3
                            });
                        });
                    });
                }

                // Location Exploration Interactions
                function setupLocationExploration() {
                    exploreLocationButtons.forEach(button => {
                        button.addEventListener('mouseenter', () => {
                            gsap.to(button, {
                                scale: 1.1,
                                color: 'var(--accent-variant)',
                                duration: 0.3
                            });
                        });

                        button.addEventListener('mouseleave', () => {
                            gsap.to(button, {
                                scale: 1,
                                color: 'var(--accent-color)',
                                duration: 0.3
                            });
                        });
                    });
                }

                // Initialize All Interactions
                applyCardTilt();
                animateCardReveal();
                setupEmailCopy();
                setupCallActionEffects();
                setupLocationExploration();
            }

            // Initialize Holographic Contact Section
            initHolographicContactSection();
        });
    });
})(window, document);