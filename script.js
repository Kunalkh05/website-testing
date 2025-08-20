// AgroDoc - Smart AI Crop Doctor JavaScript

// Global Variables
let uploadedImage = null;
let isDemoMode = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupScrollEffects();
    setupDragAndDrop();
    setupForms();
    setupMobileMenu();
});

// Main initialization function
function initializeApp() {
    console.log('AgroDoc Application Initialized');
    addLoadingAnimations();
}

// Smooth scrolling functions
function scrollToDemo() {
    document.getElementById('demo').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function scrollToSolution() {
    document.getElementById('solution').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Setup scroll effects and navbar behavior
function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup drag and drop functionality for demo section
function setupDragAndDrop() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const demoResults = document.getElementById('demoResults');
    
    if (!uploadArea || !fileInput || !demoResults) return;
    
    // Click to upload
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    // File input change
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });
    
    // Drag and drop events
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ff8500';
        this.style.backgroundColor = '#fff8f3';
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#2d5a27';
        this.style.backgroundColor = '#ffffff';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#2d5a27';
        this.style.backgroundColor = '#ffffff';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });
}

// Handle file upload and AI analysis simulation
function handleFileUpload(file) {
    if (!file.type.startsWith('image/')) {
        showNotification('Please upload an image file (JPG, PNG, HEIC)', 'error');
        return;
    }
    
    uploadedImage = file;
    const reader = new FileReader();
    
    reader.onload = function(e) {
        displayUploadedImage(e.target.result);
        simulateAIAnalysis();
    };
    
    reader.readAsDataURL(file);
}

// Display uploaded image in demo area
function displayUploadedImage(imageSrc) {
    const uploadArea = document.getElementById('uploadArea');
    
    uploadArea.innerHTML = `
        <div class="uploaded-image">
            <img src="${imageSrc}" alt="Uploaded crop image" style="max-width: 100%; max-height: 200px; border-radius: 8px; object-fit: cover;">
            <p style="margin-top: 1rem; color: #2d5a27; font-weight: 600;">
                <i class="fas fa-check-circle"></i> Image uploaded successfully
            </p>
            <button onclick="resetUpload()" style="margin-top: 0.5rem; background: transparent; border: 2px solid #2d5a27; color: #2d5a27; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">
                Upload Different Image
            </button>
        </div>
    `;
}

// Reset upload area
function resetUpload() {
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.innerHTML = `
        <div class="upload-content">
            <i class="fas fa-cloud-upload-alt"></i>
            <h3>Drag & Drop Your Crop Photo</h3>
            <p>Or click to browse files</p>
            <p class="upload-note">Supports JPG, PNG, HEIC formats</p>
        </div>
    `;
    
    // Reset results
    const demoResults = document.getElementById('demoResults');
    demoResults.innerHTML = `
        <div class="results-placeholder">
            <i class="fas fa-microscope"></i>
            <h3>AI Analysis Results</h3>
            <p>Upload an image to see the magic happen</p>
        </div>
    `;
    
    uploadedImage = null;
}

// Simulate AI analysis with realistic results
function simulateAIAnalysis() {
    const demoResults = document.getElementById('demoResults');
    
    // Show loading state
    demoResults.innerHTML = `
        <div class="analysis-loading">
            <div class="loading-spinner"></div>
            <h3>AI Analysis in Progress...</h3>
            <p>Analyzing crop health using deep learning models</p>
            <div class="loading-steps">
                <div class="loading-step active">📷 Image preprocessing</div>
                <div class="loading-step">🧠 Neural network analysis</div>
                <div class="loading-step">🔍 Disease detection</div>
                <div class="loading-step">💊 Treatment recommendations</div>
            </div>
        </div>
    `;
    
    // Add loading styles
    addLoadingStyles();
    
    // Simulate progressive loading
    setTimeout(() => {
        updateLoadingStep(1);
    }, 800);
    
    setTimeout(() => {
        updateLoadingStep(2);
    }, 1600);
    
    setTimeout(() => {
        updateLoadingStep(3);
    }, 2400);
    
    setTimeout(() => {
        showAnalysisResults();
    }, 3200);
}

// Update loading steps
function updateLoadingStep(stepIndex) {
    const steps = document.querySelectorAll('.loading-step');
    if (steps[stepIndex]) {
        steps[stepIndex].classList.add('active');
    }
}

