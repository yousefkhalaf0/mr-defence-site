const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // مسار ملف الـ JSON

// تهيئة Firebase باستخدام المفتاح
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// الوصول لقاعدة البيانات
const db = admin.firestore();

// الداتا اللي هتترفع
const data = require('./src/components/Tutorials/data.json'); // استيراد الداتا من ملف JSON

// رفع البيانات إلى Firestore
async function uploadData() {
  const batch = db.batch(); // عملية رفع جماعي

  // المرور على كل category
  data.categories.forEach(category => {
    const categoryRef = db.collection('tutorials').doc(`category_${category.id}`);
    
    // إضافة البيانات الخاصة بكل category
    batch.set(categoryRef, {
      title: category.title,
      description: category.description,
      icon: category.icon
    });

    // المرور على كل tutorial داخل الـ category
    category.tutorials.forEach(tutorial => {
      const tutorialRef = categoryRef.collection('tutorials').doc(`tutorial_${tutorial.id}`);
      batch.set(tutorialRef, {
        title: tutorial.title,
        type: tutorial.type,
        source: tutorial.source,
        url: tutorial.url,
        thumbnail: tutorial.thumbnail,
        description: tutorial.description
      });
    });
  });

  // تنفيذ عملية الرفع الجماعي
  await batch.commit();
  console.log('Data uploaded successfully!');
}

// تنفيذ الكود
uploadData();
