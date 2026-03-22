// ========================================
// PORTFOLIO JAVASCRIPT - Updated Version
// By Naga Venkata Kumar
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Icons
    lucide.createIcons();
    
    // ========================================
    // FAST PAGE LOADER (No Text)
    // ========================================
    window.addEventListener('load', () => {
        const loader = document.getElementById('page-loader');
        if (loader) {
            // Faster loading - 300ms
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 200);
            }, 100);
        }
        
        // Reinitialize icons after load
        setTimeout(() => lucide.createIcons(), 300);
    });
    
    // ========================================
    // TYPING ANIMATION FOR HOME PAGE
    // ========================================
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const roles = [
            'Software Developer',
            'Web Designer',
            'Video Editor',
            'Poster Designer',
            'UI/UX Designer'
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseTime = 2000;
        
        function type() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let timeout = isDeleting ? deletingSpeed : typingSpeed;
            
            if (!isDeleting && charIndex === currentRole.length) {
                timeout = pauseTime;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
            
            setTimeout(type, timeout);
        }
        
        type();
    }
    
    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
 window.toggleMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('show');
        document.body.classList.toggle('menu-open');
        lucide.createIcons();
    }
};
    
    // ========================================
    // SMOOTH SCROLL
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href.startsWith('#privacy') || href.startsWith('#terms')) {
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('show')) {
                    toggleMenu();
                }
                
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    window.scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    // ========================================
    // WORKS FILTER FUNCTIONALITY
    // ========================================
window.filterWorks = (category, btn) => {

const items = document.querySelectorAll(".work-item");
const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach(b => b.classList.remove("active"));
if(btn) btn.classList.add("active");

items.forEach(item => {

const itemCategory = item.dataset.category;

if(category === "all" || itemCategory === category){
item.classList.remove("hide");
}else{
item.classList.add("hide");
}

});

};
            
    
    // ========================================
    // LIGHTBOX
    // ========================================
    window.openLightbox = (element) => {
        const img = element.parentElement.querySelector('img');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDesc = document.getElementById('lightbox-description');
        
        if (img && lightbox && lightboxImg) {
            lightboxImg.src = img.src;
            
            
            // Get work details
            const workDetails = element.querySelector('.work-details');
            if (workDetails && lightboxTitle && lightboxDesc) {
                lightboxTitle.textContent = workDetails.querySelector('h3').textContent;
                lightboxDesc.textContent = workDetails.querySelector('p').textContent;
            }
            
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => lucide.createIcons(), 100);
        }
    };
    
    window.closeLightbox = () => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        }
    };
    
    // Close lightbox on background click
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const lightbox = document.getElementById('lightbox');
            if (lightbox && !lightbox.classList.contains('hidden')) {
                closeLightbox();
            }
        }
    });
    
    // =============================
// GLOBAL GALLERY FILTER (FINAL FIX)
// =============================

// global variables
let currentCategory = 'all';

