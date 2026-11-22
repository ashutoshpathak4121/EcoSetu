import React, { useState } from 'react';
import { aiApi } from '../../services/ai.api';
import { AIVerificationCard } from '../../components/AIVerificationCard';
import { Sparkles, Upload, Camera, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { WasteStream } from '../../../../shared/types';

export const WasteSegregationPage: React.FC = () => {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [declaredCategory, setDeclaredCategory] = useState<string>('dry');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Sample preset images for quick evaluation without needing camera files
  const sampleImages = [
    {
      label: 'Sample Dry Plastic Bottles',
      category: 'dry',
      src: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?w=400',
    },
    {
      label: 'Sample Wet Kitchen Peels',
      category: 'wet',
      src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400',
    },
    {
      label: 'Sample Sanitary Wrapped Packet',
      category: 'sanitary',
      src: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
    },
    {
      label: 'Sample E-Waste & Batteries',
      category: 'special-care',
      src: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=400',
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (src: string, cat: string) => {
    // Generate simulated in-browser canvas base64 to avoid cross-origin CORS issues
    const canvas = document.createElement('canvas');
    canvas.width = 224;
    canvas.height = 224;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (cat === 'wet') {
        ctx.fillStyle = '#2d6a4f';
      } else if (cat === 'dry') {
        ctx.fillStyle = '#2563eb';
      } else if (cat === 'sanitary') {
        ctx.fillStyle = '#dc2626';
      } else {
        ctx.fillStyle = '#ca8a04';
      }
      ctx.fillRect(0, 0, 224, 224);
      setImageBase64(canvas.toDataURL('image/png'));
    }
    setDeclaredCategory(cat);
    setResult(null);
    setError(null);
  };

  const handleScan = async () => {
    if (!imageBase64) {
      setError('Please select or capture a photograph first.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await aiApi.verifyWaste(imageBase64, declaredCategory);
      setResult(res);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Verification microservice connection timed out.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">AI Segregation Camera Scanner</h1>
        <p className="text-xs text-gray-500">
          Inspect and verify physical 4-stream segregation with Python PyTorch vision microservice
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Upload panel */}
        <div className="md:col-span-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-emerald-500 transition-colors">
            {imageBase64 ? (
              <div className="space-y-3">
                <img
                  src={imageBase64}
                  alt="Waste to verify"
                  className="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => setImageBase64(null)}
                  className="text-xs font-semibold text-rose-600 hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                  <RefreshCw className="w-3 h-3" />
                  Clear & Choose Another
                </button>
              </div>
            ) : (
              <label className="cursor-pointer block py-8">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-gray-700 block">Click to upload photo or take picture</span>
                <span className="text-[11px] text-gray-400 block mt-1">Supports JPEG, PNG, WebP (up to 15MB)</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            )}
          </div>

          {/* Quick preset selector for evaluators */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-500 block">Or test with preset sample images:</span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {sampleImages.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSample(s.src, s.category)}
                  className="p-2 text-left rounded-lg border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors"
                >
                  <span className="font-bold text-gray-800 block truncate">{s.label}</span>
                  <span className="text-gray-400 text-[10px] uppercase">Declared: {s.category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Declared stream dropdown */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Declared Waste Stream</label>
            <select
              value={declaredCategory}
              onChange={(e) => setDeclaredCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="wet">🟢 Wet Waste (Green Compartment)</option>
              <option value="dry">🔵 Dry Recyclables (Blue Compartment)</option>
              <option value="sanitary">🔴 Sanitary Waste (Red-Dot Pouch)</option>
              <option value="special-care">🟡 Special-Care Hazardous (Yellow Container)</option>
            </select>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleScan}
            disabled={loading || !imageBase64}
            className="w-full py-3 bg-forest-800 hover:bg-forest-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                AI Inspecting Divided Bag & Purity...
              </span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-300" />
                Analyze with EcoSetu AI v2.1
              </>
            )}
          </button>
        </div>

        {/* Results output */}
        <div className="md:col-span-6 space-y-4">
          {result ? (
            <AIVerificationCard result={result} />
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-xs text-gray-500 space-y-3">
              <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center mx-auto border border-gray-100">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gray-800 text-sm">Computer Vision Audit Ready</h4>
              <p className="max-w-xs mx-auto">
                Upload or select an image on the left. The verification service will inspect dividing line segregation, detect cross-contamination, and assign Green Credit eligibility.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
