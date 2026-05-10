import { useState, useEffect } from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { savedPatterns } from "./utils/storage";

function App() {
  const [pattern, setPattern] = useState("Level=%s*(%d+)");
  const [inputText, setInputText] = useState(`UserID=8238729323
Level=34
Coins=100

UserID=1213239445
Level=22
Coins=200

The sidebar includes a quick reference list, examples, source code and more!
`);
  const [savedList, setSavedList] = useState([]);

  // Load patterns on mount
  useEffect(() => {
    setSavedList(savedPatterns.get());
  }, []);

  const refreshList = () => {
    setSavedList(savedPatterns.get());
  };

  const loadPattern = (saved) => {
    setPattern(saved.pattern);
    setInputText(saved.testString || "");
  };

  const saveCurrentPattern = () => {
    const name = window.prompt("Enter a name for this pattern:");
    if (!name) return;

    const success = savedPatterns.save({
      name,
      pattern,
      testString: inputText,
    });

    if (success) refreshList();
  };

  const createNew = () => {
    if (window.confirm("Start a new pattern? This will clear current inputs.")) {
      setPattern("");
      setInputText("");
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content-wrapper">
        <Sidebar
          setPattern={setPattern}
          savedList={savedList}
          refreshList={refreshList}
          onLoadPattern={loadPattern}
          onSave={saveCurrentPattern}
          onNew={createNew}
        />
        <div className="app-main-content">
          <Main
            pattern={pattern}
            setPattern={setPattern}
            inputText={inputText}
            setInputText={setInputText}
          />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
