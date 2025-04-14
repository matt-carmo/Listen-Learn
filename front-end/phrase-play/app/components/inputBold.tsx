import { Input } from "@/components/ui/input";
import React, { forwardRef } from "react";

const InputBold = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    const textBoldOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault();
        const selectedText = window.getSelection();
        if (selectedText && selectedText.toString().trim() !== "") {
          const text = selectedText.toString();
          if (text.match(/\*(.*?)\*/g)) {
            const newText = text.replace(/\*(.*?)\*/g, "$1");
            document.execCommand("insertText", false, newText);
          } else {
            const newText = `*${text}*`;
            document.execCommand("insertText", false, newText);
          }
        }
      }
    };

    return <Input {...props} ref={ref} onKeyUp={textBoldOnKeyUp} />;
  }
);

InputBold.displayName = "InputBold";

export default InputBold;
