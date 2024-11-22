import React, { useState } from 'react';
import { Ruler, Microscope, Sun, Moon } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

function App() {
  const [distance, setDistance] = useState(2.5);
  const [coreIndex, setCoreIndex] = useState(1.48);
  const [claddingIndex, setCladdingIndex] = useState(1.46);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const calculateNA = (core: number, cladding: number) => {
    return Math.sqrt(Math.pow(core, 2) - Math.pow(cladding, 2));
  };

  const NA = calculateNA(coreIndex, claddingIndex);

  const calculateDiameter = (L: number) => {
    return Math.sqrt((2 * NA * L) / (1 - Math.pow(NA, 2)));
  };

  const laserDiameter = calculateDiameter(distance);

  const handleCoreIndexChange = (value: number) => {
    if (value > claddingIndex) {
      setCoreIndex(value);
    }
  };

  const handleCladdingIndexChange = (value: number) => {
    if (value < coreIndex) {
      setCladdingIndex(value);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'min-h-screen bg-slate-900 text-white p-8' : 'min-h-screen bg-white text-black p-8'}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center relative">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src="./src/images/snu.jpg" alt="College Logo" className="h-12" />
            <p className="text-xl font-semibold">Shiv Nadar University Chennai</p>
          </div>
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <Microscope className="w-8 h-8" />
            Optical Fiber Numerical Aperture Experiment
          </h1>
          <p className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
            Calculate the numerical aperture by measuring the ring diameter at different distances
          </p>
          <button
            onClick={toggleTheme}
            className="absolute top-0 right-0 mt-4 mr-4 p-2 rounded-full focus:outline-none"
          >
            {isDarkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-800" />}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={isDarkMode ? 'lg:col-span-2 bg-slate-800 rounded-xl p-6 relative' : 'lg:col-span-2 bg-gray-200 rounded-xl p-6 relative'}>
            <div className={isDarkMode ? 'aspect-square w-full relative bg-slate-950 rounded-lg overflow-hidden' : 'aspect-square w-full relative bg-gray-300 rounded-lg overflow-hidden'}>
              {/* Reference rings */}
              {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6].map((diameter) => (
                <div
                  key={diameter}
                  className="absolute top-1/2 left-1/2 border-2 border-slate-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: `${diameter * 100}px`,
                    height: `${diameter * 100}px`,
                  }}
                >
                  <span className={`absolute -top-2.5 left-1/2 transform -translate-x-1/2 font-bold text-sm ${isDarkMode ? 'text-slate-400' : 'text-black'}`}>
                    {diameter >= 1 ? `${diameter} cm` : diameter}
                  </span>
                </div>
              ))}

              {/* Laser ring */}
              <div
                className="absolute top-1/2 left-1/2 border-4 border-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                style={{
                  width: `${laserDiameter * 100}px`,
                  height: `${laserDiameter * 100}px`,
                }}
              />

              {/* Laser source */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(239,68,68,0.7)]" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <label className={isDarkMode ? 'flex items-center gap-2 text-slate-300 mb-2' : 'flex items-center gap-2 text-slate-700 mb-2'}>
                  Core Refractive Index: {coreIndex.toFixed(3)}
                </label>
                <input
                  type="range"
                  min="1.2"
                  max="1.65"
                  step="0.01"
                  value={coreIndex}
                  onChange={(e) => handleCoreIndexChange(parseFloat(e.target.value))}
                  className={isDarkMode ? 'w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer' : 'w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer'}
                />
              </div>
              <div>
                <label className={isDarkMode ? 'flex items-center gap-2 text-slate-300 mb-2' : 'flex items-center gap-2 text-slate-700 mb-2'}>
                  Cladding Refractive Index: {claddingIndex.toFixed(3)}
                </label>
                <input
                  type="range"
                  min="1.2"
                  max="1.65"
                  step="0.01"
                  value={claddingIndex}
                  onChange={(e) => handleCladdingIndexChange(parseFloat(e.target.value))}
                  className={isDarkMode ? 'w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer' : 'w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer'}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className={isDarkMode ? 'flex items-center gap-2 text-slate-300 mb-2' : 'flex items-center gap-2 text-slate-700 mb-2'}>
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
                className={isDarkMode ? 'w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer' : 'w-full h-2 bg-gray-400 rounded-lg appearance-none cursor-pointer'}
              />
            </div>
          </div>

          <div className={isDarkMode ? 'bg-slate-800 rounded-xl p-6' : 'bg-gray-200 rounded-xl p-6'}>
            <h2 className="text-xl font-semibold mb-4">Measurements</h2>
            <div className="space-y-4">
              <div className={isDarkMode ? 'bg-slate-900 rounded-lg p-4' : 'bg-gray-300 rounded-lg p-4'}>
                <p className={isDarkMode ? 'text-slate-400 mb-1' : 'text-slate-700 mb-1'}>Side View</p>
                <div className={isDarkMode ? 'relative h-32 bg-slate-800 rounded-lg overflow-hidden flex items-center px-4' : 'relative h-32 bg-gray-400 rounded-lg overflow-hidden flex items-center px-4'}>
                  {/* Laser source */}
                  <div className="w-4 h-4 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.7)]" />

                  {/* Spacer */}
                  <div style={{ flex: distance / 5 }} />

                  {/* Screen */}
                  <div className="w-1 h-24 bg-slate-400 border border-slate-700" />
                </div>
              </div>
              <div className={isDarkMode ? 'bg-slate-900 rounded-lg p-4' : 'bg-gray-300 rounded-lg p-4'}>
                <p className={isDarkMode ? 'text-slate-400 mb-1' : 'text-slate-700 mb-1'}>Ring Diameter (W)</p>
                <p className="text-2xl font-bold">{laserDiameter.toFixed(3)} cm</p>
              </div>
              <div className={isDarkMode ? 'bg-slate-900 rounded-lg p-4' : 'bg-gray-300 rounded-lg p-4'}>
                <p className={isDarkMode ? 'text-slate-400 mb-1' : 'text-slate-700 mb-1'}>Distance (L)</p>
                <p className="text-2xl font-bold">{distance.toFixed(3)} cm</p>
              </div>
              <div className={isDarkMode ? 'bg-slate-900 rounded-lg p-4' : 'bg-gray-300 rounded-lg p-4'}>
                <p className={isDarkMode ? 'text-slate-400 mb-1' : 'text-slate-700 mb-1'}>Numerical Aperture (NA) = <InlineMath math="\frac{W}{\sqrt{4L^2 + W^2}}" /></p>
                <p className="text-2xl font-bold">{NA.toFixed(3)}</p>
              </div>
              <div className={isDarkMode ? 'bg-slate-900 rounded-lg p-4' : 'bg-gray-300 rounded-lg p-4'}>
                <p className={isDarkMode ? 'text-slate-400 mb-1' : 'text-slate-700 mb-1'}>Acceptance Angle (θ) = <InlineMath math="\sin^{-1}(\text{NA})" /></p>
                <p className="text-2xl font-bold">
                  <InlineMath math={`\\sin^{-1}(${NA.toFixed(3)})`} /> = {(Math.asin(NA) * (180 / Math.PI)).toFixed(2)}°
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center text-slate-400">
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-4">Guidance from</h3>
            <div className="flex gap-4">
              <a href="mailto:rajeshnp@snuchennai.edu.in" className="flex flex-col items-center">
                <span>Dr. N.P. Rajesh</span>
              </a>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-semibold mb-4">Made by</h3>
            <div className="flex gap-4">
              {[
                { name: 'Ashraf Syed', email: 'ashraf24110498@snuchennai.edu.in', imgSrc: './src/images/ashraf.jpg' },
                { name: 'Rammohan M', email: 'rammohan24110472@snuchennai.edu.in', imgSrc: './src/images/ram.jpg' },
                { name: 'Tejas Kotte Reddy', email: 'tejasreddy24110496@snuchennai.edu.in', imgSrc: './src/images/tejas.jpg' },
                { name: 'Pranaov S', email: 'pranaov24110409@snuchennai.edu.in', imgSrc: './src/images/pranaov.jpg' },
              ].map((person) => (
                <a key={person.email} href={`mailto:${person.email}`} className="flex flex-col items-center">
                  <img
                    src={person.imgSrc}
                    alt={person.name}
                    className="w-12 h-12 rounded-full mb-2"
                  />
                  <span>{person.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
