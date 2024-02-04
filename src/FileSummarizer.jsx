
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileSummarizer = () => {
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
  
    const onDrop = (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        alert('Please upload a valid text file (.txt).');
        return;
      }
  
      const file = acceptedFiles[0];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onload = () => {
          const fileContent = reader.result;
          setText(fileContent);
          analyzeText(fileContent);
          summarizeText(fileContent);
        };
  
        reader.readAsText(file);
      }
    };
  
    const analyzeText = (text) => {

      const words = text.split(/\s+/).filter((word) => word.length > 0);
      setWordCount(words.length);
      setCharCount(text.length);
    };
    const summarizeText = (text) => {

    };
    
 
  
    const downloadSummary = () => {

      const blob = new Blob([summary], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'summary.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: '.txt', 
    });
  
    return (
      <div>
        <h1>File Summarizer</h1>
        <div {...getRootProps()} style={dropzoneStyle}>
          <input {...getInputProps()} />
          <p>Drag and drop a text file (.txt) here, or click to select one</p>
        </div>
    
        {summary && (
          <div>
            <h2>Summary:</h2>
            <p>{summary}</p>
            <button onClick={downloadSummary}>Download Summary</button>
          </div>
        )}
        <div>
          <h2>Word Count:</h2>
          <p>{wordCount}</p>
        </div>
        <div>
          <h2>Character Count:</h2>
          <p>{charCount}</p>
        </div>
      </div>
    );
  };
const dropzoneStyle = {
  border: '2px dashed #eeeeee',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default FileSummarizer;
