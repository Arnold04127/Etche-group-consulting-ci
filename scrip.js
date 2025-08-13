// Slider functionality
function initSlider() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!slider || slides.length === 0) return;

    let currentSlide = 0;
    const slideCount = slides.length;
    let slideInterval;

    function goToSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
        currentSlide = index;
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(currentSlide);
    }
    
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Event listeners
    nextBtn?.addEventListener('click', nextSlide);
    prevBtn?.addEventListener('click', prevSlide);
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // Initialize
    startAutoSlide();
}

// Form functionality
function initForm() {
    const nbEnfantsSelect = document.getElementById('nb-enfants');
    const enfantsContainer = document.getElementById('enfants-container');
    const inscriptionForm = document.getElementById('inscriptionForm');
    
    if (!nbEnfantsSelect || !enfantsContainer || !inscriptionForm) return;

    function createEnfantFields(index) {
        return `
        <div class="enfant-info">
            <h4 class="enfant-title">Enfant ${index + 1}</h4>
            <div class="form-group">
                <label for="enfant-nom-${index}">Nom*</label>
                <input type="text" id="enfant-nom-${index}" name="enfant-nom-${index}" required>
            </div>
            <div class="form-group">
                <label for="enfant-prenom-${index}">Prénom*</label>
                <input type="text" id="enfant-prenom-${index}" name="enfant-prenom-${index}" required>
            </div>
            <div class="form-group">
                <label for="enfant-classe-${index}">Classe/Niveau*</label>
                <select id="enfant-classe-${index}" name="enfant-classe-${index}" required>
                    <option value="">Sélectionnez...</option>
                    <option value="CE2">CE2</option>
                    <option value="CM1">CM1</option>
                    <option value="CM2">CM2</option>
                    <option value="6eme">6ème</option>
                    <option value="5eme">5ème</option>
                    <option value="4eme">4ème</option>
                    <option value="3eme">3ème</option>
                    <option value="2nde">Seconde</option>
                    <option value="1ere">Première</option>
                    <option value="terminale">Terminale</option>
                </select>
            </div>
            <div class="form-group">
                <label for="enfant-ecole-${index}">École/Établissement actuel</label>
                <input type="text" id="enfant-ecole-${index}" name="enfant-ecole-${index}">
            </div>
            <div class="form-group">
                <label for="enfant-besoins-${index}">Besoins particuliers</label>
                <textarea id="enfant-besoins-${index}" name="enfant-besoins-${index}" rows="2"></textarea>
            </div>
        </div>
        `;
    }
    
    function updateEnfantFields() {
        const nbEnfants = parseInt(this.value === "4+" ? 4 : this.value);
        enfantsContainer.innerHTML = '';
        
        for (let i = 0; i < nbEnfants; i++) {
            enfantsContainer.innerHTML += createEnfantFields(i);
        }
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        alert('Formulaire soumis avec succès! Vous allez être redirigé vers la page de paiement.');
        window.location.href = 'paiement.html';
    }
    
    // Event listeners
    nbEnfantsSelect.addEventListener('change', updateEnfantFields);
    inscriptionForm.addEventListener('submit', handleSubmit);
    
    // Initialize with 1 child
    enfantsContainer.innerHTML = createEnfantFields(0);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '1';
    initSlider();
    initForm();
});