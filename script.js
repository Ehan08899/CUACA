const API_KEY = '8bf75a3fa26da7a3f0aaca0f2931cb75'; // OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Pastikan DOM sudah loaded
document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city');
    const getWeatherBtn = document.getElementById('getWeather');
    
    // Test apakah input bisa diklik dan difocus
    cityInput.addEventListener('click', function() {
        this.focus();
    });
    
    getWeatherBtn.addEventListener('click', getWeather);
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            getWeather();
        }
    });
});

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const weatherDiv = document.getElementById('weather');
    
    if (!city) {
        alert('Masukkan nama kota!');
        return;
    }

    try {
        // Menggunakan API asli OpenWeatherMap
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=id`);
        
        if (!response.ok) {
            throw new Error('Kota tidak ditemukan');
        }
        
        const data = await response.json();
        displayWeather(data);
        
    } catch (error) {
        console.error('Error:', error);
        weatherDiv.innerHTML = '<p class="error">Kota tidak ditemukan atau terjadi kesalahan. Coba periksa ejaan nama kota.</p>';
        weatherDiv.classList.remove('hidden');
    }
}

function displayWeather(data) {
    const locationEl = document.getElementById('location');
    const temperatureEl = document.getElementById('temperature');
    const descriptionEl = document.getElementById('description');
    const iconEl = document.getElementById('icon');
    const weatherDiv = document.getElementById('weather');

    locationEl.textContent = `${data.name}, ${data.sys.country}`;
    temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionEl.textContent = data.weather[0].description;
    iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    weatherDiv.classList.remove('hidden', 'error');
}

// Add some sample cities for quick testing
const sampleCities = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang'];

// Auto-suggest functionality (simple version)
document.getElementById('city').addEventListener('input', function(e) {
    const input = e.target.value.toLowerCase();
    // Simple autocomplete logic could be added here
});