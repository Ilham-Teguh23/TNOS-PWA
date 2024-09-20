import { useEffect } from "react";

function TitleHeader(title) {
  useEffect(() => {
    window.scroll(0, 0);
    document.title = `${title} | App TNOS`;
  }, [title]);
}

export default TitleHeader;
