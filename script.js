// Language Management
let currentLanguage = 'th';

// Sample Listings Data
const listingsData = [
    {
        id: 1,
        title_th: 'บ้านสวยแบบโมเดิร์น',
        title_en: 'Modern Beautiful House',
        price: '5,500,000',
        type: 'sale',
        type_th: 'ขาย',
        type_en: 'Sale',
        bedrooms: 3,
        bathrooms: 2,
        area: 150,
        agent_th: 'สมชาย มิ่งขวัญ',
        agent_en: 'Somchai Mingkhuan',
        type_label: '🏠'
    },
    {
        id: 2,
        title_th: 'คอนโดมิเนียมพัฒนา',
        title_en: 'Modern Condo',
        price: '3,200,000',
        type: 'sale',
        type_th: 'ขาย',
        type_en: 'Sale',
        bedrooms: 2,
        bathrooms: 1,
        area: 80,
        agent_th: 'วิชาพร ศิริวัฒน์',
        agent_en: 'Wichaporn Siriwat',
        type_label: '🏢'
    },
    {
        id: 3,
        title_th: '��้องแถว 2 ชั้น',
        title_en: 'Townhouse 2 Storey',
        price: '2,800,000',
        type: 'sale',
        type_th: 'ขาย',
        type_en: 'Sale',
        bedrooms: 3,
        bathrooms: 2,
        area: 100,
        agent_th: 'ประเทพ สมคุณ',
        agent_en: 'Prateep Somkhun',
        type_label: '🏘️'
    },
    {
        id: 4,
        title_th: 'เช่าบ้านลัคซ์ชั่รี่',
        title_en: 'Luxury House Rental',
        price: '150,000/เดือน',
        type: 'rent',
        type_th: 'เช่า',
        type_en: 'Rent',
        bedrooms: 4,
        bathrooms: 3,
        area: 200,
        agent_th: 'สินทร์ ยศพงศ์',
        agent_en: 'Sinthip Yasophon',
        type_label: '🏛️'
    },
    {
        id: 5,
        title_th: 'อพาร์ทเมนต์พร้อมสิ่งอำนวยความสะดวก',
        title_en: 'Apartment with Facilities',
        price: '45,000/เดือน',
        type: 'rent',
        type_th: 'เช่า',
        type_en: 'Rent',
        bedrooms: 1,
        bathrooms: 1,
        area: 45,
        agent_th: 'มณฑา บัณฑิตา',
        agent_en: 'Mantana Bandita',
        type_label: '🏠'
    },
    {
        id: 6,
        title_th: 'ที่ดินพร้อมสิ่งก่อสร้าง',
        title_en: 'Land with Construction',
        price: '8,500,000',
        type: 'sale',
        type_th: 'ขาย',
        type_en: 'Sale',
        bedrooms: 0,
        bathrooms: 0,
        area: 500,
        agent_th: 'นิภา กิจการ',
        agent_en: 'Nipha Kitkarn',
        type_label: '🏗️'
    }
];

// Sample Agents Data
const agentsData = [
    {
        id: 1,
        name_th: 'สมชาย มิ่งขวัญ',
        name_en: 'Somchai Mingkhuan',
        title_th: 'นายหน้าประสบการณ์',
        title_en: 'Senior Agent',
        phone: '+66 8-1234-5678',
        avatar: '👨‍💼'
    },
    {
        id: 2,
        name_th: 'วิชาพร ศิริวัฒน์',
        name_en: 'Wichaporn Siriwat',
        title_th: 'นายหน้าจำหน่าย',
        title_en: 'Sales Agent',
        phone: '+66 8-2345-6789',
        avatar: '👩‍💼'
    },
    {
        id: 3,
        name_th: 'ประเทพ สมคุณ',
        name_en: 'Prateep Somkhun',
        title_th: 'ผู้จัดการโครงการ',
        title_en: 'Project Manager',
        phone: '+66 8-3456-7890',
        avatar: '👨‍💼'
    },
    {
        id: 4,
        name_th: 'สินทร์ ยศพงศ์',
        name_en: 'Sinthip Yasophon',
        title_th: 'ที่ปรึกษาอสังหา',
        title_en: 'Real Estate Consultant',
        phone: '+66 8-4567-8901',
        avatar: '👨‍💼'
    }
];

