
import React from 'react';
import { DesignStyle, BudgetLevel, RoomType, Language, LightingMood } from './types';

export const UI_TRANSLATIONS: Record<Language, any> = {
  [Language.EN]: {
    studio: 'Design Studio',
    archive: 'Design Archive',
    startCuration: 'Create New',
    engine: 'Archify AI Engine v6.0 • Advanced Spatial Intelligence',
    originalSpace: 'Original Space',
    aiRedesign: 'AI Redesign',
    autoScan: 'Auto-Scan Space',
    pauseScan: 'Pause Animation',
    designDirectives: 'DESIGN DIRECTIVES',
    roomPurpose: 'Space Area',
    aestheticStyle: 'Aesthetic Style',
    preferredTexture: 'Preferred Texture',
    accentColor: 'Surface Color',
    applyDecor: 'Apply AI Decor',
    synthesizing: 'Synthesizing...',
    concept: 'CONCEPT',
    visualizationLog: 'Visualization Log ID',
    editConcept: 'Manual Edit',
    archiveDesign: 'Archive Design',
    curatedPalette: 'Curated Palette',
    wallTreatment: 'Surface Treatment',
    lightingStrategy: 'Lighting Strategy',
    shareConcept: 'Share Concept',
    detected: 'Detected',
    expertAdvice: 'Expert Advisor',
    proTips: 'Pro Implementation Tips',
    lightingMood: 'Lighting Mood',
    styleTransfer: 'Style Reference',
    aiCleanup: 'AI Room Cleanup',
    cleanupDesc: 'Remove clutter before redesigning',
    refinementChat: 'Aesthetic Sync Chat',
    chatPlaceholder: 'e.g. "Change walls to blue" or "Add floor lamp"',
    layoutPlanner: 'Intelligent Layout Planner',
    materialPalette: 'Material & Texture Control',
    customSurface: 'Custom Surface Visualizer',
    premiumExport: 'Premium Export & Upscaling',
    upscaleTo4K: 'Upscale to 4K Ultra-HD',
    downloadImage: 'Download Image',
    exportPDF: 'Export Design PDF',
    historyTitle: 'Project History',
    noHistory: 'No archived designs yet.',
    undo: 'Undo',
    redo: 'Redo',
    uploader: {
      import: 'Import Media',
      capture: 'Photo Capture',
      importSub: 'Local Storage',
      captureSub: 'Live Lens',
      analyzing: 'Architectural Analysis',
      processing: 'Synthesizing Your Space',
      sculpting: 'Sculpting Your Vision',
      calibrating: 'Calibrating Spatial Depth',
      rendering: 'Finalizing Aesthetic Details',
      cancel: 'Abort Process'
    },
    editor: {
      title: 'Archify AI Studio',
      subtitle: 'Editor',
      promptLabel: 'AI Prompt Directive',
      placeholder: 'e.g. "Add a fountain", "Change walls to dark green"',
      apply: 'Apply Evolution',
      instruction: 'Annotate image + text labels for highest accuracy.',
      mode: 'Interactive Mode'
    },
    welcome: {
      calibrating: 'Calibrating Vision',
      scanning: 'Scanning Logic',
      syncing: 'Syncing Layers',
      applying: 'Applying Intelligence',
      curating: 'Curating Excellence'
    },
    workspaces: {
      reimagine: {
        title: 'Reimagine Spaces',
        subtitle: 'Upload and intelligently redesign existing interiors, exteriors, and environments.',
        caps: ['AI Interior Redesign', 'AI Exterior Transformation', 'Smart Object Editing']
      },
      create: {
        title: 'Create with AI',
        subtitle: 'Generate intelligent homes from plans, layouts, or custom requirements.',
        caps: ['2D Plan to 3D', 'AI Layout Planning', 'Intelligent Space Generation']
      },
      tabs: {
        uploadPlan: 'Upload 2D Plan',
        buildScratch: 'Build From Scratch'
      },
      planning: {
        totalArea: 'Total Area (Sq Ft)',
        houseType: 'House Type',
        selectRooms: 'Select Configurable Rooms',
        analyzing: 'Analyzing architectural structure...',
        detectingWalls: 'Detecting walls',
        detectingBoundaries: 'Detecting room boundaries',
        understandingFlow: 'Understanding layout flow',
        preparing3D: 'Preparing intelligent 3D visualization'
      }
    }
  },
  [Language.UR]: {
    studio: 'ڈیزائن اسٹوڈیو',
    archive: 'ڈیزائن آرکائیو',
    startCuration: 'نیا بنائیں',
    engine: 'آرکیفائی اے آئی انجن v6.0 • فضائی فضیلت',
    originalSpace: 'اصل جگہ',
    aiRedesign: 'اے آئی ڈیزائن',
    autoScan: 'خودکار اسکین',
    pauseScan: 'روک دیں',
    designDirectives: 'ڈیزائن کی ہدایات',
    roomPurpose: 'جگہ کی قسم',
    aestheticStyle: 'خوبصورتی کا انداز',
    preferredTexture: 'پسندیدہ بناوٹ',
    accentColor: 'دیوار کا رنگ',
    applyDecor: 'ڈیزائن لاگو کریں',
    synthesizing: 'تیار ہو رہا ہے...',
    concept: 'تصور',
    visualizationLog: 'تصویر لاگ آئی ڈی',
    editConcept: 'دستی ترمیم',
    archiveDesign: 'محفوظ کریں',
    curatedPalette: 'رنگوں کی ترتیب',
    wallTreatment: 'سطحی کام',
    lightingStrategy: 'روشنی کی حکمت عملی',
    shareConcept: 'شیئر کریں',
    detected: 'پہچان لیا گیا',
    expertAdvice: 'ماہر کی رائے',
    proTips: 'پیشہ ورانہ تجاویز',
    lightingMood: 'روشنی کا انداز',
    styleTransfer: 'اسٹائل ریفرنس',
    aiCleanup: 'کمرے کی صفائی',
    cleanupDesc: 'ڈیزائن سے پہلے سامان ہٹائیں',
    refinementChat: 'جمالیاتی مطابقت چیٹ',
    chatPlaceholder: 'مثلا "دیواروں کو نیلا کر دیں"',
    layoutPlanner: 'ذہین ترتیب ساز',
    materialPalette: 'میٹریل کنٹرول',
    customSurface: 'کسٹم سرفیس ویژولائزر',
    premiumExport: 'پریمیم ایکسپورٹ اور اپ اسکیلنگ',
    upscaleTo4K: '4K الٹرا ایچ ڈی میں اپ اسکیل کریں',
    downloadImage: 'تصویر ڈاؤن لوڈ کریں',
    exportPDF: 'پی ڈی ایف ایکسپورٹ کریں',
    historyTitle: 'پروجیکٹ کی تاریخ',
    noHistory: 'ابھی تک کوئی ڈیزائن محفوظ نہیں کیا گیا۔',
    undo: 'واپس کریں',
    redo: 'دوبارہ کریں',
    uploader: {
      import: 'میڈیا درآمد کریں',
      capture: 'فوٹو کیپچر',
      importSub: 'اسٹوریج',
      captureSub: 'براہ راست لینس',
      analyzing: 'تعمیراتی تجزیہ',
      processing: 'آپ کی جگہ کو ترتیب دیا جا رہا ہے',
      sculpting: 'آپ کے وژن کو تراشا جا رہا ہے',
      calibrating: 'جگہ کی گہرائی کی جانچ',
      rendering: 'خوبصورتی کی حتمی تفصیلات',
      cancel: 'کینسل کریں'
    },
    editor: {
      title: 'آرکیفائی اے آئی اسٹوڈیو',
      subtitle: 'ایڈیٹر',
      promptLabel: 'اے آئی ڈائریکٹو',
      placeholder: 'مثلا "فوارہ شامل کریں"',
      apply: 'تبدیلی لاگو کریں',
      instruction: 'بہترین نتائج کے لیے تصویر پر نشان لگائیں۔',
      mode: 'انٹرایکٹو موڈ'
    },
    welcome: {
      calibrating: 'معائنہ',
      scanning: 'اسکیننگ',
      syncing: 'مطابقت',
      applying: 'اطلاق',
      curating: 'اصلاح'
    },
    workspaces: {
      reimagine: {
        title: 'اصلی جگہیں تبدیل کریں',
        subtitle: 'موجودہ کمروں اور عمارتوں کو اپلوڈ کریں اور انہیں اے آئی کے ذریعے دوبارہ ڈیزائن کریں۔',
        caps: ['داخلہ ڈیزائن', 'بیرونی ڈیزائن', 'سمارٹ ترمیم']
      },
      create: {
        title: 'اے آئی کے ساتھ بنائیں',
        subtitle: 'نقشوں یا اپنی مرضی کے مطابق ذہین گھر تیار کریں۔',
        caps: ['2D نقشے سے 3D', 'ترتیب کی منصوبہ بندی', 'ذہین جگہ کی تخلیق']
      },
      tabs: {
        uploadPlan: 'نقشہ اپلوڈ کریں',
        buildScratch: 'شروع سے بنائیں',
      },
      planning: {
        totalArea: 'کل رقبہ (مربع فٹ)',
        houseType: 'گھر کی قسم',
        selectRooms: 'کمروں کا انتخاب کریں',
        analyzing: 'تعمیراتی ڈھانچے کا تجزیہ جاری ہے...',
        detectingWalls: 'دیواروں کی پہچان',
        detectingBoundaries: 'حدود کا تعین',
        understandingFlow: 'ترتیب کی سمجھ',
        preparing3D: 'ذہین 3D تصور کی تیاری'
      }
    }
  },
  [Language.SD]: {
    studio: 'ڊزائين اسٽوڊيو',
    archive: 'ڊزائين آرڪائيو',
    startCuration: 'نئون ٺاهيو',
    engine: 'آرڪيفائي اي آئي انجڻ v6.0 • فضائي عمدگي',
    originalSpace: 'اصل جاءِ',
    aiRedesign: 'اي آئي ڊزائين',
    autoScan: 'خودڪار اسڪين',
    pauseScan: 'روڪيو',
    designDirectives: 'ڊزائين جون هدايتون',
    roomPurpose: 'جاءِ جي قسم',
    aestheticStyle: 'خوبصورتي جو انداز',
    preferredTexture: 'پسنديده بناوٽ',
    accentColor: 'ڀت جو رنگ',
    applyDecor: 'ڊزائين لاڳو ڪريو',
    synthesizing: 'تیار ٿي رهيو آهي...',
    concept: 'تصور',
    visualizationLog: 'تصوير لاگ آئي ڊي',
    editConcept: 'ترميم ڪريو',
    archiveDesign: 'محفوظ ڪريو',
    curatedPalette: 'رنگن جي ترتیب',
    wallTreatment: 'سطحي ڪم',
    lightingStrategy: 'روشنی جي حڪمت عملي',
    shareConcept: 'شيئر ڪريو',
    detected: 'سڃاتو ويو',
    expertAdvice: 'ماهر جي راءِ',
    proTips: 'پيشيور تجويزون',
    lightingMood: 'روشني جو انداز',
    styleTransfer: 'اسٽائل رفرنس',
    aiCleanup: 'صفائي',
    cleanupDesc: ' سامون هٽايو',
    refinementChat: 'جمالياتي چيٽ',
    chatPlaceholder: 'مثال طور "ڀتين جو رنگ نيرو ڪريو"',
    layoutPlanner: 'ترتيب ساز',
    materialPalette: 'ميٽريل ڪنٽرول',
    customSurface: 'سرفيس ويژولائزر',
    premiumExport: 'پريمیم ايڪسپورت ۽ اپ اسڪيلنگ',
    upscaleTo4K: '4K الٽرا ايڇ ڊي ۾ اپ اسڪيل ڪريو',
    downloadImage: 'تصوير ڊائون لوڊ ڪريو',
    exportPDF: 'پي ڊي ايف ايڪسپورت ڪريو',
    historyTitle: 'پروجیکٽ جي تاريخ',
    noHistory: 'اڃا تائين ڪو به ڊزائين محفوظ ناهي.',
    undo: 'پويون عمل',
    redo: 'ٻيهر ڪريو',
    uploader: {
      import: 'ميڊيا درآمد ڪريو',
      capture: 'فوٽو ڪيپچر',
      importSub: 'اسٽوريج',
      captureSub: 'سڌي لینس',
      analyzing: 'تجزيي وارو عمل',
      processing: 'ڊزائين تيار ٿي رهي آهي',
      sculpting: 'توهان جي خوابن جي جوڙجڪ',
      calibrating: 'سيٽنگ',
      rendering: 'آخري شڪل',
      cancel: 'منسوخ ڪريو'
    },
    editor: {
      title: 'آرڪيفائي اي آئي اسٽوڊيو',
      subtitle: 'ايڊيٽر',
      promptLabel: 'اي آئي هدايتون',
      placeholder: 'مثال طور "ڀتين جو رنگ تبديل ڪريو"',
      apply: 'تبديلي لاڳو ڪريو',
      instruction: 'بهتر نتيجن لاءِ تصوير تي نشان لڳايو.',
      mode: 'انٽرايڪٽو موڊ'
    },
    welcome: {
      calibrating: 'ڪيليبريشن',
      scanning: 'اسڪيننگ',
      syncing: 'هم آهنگي',
      applying: 'اطلاق',
      curating: 'ڪيوريشن'
    },
    workspaces: {
      reimagine: {
        title: 'جڳهن کي نئين شڪل ڏيو',
        subtitle: 'موجوده جڳهن کي اپلوڊ ڪريو ۽ اي آئي جي مدد سان نئين ڊزائين تيار ڪريو.',
        caps: ['اندروني تبديلي', 'ٻاهرين تبديلي', 'سمارٽ ايڊٽنگ']
      },
      create: {
        title: 'اي آئي سان ٺاهيو',
        subtitle: 'نقشن ۽ ضرورتن مطابق نوان گهر تيار ڪريو.',
        caps: ['نقشي مان 3D', 'لي آئوٽ پلاننگ', 'ذھين جڳهه جي تخليق']
      },
      tabs: {
        uploadPlan: 'نقشو اپلوڊ ڪريو',
        buildScratch: 'شروع کان ٺاهيو',
      },
      planning: {
        totalArea: 'ڪل علائقو (مربع فوٽ)',
        houseType: 'گھر جو قسم',
        selectRooms: 'ڪمرن جي چونڊ',
        analyzing: 'تجزيي وارو عمل جاري آهي...',
        detectingWalls: 'ڀتين جي سڃاڻپ',
        detectingBoundaries: 'حدن جو تعين',
        understandingFlow: 'بناوٽ جي سمجهہ',
        preparing3D: '3D تصور جي تياري'
      }
    }
  }
};

