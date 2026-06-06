"use client";
import React, { useEffect, useRef, useState } from "react";
import CodeEditor from "../editor/CodeEditor";

// Updated Type to be more specific
type Question = {
  id: number;
  difficulty: string;
  problem_statement: string;
  input?: string;
  output?: string;
  explanation: string;
};

type QuestionComponentProps = {
  question: Question;
};

export type Language = "javascript" | "typescript" | "python" | "java" | "csharp" | "php";

const difficultyStyles: Record<string, string> = {
  Easy: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Hard: "bg-rose-100 text-rose-700 border-rose-200",
};

const QuestionComponent: React.FC<QuestionComponentProps> = ({ question}) => {
  const [language, setLanguage] = useState<Language>("javascript");
  const editorRef = useRef<any>(null);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f8fafc]">
      
      {/* LEFT SIDE: Question Details (Scrollable) */}
      <div className="w-full lg:w-5/12 h-screen overflow-y-auto border-r border-slate-200 bg-white p-6 md:p-8 scrollbar-thin scrollbar-thumb-slate-200">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            <span className="text-slate-400 font-medium mr-2">{question.id}.</span>
            Problem Description
          </h1>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${difficultyStyles[question.difficulty] || "bg-slate-100 text-slate-700"}`}>
            {question.difficulty}
          </span>
        </div>

        {/* Problem Body */}
        <div className="space-y-8">
          <section>
            <p className="text-slate-700 leading-relaxed text-[16px] whitespace-pre-line">
              {question.problem_statement}
            </p>
          </section>

          {/* Examples */}
          {(question.input || question.output) && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Example Case</h3>
              <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden font-mono text-sm">
                {question.input && (
                  <div className="p-4 border-b border-slate-200">
                    <p className="text-indigo-600 font-bold mb-1 underline decoration-indigo-200 underline-offset-4 uppercase text-[10px]">Input</p>
                    <code className="text-slate-800 break-all">{question.input}</code>
                  </div>
                )}
                {question.output && (
                  <div className="p-4 bg-slate-100/50">
                    <p className="text-emerald-600 font-bold mb-1 uppercase text-[10px]">Output</p>
                    <code className="text-slate-800 break-all">{question.output}</code>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Explanation Section */}
          <section className="bg-blue-50/50 border border-blue-100 rounded-xl p-6">
            <h3 className="text-blue-800 font-bold text-sm mb-2 uppercase flex items-center gap-2">
               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"></path></svg>
               Explanation
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed italic whitespace-pre-line">
              {question.explanation}
            </p>
          </section>
        </div>
      </div>

      {/* RIGHT SIDE: Code Editor */}
      <div className="w-full lg:w-7/12 flex flex-col h-screen bg-[#1e1e1e]">
        
        {/* The Editor Area */}
        <div className="grow overflow-hidden">
          <CodeEditor language={language} editorRef={editorRef} input={question.input} />
        </div>

      </div>
    </div>
  );
};

export default QuestionComponent;