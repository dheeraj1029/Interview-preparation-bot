
import React, { useState, useCallback } from 'react';
import type { InterviewConfig, ChatMessage, SummaryReport } from './types';
import SetupScreen from './components/SetupScreen';
import InterviewScreen from './components/InterviewScreen';
import SummaryScreen from './components/SummaryScreen';

const App: React.FC = () => {
  const [appState, setAppState] = useState<'setup' | 'interview' | 'summary'>('setup');
  const [interviewConfig, setInterviewConfig] = useState<InterviewConfig | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [summaryReport, setSummaryReport] = useState<SummaryReport | null>(null);

  const handleStartInterview = useCallback((config: InterviewConfig) => {
    setInterviewConfig(config);
    setAppState('interview');
    setChatHistory([]);
    setSummaryReport(null);
  }, []);

  const handleEndInterview = useCallback((summary: SummaryReport, history: ChatMessage[]) => {
    setSummaryReport(summary);
    setChatHistory(history);
    setAppState('summary');
  }, []);

  const handleRestart = useCallback(() => {
    setAppState('setup');
    setInterviewConfig(null);
    setChatHistory([]);
    setSummaryReport(null);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case 'interview':
        return interviewConfig && <InterviewScreen config={interviewConfig} onFinish={handleEndInterview} />;
      case 'summary':
        return summaryReport && <SummaryScreen report={summaryReport} history={chatHistory} onRestart={handleRestart} />;
      case 'setup':
      default:
        return <SetupScreen onStart={handleStartInterview} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-400">AI Interview Coach</h1>
          <p className="text-slate-400 mt-2">Hone your skills with an AI-powered mock interview.</p>
        </header>
        <main className="bg-slate-800 rounded-xl shadow-2xl shadow-slate-950/50 p-6 md:p-8 border border-slate-700">
          {renderContent()}
        </main>
        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Powered by Gemini API. Designed to help you ace your next interview.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