export const getRoomTypeName = (type: RoomType, lang: Language): string => {
  // Since we updated RoomType enum values to be descriptive, 
  // we can use the value directly for English or as a fallback.
  const translations: any = {
    [Language.UR]: {
      [RoomType.LIVING_ROOM_TV]: 'لیونگ روم / ٹی وی لاؤنج',
      [RoomType.DRAWING_GUEST]: 'ڈرائنگ روم / گیسٹ روم',
      [RoomType.BEDROOMS]: 'سونے کے کمرے',
      [RoomType.MASTER_BEDROOM]: 'ماسٹر بیڈروم',
      [RoomType.KIDS_ROOM]: 'بچوں کا کمرہ',
      [RoomType.KITCHEN]: 'باورچی خانہ',
      [RoomType.DINING_ROOM]: 'کھانے کا کمرہ',
      [RoomType.BATHROOMS_WASHROOMS]: 'غسل خانے',
      [RoomType.GARDEN_LAWN]: 'باغ / لان',
      [RoomType.STORE_ROOM]: 'اسٹور روم',
      [RoomType.PRAYER_ROOM]: 'نماز کا کمرہ',
      [RoomType.BALCONY]: 'بالکونی',
    },
    [Language.SD]: {
      [RoomType.LIVING_ROOM_TV]: 'رهڻ جو ڪمرو / ٽي وي لائونج',
      [RoomType.BEDROOMS]: 'سمهڻ جا ڪمرا',
      [RoomType.KITCHEN]: 'بورچي خانو',
      [RoomType.GARDEN_LAWN]: 'باغيچو / لان',
    }
  };

  return (translations[lang] && translations[lang][type]) || type;
};

