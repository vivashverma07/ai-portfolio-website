document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const elementsToAnimate = [
        ...document.querySelectorAll('.capability-card'),
        ...document.querySelectorAll('.project-card'),
        document.querySelector('.section-header'),
        document.querySelector('.contact-panel')
    ];

    elementsToAnimate.forEach((el, index) => {
        if(el) {
            el.classList.add('animate-on-scroll');
            // Add staggered delay for grid items
            if(el.classList.contains('capability-card') || el.classList.contains('project-card')) {
                el.style.transitionDelay = `${(index % 4) * 0.15}s`;
            }
            observer.observe(el);
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Modal Logic
    const modal = document.getElementById('project-modal');
    const closeBtn = document.querySelector('.close-btn');
    const projectBtns = document.querySelectorAll('.view-project-btn');
    
    // Elements to populate in modal
    const modalTitle = document.getElementById('modal-title');
    const modalTag = document.getElementById('modal-tag');
    const modalDesc = document.getElementById('modal-desc');
    const modalLink = document.getElementById('modal-link');

    projectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const title = btn.getAttribute('data-title');
            const tag = btn.getAttribute('data-tag');
            const desc = btn.getAttribute('data-desc');
            const link = btn.getAttribute('data-link');

            modalTitle.textContent = title;
            modalTag.textContent = tag;
            modalDesc.textContent = desc;
            modalLink.href = link;

            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Contact Form Logic
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Show success message
            formSuccess.style.display = 'block';
            
            // Clear form and hide it smoothly
            contactForm.reset();
            contactForm.style.display = 'none';
        });
    }
});