// Smooth scroll animation
function smoothScroll(e) {
    if (e.target.tagName === 'A' && e.target.hash) {
        e.preventDefault();
        const target = document.querySelector(e.target.hash);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderListings('all');
    renderAgents();
    updateLanguage();
    addScrollAnimations();
    addParallaxEffect();
    setupCounterAnimation();
});

// Counter Animation for Stats
function setupCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const runCounter = (counter) => {
        const target = +counter.getAttribute('data-target') || parseInt(counter.textContent);
        const increment = target / speed;

        const updateCount = () => {
            const count = +counter.textContent;
            if (count < target) {
                counter.textContent = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : counter.textContent.includes('/') ? counter.textContent.slice(-7) : '');
            }
        };
        updateCount();
    };

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                runCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// Add Scroll Animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.listing-card, .agent-card, .service-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Parallax Effect on Hero
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });
}

// Toggle Language
function toggleLanguage() {
    currentLanguage = currentLanguage === 'th' ? 'en' : 'th';
    document.documentElement.lang = currentLanguage;
    updateLanguage();
    
    // Add smooth transition
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Update all text elements based on language
function updateLanguage() {
    const langBtn = document.getElementById('langBtn');
    langBtn.textContent = currentLanguage === 'th' ? 'EN' : 'TH';

    document.querySelectorAll('[data-th][data-en]').forEach(element => {
        const text = currentLanguage === 'th' ? element.getAttribute('data-th') : element.getAttribute('data-en');
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });

    const activeFilter = document.querySelector('.filter-btn.active');
    const filterType = activeFilter ? activeFilter.getAttribute('onclick').match(/'([^']+)'/)[1] : 'all';
    renderListings(filterType);
    renderAgents();
}

// Render Listings with Animation
function renderListings(filterType = 'all') {
    const listingsGrid = document.getElementById('listingsGrid');
    listingsGrid.innerHTML = '';

    const filteredListings = filterType === 'all' 
        ? listingsData 
        : listingsData.filter(listing => listing.type === filterType);

    filteredListings.forEach((listing, index) => {
        const title = currentLanguage === 'th' ? listing.title_th : listing.title_en;
        const typeLabel = currentLanguage === 'th' ? listing.type_th : listing.type_en;
        const agentName = currentLanguage === 'th' ? listing.agent_th : listing.agent_en;
        const bedBath = currentLanguage === 'th' ? `${listing.bedrooms} ห้องนอน / ${listing.bathrooms} ห้องน้ำ` : `${listing.bedrooms} Bed / ${listing.bathrooms} Bath`;
        const areaLabel = currentLanguage === 'th' ? `${listing.area} ตร.ม.` : `${listing.area} sqm`;

        const listingCard = document.createElement('div');
        listingCard.className = 'listing-card';
        listingCard.style.animationDelay = `${index * 0.1}s`;
        listingCard.innerHTML = `
            <div class="listing-image">${listing.type_label}</div>
            <div class="listing-content">
                <span class="listing-type">${typeLabel}</span>
                <div class="listing-price">฿${listing.price}</div>
                <h3 class="listing-title">${title}</h3>
                <div class="listing-details">
                    <span>🛏️ ${bedBath}</span>
                    <span>📐 ${areaLabel}</span>
                </div>
                <div class="listing-agent">👤 ${agentName}</div>
            </div>
        `;
        
        // Add hover effect
        listingCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        listingCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        listingsGrid.appendChild(listingCard);
    });
}

