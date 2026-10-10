import { renderToString } from "react-dom/server";
import App from "./App";

export function renderPage(path: string): string {
  return renderToString(<App ssrPath={path} />);
}