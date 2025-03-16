import React, { useState } from "react";

const Body = (props) => {
  const [text, setText] = useState("");
  const [readability, setReadability] = useState({ readingEase: null, gradeLevel: null });
  const [bookmarkedTexts, setBookmarkedTexts] = useState([]);

  const upCase = () => {
    let newText = text.toUpperCase();
    setText(newText);
    handleTextChange(newText);
    props.showAlert("Converted to UpperCase!!", "success");
  };

  const lwCase = () => {
    let newText = text.toLowerCase();
    setText(newText);
    handleTextChange(newText);
    props.showAlert("Converted to LowerCase!!", "success");
  };

  const clearText = () => {
    setText("");
    setReadability({ readingEase: null, gradeLevel: null });
    props.showAlert("Text Cleared!!", "success");
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text Copied!!", "success");
  };

  const extraSpace = () => {
    let newText = text.split(/[ ]+/).join(" ");
    setText(newText);
    handleTextChange(newText);
    props.showAlert("Extra Space removed!!", "success");
  };

  const change = (event) => {
    const newText = event.target.value;
    handleTextChange(newText);
  };

  const handleTextChange = (newText) => {
    setText(newText);
    const scores = calculateReadability(newText);
    setReadability(scores);
  };

  // Calculate Readability Scores
  const calculateReadability = (text) => {
    const sentences = text.split(/[.!?]+/).filter(Boolean).length; // Count sentences
    const words = text.split(/\s+/).filter(Boolean).length; // Count words
    const syllables = text.split(/\s+/).reduce((count, word) => {
      return count + countSyllables(word);
    }, 0); // Count syllables in each word

    const averageSentenceLength = words / sentences || 0;
    const averageSyllablesPerWord = syllables / words || 0;

    const readingEase = 206.835 - (1.015 * averageSentenceLength) - (84.6 * averageSyllablesPerWord);
    const gradeLevel = (0.39 * averageSentenceLength) + (11.8 * averageSyllablesPerWord) - 15.59;

    return {
      readingEase: readingEase.toFixed(2),
      gradeLevel: gradeLevel.toFixed(2)
    };
  };

  // Helper function to count syllables in a word
  const countSyllables = (word) => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1; // Short words have at least one syllable
    const syllableCount = word.match(/[aeiouy]{1,2}/g);
    return syllableCount ? syllableCount.length : 0;
  };

  // Encode both text and emojis to Base64
  const encodeBase64 = () => {
    const base64Encoded = btoa(unescape(encodeURIComponent(text)));
    setText(base64Encoded);
    handleTextChange(base64Encoded);
    props.showAlert("Text Encoded to Base64!", "success");
  };

  // Decode both text and emojis from Base64
  const decodeBase64 = () => {
    try {
      const base64Decoded = atob(text);
      const emojiDecodedText = decodeURIComponent(escape(base64Decoded));
      setText(emojiDecodedText);
      handleTextChange(emojiDecodedText);
      props.showAlert("Text Decoded from Base64!", "success");
    } catch (e) {
      props.showAlert("Invalid Base64 string!", "danger");
    }
  };

  // Bookmark text
  const addBookmark = () => {
    if (text.trim()) {
      setBookmarkedTexts((prev) => [...prev, text]);
      props.showAlert("Text Bookmarked!", "success");
    }
  };

  // Use Bookmark
  const handleBookmarkClick = (bookmark) => {
    setText(bookmark);
    handleTextChange(bookmark);
  };

  // Delete Bookmark
  const deleteBookmark = (index) => {
    const newBookmarks = bookmarkedTexts.filter((_, i) => i !== index);
    setBookmarkedTexts(newBookmarks);
    props.showAlert("Bookmark Deleted!", "success");
  };

  return (
    <div className="main-container">
      <div className="container-fluid h-100 py-3">
        <div className="row h-100">
          {/* Text Editor Section */}
          <div className="col-lg-8 h-100">
            <div className="card shadow-sm editor-card">
              <div className="card-body d-flex flex-column">
                <h3 className="card-title mb-3">
                  Text Analyzer
                </h3>
                
                <div className="editor-content mb-3">
                  <textarea
                    value={text}
                    onChange={change}
                    className="form-control"
                    style={{
                      backgroundColor: props.mode === "dark" ? "#2d2d2d" : "white",
                      color: props.mode === "dark" ? "#e0e0e0" : "black",
                      border: props.mode === "dark" ? "1px solid #404040" : "1px solid #ced4da",
                      fontSize: "1rem",
                      lineHeight: "1.5",
                      padding: "1rem"
                    }}
                    placeholder="Enter your text here..."
                    id="myBox"
                  ></textarea>
                </div>

                {/* Statistics Row */}
                <div className="row g-2 mb-3">
                  <div className="col-md-3">
                    <div className="p-2 border rounded text-center">
                      <small>Words</small>
                      <p className="h5 mb-0">{text.split(/\s+/).filter((element) => {
                        return element.length !== 0;
                      }).length}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="p-2 border rounded text-center">
                      <small>Characters</small>
                      <p className="h5 mb-0">{text.length}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="p-2 border rounded text-center">
                      <small>Reading Time</small>
                      <p className="h5 mb-0">{0.008 * text.split(" ").filter((element) => {
                        return element.length !== 0;
                      }).length} minutes</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="p-2 border rounded text-center">
                      <small>Sentences</small>
                      <p className="h5 mb-0">{text.split(/[.!?]+/).filter(Boolean).length}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-wrap gap-2">
                  <button disabled={text.length === 0} className="btn btn-primary btn-sm" onClick={upCase}>
                    <i className="fas fa-uppercase me-1"></i>Uppercase
                  </button>
                  <button disabled={text.length === 0} className="btn btn-primary btn-sm" onClick={lwCase}>
                    <i className="fas fa-lowercase me-1"></i>Lowercase
                  </button>
                  <button disabled={text.length === 0} className="btn btn-secondary btn-sm" onClick={clearText}>
                    <i className="fas fa-trash me-1"></i>Clear
                  </button>
                  <button disabled={text.length === 0} className="btn btn-success btn-sm" onClick={addBookmark}>
                    <i className="fas fa-bookmark me-1"></i>Bookmark
                  </button>
                  <button
                    disabled={text.length === 0}
                    className="btn btn-primary btn-sm"
                    onClick={copyText}
                  >
                    <i className="fas fa-copy me-1"></i>Copy
                  </button>
                  <button
                    disabled={text.length === 0}
                    className="btn btn-primary btn-sm"
                    onClick={extraSpace}
                  >
                    <i className="fas fa-space-shuttle me-1"></i>Remove Extra Space
                  </button>
                  <button
                    disabled={text.length === 0}
                    className="btn btn-primary btn-sm"
                    onClick={encodeBase64}
                  >
                    <i className="fas fa-code me-1"></i>Encode to Base64
                  </button>
                  <button
                    disabled={text.length === 0}
                    className="btn btn-primary btn-sm"
                    onClick={decodeBase64}
                  >
                    <i className="fas fa-code-branch me-1"></i>Decode from Base64
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bookmarks Sidebar */}
          <div className="col-lg-4 h-100">
            <div className="card shadow-sm h-100">
              <div className="card-body bookmarks-section">
                <h5 className="card-title mb-3">Bookmarks</h5>
                <div className="bookmark-list">
                  {bookmarkedTexts.map((bookmark, index) => (
                    <div key={index} className="bookmark-item p-2 mb-2 border rounded">
                      <p className="mb-2 text-truncate">{bookmark}</p>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleBookmarkClick(bookmark)}
                        >
                          Use
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteBookmark(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
