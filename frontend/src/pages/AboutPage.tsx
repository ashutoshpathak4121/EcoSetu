import React from 'react';
import { ShieldCheck, Award, Heart, CheckCircle2, Recycle, Linkedin } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <div className="flex justify-center mb-2">
          <img src="/logo-transparent.png" alt="EcoSetu Logo" className="h-20 w-auto object-contain" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          About EcoSetu
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Bridge to Cleanliness – WasteChakra Concept
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Developed by <strong>Ashutosh Pathak</strong>, EcoSetu tackles the root bottleneck of urban Indian sanitation: improper segregation at source.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <h2 className="text-2xl font-bold text-gray-900">The Problem in Indian Cities</h2>
          <p>
            In Indian municipalities (like Delhi MCD, BMC, or BBMP), despite thousands of sanitation workers and collection trucks, over 70% of collected garbage ends up as mixed muck at overflowing landfill hills like Ghazipur, Bhalswa, and Okhla.
          </p>
          <p>
            Why? Because households mix wet organic leftovers with dry plastics, hazardous batteries, and sanitary napkins in a single container. Once contaminated, recyclables lose their value and composting organic pits get polluted with microplastics.
          </p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200 space-y-3 text-xs text-forest-900">
          <h3 className="font-bold text-base flex items-center gap-1.5 text-forest-800">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            The EcoSetu Solution
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Physical divided bag:</strong> Fits right inside any existing 15L household dustbin. Green side for wet; Blue side for dry.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Add-on arrangements:</strong> Red dot pouch for sanitary waste; Yellow container for domestic hazardous items.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span><strong>Digital traceability:</strong> Doorstep QR scanning, AI computer vision verification, and green credit ledger rewards.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Creator Profile & Bio Data */}
      <div className="bg-gradient-to-br from-forest-900 to-slate-900 text-white p-8 rounded-3xl border border-forest-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg border-2 border-emerald-300 flex-shrink-0">
            AP
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              Lead Software Architect & Developer
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">Ashutosh Pathak</h3>
            <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
              Sole creator, software architect, and full-stack engineer of <strong>EcoSetu</strong>. Conceptualized and engineered the complete physical-to-digital civic technology architecture spanning React 18, Node.js Express, PostgreSQL Prisma, and Python FastAPI Computer Vision.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-forest-800/80 text-xs">
          <div className="bg-forest-800/50 p-3.5 rounded-xl border border-forest-700/60">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">Architecture</span>
            <p className="text-gray-200">End-to-end full-stack design: 6-portal frontend, REST API, & OpenCV AI verification</p>
          </div>
          <div className="bg-forest-800/50 p-3.5 rounded-xl border border-forest-700/60">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">Ecosystem Concept</span>
            <p className="text-gray-200">WasteChakra 4-stream physical bin segregation + immutable green credit ledger</p>
          </div>
          <div className="bg-forest-800/50 p-3.5 rounded-xl border border-forest-700/60">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">Connect with Developer</span>
            <a 
              href="https://www.linkedin.com/in/ashutoshpathak51/" 
              target="_blank" 
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold underline mt-1 inline-flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-400" />
              <span>linkedin.com/in/ashutoshpathak51</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

