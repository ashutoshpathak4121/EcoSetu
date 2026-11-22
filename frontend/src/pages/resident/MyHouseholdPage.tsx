import React, { useEffect, useState } from 'react';
import { householdApi } from '../../services/household.api';
import { QrCode, Building, MapPin, Printer, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const MyHouseholdPage: React.FC = () => {
  const [household, setHousehold] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHh = async () => {
      try {
        const data = await householdApi.getMyHousehold();
        setHousehold(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchHh();
  }, []);

  const qrUrl = household?.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${household?.qrCodeHash || 'HH-DL-WZ1-0042'}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Household Digital Pass</h1>
          <p className="text-xs text-gray-500">Official Municipal Identification & Doorstep Scannable Token</p>
        </div>
        <button
          onClick={handlePrint}
          className="px-4 py-2.5 bg-forest-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm hover:bg-forest-700"
        >
          <Printer className="w-4 h-4" />
          Print Doorstep Badge
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Printable Physical Badge */}
        <div className="md:col-span-5 bg-white border-2 border-forest-800 rounded-3xl p-6 shadow-xl text-center space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-700 block">
              Municipal Corporation of Delhi • SBM 2.0
            </span>
            <h3 className="text-lg font-black text-forest-900 tracking-tight">EcoSetu Household Token</h3>
          </div>

          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 inline-block shadow-inner">
            <img src={qrUrl} alt="Household Doorstep QR Code" className="w-48 h-48 mx-auto rounded-lg" />
          </div>

          <div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Household ID</div>
            <div className="text-xl font-mono font-black text-gray-900 tracking-wider">
              {household?.householdId || 'HH-DL-WZ1-0042'}
            </div>
            <div className="text-xs font-bold text-emerald-800 mt-1">
              Flat {household?.flatNumber || 'B-402'}, {household?.wingBlock || 'Block B'}
            </div>
            <div className="text-[11px] text-gray-500">{household?.society?.name || 'Gulmohar Enclave RWA'}</div>
          </div>

          <div className="pt-2 text-[10px] text-gray-400 border-t border-gray-100 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Mount on your entrance door for authorized collector scanning
          </div>
        </div>

        {/* Associated Metadata & Details */}
        <div className="md:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">
              Registration & Administrative Mapping
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-gray-400 font-semibold block">Locality Code</span>
                <span className="font-mono font-bold text-gray-900 block">{household?.locality?.code || 'LOC-DL-WZ1-04'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-gray-400 font-semibold block">Municipal Ward</span>
                <span className="font-bold text-gray-900 block">{household?.locality?.ward || 'Ward 203 (Mayur Vihar)'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-gray-400 font-semibold block">Municipal Zone</span>
                <span className="font-bold text-gray-900 block">{household?.locality?.zone || 'East Zone, MCD'}</span>
              </div>
              <div className="space-y-1">
                <span className="text-gray-400 font-semibold block">Pincode</span>
                <span className="font-bold text-gray-900 block">{household?.locality?.pincode || '110091'}</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 space-y-3 text-xs text-forest-900">
            <h4 className="font-bold text-sm text-forest-800 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Doorstep Handover Protocol
            </h4>
            <p className="leading-relaxed">
              When the municipal electric sanitation vehicle rings your floor doorbell:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 text-gray-700">
              <li>Keep your divided bag handles ready (Wet in Green, Dry in Blue).</li>
              <li>Collector Rajesh Kumar will scan this QR sticker to open today’s collection manifest.</li>
              <li>Collector inspects the segregation quality and records weight in the mobile collector portal.</li>
              <li>Upon verified transfer, <strong>+20 Green Credits</strong> automatically credit to your wallet.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

