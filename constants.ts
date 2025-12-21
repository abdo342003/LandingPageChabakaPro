import { Content, Language, AdminContent, CookieConsentContent } from './types';

export const CONTENT: Record<Language, Content> = {
  ar: {
    hero: {
      headline: "واي فاي وكاميرات خدامين بلا صداع الرأس",
      subheadline: "نخدمو القهاوي، المطاعم، وجميع المحلات التجارية",
      cta: "اتصل بنا الآن",
      detail: "خدمة بسيطة، دعم مستمر، رقم واحد للتواصل"
    },
    body: {
      description: "حنا كنتكلفو بتركيب وصيانة الويفي والكاميرات في محلك. بلا تعقيدات، وبلا مشاكل تقنية. باش تبقى مرتاح وتركز على تجارتك.",
      offer1: {
        name: "عرض راحة البال",
        price: "200 – 700 درهم / شهر",
        features: [
          "مراقبة الواي فاي",
          "فحص الكاميرات",
          "تدخل سريع عند المشكل",
          "رقم واحد للدعم"
        ],
        button: "اتصل بنا"
      },
      offer2: {
        name: "عرض التركيب فقط",
        price: "دفع مرة واحدة",
        features: [
          "تركيب الواي فاي",
          "تركيب الكاميرات",
          "شرح بسيط للاستعمال"
        ],
        button: "طلب العرض"
      },
      offer3: {
        name: "عرض الحماية الرقمية الشاملة",
        price: "800 – 1200 درهم / مرة واحدة",
        badge: "🛡️ حماية شاملة",
        features: [
          "فحص شامل للحاسوب والهاتف لاكتشاف الفيروسات",
          "تحليل الملفات والتطبيقات المشبوهة",
          "إزالة الفيروسات وتنظيف عميق للنظام",
          "إعداد جدار ناري ومضاد فيروسات",
          "تقرير مفصل عن حالة أجهزتك"
        ],
        button: "احمِ أجهزتك الآن"
      },
      offer4: {
        name: "تحسين سرعة الواي فاي وتوسيع التغطية",
        price: "حسب المساحة",
        badge: "📡 إشارة قوية",
        features: [
          "تشخيص نقاط ضعف الإشارة",
          "تركيب Repeaters عالية الجودة",
          "تغطية كاملة للمنزل أو المحل",
          "إنترنت قوي ومستقر في كل الزوايا",
          "مناسب للمنازل، المقاهي والمكاتب"
        ],
        button: "وداعًا لضعف الإشارة"
      }
    },
    stats: {
      title: "أرقامنا تتكلم",
      items: [
        { value: "500+", label: "محل تم تركيبه" },
        { value: "98%", label: "نسبة رضا العملاء" },
        { value: "24/7", label: "دعم متواصل" },
        { value: "5+", label: "سنوات خبرة" }
      ]
    },
    testimonials: {
      title: "ماذا يقول عملاؤنا",
      items: [
        {
          name: "أحمد بنعلي",
          business: "مقهى الأندلس",
          text: "خدمة ممتازة! ركبولي الواي فاي والكاميرات في يوم واحد. الدعم سريع ومحترف.",
          rating: 5
        },
        {
          name: "فاطمة الزهراء",
          business: "مطعم الطاجين",
          text: "من أحسن القرارات لي خذيت. مكنبقاش نتقلق على المشاكل التقنية.",
          rating: 5
        },
        {
          name: "يوسف الإدريسي",
          business: "سوبرماركت النجاح",
          text: "الكاميرات واضحة والواي فاي قوي. وملي كاين مشكل كيجيو بزربة.",
          rating: 5
        }
      ]
    },
    contact: {
      title: "اتصل بنا",
      subtitle: "اترك معلوماتك وسنتواصل معك في أقرب وقت",
      namePlaceholder: "الاسم الكامل",
      phonePlaceholder: "رقم الهاتف",
      businessPlaceholder: "اسم المحل / النشاط",
      messagePlaceholder: "رسالتك (اختياري)",
      submitButton: "إرسال الطلب",
      successMessage: "تم إرسال طلبك بنجاح! سنتواصل معك قريباً."
    },
    footer: {
      trustMessage: "حلول بسيطة للمحلات التجارية",
      contactText: "تواصل معنا عبر الواتساب",
      locations: "نخدم في جميع أنحاء المدينة",
      badges: ["تقني معتمد", "خدمة مضمونة", "خبرة طويلة"]
    }
  },
  fr: {
    hero: {
      headline: "Wi-Fi et Caméras fonctionnels, sans maux de tête",
      subheadline: "Pour cafés, restaurants et tous commerces locaux",
      cta: "Appelez-nous maintenant",
      detail: "Service simple, support continu, un seul numéro"
    },
    body: {
      description: "Nous installons et maintenons votre Wi-Fi et vos caméras simplement. Sans complications techniques. Restez tranquille et concentrez-vous sur votre commerce.",
      offer1: {
        name: "Offre Tranquillité",
        price: "200 – 700 DH / mois",
        features: [
          "Surveillance du Wi-Fi",
          "Vérification des caméras",
          "Intervention rapide en cas de panne",
          "Un seul numéro de support"
        ],
        button: "Contactez-nous"
      },
      offer2: {
        name: "Installation Unique",
        price: "Paiement unique",
        features: [
          "Installation du Wi-Fi",
          "Installation des caméras",
          "Explication simple de l'utilisation"
        ],
        button: "Demander un devis"
      },
      offer3: {
        name: "Protection Numérique Complète",
        price: "800 – 1200 DH / une fois",
        badge: "🛡️ Protection Totale",
        features: [
          "Analyse complète PC et téléphone contre les virus",
          "Analyse des fichiers et applications suspectes",
          "Suppression des virus et nettoyage profond",
          "Configuration pare-feu et antivirus",
          "Rapport détaillé sur l'état de vos appareils"
        ],
        button: "Protégez vos appareils"
      },
      offer4: {
        name: "Amélioration Wi-Fi & Extension",
        price: "Selon la surface",
        badge: "📡 Signal Fort",
        features: [
          "Diagnostic des zones de faible signal",
          "Installation de Repeaters haute qualité",
          "Couverture complète maison ou commerce",
          "Internet stable dans tous les coins",
          "Idéal pour maisons, cafés et bureaux"
        ],
        button: "Adieu signal faible"
      }
    },
    stats: {
      title: "Nos chiffres parlent",
      items: [
        { value: "500+", label: "Commerces équipés" },
        { value: "98%", label: "Satisfaction client" },
        { value: "24/7", label: "Support continu" },
        { value: "5+", label: "Années d'expérience" }
      ]
    },
    testimonials: {
      title: "Ce que disent nos clients",
      items: [
        {
          name: "Ahmed Benali",
          business: "Café Al Andalous",
          text: "Service excellent ! Installation Wi-Fi et caméras en une journée. Support rapide et professionnel.",
          rating: 5
        },
        {
          name: "Fatima Zahra",
          business: "Restaurant Le Tajine",
          text: "Une des meilleures décisions. Plus de soucis techniques à gérer.",
          rating: 5
        },
        {
          name: "Youssef Idrissi",
          business: "Supermarché Najah",
          text: "Caméras claires et Wi-Fi puissant. Intervention rapide en cas de problème.",
          rating: 5
        }
      ]
    },
    contact: {
      title: "Contactez-nous",
      subtitle: "Laissez vos coordonnées et nous vous recontacterons rapidement",
      namePlaceholder: "Nom complet",
      phonePlaceholder: "Numéro de téléphone",
      businessPlaceholder: "Nom du commerce",
      messagePlaceholder: "Votre message (optionnel)",
      submitButton: "Envoyer la demande",
      successMessage: "Demande envoyée avec succès ! Nous vous contacterons bientôt."
    },
    footer: {
      trustMessage: "Solutions simples pour commerces locaux",
      contactText: "Contactez-nous sur WhatsApp",
      locations: "Disponible dans toute la ville",
      badges: ["Technicien Certifié", "Service Garanti", "Expérience Confirmée"]
    }
  }
};