// Show realistic AI analysis results
function showAnalysisResults() {
    const diseases = [
        {
            name: "Early Blight",
            confidence: 92,
            severity: "Moderate",
            crop: "Tomato",
            treatment: "Apply copper-based fungicide",
            prevention: "Improve air circulation, avoid overhead watering",
            urgency: "medium"
        },
        {
            name: "Leaf Spot Disease",
            confidence: 87,
            severity: "Mild",
            crop: "Potato",
            treatment: "Remove affected leaves, apply organic fungicide",
            prevention: "Crop rotation, proper spacing",
            urgency: "low"
        },
        {
            name: "Powdery Mildew",
            confidence: 95,
            severity: "High",
            crop: "Wheat",
            treatment: "Apply sulfur-based fungicide immediately",
            prevention: "Ensure proper ventilation, avoid overcrowding",
            urgency: "high"
        }
    ];
    
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
    const demoResults = document.getElementById('demoResults');
    
    demoResults.innerHTML = `
        <div class="analysis-results">
            <div class="result-header">
                <div class="confidence-circle" data-confidence="${randomDisease.confidence}">
                    <span>${randomDisease.confidence}%</span>
                </div>
                <div class="result-info">
                    <h3>${randomDisease.name}</h3>
                    <p class="crop-type">Detected in ${randomDisease.crop}</p>
                    <span class="severity-badge ${randomDisease.urgency}">${randomDisease.severity} Severity</span>
                </div>
            </div>
            
            <div class="result-details">
                <div class="detail-section">
                    <h4><i class="fas fa-prescription-bottle-alt"></i> Treatment</h4>
                    <p>${randomDisease.treatment}</p>
                </div>
                
                <div class="detail-section">
                    <h4><i class="fas fa-shield-alt"></i> Prevention</h4>
                    <p>${randomDisease.prevention}</p>
                </div>
                
                <div class="urgency-indicator ${randomDisease.urgency}">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Action needed: ${randomDisease.urgency === 'high' ? 'Immediate' : randomDisease.urgency === 'medium' ? 'Within 48 hours' : 'Monitor closely'}</span>
                </div>
            </div>
            
            <div class="result-actions">
                <button class="btn-primary" onclick="connectExpert()">
                    <i class="fas fa-user-tie"></i> Connect with Expert
                </button>
                <button class="btn-secondary" onclick="saveReport()">
                    <i class="fas fa-download"></i> Save Report
                </button>
            </div>
        </div>
    `;
    
    // Add result styles
    addResultStyles();
    
    // Animate confidence circle
    animateConfidenceCircle(randomDisease.confidence);
}

// Load sample image for testing
function loadSampleImage(imgElement) {
    const imageSrc = imgElement.src;
    displayUploadedImage(imageSrc);
    simulateAIAnalysis();
}

// Connect with expert functionality
function connectExpert() {
    showNotification('Connecting you with our agricultural experts...', 'success');
    
    setTimeout(() => {
        const modal = createExpertModal();
        document.body.appendChild(modal);
    }, 1000);
}

// Save report functionality
function saveReport() {
    showNotification('Analysis report saved to your device!', 'success');
    
    // Simulate file download
    const reportData = {
        timestamp: new Date().toISOString(),
        disease: "Early Blight",
        confidence: 92,
        treatment: "Apply copper-based fungicide",
        prevention: "Improve air circulation, avoid overhead watering"
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'agrodoc-analysis-report.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Create expert consultation modal
function createExpertModal() {
    const modal = document.createElement('div');
    modal.className = 'expert-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeExpertModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Connect with Agricultural Expert</h3>
                <button onclick="closeExpertModal()" class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="expert-profile">
                    <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Dr. Agricultural Expert">
                    <div class="expert-info">
                        <h4>Dr. Rajesh Kumar</h4>
                        <p>Plant Pathologist</p>
                        <p>15+ years experience</p>
                        <div class="expert-rating">
                            ⭐⭐⭐⭐⭐ 4.9/5
                        </div>
                    </div>
                </div>
                <p>Dr. Kumar is available for consultation. He specializes in crop disease diagnosis and treatment planning.</p>
                <div class="consultation-options">
                    <button class="btn-primary" onclick="startVideoCall()">
                        <i class="fas fa-video"></i> Video Consultation
                    </button>
                    <button class="btn-secondary" onclick="startChat()">
                        <i class="fas fa-comments"></i> Chat Consultation
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return modal;
}

// Close expert modal
function closeExpertModal() {
    const modal = document.querySelector('.expert-modal');
    if (modal) {
        modal.remove();
    }
}

// Start video call
function startVideoCall() {
    showNotification('Starting video consultation...', 'success');
    closeExpertModal();
}

// Start chat
function startChat() {
    showNotification('Chat consultation started!', 'success');
    closeExpertModal();
}

// Setup forms
function setupForms() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterForm();
        });
    }
}

// Handle contact form submission
function handleContactForm() {
    const formData = new FormData(document.getElementById('contactForm'));
    const data = Object.fromEntries(formData);
    
    showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Simulate sending to backend
    console.log('Contact form data:', data);
}