export const LIGHTING_MOODS = [
  { id: LightingMood.DEFAULT, name: 'Default', icon: '✨' },
  { id: LightingMood.MORNING, name: 'Morning Glow', icon: '🌅' },
  { id: LightingMood.DAY, name: 'Natural Day', icon: '☀️' },
  { id: LightingMood.EVENING, name: 'Golden Hour', icon: '🌇' },
  { id: LightingMood.NIGHT, name: 'Night Ambient', icon: '🌙' },
  { id: LightingMood.SUNLIGHT, name: 'Sunlight', icon: '🔆' },
  { id: LightingMood.MOONLIGHT, name: 'Moonlight', icon: '🌑' },
];

export const ROOM_TYPES = [
  { id: RoomType.LIVING_ROOM_TV },
  { id: RoomType.DRAWING_GUEST },
  { id: RoomType.BEDROOMS },
  { id: RoomType.MASTER_BEDROOM },
  { id: RoomType.KIDS_ROOM },
  { id: RoomType.GUEST_BEDROOM },
  { id: RoomType.KITCHEN },
  { id: RoomType.DINING_ROOM },
  { id: RoomType.BATHROOMS_WASHROOMS },
  { id: RoomType.ATTACHED_BATHROOM },
  { id: RoomType.COMMON_BATHROOM },
  { id: RoomType.LAUNDRY_WASHING },
  { id: RoomType.STORE_ROOM },
  { id: RoomType.STUDY_OFFICE },
  { id: RoomType.PRAYER_ROOM },
  { id: RoomType.DRESSING_CLOSET },
  { id: RoomType.BALCONY },
  { id: RoomType.TERRACE_ROOF },
  { id: RoomType.GARAGE_PORCH },
  { id: RoomType.GARDEN_LAWN },
  { id: RoomType.BACKYARD },
  { id: RoomType.ENTRANCE_LOBBY },
  { id: RoomType.STAIRCASE_AREA },
  { id: RoomType.HALLWAY_CORRIDOR },
  { id: RoomType.HOME_THEATER },
  { id: RoomType.GAMING_ROOM },
  { id: RoomType.GYM_ROOM },
  { id: RoomType.PANTRY },
  { id: RoomType.COFFEE_CORNER },
  { id: RoomType.BARBECUE_AREA },
  { id: RoomType.SERVANT_QUARTER },
  { id: RoomType.MAID_ROOM },
  { id: RoomType.SHOE_RACK },
  { id: RoomType.MUD_ROOM },
  { id: RoomType.SWIMMING_POOL },
  { id: RoomType.KIDS_PLAY_AREA },
];

