document.addEventListener('DOMContentLoaded', function() {
    // Certificate Card Hover Effects
    const certificationCards = document.querySelectorAll('.certification-card');
    
    certificationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 10px 20px rgba(187, 134, 252, 0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });

    // PDF Viewer Tracking
    const pdfLinks = document.querySelectorAll('.btn-view-cert');
    
    pdfLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const certificateName = this.closest('.certification-card')
                .querySelector('h3').textContent;
            
            console.log(`Certificate Viewed: ${certificateName}`);
            
            // Optional: You could send this data to analytics
            // trackCertificateView(certificateName);
        });
    });

    // Scroll-based Animations
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function animateOnScroll() {
        const certificationCards = document.querySelectorAll('.certification-card');
        
        certificationCards.forEach((card, index) => {
            if (isElementInViewport(card)) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    // Initial setup for scroll animations
    certificationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial call
});