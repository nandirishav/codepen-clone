import React, { useEffect, useRef, useState } from "react";

function App() {
  const [inputState, setInputState] = useState({
    html_code: localStorage.html_code || "",
    css_code: localStorage.css_code || "",
    js_code: localStorage.js_code || "",
  });
  const iRef = useRef(null);

  function run(name, value) {
    // Storing data in Local Storage
    if (name) localStorage.setItem([name], value);

    if (iRef && iRef.current) {
      iRef.current.contentDocument.body.innerHTML =
        `<style>${localStorage.css_code}</style>` + localStorage.html_code;
      iRef.current.contentWindow.eval(localStorage.js_code);
    }
  }

  useEffect(() => {
    run();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputState({
      ...inputState,
      [name]: value,
    });
    run(name, value);
  };

  return (
    <div className="code-editor">
      <div className="code">
        <div className="html-code">
          <h1>
            <img src="assets/html.png" alt="html" />
            HTML
          </h1>
          <textarea
            name="html_code"
            value={inputState.html_code}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="css-code">
          <h1>
            <img src="assets/CSS.png" alt="css" />
            CSS
          </h1>
          <textarea
            name="css_code"
            value={inputState.css_code}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="js-code">
          <h1>
            <img src="assets/js.png" alt="js" />
            JS
          </h1>
          <textarea
            spellCheck="false"
            name="js_code"
            value={inputState.js_code}
            onChange={handleInputChange}
          ></textarea>
        </div>
      </div>
      <iframe title="result" id="output" ref={iRef}></iframe>
    </div>
  );
}

export default App;
