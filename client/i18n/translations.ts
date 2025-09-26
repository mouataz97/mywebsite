export type Locale = {
  code: string;
  name: string;
  dir: 'ltr' | 'rtl';
  flag: string;
};

export const locales: Locale[] = [
  { code: 'en', name: 'English', dir: 'ltr', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', dir: 'ltr', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', dir: 'rtl', flag: '🇲🇦' },
];

export const defaultLocale = 'en';

export const translations = {
  en: {
    contact: {
      title: 'Get in Touch',
      subtitle: 'Have a project in mind or want to discuss potential opportunities?',
      name: 'Full Name',
      namePlaceholder: 'What should we call you?',
      email: 'Email Address',
      emailPlaceholder: 'Where can we reach you? (e.g., name@example.com)',
      company: 'Your Organization',
      companyPlaceholder: 'The awesome company you work with',
      service: 'How can we assist you today?',
      emailUs: 'Drop Us a Line',
      callUs: 'Let\'s Talk',
      visitUs: 'Our Door is Open',
      message: 'Your Message',
      messagePlaceholder: 'We\'re all ears! Share your thoughts, questions, or project details with us...',
      send: 'Send Message',
      sending: 'Sending...',
      newMessage: 'New message from website',
      successMessage: 'Thank you for your message! We will get back to you soon.',
      submitError: 'Failed to send message. Please try again later.',
      callUsCopy: 'Available Monday to Friday from 9am to 6pm',
      direct: 'Direct Contact',
      directCopy: 'Prefer to reach out directly?',
      locations: 'Our Locations',
      locationsCopy: 'We work with clients worldwide. Our main offices are located in Morocco.',
    },
    opt: {
      web: 'Web Development',
      mobile: 'Mobile Development',
      brand: 'Branding & Design',
      opt: 'Business Optimization',
      mkt: 'Marketing & Growth',
      other: 'Other',
    },
  },
  fr: {
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Vous avez un projet en tête ou souhaitez discuter de potentiels partenariats ?',
      name: 'Nom complet',
      namePlaceholder: 'Comment devrions-nous vous appeler ?',
      email: 'Adresse email',
      emailPlaceholder: 'Où pouvons-nous vous joindre ? (ex: nom@exemple.com)',
      company: 'Votre Organisation',
      companyPlaceholder: 'L\'entreprise formidable avec laquelle vous travaillez',
      service: 'Comment pouvons-nous vous aider aujourd\'hui ?',
      emailUs: 'Écrivez-nous',
      callUs: 'Appelez-nous',
      visitUs: 'Venez nous voir',
      message: 'Votre message',
      messagePlaceholder: 'Nous sommes tout ouïe ! Partagez-nous vos idées, questions ou détails du projet...',
      send: 'Envoyer le message',
      sending: 'Envoi en cours...',
      newMessage: 'Nouveau message depuis le site web',
      successMessage: 'Merci pour votre message ! Nous vous recontacterons bientôt.',
      submitError: 'Échec de l\'envoi du message. Veuillez réessayer plus tard.',
      callUsCopy: 'Disponible du lundi au vendredi de 9h à 18h',
      direct: 'Contact direct',
      directCopy: 'Vous préférez nous contacter directement ?',
      locations: 'Nos bureaux',
      locationsCopy: 'Nous travaillons avec des clients du monde entier. Nos principaux bureaux sont situés au Maroc.',
    },
    opt: {
      web: 'Développement Web',
      mobile: 'Développement Mobile',
      brand: 'Identité de Marque & Design',
      opt: 'Optimisation d\'Entreprise',
      mkt: 'Marketing & Croissance',
      other: 'Autre',
    },
  },
  ar: {
    contact: {
      title: 'اتصل بنا',
      subtitle: 'هل لديك مشروع في ذهنك أو ترغب في مناقشة الفرص المحتملة؟',
      name: 'الاسم الكامل',
      namePlaceholder: 'كيف نناديك؟',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'أين يمكننا التواصل معك؟ (مثال: name@example.com)',
      company: 'مؤسستك',
      companyPlaceholder: 'الشركة الرائعة التي تعمل معها',
      service: 'كيف يمكننا مساعدتك اليوم؟',
      emailUs: 'راسلنا',
      callUs: 'اتصل بنا',
      visitUs: 'زورونا',
      message: 'رسالتك',
      messagePlaceholder: 'نحن نستمع إليك! شاركنا أفكارك، أسئلتك، أو تفاصيل مشروعك...',
      send: 'إرسال الرسالة',
      sending: 'جاري الإرسال...',
      newMessage: 'رسالة جديدة من الموقع',
      successMessage: 'شكراً لرسالتك! سنتواصل معك قريباً.',
      submitError: 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقاً.',
      callUsCopy: 'متوفر من الاثنين إلى الجمعة من الساعة 9 صباحاً حتى 6 مساءً',
      direct: 'اتصال مباشر',
      directCopy: 'هل تفضل التواصل معنا مباشرة؟',
      locations: 'مواقعنا',
      locationsCopy: 'نعمل مع عملاء من جميع أنحاء العالم. مكاتبنا الرئيسية تقع في المغرب.',
    },
    opt: {
      web: 'تطوير الويب',
      mobile: 'تطبيقات الجوال',
      brand: 'الهوية البصرية والتصميم',
      opt: 'تحسين الأعمال',
      mkt: 'التسويق والنمو',
      other: 'أخرى',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations[typeof defaultLocale];
