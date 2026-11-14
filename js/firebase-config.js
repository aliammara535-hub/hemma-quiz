/**
 * همة حتى القمة - Hemma Hatta AlQimma
 * ملف إعدادات Firebase Realtime Database
 */

const defaultFirebaseConfig = {
  apiKey: "AIzaSyDKDC82WUs9BIiwmt6KQkfCH1Wsva4XWSQ",
  authDomain: "hemma-quiz.firebaseapp.com",
  databaseURL: "https://hemma-quiz-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hemma-quiz",
  storageBucket: "hemma-quiz.firebasestorage.app",
  messagingSenderId: "670168517930",
  appId: "1:670168517930:web:62c3128b5b2ef4a98b2253",
  measurementId: "G-9N7QD56XTW"
};

let activeFirebaseConfig = defaultFirebaseConfig;
try {
  const saved = localStorage.getItem('HEMMA_FIREBASE_CONFIG');
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed && parsed.apiKey && parsed.apiKey !== "YOUR_API_KEY") {
      activeFirebaseConfig = parsed;
    }
  }
} catch (e) {
  console.warn('تعذر قراءة إعدادات Firebase من التخزين المحلي:', e);
}

/**
 * فحص ما إذا كان المستخدم قد قام بوضع مفاتيحه الحقيقية
 * @returns {boolean}
 */
function isFirebaseConfigured() {
  return activeFirebaseConfig.apiKey !== "YOUR_API_KEY" &&
         activeFirebaseConfig.databaseURL !== "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com" &&
         Boolean(activeFirebaseConfig.apiKey && activeFirebaseConfig.databaseURL);
}

/**
 * حفظ إعدادات مخصصة وتحديث التخزين المحلي
 * @param {Object} newConfig كائن الإعدادات الجديد
 */
function saveCustomFirebaseConfig(newConfig) {
  if (!newConfig || !newConfig.apiKey || !newConfig.databaseURL) {
    throw new Error('بيانات التكوين غير مكتملة، يجب توفر apiKey و databaseURL على الأقل.');
  }
  localStorage.setItem('HEMMA_FIREBASE_CONFIG', JSON.stringify(newConfig));
  activeFirebaseConfig = newConfig;
  return true;
}

/**
 * استعادة الإعدادات الافتراضية
 */
function resetFirebaseConfig() {
  localStorage.removeItem('HEMMA_FIREBASE_CONFIG');
  activeFirebaseConfig = defaultFirebaseConfig;
}

// تصدير الإعدادات للبيئة العامة للمتصفح
window.firebaseConfig = activeFirebaseConfig;
window.defaultFirebaseConfig = defaultFirebaseConfig;
window.isFirebaseConfigured = isFirebaseConfigured;
window.saveCustomFirebaseConfig = saveCustomFirebaseConfig;
window.resetFirebaseConfig = resetFirebaseConfig;
