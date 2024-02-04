
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import TextToSpeech from './TextToSpeech';
// import NavigationBar from './components/NavigationBar';
// import FileSummarizer from './FileSummarizer';
// function App() {
//   return (
//     <Router basename={import.meta.env.BASE_URL}>
//       <div>
//       <NavigationBar />
//       <Routes>
//       <Route path="/" element={<FileSummarizer />} />
//       <Route path="/text-to-speech" element={<TextToSpeech />} />

//       </Routes>
    
    
//       </div>
//     </Router>
    
//   )
//       };

// export default App;
import React from 'react';
import TextToSpeech from './TextToSpeech';
import FileSummarizer from './FileSummarizer';

function App() {
  return (
    <div>
      <FileSummarizer />
      <TextToSpeech />
    </div>
  );
}

export default App;
