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
            icon: ['☀️', '☁️', '🌧️', '⛅'][Math.floor(Math.random() * 4)]
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
                {
                    name: 'Rice',
                    icon: '🌾',
                    season: 'Kharif',
                    waterReq: 'High',
                    duration: '120-150 days',
                    benefits: ['💰 Stable Income', '🏠 Local Favorite', '📈 Reliable Market'],
                    profitScore: 85,
                    sustainabilityScore: 75,
                    difficulty: 'Easy',
                    trendy: false
                },
                {
                    name: 'Organic Cotton',
                    icon: '🌿',
                    season: 'Kharif',
                    waterReq: 'Medium',
                    duration: '180-200 days',
                    benefits: ['🌍 Eco-Friendly', '💎 Premium Price', '🚀 Export Ready'],
                    profitScore: 92,
                    sustainabilityScore: 95,
                    difficulty: 'Medium',
                    trendy: true
                },
                {
                    name: 'Smart Sugarcane',
                    icon: '🎋',
                    season: 'Kharif',
                    waterReq: 'High',
                    duration: '300-365 days',
                    benefits: ['💵 Year-round Cash', '🔄 Multiple Products', '📊 Stable Returns'],
                    profitScore: 88,
                    sustainabilityScore: 70,
                    difficulty: 'Hard',
                    trendy: false
                }
            ],
            clay: [
                {
                    name: 'Premium Rice',
                    icon: '🌾',
                    season: 'Kharif',
                    waterReq: 'High',
                    duration: '120-150 days',
                    benefits: ['🎯 Perfect Match', '💧 Water Smart', '📈 High Yield'],
                    profitScore: 87,
                    sustainabilityScore: 80,
                    difficulty: 'Easy',
                    trendy: false
                },
                {
                    name: 'Eco Jute',
                    icon: '🌱',
                    season: 'Kharif',
                    waterReq: 'High',
                    duration: '120 days',
                    benefits: ['♻️ Sustainable', '🏭 Industrial Demand', '🌱 Soil Friendly'],
                    profitScore: 78,
                    sustainabilityScore: 98,
                    difficulty: 'Medium',
                    trendy: true
                }
            ],
            sandy: [
                {
                    name: 'SuperFood Millets',
                    icon: '🌾',
                    season: 'Kharif',
                    waterReq: 'Low',
                    duration: '90-120 days',
                    benefits: ['🏃‍♂️ Health Trend', '💪 Drought Proof', '💰 Low Investment'],
                    profitScore: 82,
                    sustainabilityScore: 95,
                    difficulty: 'Easy',
                    trendy: true
                },
                {
                    name: 'Premium Groundnut',
                    icon: '🥜',
                    season: 'Kharif',
                    waterReq: 'Medium',
                    duration: '100-130 days',
                    benefits: ['🛢️ Oil Gold', '🌱 Soil Booster', '📊 Solid Market'],
                    profitScore: 85,
                    sustainabilityScore: 85,
                    difficulty: 'Medium',
                    trendy: false
                }
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

    recommendations.forEach((crop, index) => {
        const cropCard = document.createElement('div');
        cropCard.className = 'crop-card';

        // Add animation delay
        cropCard.style.animationDelay = `${index * 0.1}s`;
        cropCard.style.animation = 'slideInUp 0.6s ease-out both';

        const benefitTags = crop.benefits.map(benefit =>
            `<span class="benefit-tag">${benefit}</span>`
        ).join('');

        const trendyBadge = crop.trendy ? '<span class="trendy-badge">🔥 Trending</span>' : '';
        const difficultyColor = crop.difficulty === 'Easy' ? '#4ade80' : crop.difficulty === 'Medium' ? '#f59e0b' : '#ef4444';

        cropCard.innerHTML = `
            <div class="crop-header">
                <div class="crop-title-section">
                    <span class="crop-icon">${crop.icon}</span>
                    <div>
                        <h4>${crop.name} ${trendyBadge}</h4>
                        <div class="crop-meta">
                            <span class="difficulty-badge" style="background: ${difficultyColor}20; color: ${difficultyColor}; border: 1px solid ${difficultyColor}40;">
                                ${crop.difficulty} Level
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="crop-scores">
                <div class="score-item">
                    <div class="score-circle" style="background: conic-gradient(#4ade80 ${crop.profitScore}%, #333 ${crop.profitScore}%)">
                        <span>${crop.profitScore}</span>
                    </div>
                    <label>💰 Profit Score</label>
                </div>
                <div class="score-item">
                    <div class="score-circle" style="background: conic-gradient(#06d6a0 ${crop.sustainabilityScore}%, #333 ${crop.sustainabilityScore}%)">
                        <span>${crop.sustainabilityScore}</span>
                    </div>
                    <label>🌱 Eco Score</label>
                </div>
            </div>

            <div class="crop-details">
                <div class="detail-item">
                    <span class="detail-icon">🗓️</span>
                    <div>
                        <strong>Growing Time</strong>
                        <span>${crop.duration}</span>
                    </div>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">💧</span>
                    <div>
                        <strong>Water Needs</strong>
                        <span>${crop.waterReq}</span>
                    </div>
                </div>
                <div class="detail-item">
                    <span class="detail-icon">🌤️</span>
                    <div>
                        <strong>Season</strong>
                        <span>${crop.season}</span>
                    </div>
                </div>
            </div>

            <div class="crop-benefits">
                <h5>✨ Why This Rocks:</h5>
                <div class="benefit-tags">
                    ${benefitTags}
                </div>
            </div>

            <div class="crop-actions">
                <button class="action-btn primary" onclick="selectCrop('${crop.name}')">
                    <i class="fas fa-check"></i> Choose This Crop
                </button>
                <button class="action-btn secondary" onclick="learnMore('${crop.name}')">
                    <i class="fas fa-info-circle"></i> Learn More
                </button>
            </div>
        `;

        container.appendChild(cropCard);
    });

    // Add the modern styles
    addCropCardStyles();
}