export const DESIGN_STYLES = [
  { id: DesignStyle.ECLECTIC, name: 'Eclectic' },
  { id: DesignStyle.SCANDINAVIAN, name: 'Scandinavian' },
  { id: DesignStyle.MODERN, name: 'Modern' },
  { id: DesignStyle.CONTEMPORARY, name: 'Contemporary' },
  { id: DesignStyle.TRANSITIONAL, name: 'Transitional' },
  { id: DesignStyle.MEDITERRANEAN, name: 'Mediterranean' },
  { id: DesignStyle.IKEA, name: 'Ikea' },
  { id: DesignStyle.INDUSTRIAL, name: 'Industrial' },
  { id: DesignStyle.QUIET_LUXURY, name: 'Quiet Luxury' },
  { id: DesignStyle.SHABBY_CHIC, name: 'Shabby Chic' },
  { id: DesignStyle.COASTAL, name: 'Coastal' },
  { id: DesignStyle.BAUHAUS, name: 'Bauhaus' },
  { id: DesignStyle.BOHEMIAN, name: 'Bohemian' },
  { id: DesignStyle.TRADITIONAL, name: 'Traditional' },
  { id: DesignStyle.RUSTIC, name: 'Rustic' },
  { id: DesignStyle.MINIMALISM, name: 'Minimalism' },
  { id: DesignStyle.JAPANDI, name: 'Japandi' },
  { id: DesignStyle.JAPANESE_DESIGN, name: 'Japanese design' },
  { id: DesignStyle.MODERN_ARABIC, name: 'Modern Arabic' },
  { id: DesignStyle.TRADITIONAL_ARABIC, name: 'Traditional Arabic' },
  { id: DesignStyle.BALI, name: 'Bali' },
  { id: DesignStyle.TROPICAL, name: 'Tropical' },
  { id: DesignStyle.ASIAN_DECOR, name: 'Asian Decor' },
  { id: DesignStyle.ZEN, name: 'Zen' },
  { id: DesignStyle.HOLLYWOOD_REGENCY, name: 'Hollywood Regency' },
  { id: DesignStyle.HOLLYWOOD_GLAM, name: 'Hollywood Glam' },
  { id: DesignStyle.MINIMALIST, name: 'Minimalist' },
  { id: DesignStyle.CHRISTMAS, name: 'Christmas' },
  { id: DesignStyle.FUTURISTIC, name: 'Futuristic' },
  { id: DesignStyle.LUXURIOUS, name: 'Luxurious' },
  { id: DesignStyle.MIDCENTURY_MODERN, name: 'Midcentury modern' },
  { id: DesignStyle.BIOPHILIC, name: 'Biophilic' },
  { id: DesignStyle.COTTAGE_CORE, name: 'Cottage Core' },
  { id: DesignStyle.FRENCH_COUNTRY, name: 'French Country' },
  { id: DesignStyle.ART_DECO, name: 'Art Deco' },
  { id: DesignStyle.ART_NOUVEAU, name: 'Art nouveau' },
  { id: DesignStyle.SOUTH_WESTERN, name: 'South Western' },
  { id: DesignStyle.MODERN_FARM_HOUSE, name: 'Modern Farm House' },
];

