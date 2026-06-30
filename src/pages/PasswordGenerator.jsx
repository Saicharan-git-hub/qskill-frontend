import { useState, useEffect } from "react";

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [showTitle, setShowTitle] = useState(false);

  const [useUppercase, setUseUppercase] = useState(false);
  const [useLowercase, setUseLowercase] = useState(false);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSymbols, setUseSymbols] = useState(false);

  useEffect(() => {
    setShowTitle(true);
  }, []);

  const generatePassword = () => {
    let characters = "";

    if (useUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) characters += "0123456789";
    if (useSymbols) characters += "!@#$%^&*()_+";

    if (characters === "") {
      setPassword("Select at least one option");
      return;
    }

    let newPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }

    setPassword(newPassword);
  };

  const copyPassword = () => {
    if (!password) return;

    navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  const refreshGenerator = () => {
    window.location.reload();
  };

  const getStrength = () => {
    if (!password) return "-";
    if (length <= 6) return "Weak";
    if (length <= 10) return "Medium";
    if (length <= 15) return "Strong";
    return "Very Strong";
  };

  const buttonStyle =
    "py-2 rounded-xl text-white shadow-lg active:scale-95 active:translate-y-1 transition duration-150";

  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-blue-500/20 shadow-2xl rounded-3xl p-8 w-[700px] flex flex-col gap-6 border border-white/20">

        <h1
          onClick={refreshGenerator}
          className={`text-4xl font-bold text-center text-white cursor-pointer transition-all duration-700 ${
            showTitle ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          Secure Password Generator
        </h1>

        <div>
          <label className="text-white font-semibold">
            Password Length: {length}
          </label>

          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full mt-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-white">
          <label>
            <input
              type="checkbox"
              checked={useUppercase}
              onChange={() => setUseUppercase(!useUppercase)}
            /> Uppercase
          </label>

          <label>
            <input
              type="checkbox"
              checked={useLowercase}
              onChange={() => setUseLowercase(!useLowercase)}
            /> Lowercase
          </label>

          <label>
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={() => setUseNumbers(!useNumbers)}
            /> Numbers
          </label>

          <label>
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={() => setUseSymbols(!useSymbols)}
            /> Symbols
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl shadow-lg active:scale-95 active:translate-y-1 transition duration-150"
        >
          🎲 Generate Password
        </button>

        <div className="bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 rounded-2xl p-5 min-h-[100px] text-gray-900 font-semibold flex items-center justify-center text-xl break-all">
          {password || "Your password will appear here..."}
        </div>

        <div className="text-center text-white font-bold">
          Strength: {getStrength()}
        </div>

        <button
          onClick={copyPassword}
          className={`bg-green-600 ${buttonStyle}`}
        >
          Copy Password
        </button>
      </div>
    </div>
  );
}

export default PasswordGenerator;