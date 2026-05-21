import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  LayoutGrid, 
  GalleryVertical, 
  Image as ImageIcon, 
  Box, 
  ArrowRight,
  PlusCircle,
  Home as HomeIcon,
  Search,
  Wand2 as WizardsIcon
} from 'lucide-react';
import Layout from './components/Layout';
import SpaceWorkspace from './components/SpaceWorkspace';
import PlanningWorkspace from './components/PlanningWorkspace';
import ComparisonSlider from './components/ComparisonSlider';
import WelcomeScreen from './components/WelcomeScreen';
import DesignEditor from './components/DesignEditor';
import { ImageCropper } from './components/ImageCropper';
import { AIInteriorGenerator } from './components/AIInteriorGenerator';
import { analyzeRoom, generateDesignPlan, redesignRoomImage, compressImage, translateDesignResult, evolveDesign, editDesignSelection } from './services/geminiService';
import { RoomAnalysis, DesignResult, RoomType, DesignStyle, BudgetLevel, Language, LightingMood, ChatMessage, WorkspaceMode, LogEntry, EditMode, ThreeDDesignResult, PlanningState } from './types';
import { DESIGN_STYLES, Icons, ROOM_TYPES, TEXTURE_OPTIONS, UI_TRANSLATIONS, getRoomTypeName, LIGHTING_MOODS, DEMO_LOG_SEQUENCES, DEMO_MAPPINGS } from './constants';
import AIReasoningConsole from './components/AIReasoningConsole';

const logo = '/logo.png';

const BANNER_IMAGES = [
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1558603668-6570496b66f8?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop'
];