export const BUDGET_LEVELS = [
  { id: BudgetLevel.LOW, name: 'Budget Friendly' },
  { id: BudgetLevel.MEDIUM, name: 'Balanced Pro' },
  { id: BudgetLevel.HIGH, name: 'Elite Luxury' }
];

export const TEXTURE_OPTIONS = [
  { id: 'natural', name: 'Natural Wood' },
  { id: 'marble', name: 'Polished Marble' },
  { id: 'stone', name: 'Natural Stone' },
  { id: 'terracotta', name: 'Terracotta' },
  { id: 'slate', name: 'Dark Slate' },
  { id: 'fabric', name: 'Soft Textiles' },
  { id: 'glass', name: 'Smoked Glass' },
  { id: 'plaster', name: 'Venetian Plaster' },
  { id: 'metal', name: 'Brushed Metal' }
];

export const DEMO_LOG_SEQUENCES = {
  general: [
    "✔ [CONTEXT] Analyzing room geometry & spatial data...",
    "✔ [NEURAL] Extracting spatial invariants & texture maps",
    "AI Strategy: High-fidelity aesthetic synthesis",
    "✔ [GEOMETRY] Optimizing furniture layout & depth parameters",
    "✔ [SYNTHESIS] Layering aesthetic styles into spatial matrix",
    "✔ [LIGHTING] Calculating global illumination & reflections",
    "✔ [RENDER] Generating high-fidelity neural visualization"
  ],
  damage: [
    "✔ [CONTEXT] Identifying structural anomalies...",
    "✔ [NEURAL] Scanning surface textures (Concrete/Metal)",
    "AI Strategy: Photorealistic Reconstruction initialized",
    "✔ [GEOMETRY] Mapping furniture anchors for Living Area",
    "✔ [SYNTHESIS] Applying Mid-Century Modern aesthetic protocols",
    "✔ [LIGHTING] Synchronizing ambient occlusion & ray tracing",
    "✔ [RENDER] Finalizing photorealistic spatial reconstruction"
  ],
  plan: [
    "✔ Scanning 2D plan primitives",
    "✔ Extruding walls to load-bearing thickness",
    "✔ Placing virtual camera for depth evaluation",
    "✔ Generating texture mapping for surfaces",
    "✔ Calibrating furniture scale to floorplan",
    "AI Strategy: Precise 2D-to-3D block conversion"
  ],
  scratch: [
    "✔ Analyzing input parameters: 2000 sq ft",
    "✔ Validating room requirements: 3 Bed, 1 Kitchen, 1 Garage",
    "Conflict detected: 2000 sq ft is tight for 3 rooms + garage.",
    "Optimization strategy: compact hallway design",
    "✔ Generating 2D blueprint layout",
    "✔ Synthesizing intelligent 3D block model"
  ],
  scratch_2d: [
    "✔ Analyzing input parameters: 2000 sq ft",
    "✔ Validating room requirements: 3 Bed, 1 Kitchen, 1 Garage",
    "Conflict detected: 2000 sq ft is tight for 3 large bedrooms.",
    "Optimization strategy applied: smart circulation",
    "✔ Generating Technical 2D Blueprint..."
  ],
  scratch_3d: [
    "✔ 2D Blueprint Verified",
    "✔ Extruding volumetric geometry",
    "✔ Applying architectural surface shaders",
    "✔ Calculating path-traced global illumination",
    "✔ Finalizing Professional 3D Vision..."
  ]
};