// Handle newsletter form submission
function handleNewsletterForm() {
    const formData = new FormData(document.getElementById('newsletterForm'));
    const data = Object.fromEntries(formData);
    
    showNotification('Successfully subscribed to our newsletter!', 'success');
    
    // Reset form
    document.getElementById('newsletterForm').reset();
    
    // Simulate sending to backend
    console.log('Newsletter form data:', data);
}

// Setup mobile menu
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Animate confidence circle
function animateConfidenceCircle(confidence) {
    const circle = document.querySelector('.confidence-circle');
    if (circle) {
        const circumference = 2 * Math.PI * 45; // radius = 45
        const offset = circumference - (confidence / 100) * circumference;
        
        // Add SVG circle for animation
        circle.innerHTML = `
            <svg width="100" height="100" style="position: absolute; top: 0; left: 0;">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="8"/>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#2d5a27" stroke-width="8" 
                        stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
                        stroke-linecap="round" transform="rotate(-90 50 50)"
                        style="transition: stroke-dashoffset 2s ease-in-out;"/>
            </svg>
            <span>${confidence}%</span>
        `;
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add loading animations
function addLoadingAnimations() {
    const cards = document.querySelectorAll('.solution-card, .feature-card, .benefit-card, .team-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Add dynamic styles
function addLoadingStyles() {
    if (document.getElementById('loading-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'loading-styles';
    style.textContent = `
        .analysis-loading {
            text-align: center;
            padding: 2rem;
        }
        
        .loading-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid #e5e7eb;
            border-top: 4px solid #2d5a27;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1.5rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loading-steps {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-top: 1.5rem;
            text-align: left;
        }
        
        .loading-step {
            padding: 0.5rem;
            border-radius: 6px;
            background: #f8faf9;
            color: #666;
            transition: all 0.3s ease;
        }
        
        .loading-step.active {
            background: #2d5a27;
            color: white;
            transform: translateX(10px);
        }
    `;
    document.head.appendChild(style);
}

// Add result styles
function addResultStyles() {
    if (document.getElementById('result-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'result-styles';
    style.textContent = `
        .analysis-results {
            padding: 2rem;
        }
        
        .result-header {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .confidence-circle {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: #f8faf9;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            font-weight: 700;
            color: #2d5a27;
            position: relative;
        }
        
        .result-info h3 {
            font-size: 1.5rem;
            color: #1a1a1a;
            margin-bottom: 0.25rem;
        }
        
        .crop-type {
            color: #666;
            margin-bottom: 0.5rem;
        }
        
        .severity-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .severity-badge.low {
            background: #dcfce7;
            color: #166534;
        }
        
        .severity-badge.medium {
            background: #fef3c7;
            color: #92400e;
        }
        
        .severity-badge.high {
            background: #fee2e2;
            color: #dc2626;
        }
        
        .result-details {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .detail-section h4 {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #2d5a27;
            margin-bottom: 0.5rem;
        }
        
        .detail-section p {
            color: #666;
            line-height: 1.6;
        }
        
        .urgency-indicator {
            padding: 1rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 600;
        }
        
        .urgency-indicator.low {
            background: #dcfce7;
            color: #166534;
        }
        
        .urgency-indicator.medium {
            background: #fef3c7;
            color: #92400e;
        }
        
        .urgency-indicator.high {
            background: #fee2e2;
            color: #dc2626;
        }
        
        .result-actions {
            display: flex;
            gap: 1rem;
        }
        
        .expert-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            width: 90%;
            max-width: 500px;
            position: relative;
            z-index: 1;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .modal-body {
            padding: 1.5rem;
        }
        
        .expert-profile {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .expert-profile img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .expert-info h4 {
            margin-bottom: 0.25rem;
            color: #1a1a1a;
        }
        
        .expert-info p {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
        }
        
        .expert-rating {
            font-size: 0.8rem;
            color: #ff8500;
        }
        
        .consultation-options {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            padding: 1rem 1.5rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 3000;
            min-width: 300px;
            animation: slideInRight 0.3s ease;
        }
        
        .notification.success {
            border-left: 4px solid #10b981;
        }
        
        .notification.error {
            border-left: 4px solid #ef4444;
        }
        
        .notification.info {
            border-left: 4px solid #3b82f6;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
        .notification.success i {
            color: #10b981;
        }
        
        .notification.error i {
            color: #ef4444;
        }
        
        .notification.info i {
            color: #3b82f6;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            color: #666;
            margin-left: auto;
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
    `;
    document.head.appendChild(style);
}

// Add mobile menu styles
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            border-top: 1px solid #e5e7eb;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            flex-direction: column;
            padding: 1rem 0;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-menu .nav-link {
            padding: 1rem 2rem;
            border-bottom: 1px solid #f3f4f6;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;

// Add mobile styles
const mobileStyle = document.createElement('style');
mobileStyle.textContent = mobileMenuStyles;
document.head.appendChild(mobileStyle);

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading setup
setupLazyLoading();