type GenerationMode = 'demo' | 'ai';

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [workspace, setWorkspace] = useState<WorkspaceMode>(WorkspaceMode.HOME);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<RoomAnalysis | null>(null);
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [generationMode, setGenerationMode] = useState<GenerationMode>(() => {
    const saved = localStorage.getItem('archify_generation_mode');
    return saved === 'ai' ? 'ai' : 'demo';
  });
  
  const [selectedType, setSelectedType] = useState<RoomType>(RoomType.LIVING_ROOM_TV);
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle>(DesignStyle.MODERN);
  const [selectedBudget, setSelectedBudget] = useState<BudgetLevel>(BudgetLevel.MEDIUM);
  const [selectedLighting, setSelectedLighting] = useState<LightingMood>(LightingMood.DEFAULT);
  const [preferredColor, setPreferredColor] = useState<string>('');
  const [preferredTexture, setPreferredTexture] = useState<string>('');
  const [styleReference, setStyleReference] = useState<string | null>(null);
  
  const [result, setResult] = useState<DesignResult | null>(null);
  const [history, setHistory] = useState<DesignResult[]>([]);

  // Persistence logic for history
  useEffect(() => {
    const saved = localStorage.getItem('archify_gen_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setHistory(parsed);
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      try {
        localStorage.setItem('archify_gen_history', JSON.stringify(history.slice(0, 8)));
      } catch (e) {
        console.warn("Storage full, could not save full history", e);
      }
    }
  }, [history]);
  const [redoStack, setRedoStack] = useState<DesignResult[]>([]);
  const [chatMessage, setChatMessage] = useState('');
  const [chatRefImage, setChatRefImage] = useState<string | null>(null);
  const [annotationLayer, setAnnotationLayer] = useState<string | null>(null);
  const chatRefInputRef = useRef<HTMLInputElement>(null);
  const [isChatting, setIsChatting] = useState(false);
  const [savedDesigns, setSavedDesigns] = useState<any[]>([]);
  const [galleryTab, setGalleryTab] = useState<'reimagine' | 'create'>('reimagine');
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<any | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isArchiving, setIsArchiving] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [bannerImgIndex, setBannerImgIndex] = useState(0); 
  const [activeAnimIndex, setActiveAnimIndex] = useState<number | null>(0);
  const [threeDResult, setThreeDResult] = useState<any | null>(null);
  const [activeRefineMode, setActiveRefineMode] = useState<'reimagine' | 'create'>('reimagine');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Simulation State
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  
  const t = UI_TRANSLATIONS[language];

  useEffect(() => {
    localStorage.setItem('archify_generation_mode', generationMode);
  }, [generationMode]);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      timestamp: Date.now()
    }]);
  };

  const runSimulation = async (sequence: string[]) => {
    setLogs([]);
    setIsSimulating(true);
    for (const msg of sequence) {
      const type: LogEntry['type'] = msg.includes('✔') ? 'success' : 
                                   msg.includes('Conflict') ? 'warning' : 
                                   msg.includes('Strategy') ? 'logic' : 'process';
      addLog(msg, type);
      await new Promise(r => setTimeout(r, 800 + Math.random() * 800));
    }
    await new Promise(r => setTimeout(r, 1000));
    setIsSimulating(false);
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const activeMs = 2300;
    const gapMs = 450;

    const runStep = (index: number) => {
      setActiveAnimIndex(index);
      timers.push(setTimeout(() => {
        setActiveAnimIndex(null);
        const nextIndex = index + 1;
        timers.push(setTimeout(() => {
          runStep(nextIndex > 2 ? 0 : nextIndex);
        }, gapMs));
      }, activeMs));
    };

    runStep(0);
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const welcomeTimer = setTimeout(() => setShowWelcome(false), 3000);
    const saved = localStorage.getItem('ai_designs_v2');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setSavedDesigns(parsed);
      } catch (e) { 
        console.error("Failed to load archive v2", e); 
      }
    }
    return () => clearTimeout(welcomeTimer);
  }, []);

  const handleLanguageToggle = async (newLang: Language) => {
    if (newLang === language) return;
    setLanguage(newLang);
    if (result) {
      setIsLoading(true);
      try {
        const translated = await translateDesignResult(result, newLang);
        setResult(translated);
      } catch (err) { console.error(err); } finally { setIsLoading(false); }
    }
  };

  useEffect(() => {
    if (showWelcome || workspace !== WorkspaceMode.HOME) return;
    const interval = setInterval(() => {
      setBannerImgIndex(prev => (prev + 1) % BANNER_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [showWelcome, workspace]);

  const handleUpload = async (base64: string, fileName?: string) => {
    if (fileName) {
      setUploadedFileName(fileName.split('.')[0]);
    }
    setImageToCrop(base64);
  };

  const handleCropComplete = async (croppedBase64: string) => {
    setImageToCrop(null);
    try {
      setIsLoading(true);
      setError(null);
      
      // AI Reasoning for Upload Phase
      const uploadSequence = [
        "✔ Initializing neural vision bridge...",
        "✔ Calibrating sensor depth matrices",
        "✔ [AGENT] Matching spatial indices for environment",
        "✔ Extracting architectural geometry layers",
        "✔ [SYNTHESIS] Detecting ambient lighting patterns",
        "✔ Finalizing spatial understanding"
      ];
      
      // Run the simulation in parallel with the 5 second wait
      runSimulation(uploadSequence);
      
      // Delay for 5 seconds as requested
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Remove data URL prefix if present
      const base64Data = croppedBase64.includes(',') ? croppedBase64.split(',')[1] : croppedBase64;
      const compressed = await compressImage(base64Data);
      setOriginalImage(`data:image/jpeg;base64,${compressed}`);
      const roomAnalysis = await analyzeRoom(compressed, language, { mode: generationMode });
      setAnalysis(roomAnalysis);
      
      const detected = roomAnalysis?.type ? Object.values(RoomType).find(rt => rt.toLowerCase().replace('_', ' ') === roomAnalysis.type?.toLowerCase()) : null;
      if (detected) setSelectedType(detected);

      // Special handling for eroom2_e demo
      if (uploadedFileName === 'eroom2_e') {
        setSelectedType(RoomType.BEDROOMS);
        setSelectedStyle(DesignStyle.MODERN);
        setSelectedLighting(LightingMood.DAY);
      }
    } catch (err: any) { 
      console.error(err);
      setError(err?.message || "Computer vision analysis failed. Please try a clearer photo."); 
    } finally { 
      setIsLoading(false); 
      setIsSimulating(false); // Ensure simulation ends
    }
  };

  const handleGenerationFromAIInterface = async (data: {
    image: string;
    type: RoomType;
    style: DesignStyle;
    model: string;
    additionalInfo: string;
    lightingMood: LightingMood;
    referenceImage?: string;
    sourceFileName?: string;
  }) => {
    const sourceKey = (data.sourceFileName || uploadedFileName || '').toLowerCase();
    if (data.sourceFileName) setUploadedFileName(data.sourceFileName);
    setOriginalImage(`data:image/jpeg;base64,${data.image}`);
    setSelectedType(data.type);
    setSelectedStyle(data.style);
    setSelectedLighting(data.lightingMood);
    if (data.referenceImage) {
      setStyleReference(`data:image/jpeg;base64,${data.referenceImage}`);
    }
    
    try {
      setIsLoading(true);
      setError(null);
      addLog(generationMode === 'ai' ? '✔ [ENGINE] AI Connected mode selected' : '✔ [ENGINE] Local Assets mode selected');
      
      const prompt = data.additionalInfo.toLowerCase();
      const isExteriorMode = prompt.includes('generator mode: exteriors') || prompt.includes('facade') || prompt.includes('house angle');
      const isGardenMode = prompt.includes('generator mode: gardens') || prompt.includes('garden transformation');
      let detectedKey = sourceKey || 'damage_e';
      
      // Filename detection refinements
      const lowFile = sourceKey;
      if (lowFile.includes('exter_1')) detectedKey = 'exter_1';
      else if (lowFile.includes('exter_2')) detectedKey = 'exter_2';
      else if (lowFile.includes('damage') || prompt.includes('damage')) detectedKey = 'damage_e';
      else if (lowFile.includes('garden') || lowFile.includes('lawn') || prompt.includes('garden') || prompt.includes('lawn')) detectedKey = 'garden_e';
      else if (lowFile.includes('eroom1') || prompt.includes('room1')) detectedKey = 'eroom1_e';
      else if (lowFile.includes('eroom2') || prompt.includes('room2')) detectedKey = 'eroom2_e';
      else if (lowFile.includes('2d') || lowFile.includes('plan') || prompt.includes('2d') || prompt.includes('plan')) detectedKey = '2dplan';
      else {
        // Fallback to room type detection if filename is generic
        if (data.type === RoomType.GARDEN_LAWN || data.type === RoomType.BACKYARD) detectedKey = 'garden_e';
        else if (data.type === RoomType.DINING_ROOM) detectedKey = 'eroom1_e';
        else if (data.type === RoomType.BEDROOMS || data.type === RoomType.MASTER_BEDROOM) detectedKey = 'eroom2_e';
        else detectedKey = 'damage_e';
      }

      const sequence = detectedKey.includes('damage') ? DEMO_LOG_SEQUENCES.damage : DEMO_LOG_SEQUENCES.general;
      await runSimulation(sequence);

      const mapping = DEMO_MAPPINGS[detectedKey] || DEMO_MAPPINGS['damage_e'];
      const useChair = prompt.includes('chair') || prompt.includes('chairs');
      const useCar = prompt.includes('luxury car') || /\bcar\b/.test(prompt);
      const wantsDaylight = prompt.includes('daylight') || prompt.includes('day light');
      let resultImage =
        detectedKey === 'exter_2' && useCar && mapping.chairResult ? mapping.chairResult :
        useChair && mapping.chairResult ? mapping.chairResult :
        detectedKey === 'garden_e' && wantsDaylight ? '/garden_day.jpg' :
        mapping.result;

      if (generationMode === 'ai') {
        try {
          const aiResult = await redesignRoomImage(
            data.image,
            data.type,
            data.style,
            selectedBudget,
            undefined,
            undefined,
            data.lightingMood,
            data.referenceImage,
            data.additionalInfo,
            { mode: generationMode }
          );
          if (aiResult && !aiResult.includes('/demo')) {
            resultImage = aiResult;
          } else {
            addLog('AI service returned a placeholder, using local fallback', 'warning');
          }
        } catch (aiError) {
          console.warn('AI generation failed', aiError);
          addLog('AI generation failed. Demo fallback is disabled while AI Connected is active.', 'error');
          throw aiError;
        }
      }

      const roomAnalysis = {
        type: data.type,
        isExterior: isExteriorMode || isGardenMode,
        confidence: 0.98,
        structure: { walls: isExteriorMode ? 'Facade envelope' : 'Concrete', floor: isGardenMode ? 'Outdoor paving / lawn' : 'Wood', lighting: 'Natural', ceiling: isExteriorMode || isGardenMode ? 'Open sky' : 'Flat', windows: 'Large', layout: isGardenMode ? 'Landscape zones' : 'Open' },
        detectedItems: isGardenMode ? ['Planting', 'Pathways', 'Outdoor seating'] : isExteriorMode ? ['Facade', 'Entry', 'Windows', 'Landscape edge'] : ['Furniture', 'Walls']
      };
      setAnalysis(roomAnalysis);
      
      const plan = {
        colorPalette: [{ color: '#f5f5f5', name: 'White' }],
        wallColors: 'Soft White',
        furniturePlacement: 'Centered',
        decorItems: ['Vase', 'Painting'],
        lightingUpgrades: 'Recessed lighting',
        suggestions: [],
        layoutSchemes: [],
        expertAdvice: { title: 'Expert Insight', tips: ['Use biophilic elements'] }
      };

      const newResult = { 
        id: Math.random().toString(36).substr(2, 9), 
        timestamp: Date.now(), 
        originalImage: `data:image/jpeg;base64,${data.image}`, 
        redesignedImage: resultImage, 
        plan, 
        analysis: roomAnalysis, 
        style: data.style as DesignStyle, 
        type: data.type as RoomType, 
        budget: selectedBudget, 
        lightingMood: data.lightingMood, 
        language, 
        chatHistory: [] 
      };
      
      setResult(newResult);
      setHistory(prev => [newResult, ...prev].slice(0, 50));
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Synthesis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateDesign = async () => {
    if (!originalImage) return;
    
    // Create a stable local analysis object for consistent UI
    const currentAnalysis = analysis || {
      type: selectedType,
      isExterior: false,
      confidence: 0.98,
      structure: { 
        walls: 'Architectural Concrete (Smooth)', 
        floor: 'Oak Hardwood Finish', 
        lighting: 'Natural Indirect + Recessed', 
        ceiling: 'Minimalist Industrial', 
        windows: 'Panoramic Vistas', 
        layout: 'Optimized Flow' 
      },
      detectedItems: ['Spatial Boundaries', 'Lighting Entry Point']
    };

    if (!analysis) setAnalysis(currentAnalysis);

    try {
      setIsLoading(true);
      setError(null);
      
      const prompt = `${preferredColor} ${preferredTexture}`.toLowerCase();
      
      // Intelligent fallback mapping for simulation mode
      const fileNameLower = (uploadedFileName || '').toLowerCase();
      const promptLower = prompt.toLowerCase();
      
      let detectedKey = 'damage_e'; // Default
      
      if (fileNameLower.includes('eroom2') || promptLower.includes('room 2') || promptLower.includes('bedroom')) {
        detectedKey = 'eroom2_e';
      } else if (fileNameLower.includes('eroom1') || promptLower.includes('room 1') || promptLower.includes('dining')) {
        detectedKey = 'eroom1_e';
      } else if (fileNameLower.includes('damage') || promptLower.includes('living') || promptLower.includes('lounge')) {
        detectedKey = 'damage_e';
      } else if (fileNameLower.includes('garden') || fileNameLower.includes('lawn') || promptLower.includes('garden') || promptLower.includes('outdoor')) {
        detectedKey = 'garden_e';
      } else if (fileNameLower.includes('2d') || fileNameLower.includes('plan') || promptLower.includes('blueprint')) {
        detectedKey = '2dplan';
      } else {
        // Primary driver: Selection Type for unknown files
        if (selectedType === RoomType.BEDROOMS || selectedType === RoomType.MASTER_BEDROOM) detectedKey = 'eroom2_e';
        else if (selectedType === RoomType.LIVING_ROOM_TV) detectedKey = 'damage_e';
        else if (selectedType === RoomType.DINING_ROOM) detectedKey = 'eroom1_e';
        else if (selectedType === RoomType.GARDEN_LAWN || selectedType === RoomType.BACKYARD) detectedKey = 'garden_e';
        else detectedKey = 'damage_e'; // Ultimate fallback
      }
      
      const sequence = detectedKey.includes('damage') ? DEMO_LOG_SEQUENCES.damage : DEMO_LOG_SEQUENCES.general;
      
      // Dynamic AI reasoning injection
      const logStart = [...sequence];
      logStart.unshift(`✔ [AGENT] Matching spatial indices for "${detectedKey}"`);
      logStart.push(`✔ [SYNTHESIS] Applying ${selectedStyle} aesthetic protocols`);
      logStart.push(`✔ [RENDER] Finalizing photorealistic spatial reconstruction`);
      
      await runSimulation(logStart);

      const mapping = DEMO_MAPPINGS[detectedKey] || DEMO_MAPPINGS['damage_e'];
      // Handle the "chair" logic: if prompt mentions chairs, use chairResult if available
      const useChair = prompt.includes('chair') || prompt.includes('chairs');
      const useCar = prompt.includes('luxury car') || /\bcar\b/.test(prompt);
      const wantsDaylight = prompt.includes('daylight') || prompt.includes('day light');
      let resultImage =
        detectedKey === 'exter_2' && useCar && mapping.chairResult ? mapping.chairResult :
        useChair && mapping.chairResult ? mapping.chairResult :
        detectedKey === 'garden_e' && wantsDaylight ? '/garden_day.jpg' :
        mapping.result;

      if (generationMode === 'ai') {
        try {
          const base64Data = originalImage.includes(',') ? originalImage.split(',')[1] : originalImage;
          const aiResult = await redesignRoomImage(
            base64Data,
            selectedType,
            selectedStyle,
            selectedBudget,
            undefined,
            preferredTexture || undefined,
            selectedLighting,
            styleReference || undefined,
            `${preferredColor} ${preferredTexture} ${prompt}`,
            { mode: generationMode }
          );
          if (aiResult && !aiResult.includes('/demo')) {
            resultImage = aiResult;
          } else {
            addLog('AI service returned a placeholder, using local fallback', 'warning');
          }
        } catch (aiError) {
          console.warn('AI design generation failed', aiError);
          addLog('AI generation failed. Demo fallback is disabled while AI Connected is active.', 'error');
          throw aiError;
        }
      }

      const plan = {
        colorPalette: [{ color: '#f5f5f5', name: 'Alabaster' }, { color: '#2d3436', name: 'Dark Slate' }],
        wallColors: 'Morning Fog (Matte Finish)',
        furniturePlacement: 'Radial Balanced Symmetry',
        decorItems: ['Minimalist Surface Art', 'Ambient Light Sculptures'],
        lightingUpgrades: 'Multi-layer Indirect LED + Natural Diffusion',
        suggestions: ['Increase natural light entry via smart glazing', 'Focus on tactile materiality'],
        layoutSchemes: ['Standard Open Plan', 'Zoned Functional'],
        expertAdvice: { 
          title: 'Senior Architect Review', 
          tips: ['Ensure spatial circulation remains unobstructed', 'Harmonize textures with surrounding environment'] 
        }
      };

      setResult({ 
        id: Math.random().toString(36).substr(2, 9), 
        timestamp: Date.now(), 
        originalImage, 
        redesignedImage: resultImage, 
        plan, 
        analysis: currentAnalysis, // Use local variable to avoid stale state
        style: selectedStyle, 
        type: selectedType, 
        budget: selectedBudget, 
        lightingMood: selectedLighting, 
        language, 
        chatHistory: [] 
      });
      setHistory([]);
      setRedoStack([]);
      setStep(3);
    } catch (err: any) { 
      console.error(err);
      setError(err?.message || "Synthesis timeout. The AI server is busy, please try again."); 
    } finally { setIsLoading(false); }
  };

  const handleUndo = () => {
    if (history.length === 0 || !result) return;
    const prev = history[history.length - 1];
    setRedoStack(prevRedo => [...prevRedo, result]);
    setResult(prev);
    setHistory(history.slice(0, -1));
  };

  const handleRedo = () => {
    if (redoStack.length === 0 || !result) return;
    const next = redoStack[redoStack.length - 1];
    setHistory(prevHistory => [...prevHistory, result]);
    setResult(next);
    setRedoStack(redoStack.slice(0, -1));
  };

  const handleRefine = async (refinementData?: { image: string; prompt: string; mask: string; mode: EditMode }) => {
    if (!result) return;
    
    // Support both direct calls and state-based calls
    const actualPrompt = refinementData?.prompt || chatMessage;
    const actualMask = refinementData?.mask || annotationLayer;
    const actualMode = refinementData?.mode || 'replace';

    if (!actualPrompt.trim() && !chatRefImage && !actualMask) return;
    
    try {
      setIsChatting(true);
      setHistory(prev => [...prev || [], result].slice(-10)); 
      setRedoStack([]);

      // Simulation mode for Refinement (as requested by user)
      const promptLower = actualPrompt.toLowerCase();
      const useChair = promptLower.includes('chair') || promptLower.includes('chairs');
      const useCar = promptLower.includes('luxury car') || /\bcar\b/.test(promptLower);
      const wantsDaylightFlowers = promptLower.includes('daylight') || promptLower.includes('day light');
      const isPlan = result.type?.includes('plan') || uploadedFileName?.includes('2d') || uploadedFileName?.includes('plan');
      
      if (generationMode === 'demo' && !isPlan) {
        let detectedKey = uploadedFileName || 'damage_e';
        const lowFile = (uploadedFileName || '').toLowerCase();
        const currentResultUrl = (result.redesignedImage || '').toLowerCase();
        
        // Match base key - prioritizes uploaded filename, then current image, then selected type
        if (lowFile.includes('exter_1') || currentResultUrl.includes('exter_1')) detectedKey = 'exter_1';
        else if (lowFile.includes('exter_2') || currentResultUrl.includes('exter_2')) detectedKey = 'exter_2';
        else if (lowFile.includes('garden') || currentResultUrl.includes('garden') || result.type === RoomType.GARDEN_LAWN) detectedKey = 'garden_e';
        else if (lowFile.includes('damage') || currentResultUrl.includes('damage') || result.type === RoomType.LIVING_ROOM_TV) detectedKey = 'damage_e';
        else if (lowFile.includes('eroom1') || currentResultUrl.includes('eroom1') || result.type === RoomType.DINING_ROOM) detectedKey = 'eroom1_e';
        else if (lowFile.includes('eroom2') || currentResultUrl.includes('eroom2') || result.type === RoomType.BEDROOMS) detectedKey = 'eroom2_e';
        
        const mapping = DEMO_MAPPINGS[detectedKey] || DEMO_MAPPINGS['damage_e'];
        const isExteriorCarDemo = detectedKey === 'exter_2' && useCar && mapping.chairResult;
        const isGardenDayDemo = detectedKey === 'garden_e' && wantsDaylightFlowers && currentResultUrl.includes('garden_d');
        
        // Professional simulation sequence (approx 10s based on runSimulation delays)
        await runSimulation([
          "✔ [REFINEMENT] Initializing Contextual Agent",
          "✔ Analyzing spatial annotations & prompt intent",
          "✔ Locking geometric anchors for modification",
          `Strategy: Neural Synthesis of ${isExteriorCarDemo ? 'premium exterior vehicle' : isGardenDayDemo ? 'daylight botanical' : useChair ? 'furniture' : 'architectural'} elements`,
          "✔ Synchronizing lighting Mood & environment reflections",
          "✔ Applying photorealistic pass (Iter 1/2)",
          "✔ Applying photorealistic pass (Iter 2/2)",
          "✔ Finalizing shadow-aware compositing",
          "✔ Rendering high-fidelity result"
        ]);

        if (isExteriorCarDemo) {
          setResult(prev => {
            if (!prev) return null;
            const newMsg: ChatMessage = { role: 'user', text: actualPrompt || "Add luxury car" };
            const assistantMsg: ChatMessage = { role: 'assistant', text: "Exterior refinement complete with premium vehicle placement." };
            return {
              ...prev,
              originalImage: mapping.result,
              redesignedImage: mapping.chairResult!,
              chatHistory: [...(prev.chatHistory || []), newMsg, assistantMsg]
            };
          });
          setChatMessage(''); setChatRefImage(null); setAnnotationLayer(null); setIsEditorActive(false);
          chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          return;
        }

        if (isGardenDayDemo) {
          setResult(prev => {
            if (!prev) return null;
            const newMsg: ChatMessage = { role: 'user', text: actualPrompt || "Add daylight and more flowers" };
            const assistantMsg: ChatMessage = { role: 'assistant', text: "Garden refinement complete with daylight floral enhancement." };
            return {
              ...prev,
              originalImage: '/garden_d.jpg',
              redesignedImage: '/garden_day.jpg',
              chatHistory: [...(prev.chatHistory || []), newMsg, assistantMsg]
            };
          });
          setChatMessage(''); setChatRefImage(null); setAnnotationLayer(null); setIsEditorActive(false);
          chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          return;
        }

        if (useChair && mapping.chairResult) {
          setResult(prev => {
            if (!prev) return null;
            const newMsg: ChatMessage = { role: 'user', text: actualPrompt || "Add chair" };
            const assistantMsg: ChatMessage = { role: 'assistant', text: "Selection successfully refined with requested elements." };
            // Update redesignedImage and originalImage for comparison
            return { 
              ...prev, 
              originalImage: mapping.result,
              redesignedImage: mapping.chairResult!, 
              chatHistory: [...(prev.chatHistory || []), newMsg, assistantMsg] 
            };
          });
          setChatMessage(''); setChatRefImage(null); setAnnotationLayer(null); setIsEditorActive(false);
          chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          return;
        }

        // Even if not chair, we show simulation if it's a demo room
        setResult(prev => {
          if (!prev) return null;
          const newMsg: ChatMessage = { role: 'user', text: actualPrompt || "Refine design" };
          const assistantMsg: ChatMessage = { role: 'assistant', text: "Design refinement complete." };
          return { ...prev, chatHistory: [...(prev.chatHistory || []), newMsg, assistantMsg] };
        });
        setChatMessage(''); setChatRefImage(null); setAnnotationLayer(null); setIsEditorActive(false);
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      // Fallback to real Gemini API if not a demo flow
      const base64Current = result.redesignedImage.includes(',') ? result.redesignedImage.split(',')[1] : result.redesignedImage;
      let evolvedUrl: string;
      if (actualMask) {
        const maskBase64 = actualMask.includes(',') ? actualMask.split(',')[1] : actualMask;
        evolvedUrl = await editDesignSelection(base64Current, maskBase64, actualMode as EditMode, actualPrompt || "Modify indicated area", result.style, result.lightingMood, { mode: generationMode });
      } else {
        evolvedUrl = await evolveDesign(base64Current, actualPrompt || "Apply style from reference", result.plan, chatRefImage?.split(',')[1], { mode: generationMode });
      }
      
      setResult(prev => {
        if (!prev) return null;
        const newMsg: ChatMessage = { role: 'user', text: actualPrompt };
        const assistantMsg: ChatMessage = { role: 'assistant', text: "Design refinement complete." };
        return {
          ...prev,
          redesignedImage: evolvedUrl,
          chatHistory: [...(prev.chatHistory || []), newMsg, assistantMsg]
        };
      });
      setChatMessage(''); setChatRefImage(null); setAnnotationLayer(null); setIsEditorActive(false);
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      alert("Refinement failed. Please try again.");
    } finally {
      setIsChatting(false);
    }
  };

  const handleArchive = () => {
    if (!result || isArchiving) return;
    setIsArchiving(true);
    
    if (savedDesigns.find(d => d.id === result.id)) {
      alert("Design already exists in your gallery.");
      setIsArchiving(false);
      return;
    }

    const newDesign = {
      id: result.id || `design-${Date.now()}`,
      timestamp: Date.now(),
      category: 'reimagine',
      data: result
    };

    const updated = [newDesign, ...savedDesigns];
    setSavedDesigns(updated);
    localStorage.setItem('ai_designs_v2', JSON.stringify(updated));
    
    setTimeout(() => {
      setIsArchiving(false);
      alert("Design successfully archived to your gallery.");
    }, 600);
  };

  const handlePlanningArchive = (planningResult: ThreeDDesignResult, currentPlanningState: PlanningState) => {
    const archiveId = `plan-${planningResult.imageUrl}-${planningResult.twoDImageUrl}-${currentPlanningState.area}-${currentPlanningState.houseType}`;

    if (savedDesigns.find(d => d.id === archiveId)) {
      return false;
    }

    const newDesign = {
      id: archiveId,
      timestamp: Date.now(),
      category: 'create',
      data: planningResult,
      planningState: currentPlanningState
    };

    const updated = [newDesign, ...savedDesigns];
    setSavedDesigns(updated);
    localStorage.setItem('ai_designs_v2', JSON.stringify(updated));
    setGalleryTab('create');
    return true;
  };

  const handleDeleteDesign = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedDesigns.filter(d => d.id !== id);
    setSavedDesigns(updated);
    localStorage.setItem('ai_designs_v2', JSON.stringify(updated));
  };

  const handleDownloadImage = (imageUrl: string, filename = 'archify-ai-design.jpg') => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    setOriginalImage(null); setAnalysis(null); setResult(null); setHistory([]); setRedoStack([]); setStep(1); setError(null); setStyleReference(null); setSelectedLighting(LightingMood.DEFAULT);
    setWorkspace(WorkspaceMode.HOME); setLogs([]); setIsSimulating(false);
  };

  if (showWelcome) return <WelcomeScreen language={language} />;

  return (
    <Layout 
      activeView={workspace === WorkspaceMode.GALLERY ? 'gallery' : 'home'} 
      onViewChange={(v) => setWorkspace(v === 'gallery' ? WorkspaceMode.GALLERY : WorkspaceMode.HOME)} 
      onNewDesign={reset} 
      onStartCuration={() => setWorkspace(WorkspaceMode.REIMAGINE)} 
      language={language} 
      onLanguageChange={handleLanguageToggle}
      generationMode={generationMode}
      onGenerationModeChange={setGenerationMode}
    >
      <div className="max-w-[1600px] mx-auto px-0 sm:px-4 min-h-screen">
        <AIReasoningConsole logs={logs} isVisible={false} />
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-6 bg-amber-50 border border-amber-100 rounded-[32px] flex items-center gap-4 text-amber-600 shadow-xl shadow-amber-500/5 relative z-50"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Icons.AlertCircle size={24} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">System Notice</p>
                <p className="font-bold text-sm leading-tight">{error}</p>
              </div>
              <button onClick={() => setError(null)} className="p-2 hover:bg-amber-200/50 rounded-xl transition-colors">
                <Icons.X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {workspace === WorkspaceMode.GALLERY ? (
            <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 sm:py-10 lg:py-12 space-y-8 sm:space-y-12">
               <div className="flex flex-col items-center text-center space-y-8">
                 <div className="space-y-3 px-3">
                   <h2 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase">{t.archive}</h2>
                   <p className="text-zinc-500 font-medium uppercase tracking-[0.2em] sm:tracking-widest text-[9px] sm:text-[10px] leading-relaxed">{savedDesigns.length} Curated Concepts In Intelligence Bank</p>
                 </div>

                 {/* Gallery Portions Switcher */}
                 <div className="relative grid grid-cols-2 gap-1 w-[calc(100vw-1.5rem)] max-w-[470px] rounded-[24px] sm:rounded-[28px] border border-white/80 bg-zinc-100/75 p-1 shadow-[inset_0_1px_8px_rgba(0,0,0,0.07),0_16px_42px_rgba(15,23,42,0.09)] backdrop-blur-xl">
                    <motion.div
                      className="pointer-events-none absolute bottom-1 top-1 w-[calc(50%-0.25rem)] overflow-hidden rounded-[20px] sm:rounded-[24px] shadow-[0_16px_34px_rgba(0,0,0,0.13)]"
                      initial={false}
                      animate={{ left: galleryTab === 'reimagine' ? '0.25rem' : '50%' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 32, mass: 0.85 }}
                    >
                      <div className="absolute -inset-10 animate-[spin-slow_3.5s_linear_infinite] bg-[conic-gradient(from_90deg,rgba(245,158,11,0.10),rgba(255,255,255,0.98),rgba(24,24,27,0.75),rgba(245,158,11,0.95),rgba(255,255,255,0.98),rgba(245,158,11,0.10))]"></div>
                      <div className="absolute inset-[1.5px] rounded-[18px] sm:rounded-[22px] border border-black bg-white"></div>
                    </motion.div>
                    <button 
                      onClick={() => setGalleryTab('reimagine')}
                      className={`relative z-10 min-h-[40px] sm:min-h-[46px] rounded-[20px] sm:rounded-[24px] px-3 md:px-7 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.18em] sm:tracking-[0.28em] transition-colors duration-300 ${galleryTab === 'reimagine' ? 'text-black' : 'text-zinc-400 hover:text-zinc-700'}`}
                    >
                      Design Studio
                    </button>
                    <button 
                      onClick={() => setGalleryTab('create')}
                      className={`relative z-10 min-h-[40px] sm:min-h-[46px] rounded-[20px] sm:rounded-[24px] px-3 md:px-7 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.18em] sm:tracking-[0.28em] transition-colors duration-300 ${galleryTab === 'create' ? 'text-black' : 'text-zinc-400 hover:text-zinc-700'}`}
                    >
                      Design Archive
                    </button>
                 </div>
               </div>
               
               {savedDesigns.filter(d => d.category === galleryTab).length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-14 sm:py-20 px-5 space-y-6 bg-zinc-50 rounded-[32px] sm:rounded-[64px] border border-dashed border-zinc-200">
                   <div className="w-24 h-24 bg-zinc-200 rounded-full flex items-center justify-center opacity-40"><Icons.Gallery size={40} /></div>
                   <div className="text-center">
                     <p className="text-zinc-400 font-bold uppercase tracking-widest text-xs">No saved concepts in this portion yet</p>
                     <p className="text-zinc-300 font-medium text-[9px] uppercase mt-2">Designs you archive will appear here automatically</p>
                   </div>
                   <button onClick={() => setWorkspace(WorkspaceMode.HOME)} className="px-8 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Start Designing</button>
                 </div>
               ) : (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {savedDesigns.filter(d => d.category === galleryTab).map(saved => {
                     const design = saved.data;
                     const isCreate = saved.category === 'create';
                     const displayImage = isCreate ? design.imageUrl : design.redesignedImage;
                     const displayTitle = isCreate ? 'AI Spatial Plan' : `${design.style} Suite`;
                     const displaySubtitle = isCreate ? `${saved.planningState?.area} SQ FT • ${saved.planningState?.houseType}` : getRoomTypeName(design.type, language);

                     return (
                       <motion.div 
                         key={saved.id} 
                         layoutId={saved.id}
                         onClick={() => setSelectedGalleryItem(saved)}
                         whileHover={{ y: -10 }}
                         className="neo-card rounded-[40px] overflow-hidden group cursor-pointer shadow-xl transition-all relative"
                       >
                          <div className="aspect-[4/3] relative overflow-hidden">
                            <img src={displayImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Saved Design" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                               <div className="bg-white text-black px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">View Details</div>
                            </div>
                            <button 
                              onClick={(e) => handleDeleteDesign(saved.id, e)}
                              className="absolute top-4 left-4 p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full z-10 transition-all hover:scale-110 active:scale-95 shadow-xl"
                            >
                              <Icons.X size={14} />
                            </button>
                            <div className="absolute top-6 right-6 px-4 py-2 bg-black/60 backdrop-blur-md text-white rounded-full text-[8px] font-black uppercase tracking-[0.2em] border border-white/20">
                              {new Date(saved.timestamp).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="p-8 space-y-2">
                             <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{displaySubtitle}</p>
                             <div className="flex justify-between items-center">
                               <h4 className="text-xl font-black uppercase tracking-tighter">{displayTitle}</h4>
                               {isCreate && <span className="p-2 bg-amber-100 text-amber-600 rounded-lg"><Box size={14} /></span>}
                             </div>
                          </div>
                       </motion.div>
                     );
                   })}
                 </div>
               )}

               {/* Full Screen Item Overlay */}
               <AnimatePresence>
                 {selectedGalleryItem && (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
                   >
                      <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl" onClick={() => setSelectedGalleryItem(null)} />
                      <button onClick={() => setSelectedGalleryItem(null)} className="absolute top-8 right-8 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center hover:bg-zinc-800 transition-all shadow-2xl z-[110]"><Icons.X size={24} /></button>
                       <div className="fixed top-8 right-32 flex gap-3 z-[110]">
                          <button 
                            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                            className={`w-auto px-6 h-14 rounded-full flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest transition-all ${isAutoPlaying ? 'bg-amber-500 text-white shadow-xl' : 'bg-white/40 text-black shadow-inner border border-black/5 hover:bg-white/60'}`}
                          >
                             <div className={`w-1.5 h-1.5 rounded-full ${isAutoPlaying ? 'bg-white animate-pulse' : 'bg-black/20'}`} />
                             {isAutoPlaying ? 'Active Scan' : 'Manual Mode'}
                          </button>
                       </div>
                      
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[64px] overflow-hidden shadow-[0_100px_200px_rgba(0,0,0,0.15)] flex flex-col lg:flex-row z-10 border border-black/5"
                      >
                         <div className="lg:w-2/3 h-[50vh] lg:h-auto bg-zinc-900 border-r border-zinc-100 overflow-hidden relative">
                            {selectedGalleryItem.category === 'create' ? (
                               <div className="w-full h-full p-4 md:p-12">
                                 <ComparisonSlider 
                                  before={selectedGalleryItem.data.twoDImageUrl} 
                                  after={selectedGalleryItem.data.imageUrl} 
                                  language={language} 
                                  isAutoPlaying={isAutoPlaying}
                                  onAutoPlayToggle={(v) => setIsAutoPlaying(v)}
                                 />
                               </div>
                            ) : (
                               <ComparisonSlider 
                                before={selectedGalleryItem.data.originalImage} 
                                after={selectedGalleryItem.data.redesignedImage} 
                                language={language} 
                                isAutoPlaying={isAutoPlaying}
                                onAutoPlayToggle={(v) => setIsAutoPlaying(v)}
                               />
                            )}
                         </div>
                         <div className="lg:w-1/3 p-12 overflow-y-auto space-y-10 bg-white">
                            <div className="space-y-4">
                               <div className="flex items-center gap-3">
                                  <span className="px-3 py-1 bg-zinc-100 rounded-full text-[8px] font-black uppercase tracking-widest text-zinc-500">{selectedGalleryItem.category === 'create' ? 'AI Synthesis' : 'Space Reimagine'}</span>
                                  <span className="text-[10px] font-bold text-zinc-300">• {new Date(selectedGalleryItem.timestamp).toLocaleDateString()}</span>
                               </div>
                               <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">
                                 {selectedGalleryItem.category === 'create' ? 'Architectural Transformation' : `${selectedGalleryItem.data.style} Masterpiece`}
                               </h3>
                               <p className="text-zinc-500 font-medium leading-relaxed">
                                {selectedGalleryItem.category === 'create' 
                                  ? `A high-fidelity spatial plan created for a ${selectedGalleryItem.planningState?.area} sq ft ${selectedGalleryItem.planningState?.houseType}.`
                                  : `Expert aesthetic redesign of a ${getRoomTypeName(selectedGalleryItem.data.type, language)} in ${selectedGalleryItem.data.style} style.`}
                               </p>
                            </div>

                            <button 
                              onClick={() => {
                                if (selectedGalleryItem.category === 'create') {
                                  setThreeDResult(selectedGalleryItem.data);
                                  setWorkspace(WorkspaceMode.CREATE);
                                } else {
                                  setResult(selectedGalleryItem.data);
                                  setStep(3);
                                  setWorkspace(WorkspaceMode.REIMAGINE);
                                }
                                setSelectedGalleryItem(null);
                              }}
                              className="w-full bg-black text-white py-6 rounded-3xl font-black uppercase text-[12px] tracking-[0.2em] shadow-3xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4"
                            >
                               Edit Design <ArrowRight size={18} />
                            </button>

                            <div className="pt-8 border-t border-zinc-100 space-y-4">
                               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Technical Brief</p>
                               <div className="grid grid-cols-2 gap-4">
                                  <div className="p-4 bg-zinc-50 rounded-2xl">
                                     <p className="text-[8px] font-black uppercase text-zinc-400 mb-1">Style</p>
                                     <p className="text-[10px] font-bold uppercase">{selectedGalleryItem.category === 'create' ? '3D Render' : selectedGalleryItem.data.style}</p>
                                  </div>
                                  <div className="p-4 bg-zinc-50 rounded-2xl">
                                     <p className="text-[8px] font-black uppercase text-zinc-400 mb-1">Status</p>
                                     <p className="text-[10px] font-bold uppercase text-emerald-500">Archived</p>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </motion.div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </motion.div>
          ) : workspace === WorkspaceMode.HOME ? (
            <motion.div key="home" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="py-3 sm:py-6 space-y-6 sm:space-y-10 lg:space-y-12">
               <div className="relative w-full rounded-[22px] sm:rounded-2xl overflow-hidden shadow-2xl min-h-[200px] group">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={bannerImgIndex} 
                      initial={{ scale: 1.1, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }} 
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute inset-0 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${BANNER_IMAGES[bannerImgIndex]})` }} 
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/95"></div>
                  <div className="relative z-10 p-5 sm:p-8 lg:p-10 flex flex-col items-center justify-center h-full min-h-[430px] sm:min-h-[380px] md:min-h-[360px] space-y-5 sm:space-y-6 text-center">
                    <div className="flex flex-col items-center gap-5">
                      <div className="space-y-4">
                        <span className="mx-auto bg-white/5 backdrop-blur-3xl text-white/50 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.26em] sm:tracking-[0.4em] px-4 sm:px-5 py-2 rounded-2xl border border-white/10 block w-fit">Spatial Intelligence v6.0</span>
                        <h1 className="text-4xl min-[390px]:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none italic">Archify <span className="text-amber-500 not-italic uppercase">AI.</span></h1>
                      </div>
                    </div>
                    <p className="max-w-md mx-auto text-white/45 font-medium text-[9px] sm:text-[10px] md:text-xs border-t border-white/10 pt-4 leading-relaxed uppercase tracking-[0.16em] sm:tracking-widest">
                      REIMAGINING ARCHITECTURAL BOUNDARIES THROUGH NEURAL RENDERING.
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 pt-1 sm:pt-2">
                       {[
                         "AI Interior & Exterior Redesign",
                         "2D-to-3D Visualization",
                         "One-Click 2D & 3D Plan Ready",
                         "Intelligent Spatial Planning"
                       ].map((cap, i) => (
                         <div key={i} className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/5 px-3 sm:px-4 py-2 rounded-2xl">
                           <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_8px_#f59e0b]" />
                           <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.08em] sm:tracking-[0.1em] text-white/60 leading-tight">{cap}</span>
                         </div>
                       ))}
                     </div>

                    <div className="grid grid-cols-1 min-[430px]:grid-cols-3 w-full max-w-[36rem] justify-center gap-2.5 sm:gap-3 pt-2 sm:pt-4">
                       {[
                         { icon: GalleryVertical, title: 'INPUT MEDIA', subtitle: 'SPATIAL FEED', color: '#6366f1', action: () => setWorkspace(WorkspaceMode.REIMAGINE), phase: 'input' },
                         { icon: Search, title: 'AI ANALYSIS', subtitle: 'PROCESSING', color: '#f59e0b', action: () => setWorkspace(WorkspaceMode.CREATE), phase: 'analysis' },
                         { icon: WizardsIcon, title: 'BOOM MAGIC', subtitle: 'FINAL OUTPUT', color: '#ec4899', action: () => setWorkspace(WorkspaceMode.REIMAGINE), phase: 'magic' }
                       ].map((btn, i) => {
                         const isActive = activeAnimIndex === i;
                         const isCompleted = activeAnimIndex === null || activeAnimIndex > i;
                         return (
                          <motion.div
                            key={i}
                            onClick={btn.action}
                            initial={{ opacity: 0, y: 15 }}
                            animate={isActive ? {
                              opacity: 1,
                              y: 0,
                              boxShadow: `0 18px 45px ${btn.color}24`,
                              borderColor: `${btn.color}55`,
                              backgroundColor: 'rgba(255,255,255,0.28)'
                            } : {
                              opacity: isCompleted ? 0.68 : 0.88,
                              y: 0,
                              boxShadow: '0 14px 34px rgba(0,0,0,0.18)',
                              borderColor: 'rgba(255,255,255,0.14)',
                              backgroundColor: isCompleted ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.20)'
                            }}
                            transition={{ 
                              opacity: { duration: 0.35 },
                              boxShadow: { duration: 0.45, ease: "easeOut" },
                              borderColor: { duration: 0.45, ease: "easeOut" },
                              backgroundColor: { duration: 0.45, ease: "easeOut" }
                            }}
                            whileHover={{ y: -2, opacity: 1 }}
                            className="group relative flex flex-col items-center justify-center gap-2 backdrop-blur-3xl border p-3 sm:p-4 rounded-[1.4rem] sm:rounded-[2rem] cursor-pointer transition-colors min-h-[82px] sm:h-[95px] overflow-hidden"
                          >
                             <AnimatePresence>
                               {isActive && btn.phase === 'input' && (
                                 <span className="absolute inset-0 rounded-[inherit] border border-indigo-300/45" />
                               )}
                               {isActive && btn.phase === 'analysis' && (
                                 <span className="absolute inset-0 rounded-[inherit] border border-amber-300/55" />
                               )}
                               {isActive && btn.phase === 'magic' && (
                                 <motion.div
                                   initial={{ opacity: 0, scale: 0.95 }}
                                   animate={{ opacity: [0.18, 0.34, 0.18], scale: [0.95, 1.04, 0.95] }}
                                   exit={{ opacity: 0 }}
                                   transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                                   className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_50%_18%,rgba(236,72,153,0.34),transparent_46%),linear-gradient(135deg,transparent,rgba(236,72,153,0.18),transparent)]"
                                 />
                               )}
                             </AnimatePresence>

                             <motion.div
                               animate={isActive ? { scale: [1, 1.07, 1], rotate: btn.phase === 'magic' ? [0, -8, 8, 0] : 0 } : { scale: 1, rotate: 0 }}
                               transition={{ duration: btn.phase === 'magic' ? 1.15 : 1.6, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
                               className="relative z-10 w-9 h-9 rounded-2xl flex items-center justify-center bg-black/60 text-white shadow-2xl transition-transform group-hover:scale-105"
                             >
                                <btn.icon size={16} style={{ color: btn.color }} />
                               {isActive && btn.phase === 'input' && (
                                 <motion.span
                                   initial={{ y: -16, opacity: 0 }}
                                   animate={{ y: [-16, 0, 16], opacity: [0, 1, 0] }}
                                   transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut' }}
                                   className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-indigo-300 shadow-[0_0_10px_rgba(129,140,248,0.9)]"
                                 />
                               )}
                               {isActive && btn.phase === 'analysis' && (
                                 <>
                                   <motion.span
                                     animate={{ rotate: 360 }}
                                     transition={{ duration: 1.25, repeat: Infinity, ease: 'linear' }}
                                     className="absolute inset-1 rounded-xl border border-dashed border-amber-300/60"
                                   />
                                   <motion.span
                                     animate={{ scale: [0.65, 1, 0.65], opacity: [0.35, 1, 0.35] }}
                                     transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
                                     className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]"
                                   />
                                 </>
                               )}
                               {isActive && btn.phase === 'magic' && (
                                 <>
                                   {[0, 1, 2].map((spark) => (
                                     <motion.span
                                       key={spark}
                                       initial={{ opacity: 0, scale: 0.5 }}
                                       animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5], x: [0, spark === 1 ? 12 : -10, 0], y: [0, spark === 2 ? 12 : -10, 0] }}
                                       transition={{ duration: 1.2, repeat: Infinity, delay: spark * 0.24, ease: 'easeInOut' }}
                                       className="absolute h-1.5 w-1.5 rounded-full bg-pink-300 shadow-[0_0_12px_rgba(244,114,182,0.95)]"
                                     />
                                   ))}
                                 </>
                               )}
                             </motion.div>
                             <div className="relative z-10 flex flex-col items-center text-center">
                                <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white leading-tight drop-shadow-sm">{btn.title}</p>
                                <p className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-white/60">{btn.subtitle}</p>
                             </div>
                             {i === 2 && isActive && (
                               <motion.div 
                                 animate={{ scale: [1, 1.035, 1], opacity: [0.2, 0.55, 0.2] }}
                                 transition={{ duration: 1.4, repeat: Infinity }}
                                 className="absolute inset-0 rounded-3xl border border-pink-400/60"
                               />
                             )}
                             <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                          </motion.div>
                         );
                       })}
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <motion.div 
                    whileHover={{ y: -6 }}
                    onClick={() => setWorkspace(WorkspaceMode.REIMAGINE)}
                    className="group relative min-h-[300px] sm:min-h-[380px] overflow-hidden rounded-[26px] sm:rounded-[34px] border border-white/70 bg-white shadow-[0_24px_70px_-34px_rgba(15,23,42,0.45)] cursor-pointer transition-all"
                  >
                    <img
                      src="/eroom2_d.jpg"
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-[0.13] saturate-[0.85] transition-all duration-700 group-hover:scale-[1.035] group-hover:opacity-[0.2]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-indigo-50/70" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(99,102,241,0.10),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.72),rgba(255,255,255,0.88)_48%,rgba(255,255,255,0.55))]" />
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                    <div className="relative z-10 flex min-h-[300px] sm:min-h-[380px] flex-col justify-between p-6 sm:p-8 text-left">
                       <div className="flex items-start justify-between gap-4">
                         <div className="rounded-full border border-zinc-200 bg-white/75 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.22em] text-zinc-500 shadow-sm">
                           Image Suite
                         </div>
                         <div className="relative h-14 w-14 rounded-2xl bg-black text-white shadow-[0_18px_45px_rgba(0,0,0,0.22)] flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-3">
                           <GalleryVertical size={22} />
                           <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-amber-500 shadow-[0_0_14px_rgba(245,158,11,0.7)]" />
                         </div>
                       </div>

                       <div className="space-y-5">
                         <div className="space-y-2">
                           <h3 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase leading-none text-zinc-950">{t.workspaces.reimagine.title}</h3>
                           <p className="max-w-sm text-[11px] sm:text-xs font-medium leading-relaxed text-zinc-500">{t.workspaces.reimagine.subtitle}</p>
                         </div>
                         <div className="grid gap-2">
                            {t.workspaces.reimagine.caps.slice(0, 3).map((c: string) => (
                              <div key={c} className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.16em] text-zinc-700">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-950 text-[8px] text-white">✓</span>
                                {c}
                              </div>
                            ))}
                         </div>
                       </div>

                       <div className="flex items-center justify-between border-t border-zinc-100 pt-5">
                         <span className="text-[9px] font-black uppercase tracking-[0.24em] text-zinc-400">Visual Transformation</span>
                         <div className="h-11 w-11 rounded-full bg-zinc-950 text-white flex items-center justify-center transition-all group-hover:bg-amber-500 group-hover:translate-x-1">
                           <ArrowRight size={17} />
                         </div>
                       </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -6 }}
                    onClick={() => setWorkspace(WorkspaceMode.CREATE)}
                    className="group relative min-h-[300px] sm:min-h-[380px] overflow-hidden rounded-[26px] sm:rounded-[34px] border border-white/70 bg-white shadow-[0_24px_70px_-34px_rgba(15,23,42,0.45)] cursor-pointer transition-all"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-white/95 to-amber-50/80" />
                    <img
                      src="/2dplan.jpg"
                      alt=""
                      className="absolute -right-16 top-8 h-[58%] w-[64%] object-contain opacity-[0.11] saturate-0 contrast-125 transition-all duration-700 group-hover:opacity-[0.16] group-hover:-translate-y-1"
                    />
                    <img
                      src="/3dplan.jpg"
                      alt=""
                      className="absolute bottom-3 right-4 h-[44%] w-[52%] object-contain opacity-[0.13] saturate-[0.7] transition-all duration-700 group-hover:opacity-[0.19] group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(245,158,11,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.25)_1px,transparent_1px)] [background-size:34px_34px]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/82 to-white/35" />
                    <div className="absolute right-8 top-8 h-28 w-28 rounded-full border border-amber-500/10" />
                    <div className="relative z-10 flex min-h-[300px] sm:min-h-[380px] flex-col justify-between p-6 sm:p-8 text-left">
                       <div className="flex items-start justify-between gap-4">
                         <div className="rounded-full border border-zinc-200 bg-white/75 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.22em] text-zinc-500 shadow-sm">
                           Planning Suite
                         </div>
                         <div className="relative h-14 w-14 rounded-2xl bg-black text-white shadow-[0_18px_45px_rgba(0,0,0,0.22)] flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-3">
                           <LayoutGrid size={22} />
                           <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-amber-500 shadow-[0_0_14px_rgba(245,158,11,0.7)]" />
                         </div>
                       </div>

                       <div className="space-y-5">
                         <div className="space-y-2">
                           <h3 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase leading-none text-zinc-950">{t.workspaces.create.title}</h3>
                           <p className="max-w-sm text-[11px] sm:text-xs font-medium leading-relaxed text-zinc-500">{t.workspaces.create.subtitle}</p>
                         </div>
                         <div className="grid gap-2">
                            {t.workspaces.create.caps.slice(0, 3).map((c: string) => (
                              <div key={c} className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.16em] text-zinc-700">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[8px] text-white">✓</span>
                                {c}
                              </div>
                            ))}
                         </div>
                       </div>

                       <div className="flex items-center justify-between border-t border-zinc-100 pt-5">
                         <span className="text-[9px] font-black uppercase tracking-[0.24em] text-zinc-400">Spatial Generation</span>
                         <div className="h-11 w-11 rounded-full bg-zinc-950 text-white flex items-center justify-center transition-all group-hover:bg-amber-500 group-hover:translate-x-1">
                           <ArrowRight size={17} />
                         </div>
                       </div>
                    </div>
                  </motion.div>
                </div>
            </motion.div>
          ) : workspace === WorkspaceMode.REIMAGINE ? (
            <motion.div key="reimagine" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
               <AIInteriorGenerator 
                language={language}
                onUpload={handleUpload}
                onCancel={reset}
                isLoading={isLoading}
                onGenerate={handleGenerationFromAIInterface}
                onRefine={handleRefine}
                result={result}
                history={history as any[]}
                onArchive={handleArchive}
                onUpdateResult={setResult}
                logs={logs}
                isSimulating={isSimulating}
                generationMode={generationMode}
               />
            </motion.div>

          ) : workspace === WorkspaceMode.CREATE ? (
            <PlanningWorkspace 
              key="create" 
              language={language} 
              onCancel={reset} 
              initialResult={threeDResult} 
              onSimulate={runSimulation}
              generationMode={generationMode}
              onArchive={handlePlanningArchive}
            />
          ) : null}
        </AnimatePresence>
      </div>

    </Layout>
  );
};

export default App;
