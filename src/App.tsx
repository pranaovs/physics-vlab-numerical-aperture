import React, { useState, useEffect } from 'react';
import { Ruler, Microscope } from 'lucide-react';

import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

function App() {
  const [distance, setDistance] = useState(2.5);
  const [coreIndex, setCoreIndex] = useState(1.48);
  const [claddingIndex, setCladdingIndex] = useState(1.46);
  const NA = 0.53;

  const calculateDiameter = (L: number) => {
    return Math.sqrt((2 * NA * L) / (1 - Math.pow(NA, 2)));
  };

  const calculateNA = (W: number, L: number) => {
    return W / Math.sqrt(4 * Math.pow(L, 2) + Math.pow(W, 2));
  };

  const laserDiameter = calculateDiameter(distance);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Microscope className="w-8 h-8" />
            Optical Fiber Numerical Aperture Experiment
          </h1>
          <p className="text-slate-300">
            Calculate the numerical aperture by measuring the ring diameter at different distances
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 relative">
            <div className="aspect-square w-full relative bg-slate-950 rounded-lg overflow-hidden">
              {/* Reference rings */}
              {[0.5, 1, 1.5, 2, 2.5, 3].map((diameter) => (
                <div
                  key={diameter}
                  className="absolute top-1/2 left-1/2 border border-slate-700 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: `${diameter * 60}px`,
                    height: `${diameter * 60}px`,
                  }}
                >
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-slate-400">
                    {diameter} cm
                  </span>
                </div>
              ))}

              {/* Laser ring */}
              <div
                className="absolute top-1/2 left-1/2 border-2 border-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                style={{
                  width: `${laserDiameter * 60}px`,
                  height: `${laserDiameter * 60}px`,
                }}
              />

              {/* Laser source */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(239,68,68,0.7)]" />
            </div>

            <div className="mt-6">
              <label className="flex items-center gap-2 text-slate-300 mb-2">
                <Ruler className="w-5 h-5" />
                Distance (L): {distance.toFixed(2)} cm
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={distance}
                onChange={(e) => setDistance(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Measurements</h2>
            <div className="space-y-4">
              <div className="bg-slate-900 rounded-lg p-4">
                <p className="text-slate-400 mb-1">Ring Diameter (W)</p>
                <p className="text-2xl font-bold">{laserDiameter.toFixed(3)} cm</p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4">
                <p className="text-slate-400 mb-1">Distance (L)</p>
                <p className="text-2xl font-bold">{distance.toFixed(3)} cm</p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4">
                <p className="text-slate-400 mb-1">Numerical Aperture (NA) = Ring Diameters (W) / Distance (L)</p>
                <p className="text-2xl font-bold">{laserDiameter.toFixed(3)}/{distance.toFixed(3)} = {NA.toFixed(3)}</p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4">
                <p className="text-slate-400 mb-1">Acceptance Angle (θ) = <Latex>$\sin^-$</Latex>  (NA)</p>
                <p className="text-2xl font-bold">
                  <Latex>$\sin^-$0.530</Latex> = {(Math.asin(NA) * (180 / Math.PI)).toFixed(2)}°
                </p>
              </div>
              <div className="bg-slate-900 rounded-lg p-4">
                <p className="text-slate-400 mb-1">Core Refractive Index</p>
                <p className="text-2xl font-bold">{coreIndex.toFixed(3)}</p>
                <input
                  type="range"
                  min="1.4"
                  max="1.6"
                  step="0.01"
                  value={coreIndex}
                  onChange={(e) => setCoreIndex(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="bg-slate-900 rounded-lg p-4">
                <p className="text-slate-400 mb-1">Cladding Refractive Index</p>
                <p className="text-2xl font-bold">{claddingIndex.toFixed(3)}</p>
                <input
                  type="range"
                  min="1.4"
                  max="1.6"
                  step="0.01"
                  value={claddingIndex}
                  onChange={(e) => setCladdingIndex(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
