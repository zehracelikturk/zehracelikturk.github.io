// Bu dosya, uygulamanın JavaScript mantığını içerir.

// Gerekli tüm DOM elementlerine referanslar
const budgetSelect = document.getElementById('budget');
const needSelect = document.getElementById('need');
const getRecommendationBtn = document.getElementById('getRecommendationBtn');
const messageBox = document.getElementById('messageBox');
const messageText = document.getElementById('messageText');
const closeMessageBtn = document.getElementById('closeMessageBtn');
const inputSection = document.getElementById('inputSection');
const phoneRecommendationSection = document.getElementById('phoneRecommendationSection');
const phoneRecommendationText = document.getElementById('phoneRecommendationText');
const resetButton = document.getElementById('resetButton');

/**
 * Mesaj kutusunda bir mesaj görüntüler.
 * @param {string} message - Görüntülenecek metin mesajı.
 * @param {string} type - Stili değiştirmek için 'warning', 'success' veya 'info' (isteğe bağlı).
 */
function showMessage(message, type = 'warning') {
    messageText.textContent = message;
    // Tüm olası renk sınıflarını kaldır
    messageBox.classList.remove('hidden', 'bg-yellow-100', 'border-yellow-400', 'text-yellow-700', 'bg-green-100', 'border-green-400', 'text-green-700', 'bg-blue-100', 'border-blue-400', 'text-blue-700');
    // Flexbox olarak görüntüle
    messageBox.classList.add('flex');

    // Mesaj türüne göre stil uygula
    if (type === 'success') {
        messageBox.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
    } else if (type === 'info') {
        messageBox.classList.add('bg-blue-100', 'border-blue-400', 'text-blue-700');
    } else { // Varsayılan olarak uyarı
        messageBox.classList.add('bg-yellow-100', 'border-yellow-400', 'text-yellow-700');
    }

    messageBox.style.display = 'flex'; // Görünür olduğundan emin ol
}

/**
 * Mesaj kutusunu gizler.
 */
function hideMessageBox() {
    messageBox.style.display = 'none';
    messageBox.classList.add('hidden'); // Gizli yardımcı sınıfı tekrar ekle
}

/**
 * Seçilen bütçe ve ihtiyaca göre telefon tavsiyesini belirler.
 * Bu, orijinal atamadaki mantıksal ifadeleri uygular.
 * @param {string} budget - Seçilen bütçe ('low', 'medium', 'high').
 * @param {string} need - Seçilen temel ihtiyaç ('camera', 'battery', 'processor').
 * @returns {string} Tavsiye edilen akıllı telefon adı.
 */
function getRecommendation(budget, need) {
    // Atamadan gelen mantıksal ifadeler
    if (budget === 'low' && need === 'camera') {
        return "Xiaomi Redmi 12";
    } else if (budget === 'low' && need === 'battery') {
        return "Samsung M13";
    } else if (budget === 'low' && need === 'processor') {
        return "Infinix Zero 5G";
    } else if (budget === 'medium' && need === 'camera') {
        return "Samsung Galaxy A54";
    } else if (budget === 'medium' && need === 'battery') {
        return "Redmi Note 13";
    } else if (budget === 'medium' && need === 'processor') {
        return "Realme Narzo 60 Pro";
    } else if (budget === 'high' && need === 'camera') {
        return "iPhone 15 Pro";
    } else if (budget === 'high' && need === 'battery') {
        return "Samsung S24 Ultra";
    } else if (budget === 'high' && need === 'processor') {
        return "Asus ROG Phone 8";
    }
    return "Belirtilen kriterlere uygun telefon bulunamadı."; // Geri dönüş, mantık tüm durumları kapsamalıdır
}

/**
 * "Telefon Tavsiyesi Al" düğmesi tıklamasını yönetir.
 * Girişleri doğrular ve tavsiyeyi veya bir uyarıyı görüntüler.
 */
function handleGetRecommendation() {
    const budget = budgetSelect.value;
    const need = needSelect.value;

    hideMessageBox(); // Önceki mesajları gizle

    // Tüm girişlerin seçili olduğunu doğrula
    if (!budget || !need) {
        showMessage("Lütfen hem bütçenizi hem de temel ihtiyacınızı seçin.", 'warning');
        return; // Girişler eksikse yürütmeyi durdur
    }

    // Telefon tavsiyesini al
    const recommendation = getRecommendation(budget, need);

    // Tavsiye ile UI'yı güncelle
    phoneRecommendationText.textContent = recommendation;

    // Giriş bölümünü gizle ve telefon tavsiyesi bölümünü göster
    inputSection.style.display = 'none';
    phoneRecommendationSection.style.display = 'block';
}

/**
 * Uygulamayı başlangıç durumuna sıfırlar.
 */
function resetApp() {
    // Select elementlerini varsayılan 'Seçin...' seçeneğine sıfırla
    budgetSelect.value = "";
    needSelect.value = "";

    hideMessageBox(); // Tüm mesajları gizle
    phoneRecommendationSection.style.display = 'none'; // Tavsiye bölümünü gizle
    inputSection.style.display = 'block'; // Giriş bölümünü göster

    phoneRecommendationText.textContent = ""; // Önceki tavsiye metnini temizle
}

// Olay dinleyicilerini ekle
getRecommendationBtn.addEventListener('click', handleGetRecommendation);
closeMessageBtn.addEventListener('click', hideMessageBox);
resetButton.addEventListener('click', resetApp);

// Sayfa yüklendiğinde uygulama durumunu başlat
document.addEventListener('DOMContentLoaded', resetApp);
