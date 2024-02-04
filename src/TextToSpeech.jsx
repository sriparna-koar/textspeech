
import React, { useState, useRef, useEffect } from 'react';
import './text.css';
const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [pitch, setPitch] = useState(1.0);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
      setVoices(synthesis.getVoices());

      synthesis.onvoiceschanged = () => {
        setVoices(synthesis.getVoices());
      };
    }
  }, []);

  const speak = () => {
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = pitch;

      if (selectedVoice) {
        utterance.lang = selectedVoice.lang;
      }

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => {
        setSpeaking(false);
        setPaused(false);
        utteranceRef.current = null;
      };

      synthesis.speak(utterance);
      utteranceRef.current = utterance;
    } else {
      console.error('Text-to-speech not supported in this browser.');
    }
  };

  const handleRateChange = (e) => {
    setRate(parseFloat(e.target.value));
  };

  const handlePitchChange = (e) => {
    setPitch(parseFloat(e.target.value));
  };

  const handleVoiceChange = (e) => {
    const selectedVoice = voices.find((voice) => voice.name === e.target.value);
    setSelectedVoice(selectedVoice);
  };

  const pause = () => {
    if ('speechSynthesis' in window && speaking) {
      const synthesis = window.speechSynthesis;
      synthesis.pause();
      setPaused(true);
    }
  };

  const resume = () => {
    if ('speechSynthesis' in window && paused) {
      const synthesis = window.speechSynthesis;
      synthesis.resume();
      setPaused(false);
    }
  };

  const reset = () => {
    if (utteranceRef.current) {
      const synthesis = window.speechSynthesis;
      synthesis.cancel();
      setSpeaking(false);
      setText('');
      setRate(1.0);
      setPitch(1.0);
      setSelectedVoice(null);
      utteranceRef.current = null;
    }
  };

  return (
    <div className="text-to-speech-container">
      <h1>Text To speech</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something to speak..."
      />
      <div>
        <label htmlFor="rate">Speed:</label>
        <input
          type="range"
          id="rate"
          min="0.5"
          max="2.0"
          step="0.1"
          value={rate}
          onChange={handleRateChange}
        />
        <span>{rate.toFixed(1)}</span>
      </div>
      <div>
        <label htmlFor="pitch">Pitch:</label>
        <input
          type="range"
          id="pitch"
          min="0.5"
          max="2.0"
          step="0.1"
          value={pitch}
          onChange={handlePitchChange}
        />
        <span>{pitch.toFixed(1)}</span>
      </div>
      <button onClick={speak} disabled={!text || speaking}>
        {speaking ? 'Speaking...' : 'Speak'}
      </button>
      <button onClick={pause} disabled={!speaking || paused}>
        Pause
      </button>
      <button onClick={resume} disabled={!paused}>
        Resume
      </button>
      <button onClick={reset} disabled={!text && !speaking}>
        Clear & Stop
      </button>

      {voices.length > 0 && (
        <div>
          <label htmlFor="voice">Voice:</label>
          <select id="voice" onChange={handleVoiceChange} value={selectedVoice?.name || ''}>
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} - {voice.lang}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;
