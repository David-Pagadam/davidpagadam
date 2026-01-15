// UNIFIED TAB SWITCHER
function toggleTabs(prefix, id, btn) {
    // Hide all contents in the group
    const contents = document.querySelectorAll(`.${prefix}-tab`);
    contents.forEach(content => content.style.display = 'none');

    // Reset all buttons in the group
    const buttons = document.querySelectorAll(`.${prefix}-trigger`);
    buttons.forEach(button => button.classList.remove('active'));

    // Show target and set active
    const target = document.getElementById(id);
    if (target) target.style.display = 'block';
    btn.classList.add('active');
}

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});
// UPDATED LIGHTBOX LOGIC
function openLightbox(type, src) {
    const lightbox = document.getElementById("lightbox");
    const container = document.getElementById("lightbox-body");
    container.innerHTML = ""; 

    if (type === 'image') {
        container.innerHTML = `<img src="${src}">`;
    } 
    else if (type === 'video') {
        // Check if the link is from YouTube
        if (src.includes('youtu.be') || src.includes('youtube.com')) {
            // Convert regular link to an Embed link
            let videoId = "";
            if(src.includes('youtu.be/')) {
                videoId = src.split('youtu.be/')[1];
            } else {
                videoId = src.split('v=')[1].split('&')[0];
            }
            
            container.innerHTML = `<iframe 
                src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                frameborder="0" 
                allow="autoplay; encrypted-media; picture-in-picture" 
                allowfullscreen 
                style="width:100%; height:450px;"></iframe>`;
        } else {
            // Fallback for local videos
            container.innerHTML = `<video controls autoplay><source src="${src}" type="video/mp4"></video>`;
        }
    } 
    else if (type === 'pdf') {
        container.innerHTML = `<iframe src="${src}"></iframe>`;
    }

    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden";
}
// Add this to your script.js
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
});
// INTERSECTION OBSERVER (Fade in)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
    });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));


function startVerseSlider() {
    const verses = document.querySelectorAll('.verse-item');
    if (verses.length === 0) return;

    let currentIndex = 0;

    setInterval(() => {
        verses[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % verses.length;
        verses[currentIndex].classList.add('active');
    }, 7000); // Verses stay for 7 seconds (longer than testimonials for reading)
}

// Update your existing load listener to start both sliders
window.addEventListener('load', () => {
    startTestimonialSlider();
    startVerseSlider();
});
// BACK TO TOP
window.onscroll = function() {
    const btt = document.getElementById("backToTop");
    if (document.documentElement.scrollTop > 400) {
        btt.style.display = "block";
    } else {
        btt.style.display = "none";
    }
};

document.getElementById("backToTop").onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
};

// Add this to your initSliders or at the end of the script
const form = document.getElementById('mainContactForm');
if (form) {
    form.onsubmit = function() {
        const btn = form.querySelector('button');
        btn.innerText = "Sending...";
        btn.style.opacity = "0.7";
        // Formspree will handle the redirect, but this provides instant feedback
    };
}
const blogData = {
    physics: {
        title: "Quantum Logic & Divine Sovereignty",
        text: "As a Physics graduate from KNUST, I see God’s hand in the laws of nature. Quantum mechanics teaches us that at the smallest level, things are held together by forces we cannot fully see—much like Colossians 1:17 says."
    },
    education: {
        title: "Teaching the Unchangeable Word",
        text: "Training at AAMUSTED taught me that the method is just as vital as the message. To truly reach a heart, we must understand how a mind learns."
    },
    theology: {
        title: "Grace in the Greek New Testament",
        text: "In my current M.Div studies, the word 'Charis' (Grace) stands out. It is not just unmerited favor; it is the empowering presence of God."
    }
};

function openBlogModal(key) {
    const modal = document.getElementById('blogModal');
    const target = document.getElementById('blogTextTarget');
    const essay = blogData[key];

    if (essay) {
        target.innerHTML = `<h2 style="color:#e6c59c">${essay.title}</h2><p>${essay.text}</p>`;
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Stop page from scrolling
    }
}

function closeBlogModal() {
    document.getElementById('blogModal').style.display = "none";
    document.body.style.overflow = "auto";
}
// ADD THIS FUNCTION TO YOUR SCRIPT.JS
function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    const container = document.getElementById("lightbox-body");

    if (lightbox) {
        lightbox.style.display = "none"; // Hide the window
        document.body.style.overflow = "auto"; // Let the page scroll again
    }

    if (container) {
        container.innerHTML = ""; // This stops the YouTube video/music
    }
}