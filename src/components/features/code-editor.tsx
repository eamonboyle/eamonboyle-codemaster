import { useState } from "react";
import Editor, { OnChange } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface CodeEditorProps {
  defaultLanguage: string;
  theme: string;
  defaultValue: string;
  onChange?: (value: string | undefined) => void;
  height?: string;
  isLoading?: boolean;
  runCode?: () => void;
}

const CodeEditor = ({
  defaultLanguage,
  theme,
  defaultValue,
  onChange,
  height = "60vh",
  runCode,
  isLoading,
}: CodeEditorProps) => {
  const [code, setCode] = useState<string | undefined>(defaultValue);
  const [language, setLanguage] = useState(defaultLanguage);

  const handleEditorChange: OnChange = (value) => {
    setCode(value);

    if (onChange) {
      onChange(value);
    }
  };

  const languages = ["javascript", "typescript", "python", "java", "c", "cpp"];

  return (
    <div className="rounded-md border border-gray-300">
      <div className="flex items-center justify-between border-b border-gray-300 bg-gray-100 p-2">
        <select
          title="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="mr-2 rounded border border-gray-300 p-1"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        {runCode && (
          <Button
            variant="secondary"
            size="sm"
            className="bg-green-500/20 hover:bg-green-500/30"
            disabled={isLoading}
            onClick={runCode}
          >
            <Play className="text-green-600" />
          </Button>
        )}
      </div>
      <Editor
        height={height}
        language={language}
        theme={theme}
        value={code}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
