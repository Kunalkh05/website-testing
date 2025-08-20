// FarmTech Pro - Next-Gen JavaScript Functionality

// Global variables
let userLocation = null;
let weatherData = null;
let isDarkMode = true;

// Mock weather API for demonstration (replace with real API)
const WEATHER_API_KEY = 'demo_key'; // Replace with actual API key

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    generateFarmingTips();
    initializeTheme();
    addModernInteractions();
});

// Modern Gen Z Features
function initializeTheme() {
    const savedTheme = localStorage.getItem('farmtech-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    isDarkMode = savedTheme === 'dark';

    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const newTheme = isDarkMode ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('farmtech-theme', newTheme);

    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        themeIcon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Add smooth transition effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);

    showNotification(isDarkMode ? '🌙 Dark mode activated!' : '☀️ Light mode activated!');
}

function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: '🌱 FarmTech Pro - Next-Gen Agriculture',
            text: 'Check out this amazing farming app with AI-powered crop recommendations!',
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('🔗 Link copied to clipboard!');
        }).catch(() => {
            showNotification('❌ Unable to share. Try copying the URL manually.');
        });
    }
}

function watchDemo() {
    showNotification('🎬 Demo feature coming soon! Follow us for updates.');
    // Placeholder for demo functionality
}

function showNotification(message, duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'modern-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="notification-close">×</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(20px);
        border-radius: 12px;
        padding: 1rem 1.5rem;
        color: var(--text-primary);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        max-width: 350px;
    `;

    document.body.appendChild(notification);

    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, duration);
}

function addModernInteractions() {
    // Add subtle animations to cards
    const cards = document.querySelectorAll('.glass-card, .crop-card, .tip-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add parallax effect to background elements
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');

        parallaxElements.forEach((element, index) => {
            const rate = scrolled * -0.5 * (index + 1) * 0.1;
            element.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.05}deg)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }

        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        }

        .notification-close {
            background: none;
            border: none;
            color: var(--text-primary);
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s ease;
        }

        .notification-close:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
}

function initializeApp() {
    console.log('FarmWise Application Initialized');
    
    // Add smooth scrolling to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Location Functions
function getLocation() {
    const locationSection = document.getElementById('location-section');
    const locationText = document.getElementById('location-text');
    
    locationSection.classList.remove('hidden');
    locationText.textContent = 'Getting your location...';
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                displayLocation(userLocation);
                getWeatherData(userLocation);
            },
            (error) => {
                handleLocationError(error);
            }
        );
    } else {
        locationText.textContent = 'Geolocation is not supported by this browser.';
        // Use demo location for testing
        userLocation = { latitude: 28.6139, longitude: 77.2090 }; // Delhi coordinates
        displayLocation(userLocation);
        getWeatherData(userLocation);
    }
}

function displayLocation(location) {
    const locationText = document.getElementById('location-text');
    const coordinates = document.getElementById('coordinates');
    
    locationText.textContent = 'Location detected successfully!';
    coordinates.textContent = `Lat: ${location.latitude.toFixed(4)}, Lng: ${location.longitude.toFixed(4)}`;
    
    // Show weather section
    document.getElementById('weather-section').classList.remove('hidden');
    document.getElementById('crops-section').classList.remove('hidden');
}

function handleLocationError(error) {
    const locationText = document.getElementById('location-text');
    let errorMessage = 'Unable to get your location. ';
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorMessage += 'Location access denied by user.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
        case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
        default:
            errorMessage += 'An unknown error occurred.';
            break;
    }
    
    locationText.textContent = errorMessage + ' Using demo location (Delhi, India).';
    
    // Use demo location
    userLocation = { latitude: 28.6139, longitude: 77.2090 };
    displayLocation(userLocation);
    getWeatherData(userLocation);
}

// Weather Functions
async function getWeatherData(location) {
    try {
        // For demo purposes, we'll use mock data
        // In production, replace with actual weather API call
        const mockWeatherData = generateMockWeather(location);
        weatherData = mockWeatherData;
        displayCurrentWeather(mockWeatherData.current);
        displayWeatherForecast(mockWeatherData.forecast);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayWeatherError();
    }
}

function generateMockWeather(location) {
    const seasons = ['spring', 'summer', 'monsoon', 'winter'];
    const currentSeason = seasons[Math.floor(Math.random() * seasons.length)];
    
    let baseTemp, baseHumidity, baseRainfall;
    
    switch(currentSeason) {
        case 'summer':
            baseTemp = 35;
            baseHumidity = 40;
            baseRainfall = 2;
            break;
        case 'monsoon':
            baseTemp = 28;
            baseHumidity = 85;
            baseRainfall = 25;
            break;
        case 'winter':
            baseTemp = 15;
            baseHumidity = 60;
            baseRainfall = 1;
            break;
        default: // spring
            baseTemp = 25;
            baseHumidity = 65;
            baseRainfall = 8;
    }
    
    return {
        current: {
            temperature: baseTemp + Math.floor(Math.random() * 10) - 5,
            description: getWeatherDescription(currentSeason),
            humidity: baseHumidity + Math.floor(Math.random() * 20) - 10,
            windSpeed: Math.floor(Math.random() * 15) + 5,
            rainfall: baseRainfall + Math.floor(Math.random() * 10)
        },
        forecast: generateWeatherForecast(baseTemp, baseHumidity)
    };
}

function getWeatherDescription(season) {
    const descriptions = {
        summer: ['Hot and dry', 'Sunny', 'Clear skies', 'Very hot'],
        monsoon: ['Rainy', 'Cloudy', 'Heavy rainfall', 'Thunderstorms'],
        winter: ['Cool and dry', 'Clear', 'Cold', 'Foggy morning'],
        spring: ['Pleasant', 'Partly cloudy', 'Mild', 'Fresh breeze']
    };
    
    const seasonDescriptions = descriptions[season] || descriptions.spring;
    return seasonDescriptions[Math.floor(Math.random() * seasonDescriptions.length)];
}

function generateWeatherForecast(baseTemp, baseHumidity) {
    const forecast = [];
    const days = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    
    for (let i = 0; i < 7; i++) {
        forecast.push({
            day: days[i],
            temperature: baseTemp + Math.floor(Math.random() * 8) - 4,
            condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
            icon: ['☀️', '☁️', '����️', '⛅'][Math.floor(Math.random() * 4)]
        });
    }
    
    return forecast;
}

function displayCurrentWeather(weather) {
    document.getElementById('temperature').textContent = `${weather.temperature}°C`;
    document.getElementById('weather-desc').textContent = weather.description;
    document.getElementById('humidity').textContent = `${weather.humidity}%`;
    document.getElementById('wind-speed').textContent = `${weather.windSpeed} km/h`;
    document.getElementById('rainfall').textContent = `${weather.rainfall} mm`;
}

function displayWeatherForecast(forecast) {
    const forecastContainer = document.getElementById('forecast-info');
    forecastContainer.innerHTML = '';
    
    forecast.forEach(day => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">${day.icon}</div>
            <div style="font-weight: 600; margin-bottom: 0.25rem;">${day.day}</div>
            <div style="color: var(--primary-green); font-weight: 600;">${day.temperature}°C</div>
            <div style="font-size: 0.9rem; color: var(--text-light);">${day.condition}</div>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}

function displayWeatherError() {
    document.getElementById('temperature').textContent = 'N/A';
    document.getElementById('weather-desc').textContent = 'Weather data unavailable';
    document.getElementById('humidity').textContent = 'N/A';
    document.getElementById('wind-speed').textContent = 'N/A';
    document.getElementById('rainfall').textContent = 'N/A';
}

// Crop Recommendation Functions
function generateRecommendations() {
    const season = document.getElementById('season-select').value;
    const soilType = document.getElementById('soil-type').value;
    const recommendationsContainer = document.getElementById('crop-recommendations');
    
    const recommendations = getCropRecommendations(season, soilType);
    displayCropRecommendations(recommendations);
}

function getCropRecommendations(season, soilType) {
    const cropDatabase = {
        kharif: {
            loamy: [
                { name: 'Rice', icon: '🌾', season: 'Kharif', waterReq: 'High', duration: '120-150 days', benefits: ['Staple food', 'Good market price', 'Traditional crop'] },
                { name: 'Cotton', icon: '🌿', season: 'Kharif', waterReq: 'Medium', duration: '180-200 days', benefits: ['High profit', 'Export potential', 'Industrial use'] },
                { name: 'Sugarcane', icon: '🎋', season: 'Kharif', waterReq: 'High', duration: '300-365 days', benefits: ['Year-round income', 'Multiple uses', 'Stable market'] }
            ],
            clay: [
                { name: 'Rice', icon: '🌾', season: 'Kharif', waterReq: 'High', duration: '120-150 days', benefits: ['Suitable for clay soil', 'Water retention', 'High yield'] },
                { name: 'Jute', icon: '🌱', season: 'Kharif', waterReq: 'High', duration: '120 days', benefits: ['Eco-friendly', 'Good for clay soil', 'Industrial demand'] }
            ],
            sandy: [
                { name: 'Millets', icon: '🌾', season: 'Kharif', waterReq: 'Low', duration: '90-120 days', benefits: ['Drought resistant', 'Nutritious', 'Low input cost'] },
                { name: 'Groundnut', icon: '🥜', season: 'Kharif', waterReq: 'Medium', duration: '100-130 days', benefits: ['Oil crop', 'Nitrogen fixation', 'Good market'] }
            ]
        },
        rabi: {
            loamy: [
                { name: 'Wheat', icon: '🌾', season: 'Rabi', waterReq: 'Medium', duration: '120-150 days', benefits: ['Staple crop', 'Good storage', 'Stable market'] },
                { name: 'Mustard', icon: '🌻', season: 'Rabi', waterReq: 'Low', duration: '90-120 days', benefits: ['Oil seed', 'Short duration', 'Multiple uses'] },
                { name: 'Peas', icon: '🟢', season: 'Rabi', waterReq: 'Medium', duration: '90-110 days', benefits: ['Vegetable crop', 'Protein rich', 'Nitrogen fixation'] }
            ],
            clay: [
                { name: 'Gram', icon: '🌰', season: 'Rabi', waterReq: 'Low', duration: '90-120 days', benefits: ['Pulse crop', 'Drought tolerant', 'Soil improvement'] },
                { name: 'Lentil', icon: '🔴', season: 'Rabi', waterReq: 'Low', duration: '90-110 days', benefits: ['High protein', 'Low water need', 'Good price'] }
            ],
            sandy: [
                { name: 'Barley', icon: '🌾', season: 'Rabi', waterReq: 'Low', duration: '90-120 days', benefits: ['Drought resistant', 'Animal feed', 'Brewing industry'] },
                { name: 'Cumin', icon: '🌿', season: 'Rabi', waterReq: 'Low', duration: '100-120 days', benefits: ['Spice crop', 'High value', 'Export potential'] }
            ]
        },
        zaid: {
            loamy: [
                { name: 'Watermelon', icon: '🍉', season: 'Zaid', waterReq: 'High', duration: '90-100 days', benefits: ['Summer fruit', 'High water content', 'Good market'] },
                { name: 'Cucumber', icon: '🥒', season: 'Zaid', waterReq: 'High', duration: '50-70 days', benefits: ['Quick harvest', 'Vegetable crop', 'Cooling effect'] },
                { name: 'Fodder crops', icon: '🌱', season: 'Zaid', waterReq: 'Medium', duration: '45-60 days', benefits: ['Animal feed', 'Quick growing', 'Soil cover'] }
            ]
        }
    };
    
    // Default recommendations for current season
    if (season === 'current') {
        const currentMonth = new Date().getMonth() + 1;
        if (currentMonth >= 6 && currentMonth <= 10) {
            return cropDatabase.kharif[soilType] || cropDatabase.kharif.loamy;
        } else if (currentMonth >= 11 || currentMonth <= 3) {
            return cropDatabase.rabi[soilType] || cropDatabase.rabi.loamy;
        } else {
            return cropDatabase.zaid[soilType] || cropDatabase.zaid.loamy;
        }
    }
    
    return cropDatabase[season]?.[soilType] || cropDatabase.kharif.loamy;
}

function displayCropRecommendations(recommendations) {
    const container = document.getElementById('crop-recommendations');
    container.innerHTML = '';
    
    recommendations.forEach(crop => {
        const cropCard = document.createElement('div');
        cropCard.className = 'crop-card';
        
        const benefitTags = crop.benefits.map(benefit => 
            `<span class="benefit-tag">${benefit}</span>`
        ).join('');
        
        cropCard.innerHTML = `
            <div class="crop-header">
                <span class="crop-icon">${crop.icon}</span>
                <h4>${crop.name}</h4>
            </div>
            <div class="crop-details">
                <p><strong>Season:</strong> ${crop.season}</p>
                <p><strong>Water Requirement:</strong> ${crop.waterReq}</p>
                <p><strong>Duration:</strong> ${crop.duration}</p>
            </div>
            <div class="crop-benefits">
                <h5>Benefits:</h5>
                <div class="benefit-tags">
                    ${benefitTags}
                </div>
            </div>
        `;
        
        container.appendChild(cropCard);
    });
}

// Farming Tips Functions
function generateFarmingTips() {
    const tips = [
        {
            title: "Soil Testing",
            content: "Test your soil pH and nutrient levels every 2-3 years to optimize crop selection and fertilizer use."
        },
        {
            title: "Water Management",
            content: "Use drip irrigation or sprinkler systems to reduce water waste and improve crop yield."
        },
        {
            title: "Crop Rotation",
            content: "Rotate crops seasonally to maintain soil health and reduce pest and disease problems."
        },
        {
            title: "Weather Monitoring",
            content: "Check weather forecasts regularly and plan farming activities accordingly to avoid losses."
        },
        {
            title: "Organic Farming",
            content: "Consider organic fertilizers and pest control methods for sustainable farming and better soil health."
        },
        {
            title: "Market Research",
            content: "Research market prices and demand before selecting crops to ensure better profitability."
        }
    ];
    
    const tipsContainer = document.getElementById('farming-tips');
    tipsContainer.innerHTML = '';
    
    tips.forEach(tip => {
        const tipCard = document.createElement('div');
        tipCard.className = 'tip-card';
        tipCard.innerHTML = `
            <h4>${tip.title}</h4>
            <p>${tip.content}</p>
        `;
        tipsContainer.appendChild(tipCard);
    });
}

// Initialize recommendations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Auto-generate initial recommendations
    setTimeout(() => {
        if (userLocation) {
            generateRecommendations();
        }
    }, 2000);
});
