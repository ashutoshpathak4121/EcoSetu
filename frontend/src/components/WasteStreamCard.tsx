import React from 'react';
import { WasteStream } from '../../../shared/types';
import { Apple, Box, AlertTriangle, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

interface WasteStreamCardProps {
  stream: WasteStream;
  detailed?: boolean;
}

export const WasteStreamCard: React.FC<WasteStreamCardProps> = ({ stream, detailed = false }) => {
  const streamConfig = {
    [WasteStream.WET]: {
      name: 'Wet Waste (Organic)',
      color: 'border-emerald-500 bg-emerald-50/50',
      badgeBg: 'bg-emerald-600 text-white',
      icon: Apple,
      binType: 'Green Section of Divided Bag (In Dustbin)',
      description: 'Biodegradable kitchen scraps, vegetable/fruit peels, cooked leftovers, tea bags, eggshells.',
      dos: [
        'Drain excess gravy/liquids before disposing',
        'Store in green side of SwachhSetu divided liner',
        'Composted at decentralized society pits',
      ],
      donts: ['Never put plastic wrappers or milk pouches in wet section', 'Do not mix bones or thick hard shells with kitchen compost'],
    },
    [WasteStream.DRY]: {
      name: 'Dry Waste (Recyclable)',
      color: 'border-blue-500 bg-blue-50/50',
      badgeBg: 'bg-blue-600 text-white',
      icon: Box,
      binType: 'Blue Section of Divided Bag (In Dustbin)',
      description: 'Paper, cardboard, milk pouches (rinsed & dried), PET bottles, beverage cans, glass jars.',
      dos: [
        'Rinse milk packets and dry them before putting in blue bag',
        'Flatten cardboard boxes and crush plastic bottles',
        'Baled at society baler for B2B recycler marketplace',
      ],
      donts: ['Never put greasy food-stained pizza boxes in dry stream', 'Never mix wet tea leaves with paper'],
    },
    [WasteStream.SANITARY]: {
      name: 'Sanitary Waste',
      color: 'border-rose-500 bg-rose-50/50',
      badgeBg: 'bg-rose-600 text-white',
      icon: AlertTriangle,
      binType: 'Red Add-on Pouch (Mounted beside Dustbin)',
      description: 'Sanitary napkins, baby/adult diapers, medical bandages, sterile gauze, cotton swabs.',
      dos: [
        'Wrap securely in newspaper or paper wrapper',
        'Mark with a prominent RED DOT or red sticker',
        'Place into dedicated SwachhSetu sanitary add-on pouch',
      ],
      donts: ['Never throw sanitary items loosely into common dustbin', 'Never flush diapers or pads into toilets'],
    },
    [WasteStream.SPECIAL_CARE]: {
      name: 'Special-Care (Domestic Hazardous)',
      color: 'border-amber-500 bg-amber-50/50',
      badgeBg: 'bg-amber-600 text-white',
      icon: ShieldAlert,
      binType: 'Yellow Safe-Box Add-on Container',
      description: 'Discarded batteries, CFL/fluorescent tubes, blister pill packs, broken thermometers, pesticide bottles.',
      dos: [
        'Store separately in yellow rigid container',
        'Keep out of reach of children and pets',
        'Hand directly to authorized collector for TSDF treatment',
      ],
      donts: ['Never smash tube lights or break mercury bulbs', 'Never mix lithium batteries with general waste'],
    },
  };

  const item = streamConfig[stream];
  const Icon = item.icon;

  return (
    <div className={`rounded-xl border-2 p-5 bg-white shadow-sm transition-all hover:shadow-card-hover ${item.color}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-lg ${item.badgeBg}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base">{item.name}</h3>
            <span className="text-xs font-medium text-gray-500">{item.binType}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-xs sm:text-sm mb-4 leading-relaxed">{item.description}</p>

      {detailed && (
        <div className="space-y-3 pt-3 border-t border-gray-200/60 text-xs">
          <div>
            <div className="font-semibold text-emerald-800 flex items-center gap-1.5 mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Correct Practices (Do's)
            </div>
            <ul className="space-y-1 text-gray-600 list-disc list-inside pl-1">
              {item.dos.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-semibold text-rose-800 flex items-center gap-1.5 mb-1.5">
              <XCircle className="w-4 h-4 text-rose-600" />
              Prohibited (Don'ts)
            </div>
            <ul className="space-y-1 text-gray-600 list-disc list-inside pl-1">
              {item.donts.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

