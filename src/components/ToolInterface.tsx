import React, { useState, useRef } from 'react';
import { Bot, ChevronDown, ImagePlus, Loader2 } from 'lucide-react';
import { STYLES } from '../data';

interface ToolInterfaceProps {
  onImageGenerated: (url: string) => void;
}

export function ToolInterface({ onImageGenerated }: ToolInterfaceProps) {
  const [selectedStyle, setSelectedStyle] = useState<string>('mosaic');
  const [customizePrompt, setCustomizePrompt] = useState(false);
  const [customPromptText, setCustomPromptText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generationCount, setGenerationCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setErrorMsg('');
    }
  };

  const handleGenerate = async () => {
    if (generationCount >= 3 || !selectedFile) return;
    
    setIsGenerating(true);
    setErrorMsg('');
    try {
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: base64Image,
          style: selectedStyle,
          customPrompt: customizePrompt ? customPromptText : ''
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      if (data.imageUrl) {
        onImageGenerated(data.imageUrl);
        setGenerationCount(prev => prev + 1);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during generation');
    } finally {
      setIsGenerating(false);
    }
  };

  const limitReached = generationCount >= 3;

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-10 shadow-xl border border-outline/20 text-left w-full mt-8 sm:mt-12 font-label">
      {/* Model Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-on-surface mb-2">Model</label>
        <div className="relative">
          <select className="block w-full pl-10 pr-10 py-3 text-base border border-outline-variant focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-xl appearance-none bg-surface-container-low cursor-pointer text-on-surface">
            <option value="timbrooks/instruct-pix2pix">timbrooks/instruct-pix2pix</option>
            <option value="gemini-3.1-flash-lite-image" disabled>gemini-3.1-flash-lite-image (paid user)</option>
          </select>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bot className="h-5 w-5 text-on-surface-variant" />
          </div>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDown className="h-5 w-5 text-on-surface-variant" />
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-on-surface mb-2">Image</label>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
          accept="image/jpeg, image/png, image/webp" 
        />
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="mt-2 flex justify-center px-6 pt-12 pb-12 border-2 border-outline-variant hover:border-primary/50 border-dashed rounded-2xl bg-surface hover:bg-surface-container-low transition-all duration-200 cursor-pointer group"
        >
          <div className="space-y-3 text-center">
            <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-200">
              <ImagePlus className="h-7 w-7" />
            </div>
            <div className="text-sm text-on-surface mt-4">
              <span className="font-semibold text-base">
                {selectedFile ? selectedFile.name : 'Click to upload'}
              </span>
              {!selectedFile && <span className="font-normal text-on-surface-variant"> or drag and drop</span>}
              <br />
              {!selectedFile && (
                <span className="text-xs text-on-surface-variant/70 mt-2 block">SVG, PNG, JPG or WEBP (max. 20MB)</span>
              )}
            </div>
            <button 
              type="button" 
              className="mt-4 text-primary font-medium text-sm hover:underline cursor-pointer"
            >
              {selectedFile ? 'Change File' : 'Browse Files'}
            </button>
          </div>
        </div>
      </div>

      {/* Style Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-on-surface mb-4">Choose image style</label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-5">
          {STYLES.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className="flex flex-col items-center gap-3 group cursor-pointer"
                type="button"
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-offset-2 ring-offset-surface-container-lowest transition-all flex items-center justify-center ${isSelected ? 'ring-primary scale-105 shadow-md' : 'ring-transparent group-hover:ring-primary/30 group-hover:scale-105'} ${!style.src ? 'bg-secondary-container' : ''}`}>
                  {style.src ? (
                    <img 
                      src={style.src} 
                      alt={style.label} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <span className="text-xs text-on-secondary-container text-center leading-tight whitespace-pre-line font-bold">
                      {style.label}
                    </span>
                  )}
                </div>
                <span className={`text-sm font-medium whitespace-nowrap transition-colors ${isSelected ? 'text-primary' : 'text-on-surface-variant group-hover:text-on-surface'}`}>
                  {style.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-on-surface mb-2">Ratio</label>
          <div className="relative w-1/3 min-w-[120px]">
            <select className="block w-full pl-4 pr-10 py-2.5 text-base border border-outline-variant focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-xl appearance-none bg-surface-container-low cursor-pointer text-on-surface">
              <option>2:3</option>
              <option>1:1</option>
              <option>3:2</option>
              <option>16:9</option>
              <option>9:16</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-5 w-5 text-on-surface-variant" />
            </div>
          </div>
        </div>
        
        <div 
          className="flex items-center justify-between py-2 cursor-pointer"
          onClick={() => setCustomizePrompt(!customizePrompt)}
        >
          <span className="text-sm font-medium text-on-surface select-none">Customize Prompt</span>
          <button
            type="button"
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              customizePrompt ? 'bg-primary' : 'bg-surface-variant'
            }`}
            role="switch"
            aria-checked={customizePrompt}
            onClick={(e) => {
              e.stopPropagation();
              setCustomizePrompt(!customizePrompt);
            }}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-surface-container-lowest shadow ring-0 transition duration-200 ease-in-out ${
                customizePrompt ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        {customizePrompt && (
          <div className="mt-2 relative">
            <textarea
              value={customPromptText}
              onChange={(e) => setCustomPromptText(e.target.value)}
              placeholder="E.g., Make it look like a rainy day in a cyberpunk city..."
              maxLength={100}
              className="w-full px-4 py-3 pb-8 text-sm border border-outline-variant focus:outline-none focus:ring-primary focus:border-primary rounded-xl bg-surface-container-low text-on-surface resize-y min-h-[80px]"
            />
            <div className="absolute bottom-4 right-3 text-xs text-on-surface-variant">
              {customPromptText.length}/100
            </div>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <div className="flex flex-col items-center gap-2 mt-4">
        {errorMsg && (
          <div className="w-full p-3 rounded-xl bg-error/10 text-error text-sm font-medium">
            {errorMsg}
          </div>
        )}
        <button 
          disabled={!selectedFile || limitReached || isGenerating}
          onClick={handleGenerate}
          className={`w-full flex justify-center items-center font-bold text-lg py-4 rounded-2xl transition-all duration-300 ${
            !selectedFile || limitReached || isGenerating
              ? 'bg-surface-variant text-on-surface-variant/50 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary to-primary-container text-on-primary cursor-pointer hover:shadow-lg hover:opacity-95 shadow-md transform hover:-translate-y-0.5' 
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </>
          ) : limitReached ? 'Free Limit Reached' : 'Generate Artwork'}
        </button>
        <span className="text-xs text-on-surface-variant">
          {3 - generationCount} free generations remaining
        </span>
      </div>
    </div>
  );
}