function selectCrop(cropName) {
    showNotification(`🎉 Great choice! ${cropName} added to your farm plan. Check your dashboard for next steps!`);

    // Add to local storage or send to backend
    const selectedCrops = JSON.parse(localStorage.getItem('selectedCrops') || '[]');
    if (!selectedCrops.includes(cropName)) {
        selectedCrops.push(cropName);
        localStorage.setItem('selectedCrops', JSON.stringify(selectedCrops));
    }
}

function learnMore(cropName) {
    showNotification(`📚 Opening detailed guide for ${cropName}...`);
    // Placeholder for detailed crop information
}

function addCropCardStyles() {
    if (document.getElementById('crop-card-styles')) return;

    const style = document.createElement('style');
    style.id = 'crop-card-styles';
    style.textContent = `
        .crop-title-section {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            width: 100%;
        }

        .crop-meta {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.5rem;
        }

        .trendy-badge {
            background: linear-gradient(45deg, #ff6b6b, #feca57);
            color: white;
            padding: 0.2rem 0.6rem;
            border-radius: 12px;
            font-size: 0.7rem;
            font-weight: 600;
            margin-left: 0.5rem;
            animation: pulse 2s infinite;
        }

        .difficulty-badge {
            padding: 0.2rem 0.6rem;
            border-radius: 8px;
            font-size: 0.7rem;
            font-weight: 600;
        }

        .crop-scores {
            display: flex;
            justify-content: space-around;
            margin: 1.5rem 0;
        }

        .score-item {
            text-align: center;
        }

        .score-circle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 0.5rem;
            position: relative;
            color: white;
            font-weight: 700;
            font-size: 0.9rem;
        }

        .score-item label {
            font-size: 0.8rem;
            color: var(--text-secondary);
            display: block;
        }

        .detail-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
        }

        .detail-icon {
            font-size: 1.2rem;
            width: 24px;
            text-align: center;
        }

        .detail-item div {
            display: flex;
            flex-direction: column;
            gap: 0.1rem;
        }

        .detail-item strong {
            color: var(--text-primary);
            font-size: 0.9rem;
            font-weight: 600;
        }

        .detail-item span {
            color: var(--text-secondary);
            font-size: 0.85rem;
        }

        .crop-actions {
            display: flex;
            gap: 0.75rem;
            margin-top: 1.5rem;
        }

        .action-btn {
            flex: 1;
            padding: 0.75rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-size: 0.85rem;
        }

        .action-btn.primary {
            background: var(--primary-gradient);
            color: white;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .action-btn.secondary {
            background: var(--glass-bg);
            color: var(--text-primary);
            border: 1px solid var(--border-glass);
        }

        .action-btn:hover {
            transform: translateY(-2px);
        }

        .action-btn.primary:hover {
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .action-btn.secondary:hover {
            background: rgba(255, 255, 255, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// Farming Tips Functions - Gen Z Edition
function generateFarmingTips() {
    const tips = [
        {
            title: "Soil Health Check 🧪",
            content: "Get your soil tested like you'd check your phone battery! Test pH and nutrients every 2-3 years to keep your crops happy and thriving.",
            category: "Science",
            icon: "🔬",
            trending: true
        },
        {
            title: "Smart Water Game 💧",
            content: "Level up with drip irrigation and smart sprinklers. It's like having precision controls for your farm - save water, boost yields, win the game!",
            category: "Tech",
            icon: "💻",
            trending: true
        },
        {
            title: "Crop Rotation Strategy 🔄",
            content: "Think of it as a playlist shuffle for your fields! Rotate crops to keep soil healthy and pests confused. Diversity is key! 🎵",
            category: "Strategy",
            icon: "🎯",
            trending: false
        },
        {
            title: "Weather Radar On 🌤️",
            content: "Stay updated like you check social media! Use weather apps and forecasts to time your farming activities perfectly. No more weather surprises!",
            category: "Planning",
            icon: "📱",
            trending: true
        },
        {
            title: "Go Organic, Go Viral 🌱",
            content: "Organic farming is the trend that actually matters! Use natural fertilizers and pest control. Your soil will thank you, and so will the planet! 🌍",
            category: "Sustainability",
            icon: "♻️",
            trending: true
        },
        {
            title: "Market Intelligence 📊",
            content: "Do your research before planting! Check market trends, pricing, and demand. It's like checking reviews before buying - but for crops! 💰",
            category: "Business",
            icon: "💡",
            trending: false
        },
        {
            title: "IoT & Sensors 🤖",
            content: "Embrace the future with smart sensors! Monitor soil moisture, temperature, and crop health in real-time. Farm like it's 2024! 🚀",
            category: "Innovation",
            icon: "📡",
            trending: true
        },
        {
            title: "Social Farming 🤝",
            content: "Connect with other farmers online! Share experiences, ask questions, and learn from the community. Farming is better together! 💪",
            category: "Community",
            icon: "👥",
            trending: true
        }
    ];
    
    const tipsContainer = document.getElementById('farming-tips');
    tipsContainer.innerHTML = '';

    tips.forEach((tip, index) => {
        const tipCard = document.createElement('div');
        tipCard.className = 'tip-card modern-tip';

        // Add animation delay
        tipCard.style.animationDelay = `${index * 0.1}s`;
        tipCard.style.animation = 'slideInUp 0.6s ease-out both';

        const trendingBadge = tip.trending ? '<span class="trending-badge">🔥 Trending</span>' : '';

        tipCard.innerHTML = `
            <div class="tip-header">
                <div class="tip-icon">${tip.icon}</div>
                <div class="tip-category">${tip.category}</div>
                ${trendingBadge}
            </div>
            <h4>${tip.title}</h4>
            <p>${tip.content}</p>
            <div class="tip-actions">
                <button class="tip-action-btn" onclick="saveTip('${tip.title}')">
                    <i class="fas fa-bookmark"></i> Save
                </button>
                <button class="tip-action-btn" onclick="shareTip('${tip.title}')">
                    <i class="fas fa-share"></i> Share
                </button>
                <button class="tip-action-btn" onclick="likeTip('${tip.title}')">
                    <i class="fas fa-heart"></i> Like
                </button>
            </div>
        `;

        tipsContainer.appendChild(tipCard);
    });

    // Add modern tip styles
    addModernTipStyles();
}

function saveTip(tipTitle) {
    const savedTips = JSON.parse(localStorage.getItem('savedTips') || '[]');
    if (!savedTips.includes(tipTitle)) {
        savedTips.push(tipTitle);
        localStorage.setItem('savedTips', JSON.stringify(savedTips));
        showNotification(`💾 "${tipTitle}" saved to your collection!`);
    } else {
        showNotification(`⚠️ You've already saved this tip!`);
    }
}

