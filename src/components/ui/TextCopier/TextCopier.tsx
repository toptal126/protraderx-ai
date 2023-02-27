import { useState } from "react";
import { SvgCopy } from "assets/images/svg";

const TextCopier = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="tooltip-container">
      <span className="tooltip top">{copied ? "Copied" : "Copy"}</span>
      <SvgCopy
        className="cursor-pointer"
        onClick={() => {
          // Copy the text inside the text field
          navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      />
    </div>
  );
};

export default TextCopier;
