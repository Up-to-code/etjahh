"use client";
import { useState } from 'react';
import Head from 'next/head';

export default function TextDisplay() {
  const [isDecoded, setIsDecoded] = useState(false);
  
  const originalText = `pe                        wcliboyl xls
'nshll Gb Je gral geil gu Jaal 上              all aug gauss! oloag!

S          ae 人
Jaal dota yall Yo aaigo yBgie`;

  const decodedText = `We                        welcome you all
'Shell GB be real deal go Jaal 上              all aug gauss! oloag!

S          ae 人
Jaal data all Yo aaigo yBgie`;

  const toggleDecode = () => {
    setIsDecoded(!isDecoded);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <Head>
        <title>Text Display Component</title>
        <meta name="description" content="Next.js component with text display using Tailwind CSS" />
      </Head>
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-2">
            Text Display Component
          </h1>
          <p className="text-gray-600 text-lg">Next.js with Tailwind CSS</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
          <div className="bg-gray-50 border-l-4 border-green-500 p-5 mb-5 rounded-r-lg">
            <pre className="whitespace-pre-wrap font-mono text-gray-800 text-lg">
              {isDecoded ? decodedText : originalText}
            </pre>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={toggleDecode}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {isDecoded ? 'Show Original' : 'Decode Text'}
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-green-400 pb-2 inline-block">
            About this Component
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This is a Next.js component that displays text content with interactive features. 
            The "Decode Text" button attempts to make the text more readable. Built with Tailwind CSS for styling.
          </p>
        </div>
      </div>
    </div>
  );
}