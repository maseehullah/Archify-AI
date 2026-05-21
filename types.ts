
export enum Language {
  EN = 'en',
  UR = 'ur',
  SD = 'sd'
}

export enum RoomType {
  LIVING_ROOM_TV = 'Living Room / TV Lounge',
  DRAWING_GUEST = 'Drawing Room / Guest Room',
  BEDROOMS = 'Bedrooms',
  MASTER_BEDROOM = 'Master Bedroom',
  KIDS_ROOM = 'Kids Room',
  GUEST_BEDROOM = 'Guest Bedroom',
  KITCHEN = 'Kitchen',
  DINING_ROOM = 'Dining Room',
  BATHROOMS_WASHROOMS = 'Bathrooms / Washrooms',
  ATTACHED_BATHROOM = 'Attached Bathroom',
  COMMON_BATHROOM = 'Common Bathroom',
  LAUNDRY_WASHING = 'Laundry Room / Washing Area',
  STORE_ROOM = 'Store Room',
  STUDY_OFFICE = 'Study Room / Office',
  PRAYER_ROOM = 'Prayer Room',
  DRESSING_CLOSET = 'Dressing Room / Walk-in Closet',
  BALCONY = 'Balcony',
  TERRACE_ROOF = 'Terrace / Roof Area',
  GARAGE_PORCH = 'Garage / Car Porch',
  GARDEN_LAWN = 'Garden / Lawn',
  BACKYARD = 'Backyard',
  ENTRANCE_LOBBY = 'Entrance Lobby',
  STAIRCASE_AREA = 'Staircase Area',
  HALLWAY_CORRIDOR = 'Hallway / Corridor',
  HOME_THEATER = 'Home Theater',
  GAMING_ROOM = 'Gaming Room',
  GYM_ROOM = 'Gym Room',
  PANTRY = 'Pantry',
  COFFEE_CORNER = 'Coffee Corner',
  BARBECUE_AREA = 'Barbecue Area',
  SERVANT_QUARTER = 'Servant Quarter',
  MAID_ROOM = 'Maid Room',
  SHOE_RACK = 'Shoe Rack Area',
  MUD_ROOM = 'Mud Room',
  SWIMMING_POOL = 'Swimming Pool',
  KIDS_PLAY_AREA = 'Kids Play Area'
}

export enum DesignStyle {
  ECLECTIC = 'Eclectic',
  SCANDINAVIAN = 'Scandinavian',
  MODERN = 'Modern',
  CONTEMPORARY = 'Contemporary',
  TRANSITIONAL = 'Transitional',
  MEDITERRANEAN = 'Mediterranean',
  IKEA = 'Ikea',
  INDUSTRIAL = 'Industrial',
  QUIET_LUXURY = 'Quiet Luxury',
  SHABBY_CHIC = 'Shabby Chic',
  COASTAL = 'Coastal',
  BAUHAUS = 'Bauhaus',
  BOHEMIAN = 'Bohemian',
  TRADITIONAL = 'Traditional',
  RUSTIC = 'Rustic',
  MINIMALISM = 'Minimalism',
  JAPANDI = 'Japandi',
  JAPANESE_DESIGN = 'Japanese design',
  MODERN_ARABIC = 'Modern Arabic',
  TRADITIONAL_ARABIC = 'Traditional Arabic',
  BALI = 'Bali',
  TROPICAL = 'Tropical',
  ASIAN_DECOR = 'Asian Decor',
  ZEN = 'Zen',
  HOLLYWOOD_REGENCY = 'Hollywood Regency',
  HOLLYWOOD_GLAM = 'Hollywood Glam',
  MINIMALIST = 'Minimalist',
  CHRISTMAS = 'Christmas',
  FUTURISTIC = 'Futuristic',
  LUXURIOUS = 'Luxurious',
  MIDCENTURY_MODERN = 'Midcentury modern',
  BIOPHILIC = 'Biophilic',
  COTTAGE_CORE = 'Cottage Core',
  FRENCH_COUNTRY = 'French Country',
  ART_DECO = 'Art Deco',
  ART_NOUVEAU = 'Art nouveau',
  SOUTH_WESTERN = 'South Western',
  MODERN_FARM_HOUSE = 'Modern Farm House'
}

export enum LightingMood {
  DEFAULT = 'Default',
  MORNING = 'Morning Glow',
  DAY = 'Natural Day',
  EVENING = 'Golden Hour',
  NIGHT = 'Night / Ambient',
  SUNLIGHT = 'Direct Sunlight',
  MOONLIGHT = 'Silver Moonlight'
}

export enum BudgetLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export enum WorkspaceMode {
  REIMAGINE = 'reimagine',
  CREATE = 'create',
  GALLERY = 'gallery',
  HOME = 'home'
}

export enum HouseType {
  SINGLE_STORY = 'Single Story',
  DOUBLE_STORY = 'Double Story',
  APARTMENT = 'Apartment',
  VILLA = 'Villa',
  FARMHOUSE = 'Farmhouse'
}

export interface AIRecommendation {
  type: 'optimization' | 'warning' | 'suggestion';
  message: string;
  suggestedAction: string;
}

export interface PlanningState {
  area: number;
  houseType: HouseType;
  rooms: Record<string, number>;
  lightingMood: LightingMood;
  recommendation?: AIRecommendation;
  customPrompt?: string;
  referenceImage?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export interface LayoutScheme {
  name: string;
  description: string;
  benefits: string[];
}

export interface ColorInfo {
  color: string;
  name: string;
}

export interface RoomAnalysis {
  type: RoomType;
  isExterior: boolean;
  confidence: number;
  structure: {
    walls: string; 
    floor: string; 
    lighting: string;
    ceiling: string; 
    windows: string;
    layout: string;
  };
  detectedItems: string[];
}

export interface DesignSuggestion {
  category: string;
  recommendation: string;
  reasoning: string;
}

export interface DesignPlan {
  colorPalette: ColorInfo[];
  wallColors: string;
  furniturePlacement: string;
  decorItems: string[];
  lightingUpgrades: string;
  suggestions: DesignSuggestion[];
  layoutSchemes: LayoutScheme[];
  expertAdvice: {
    title: string;
    tips: string[];
  };
}

export interface ThreeDDesignResult {
  imageUrl: string;
  twoDImageUrl: string;
  analysis: {
    structuralIntegrity: string;
    flowEfficiency: string;
    lightingConcept: string;
    expertInsight: string;
    spatialPotential: string;
  };
}

export enum EditTool {
  BRUSH = 'brush',
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
  ERASER = 'eraser'
}

export enum EditMode {
  ADD = 'add',
  RECOLOR = 'recolor',
  DELETE = 'delete',
  REDECORE = 'redecore',
  REPLACE = 'replace',
  MOVE = 'move'
}

export interface LogEntry {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'process' | 'logic';
  timestamp: number;
}

export enum SimulationStatus {
  IDLE = 'idle',
  ANALYZING = 'analyzing',
  PLANNING = 'planning',
  GENERATING = 'generating',
  REFINING = 'refining',
  COMPLETED = 'completed'
}

export interface DesignResult {
  id: string;
  timestamp: number;
  originalImage: string;
  redesignedImage: string;
  upscaledImage?: string;
  plan: DesignPlan;
  analysis: RoomAnalysis;
  style: DesignStyle;
  type: RoomType;
  budget: BudgetLevel;
  lightingMood: LightingMood;
  referenceImage?: string;
  language?: Language;
  chatHistory?: ChatMessage[];
}
