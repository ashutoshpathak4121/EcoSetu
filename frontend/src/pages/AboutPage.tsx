import React from 'react';
import { ShieldCheck, Award, Heart, CheckCircle2, Recycle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          About SwachhSetu
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Bridge to Cleanliness – WasteChakra Concept
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Developed by <strong>Team MazeRunners</strong> for <strong>Techathon 2026</strong>, SwachhSetu tackles the root bottleneck of urban Indian sanitation: improper segregation at source.
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
            The SwachhSetu Solution
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

      <div className="border-t border-gray-200 pt-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Team MazeRunners • Techathon 2026</h3>
        <p className="text-xs text-gray-500 max-w-lg mx-auto">
          Built with an enterprise software architecture: React 18, Node.js Express TypeScript, Prisma ORM, PostgreSQL, Python FastAPI Computer Vision microservice, and Docker containerization.
        </p>
      </div>
    </div>
  );
};

