"use client";

import React, { useRef, useState , useEffect } from "react";
import { Box, HStack, Input, StackProps } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import Output from "./Output";
import { OnMount } from "@monaco-editor/react";
import { string } from "zod";

// 1️⃣ Define allowed languages
export type Language = "javascript" | "typescript" | "python" | "java" | "csharp" | "php";

// 2️⃣ Code snippets
export const CODE_SNIPPETS: Record<Language, string> = {
  javascript: `
function EveryLanguageFunction(nums) {
    // user writes body only
}
`,
  typescript: `
function EveryLanguageFunction(nums: number[]): number {
    // user writes body only
}

`,
  python: `
def EveryLanguageFunction(name):
  print("Hello, " + name + "!")

`,
  java: `
public class EveryLanguageFunction {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}
`,
  csharp: `
class Solution {
    public int EveryLanguageFunction(int[] nums) {
        // user writes body only
    }
}
`,
  php: `
<?php
function EveryLanguageFunction($nums) {
    // user writes body only
}
?>
`,
};

// 3️⃣ Props for CodeEditor
interface CodeEditorProps {
  language: Language;
  editorRef: React.RefObject<any>;
  input?: string;
}


const CodeEditor = ({
  input,
}: CodeEditorProps) => {
  const editorRef = useRef<any>(null);
  const [value, setValue] = useState<string>("");
  const [language, setLanguage] = useState<Language>("javascript");

const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (lang : Language) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang]);
  };


  return (
    <Box>
      <HStack gap={4} alignItems="start">
        {/* Editor side */}
        <Box w="75%">
          <LanguageSelector language={language} onSelect={onSelect} />

          <Editor
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            value={value}
            onMount={onMount}
            onChange={(val) => setValue(val!)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
            }}
          />
        </Box>

        {/* Output side */}
        <Output editorRef={editorRef} language={language} input={input}  />
      </HStack>
    </Box>
  );
};

export default CodeEditor;