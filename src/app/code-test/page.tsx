"use client";

import React, { useState } from "react";
import Editor from "@/components/features/code-editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CodeTestPage() {
  const [code, setCode] = useState('console.log("Hello World")');
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
    }
  };

  const runCode = () => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        const result = new Function(code)();
        setOutput(String(result));
      } catch (err) {
        setOutput(
          err instanceof Error ? `Error: ${err.message}` : "An error occurred",
        );
      } finally {
        setIsLoading(false);
      }
    }, 0);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Code Test</CardTitle>
          <CardDescription>
            Test your coding skills with our interactive code editor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Editor
            height="20vh"
            defaultLanguage="javascript"
            theme="vs-dark"
            defaultValue="console.log('Hello World')"
            onChange={handleEditorChange}
            runCode={runCode}
            isLoading={isLoading}
          />
          <div className="mt-4 rounded-md bg-gray-100 p-4">
            <h3 className="mb-2 text-lg font-semibold">Output:</h3>
            <pre className="whitespace-pre-wrap">
              {isLoading ? "Running code..." : output}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
