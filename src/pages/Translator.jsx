import { useState, useEffect } from "react";

function Translator() {
  const [text, setText] = useState("");
  const [fromLang, setFromLang] = useState("en");
  const [toLang, setToLang] = useState("te");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    setShowTitle(true);
  }, []);

  const translateText = async () => {
    if (text.trim() === "") return;

    setLoading(true);

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLang}|${toLang}`
    );

    const data = await response.json();
    const result = data.responseData.translatedText;

    setTranslatedText(result);

    const newHistory = [
      { input: text, output: result },
      ...history,
    ].slice(0, 5);

    setHistory(newHistory);
    setLoading(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(translatedText);
    alert("Copied successfully!");
  };

  const clearText = () => {
    setText("");
    setTranslatedText("");
  };

  const swapLanguages = () => {
    const temp = fromLang;
    setFromLang(toLang);
    setToLang(temp);

    setText(translatedText);
    setTranslatedText(text);
  };

  const startVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "en-IN";

    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };

    recognition.start();
  };

  const refreshTranslator = () => {
    setText("");
    setTranslatedText("");
    setHistory([]);
    setFromLang("en");
    setToLang("te");
  };

  const buttonStyle =
    "py-2 rounded-xl text-white shadow-lg active:scale-95 active:translate-y-1 transition duration-150";

  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-blue-500/20 shadow-2xl rounded-3xl p-8 w-[900px] flex flex-col gap-6 border border-white/20">

        <h1
          onClick={refreshTranslator}
          className={`text-4xl font-bold text-center text-white cursor-pointer transition-all duration-700 ${
            showTitle ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          Indian Language Translator
        </h1>

        <p className="text-right text-gray-300">
          {text.length} characters
        </p>

        <div className="flex gap-3">
          <select
            value={fromLang}
            onChange={(e) => setFromLang(e.target.value)}
            className="flex-1 border border-white/20 rounded-xl p-3 bg-white/10 text-white"
          >
            <option className="text-black" value="en">English</option>
            <option className="text-black" value="te">Telugu</option>
            <option className="text-black" value="hi">Hindi</option>
            <option className="text-black" value="ta">Tamil</option>
            <option className="text-black" value="kn">Kannada</option>
            <option className="text-black" value="ml">Malayalam</option>
            <option className="text-black" value="mr">Marathi</option>
            <option className="text-black" value="bn">Bengali</option>
          </select>

          <button
            onClick={swapLanguages}
            className="bg-yellow-500 px-5 rounded-xl text-white shadow-lg active:scale-95"
          >
            ⇄
          </button>

          <select
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
            className="flex-1 border border-white/20 rounded-xl p-3 bg-white/10 text-white"
          >
            <option className="text-black" value="en">English</option>
            <option className="text-black" value="te">Telugu</option>
            <option className="text-black" value="hi">Hindi</option>
            <option className="text-black" value="ta">Tamil</option>
            <option className="text-black" value="kn">Kannada</option>
            <option className="text-black" value="ml">Malayalam</option>
            <option className="text-black" value="mr">Marathi</option>
            <option className="text-black" value="bn">Bengali</option>
          </select>
        </div>

        <button
          onClick={translateText}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl shadow-lg active:scale-95"
        >
          {loading ? "Translating..." : "Translate"}
        </button>

        <div className="grid grid-cols-2 gap-5">
          <textarea
            className="border border-white/20 rounded-2xl p-4 h-[180px] bg-white/10 text-white placeholder-gray-300"
            placeholder="Enter text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 rounded-2xl p-5 h-[180px] text-gray-900 font-semibold overflow-auto">
            {translatedText || "✨ Translation will appear here..."}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={copyText}
            className={`bg-green-600 ${buttonStyle}`}
          >
            Copy
          </button>

          <button
            onClick={clearText}
            className={`bg-red-600 ${buttonStyle}`}
          >
            Clear
          </button>
        </div>

        <button
          onClick={startVoiceInput}
          className={`bg-blue-500 ${buttonStyle}`}
        >
          🎤 Voice Input
        </button>

        <div>
          <h2 className="text-white font-bold mb-3">
            History (Last 5)
          </h2>

          <div className="max-h-40 overflow-y-auto bg-white/10 rounded-xl p-4 text-white">
            {history.length === 0 ? (
              <p>No history yet...</p>
            ) : (
              history.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-white/20 pb-2 mb-2"
                >
                  <p>📝 {item.input}</p>
                  <p>➡ {item.output}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Translator;