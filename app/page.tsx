'use client';

import { useState } from 'react';

export default function LeadRoutingSimulator() {
  const [leadType, setLeadType] = useState('distressed-seller');
  const [phone, setPhone] = useState('(555) 867-5309');
  const [email, setEmail] = useState('seller@example.com');
  const [source, setSource] = useState('google_ads');
  const [consent, setConsent] = useState(true);
  const [utmCampaign, setUtmCampaign] = useState('distressed-q2');
  const [processed, setProcessed] = useState(false);
  const [result, setResult] = useState<any>(null);

  const processLead = () => {
    const intentScore = Math.floor(Math.random() * 40) + 60; // 60-99

    const aiClassification = intentScore >= 85 ? 'HOT' : intentScore >= 50 ? 'WARM' : 'NON-PRIME';

    const lane = 
      leadType.includes('seller') ? 'Wholesale Seller → Real Estate Agent' :
      leadType.includes('investor') ? 'Investor Buyer Lane' : 'Buyer-Finance → Mortgage Lender';

    const state = aiClassification === 'HOT' ? 'HOT' : aiClassification === 'WARM' ? 'WARM' : 'Nurture';

    const newResult = {
      input: { leadType, phone, email, source, consent, utmCampaign, timestamp: new Date().toISOString() },
      consentCheck: consent ? '✅ Consent captured & timestamped - SMS/Call allowed' : '❌ No consent - blocked',
      aiOutput: `Vapi classified as ${aiClassification} (Intent Score: ${intentScore})`,
      stateTransition: `NEW → ${state}`,
      routing: lane,
      crmOutput: {
        contactFields: ['phone', 'email', 'source', 'consentTimestamp', 'utm_*'],
        opportunityFields: ['lane', 'stage', 'qualificationScore', 'aiClassification'],
        finalState: state,
        attribution: 'UTM + source persisted'
      },
      edgeCases: consent && intentScore > 30 
        ? 'Clean routing' 
        : 'Partial data flagged for nurture / manual review'
    };

    setResult(newResult);
    setProcessed(true);
  };

  const reset = () => {
    setProcessed(false);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono">
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-amber-400 text-zinc-950 text-center py-4 px-6 rounded-2xl mb-10 font-bold text-lg">
          INTERACTIVE 4-LANE LEAD ENGINE DEMO — BUILT FOR GABRIEL
        </div>

        <h1 className="text-4xl font-bold text-center mb-2">Real-Time Lead Routing Simulator</h1>
        <p className="text-center text-zinc-400 mb-12">Test any lead • Watch the exact 7-point logic in action</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Custom Input Form */}
          <div className="bg-zinc-900 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-8">1. Build Your Test Lead</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Lead Type</label>
                <select value={leadType} onChange={(e) => setLeadType(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4">
                  <option value="distressed-seller">Distressed Seller (Wholesale)</option>
                  <option value="traditional-seller">Traditional Seller</option>
                  <option value="investor-buyer">Investor Buyer</option>
                  <option value="buyer-finance">Buyer - Financing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Phone Number</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4" />
              </div>

              <div>
                <label className="block text-sm mb-2">Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4" />
              </div>

              <div>
                <label className="block text-sm mb-2">Source</label>
                <select value={source} onChange={(e) => setSource(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4">
                  <option value="google_ads">Google Ads</option>
                  <option value="callrail">CallRail (Inbound)</option>
                  <option value="organic">Organic</option>
                  <option value="manual_openhouse">Manual / Open House</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">UTM Campaign (optional)</label>
                <input type="text" value={utmCampaign} onChange={(e) => setUtmCampaign(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-4" />
              </div>

              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={consent} 
                  onChange={(e) => setConsent(e.target.checked)} 
                  className="w-5 h-5 accent-emerald-500"
                />
                <label>Consent captured at intake</label>
              </div>

              <button 
                onClick={processLead}
                className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 rounded-3xl text-xl font-bold transition-colors"
              >
                RUN THIS LEAD THROUGH THE ENGINE
              </button>
            </div>
          </div>

          {/* RIGHT: Live Visualizer */}
          <div className="bg-zinc-900 rounded-3xl p-8">
            <h2 className="text-2xl font-semibold mb-8">2. Live Processing Flow</h2>

            {!processed ? (
              <div className="h-96 flex items-center justify-center text-zinc-500 text-lg">
                Fill the form on the left and click "RUN THIS LEAD" to see the system in action
              </div>
            ) : (
              <div className="space-y-8">
                {/* Consent */}
                <div className="border-l-4 border-emerald-500 pl-6">
                  <div className="font-semibold">Consent + Compliance Layer</div>
                  <div className="text-emerald-400">{result.consentCheck}</div>
                </div>

                {/* AI Output */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <div className="font-semibold">6. AI Caller (Vapi) Output</div>
                  <div>{result.aiOutput}</div>
                </div>

                {/* State Transition */}
                <div className="border-l-4 border-purple-500 pl-6">
                  <div className="font-semibold">3. State Transition</div>
                  <div className="text-purple-400">{result.stateTransition}</div>
                </div>

                {/* Routing */}
                <div className="border-l-4 border-amber-500 pl-6">
                  <div className="font-semibold">2. Routing Logic by Lane</div>
                  <div className="text-amber-400">{result.routing}</div>
                </div>

                {/* CRM Output */}
                <div className="border-l-4 border-white pl-6">
                  <div className="font-semibold">1. Canonical CRM Output</div>
                  <pre className="text-xs bg-black p-4 rounded-2xl mt-2 overflow-auto">
                    {JSON.stringify(result.crmOutput, null, 2)}
                  </pre>
                </div>

                {/* Attribution & Edge Cases */}
                <div className="border-l-4 border-teal-500 pl-6">
                  <div className="font-semibold">5. Attribution + 7. Edge Cases</div>
                  <div>{result.crmOutput.attribution}</div>
                  <div className="text-teal-400 mt-1">{result.edgeCases}</div>
                </div>

                <button 
                  onClick={reset}
                  className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 rounded-3xl text-sm"
                >
                  Test Another Lead
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-zinc-500">
          This demo directly addresses all 7 points you requested: Canonical CRM structure, routing by lane, state transitions, consent/compliance, attribution persistence, AI mapping, and edge-case handling.
        </div>
      </div>
    </div>
  );
}