function shareTip(tipTitle) {
    if (navigator.share) {
        navigator.share({
            title: `💡 FarmTech Pro Tip: ${tipTitle}`,
            text: `Check out this awesome farming tip from FarmTech Pro!`,
            url: window.location.href
        });
    } else {
        showNotification(`📤 Sharing "${tipTitle}" - Link copied!`);
    }
}

function likeTip(tipTitle) {
    showNotification(`❤️ You liked "${tipTitle}"! Thanks for the feedback!`);
    // Add to analytics or backend
}

function addModernTipStyles() {
    if (document.getElementById('modern-tip-styles')) return;

    const style = document.createElement('style');
    style.id = 'modern-tip-styles';
    style.textContent = `
        .modern-tip {
            position: relative;
            overflow: hidden;
        }

        .tip-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        .tip-icon {
            font-size: 2rem;
            background: var(--primary-gradient);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 0.5rem;
        }

        .tip-category {
            background: var(--glass-bg);
            color: var(--text-secondary);
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 600;
            border: 1px solid var(--border-glass);
        }

        .trending-badge {
            background: linear-gradient(45deg, #ff6b6b, #feca57);
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.75rem;
            font-weight: 600;
            animation: pulse 2s infinite;
        }

        .tip-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid var(--border-glass);
        }

        .tip-action-btn {
            flex: 1;
            background: var(--glass-bg);
            border: 1px solid var(--border-glass);
            color: var(--text-secondary);
            padding: 0.6rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.8rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.3rem;
        }

        .tip-action-btn:hover {
            background: var(--primary-gradient);
            color: white;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .modern-tip:hover .tip-icon {
            transform: scale(1.1) rotate(5deg);
        }
    `;
    document.head.appendChild(style);
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