export const DEMO_MAPPINGS: Record<string, { result: string; chairResult?: string; type?: string }> = {
  'damage_e': { result: '/damage_d.jpg', chairResult: '/damage_c.jpg' },
  '2dplan': { result: '/3dplan.jpg' },
  'garden_e': { result: '/garden_d.jpg', chairResult: '/garden_d_c.jpg' },
  'garden_day': { result: '/garden_day.jpg' },
  'exter_1': { result: '/exter_1_a.jpg' },
  'exter_2': { result: '/exter_2_a.jpg', chairResult: '/exter_2_c.jpg' },
  'eroom1_e': { result: '/image1_3d.jpg', chairResult: '/image1_3d.jpg' },
  'eroom2_e': { result: '/eroom2_d.jpg' },
  'default': { result: '/damage_d.jpg', chairResult: '/damage_c.jpg' }
};

export const PLANNING_ROOMS = [
  { id: 'bedroom', name: 'Bedroom', icon: 'Bed' },
  { id: 'bathroom', name: 'Bathroom', icon: 'Bath' },
  { id: 'kitchen', name: 'Kitchen', icon: 'Utensils' },
  { id: 'livingRoom', name: 'Living Room', icon: 'Sofa' },
  { id: 'diningArea', name: 'Dining Area', icon: 'Coffee' },
  { id: 'entrance', name: 'Entrance / Lobby', icon: 'Home' },
  { id: 'storeRoom', name: 'Store Room', icon: 'Box' },
  { id: 'laundryArea', name: 'Laundry Area', icon: 'Shirt' },
  { id: 'balcony', name: 'Balcony', icon: 'Sun' },
  { id: 'garage', name: 'Garage / Car Porch', icon: 'Car' },
  { id: 'guestRoom', name: 'Guest Room', icon: 'Users' },
  { id: 'studyRoom', name: 'Study Room', icon: 'BookOpen' },
  { id: 'prayerArea', name: 'Prayer Area', icon: 'Moon' },
  { id: 'stairArea', name: 'Stair Area', icon: 'TrendingUp' },
  { id: 'garden', name: 'Garden / Backyard', icon: 'Trees' },
];

