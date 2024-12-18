import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";

export default function PrismLoader() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return null;
}