// show/hide items
function updateGallery() {
    const items = document.querySelectorAll('.gallery-item');

    items.forEach(item => {

        // show all when "all"
        if (currentCategory === 'all') {
            item.style.display = 'block';
            return;
        }

        // show matching category
        if (item.classList.contains(currentCategory)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}


// BUTTON CLICK FUNCTION
window.filterGallery = function(category, btn) {

    currentCategory = category;
   

    // remove active class
    document.querySelectorAll('.gallery-btn')
        .forEach(b => b.classList.remove('active'));

    // add active class
    if(btn) btn.classList.add('active');

    updateGallery();
};

// run when page loads
window.addEventListener('load', () => {
    updateGallery();
});







    // ========================================
    // CONTACT FORM HANDLING
    // ========================================
    window.handleFormSubmit = (e) => {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const message = formData.get('message');
        
        const subject = `Contact from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        const mailtoLink = `mailto:nagavenkatakumar1401@gmail.com?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoLink;
        
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            form.style.display = 'none';
            successMessage.classList.remove('hidden');
            lucide.createIcons();
            
            setTimeout(() => {
                form.reset();
                form.style.display = 'flex';
                successMessage.classList.add('hidden');
            }, 3000);
        }
        
        return false;
    };
    
    // ========================================
    // DOWNLOAD ALL CERTIFICATES
    // ========================================
    window.downloadAllCertificates = () => {
        const certLinks = [
            'assets/cert1.jpg',
            'assets/cert2.jpg',
            'assets/cert3.jpg',
            'assets/cert4.jpg',
            'assets/cert5.jpg'
        ];
        
        const certNames = [
            'NPTEL_Certificate_Naga_Kumar.jpg',
            'ServiceNow_SysAdmin_Naga_Kumar.jpg',
            'ServiceNow_AppDev_Naga_Kumar.jpg',
            'CISCO_Networking_Naga_Kumar.jpg',
            'Salesforce_Training_Naga_Kumar.jpg'
        ];
        
        certLinks.forEach((link, index) => {
            setTimeout(() => {
                const a = document.createElement('a');
                a.href = link;
                a.download = certNames[index];
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }, index * 300);
        });
        
        return false;
    };
    
    // ========================================
    // SCROLL ANIMATIONS
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.testimonial-card, .work-card, .work-item, .skill-category, .cert-card, .timeline-item, .service-card').forEach(el => {
        observer.observe(el);
    });
    
    // ========================================
    // LAZY LOADING IMAGES
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ========================================
    // FORM VALIDATION
    // ========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '' && this.hasAttribute('required')) {
                    this.style.borderColor = '#ef4444';
                } else {
                    this.style.borderColor = '';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.style.borderColor = '';
                }
            });
        });
    }
    
    // ========================================
    // PREVENT SCROLL RESTORATION
    // ========================================
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    

    
    // ========================================
    // CONSOLE MESSAGE
    // ========================================
    console.log('%c🚀 Portfolio Website', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
    console.log('%cDesigned & Developed by Naga Venkata Kumar', 'color: #a78bfa; font-size: 14px;');
    console.log('%cAll rights reserved © 2026', 'color: #6366f1; font-size: 12px;');
    
});

// ========================================
// SERVICE WORKER (Optional - for PWA)
// ========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}


// FIX MOBILE 100vh PROBLEM
function setRealHeight(){
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setRealHeight();
window.addEventListener('resize', setRealHeight);
window.addEventListener('orientationchange', setRealHeight);

// ACHIEVEMENTS ANIMATION FIX
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.25 });

document.querySelectorAll('.achievement-card, .stack-card, .timeline-item')
.forEach(el => observer.observe(el));

/* ABOUT MODAL FUNCTIONS */

function openAboutModal(){
    document.getElementById("aboutModal").classList.remove("hidden");
    document.body.style.overflow="hidden";
    lucide.createIcons();
}

function closeAboutModal(){
    document.getElementById("aboutModal").classList.add("hidden");
    document.body.style.overflow="";
}

/* close when clicking outside */
document.addEventListener("click",function(e){
    const modal=document.getElementById("aboutModal");
    if(e.target===modal){
        closeAboutModal();
    }
});

// ========================================
// SHOW / HIDE BACK TO TOP BUTTON
// ========================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {

    if(!backToTopBtn) return;

    if(window.scrollY > 350){
        backToTopBtn.classList.add('show');
    }else{
        backToTopBtn.classList.remove('show');
    }
setTimeout(() => lucide.createIcons(), 200);
});

// thumbnail to video play
document.querySelectorAll('.video-wrapper').forEach(wrapper => {

    const thumbnail = wrapper.querySelector('.video-thumbnail');
    const playBtn = wrapper.querySelector('.video-play-btn');
    const video = wrapper.querySelector('video');

    function playVideo(){
        thumbnail.style.display = "none";
        playBtn.style.display = "none";
        video.style.display = "block";
        video.play();
    }

    thumbnail.addEventListener('click', playVideo);
    playBtn.addEventListener('click', playVideo);

});

// ===============================
// REEL STYLE AUTOPLAY ON HOVER
// ===============================

document.querySelectorAll('.video-item').forEach(item => {

    const previewVideo = item.querySelector('.video-preview');

    item.addEventListener('mouseenter', () => {
        if (previewVideo) {
            previewVideo.currentTime = 0;
            previewVideo.play();
        }
    });

    item.addEventListener('mouseleave', () => {
        if (previewVideo) {
            previewVideo.pause();
            previewVideo.currentTime = 0;
        }
    });

});

document.addEventListener("DOMContentLoaded", () => {

const carousel = document.querySelector(".works-track");

if(carousel){
carousel.style.animationPlayState = "paused";

setTimeout(()=>{
carousel.style.animationPlayState = "running";
},1000);

}

});