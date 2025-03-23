import { Input } from "@/components/ui/input";
import { HtmlHTMLAttributes, InputHTMLAttributes } from "react";

export function InputBold(props: InputHTMLAttributes<HTMLInputElement>) {
  const textBoldOnKeyUp = (e:React.KeyboardEvent)=> {
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
  }
  return (
    <Input
      {...props}
      value={props.value}
      onKeyUp={textBoldOnKeyUp}
    />
  );
}