export const ADMIN_CONTENT: Record<Language, AdminContent> = {
  ar: {
    title: "لوحة التحكم - إدارة الطلبات",
    totalSubmissions: "إجمالي الطلبات",
    newSubmissions: "طلبات جديدة",
    contactedSubmissions: "تم التواصل",
    completedSubmissions: "مكتملة",
    tableHeaders: {
      name: "الاسم",
      phone: "الهاتف",
      business: "المحل",
      message: "الرسالة",
      date: "التاريخ",
      status: "الحالة",
      actions: "الإجراءات"
    },
    statusLabels: {
      new: "جديد",
      contacted: "تم التواصل",
      completed: "مكتمل"
    },
    noData: "لا توجد طلبات حتى الآن",
    exportButton: "تصدير البيانات",
    deleteButton: "حذف",
    closeButton: "إغلاق",
    analyticsTitle: "إحصائيات الزوار",
    deviceStats: "الأجهزة",
    browserStats: "المتصفحات",
    viewDetails: "عرض التفاصيل"
  },
  fr: {
    title: "Tableau de bord - Gestion des demandes",
    totalSubmissions: "Total des demandes",
    newSubmissions: "Nouvelles demandes",
    contactedSubmissions: "Contactés",
    completedSubmissions: "Terminés",
    tableHeaders: {
      name: "Nom",
      phone: "Téléphone",
      business: "Commerce",
      message: "Message",
      date: "Date",
      status: "Statut",
      actions: "Actions"
    },
    statusLabels: {
      new: "Nouveau",
      contacted: "Contacté",
      completed: "Terminé"
    },
    noData: "Aucune demande pour le moment",
    exportButton: "Exporter les données",
    deleteButton: "Supprimer",
    closeButton: "Fermer",
    analyticsTitle: "Statistiques des visiteurs",
    deviceStats: "Appareils",
    browserStats: "Navigateurs",
    viewDetails: "Voir les détails"
  }
};

export const COOKIE_CONSENT_CONTENT: Record<Language, CookieConsentContent> = {
  ar: {
    message: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك. بالنقر على \"قبول\"، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
    acceptButton: "قبول",
    declineButton: "رفض",
    learnMore: "معرفة المزيد"
  },
  fr: {
    message: "Nous utilisons des cookies pour améliorer votre expérience. En cliquant sur \"Accepter\", vous consentez à notre utilisation des cookies.",
    acceptButton: "Accepter",
    declineButton: "Refuser",
    learnMore: "En savoir plus"
  }
};