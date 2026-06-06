"use client";
import { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { executeCode } from "./api";
import { useParams } from "next/navigation";
import { boolean, success } from "zod";
import { useRouter } from "next/navigation";
// import { LANGUAGE_IDS } from "./constants";

const LANGUAGE_IDS: Record<string, number> = {
  javascript: 63,
  python: 71,
  typescript: 74,
  // add other languages here
};



const Output = ({ editorRef, language , input}: { editorRef: React.RefObject<any>; language: string; input:any }) => {
      const {id} = useParams();
  const toast = useToast();
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const router = useRouter();
  const runCode = async () => {
    console.log("button clicked")
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      //  const cleanCode = sourceCode
      //     .replace(/\t/g, "    ")
      //     .split("\n")
      //     .map((line:string, i:number) => {
      //       // only fix first line
      //       if (i === 0) return line.trimStart();
      //       return line;
      //     })
      //     .join("\n");

        // const matchs = input.match(/\[.*\]/);
        //   let nums=  0;
        // if (matchs) {
        //     nums = JSON.parse(matchs[0]);
        // }
        // console.log("nums is here : ",nums);
      // const wrappedCode = `${cleanCode}
// input = ${JSON.stringify(nums)};
// console.log(EveryLanguageFunction(input));
        // `;
        // console.log(wrappedCode)
      const result = await executeCode(LANGUAGE_IDS[language], sourceCode);
      console.log(result);
      const outputText =
        result?.stdout ||
        result?.stderr ||
        result?.compile_output ||
        "No output";
      setOutput(outputText.split("\n"));

      setIsError(!!result?.stderr || !!result?.compile_output);
      result.stderr ? setIsError(true) : setIsError(false);
      
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: (error instanceof Error ? error.message : String(error)) || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
};

const handleSubmit = async () => {
  const sourceCode = editorRef.current.getValue();
  if (!sourceCode) return;
  setIsSubmitting(true); // Your loading state
  try {
    const lines = sourceCode.trim().split("\n");

    // Remove last 2 lines
    const cleanedCode = lines.slice(0, -2).join("\n");

    console.log("Here is the cleansed code: ",cleanedCode);

    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: cleanedCode, questionId: id, language }),
    });

    if (!response.ok) throw new Error("Server responded with an error");

    const data = await response.json();
    console.log("data success = " , data)
    // Ensure data exists before redirecting
      router.push(`/question/${id}/result?success=${data.success}`);
    setIsSubmitting(false);
  } catch (error) {
    console.error("Submission failed:", error);
    alert("Submission timed out or failed. Please try again.");
    setIsSubmitting(false); // Reset loading so the button isn't stuck
  }
};

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg" className="text-white m-2 pb-2">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isSubmitting}
        onClick={handleSubmit}
        className="ml-2"
      >
        Submit
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line: string, i: number) => <Text key={i} className="text-white">{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};
export default Output;