// Render Agents with Animation
function renderAgents() {
    const agentsGrid = document.getElementById('agentsGrid');
    agentsGrid.innerHTML = '';

    agentsData.forEach((agent, index) => {
        const name = currentLanguage === 'th' ? agent.name_th : agent.name_en;
        const title = currentLanguage === 'th' ? agent.title_th : agent.title_en;

        const agentCard = document.createElement('div');
        agentCard.className = 'agent-card';
        agentCard.style.animationDelay = `${index * 0.1}s`;
        agentCard.innerHTML = `
            <div class="agent-avatar">${agent.avatar}</div>
            <div class="agent-info">
                <h3 class="agent-name">${name}</h3>
                <p class="agent-title">${title}</p>
                <p class="agent-phone">📞 ${agent.phone}</p>
                <button class="agent-btn" onclick="contactAgent('${name}')">
                    ${currentLanguage === 'th' ? 'ติดต่อ' : 'Contact'}
                </button>
            </div>
        `;
        
        agentsGrid.appendChild(agentCard);
    });
}

// Filter Listings
function filterListings(type) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    renderListings(type);
}

// Contact Agent
function contactAgent(agentName) {
    const msg = currentLanguage === 'th' 
        ? `ติดต่อ ${agentName} สำเร็จ!` 
        : `Contacting ${agentName}!`;
    showNotification(msg, 'success');
}

// Handle Contact Form with Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                } else {
                    input.style.borderColor = '#e0e0e0';
                }
            });
            
            if (isValid) {
                const successMsg = currentLanguage === 'th' 
                    ? '✅ ส่งข้อความสำเร็จ! เราจะติดต่อคุณในเร็วๆ นี้' 
                    : '✅ Message sent successfully! We will contact you soon';
                showNotification(successMsg, 'success');
                this.reset();
            } else {
                const errorMsg = currentLanguage === 'th' 
                    ? '❌ กรุณากรอกข้อมูลให้ครบถ้วน' 
                    : '❌ Please fill in all fields';
                showNotification(errorMsg, 'error');
            }
        });
    }
});

// Search functionality with Live Results
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    }
});

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        showNotification(currentLanguage === 'th' ? 'กรุณากรอกคำค้นหา' : 'Please enter search term', 'warning');
        return;
    }
    
    const filtered = listingsData.filter(listing => {
        const title = currentLanguage === 'th' ? listing.title_th : listing.title_en;
        return title.toLowerCase().includes(searchTerm) || listing.type.toLowerCase().includes(searchTerm);
    });
    
    if (filtered.length > 0) {
        const msg = currentLanguage === 'th'
            ? `พบ ${filtered.length} รายการอสังหา`
            : `Found ${filtered.length} properties`;
        showNotification(msg, 'success');
        
        // Scroll to listings
        document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
    } else {
        showNotification(currentLanguage === 'th' ? 'ไม่พบรายการที่ค้นหา' : 'No properties found', 'warning');
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
            max-width: 90%;
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .agent-btn {
        margin-top: 1rem;
        padding: 0.7rem 1.5rem;
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s;
        box-shadow: 0 5px 15px rgba(30, 60, 114, 0.2);
    }
    
    .agent-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(30, 60, 114, 0.3);
        background: linear-gradient(135deg, #2a5298 0%, #3a6ba8 100%);
    }
    
    body {
        transition: opacity 0.3s ease;
    }
`;

document.head.appendChild(style);

// Smooth navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', smoothScroll);
});

// Cursor effect
document.addEventListener('mousemove', (e) => {
    const trail = document.querySelector('.mouse-trail');
    if (!trail) return;
    
    const x = e.clientX;
    const y = e.clientY;
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
});

// Load animations on scroll
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    
    // Add parallax to hero
    const hero = document.querySelector('.hero');
    if (hero && scrollPos < window.innerHeight) {
        hero.style.transform = `translateY(${scrollPos * 0.5}px)`;
    }
});

console.log('🎨 Real Estate Pro Website Loaded Successfully!');
console.log('💡 Interactive Features: Search, Filter, Language Toggle, Animations');