export const Icons = {
  Upload: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
  ),
  Sparkles: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#D946EF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><circle cx="12" cy="12" r="1" fill="#D946EF"/></svg>
  ),
  Home: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  ),
  Camera: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4" stroke="#F59E0B" strokeWidth="2"/></svg>
  ),
  Share: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
  ),
  Magic: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 4V2"/><path d="M15 16v-2"/><path d="M8 9h2"/><path d="M20 9h2"/><path d="M17.8 11.8 19 13"/><path d="M15 9h0"/><path d="m17.8 6.2 1.2-1.2"/><path d="m3 21 9-9"/><path d="M12.2 6.2 11 5"/><path d="M12.2 11.8 11 13"/></svg>
  ),
  Gallery: ({ size = 28, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" />
      <circle cx="9" cy="9" r="2" stroke="currentColor" />
      <path d="m21 15-5-5L5 21" stroke="currentColor" />
    </svg>
  ),
  X: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  History: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
  ),
  Loader: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${className || ''}`}><line x1="12" x2="12" y1="2" y2="6"/><line x1="12" x2="12" y1="18" y2="22"/><line x1="4.93" x2="7.76" y1="4.93" y2="7.76"/><line x1="16.24" x2="19.07" y1="16.24" y2="19.07"/><line x1="2" x2="6" y1="12" y2="12"/><line x1="18" x2="22" y1="12" y2="12"/><line x1="4.93" x2="7.76" y1="19.07" y2="16.24"/><line x1="16.24" x2="19.07" y1="7.76" y2="4.93"/></svg>
  ),
  Loader2: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${className || ''}`}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  ),
  AlertCircle: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  ),
  Edit: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
  ),
  Brush: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-3.91 3.91-7.07 3.06-7.07 3.06l1.24-5.9c.14-.66.57-1.22 1.15-1.5l1.65-.8c.95-.46 2.05-.28 2.82.47L9.06 11.9z"/><path d="m14.5 9.5 4 4"/></svg>
  ),
  Text: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" x2="4" y1="4" y2="20"/></svg>
  ),
  Arrow: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  Check: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
  ),
  Expert: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5z"/><path d="M19 21v-2a7 7 0 0 0-14 0v2"/><circle cx="12" cy="7" r="3" fill="#F59E0B" opacity="0.2"/></svg>
  ),
  Send: ({ size = 20, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="22" y1="2" x2="11" y2="13"/><polyline points="22 2 15 22 11 13 2 9 22 2"/></svg>
  ),
  Layout: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
  ),
  Download: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
  ),
  PDF: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
  ),
  Upscale: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>
  ),
  Undo: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 14 4 9l5-5"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>
  ),
  Redo: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 14 5-5-5-5"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/></svg>
  ),
  Ruler: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.3 15.3-11.4-11.4a1 1 0 0 0-1.4 0l-4.2 4.2a1 1 0 0 0 0 1.4l11.4 11.4a1 1 0 0 0 1.4 0l4.2-4.2a1 1 0 0 0 0-1.4Z"/><path d="m5.5 11 1.5 1.5"/><path d="m8.5 8 1.5 1.5"/><path d="m11.5 5 1.5 1.5"/><path d="m14.5 2 1.5 1.5"/></svg>
  ),
  Lamp: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8 2h8"/><path d="M9 2v2.7a4 4 0 0 0 1.4 3l4.2 3.6a4 4 0 0 1 1.4 3V22H8v-7.7a4 4 0 0 1 1.4-3l4.2-3.6A4 4 0 0 0 15 4.7V2h-6Z"/><path d="M12 2v2"/><path d="M12 18v4"/></svg>
  ),
  Sofa: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M4 18v2"/><path d="M20 18v2"/><path d="M12 4v9"/></svg>
  ),
  ChevronDown: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
  ),
  Plus: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  DownloadCloud: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>
  ),
  FolderArchive: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><circle cx="12" cy="13" r="2"/><path d="M12 15v5"/></svg>
  ),
  PencilLine: ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
  )
};

