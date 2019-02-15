import React from "react";
import PropTypes from "prop-types";
import "./App.css";
import "./bootstrap.min.css";

function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
}

function Book({ title, onClick }) {
  return (
    <div
      className="answer"
      onClick={() => {
        onClick(title);
      }}
    >
      <h4>{title}</h4>
    </div>
  );
}

function Turn({ author, books, highlight, onAnswerSelected }) {
  function hightlightToBgColor(highlight) {
    const mapping = {
      none: "",
      correct: "#5cb754",
      wrong: "#c4584a"
    };
    return mapping[highlight];
  }

  return (
    <div
      className="row turn"
      style={{ backgroundColor: hightlightToBgColor(highlight) }}
    >
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="author" />
      </div>
      <div className="col-6">
        {books.map(title => (
          <Book title={title} key={title} onClick={onAnswerSelected} />
        ))}
      </div>
    </div>
  );
}
Turn.propType = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
};

function Continue({ getTurnData }) {
  return (
    <div className='continue-container'>
      <div className='continue-btn' onClick={getTurnData}><span>next</span></div>
    </div>
  );
}

function Footer() {
  return (
    <div id="footer" className="row">
      <p>
        All images are from{" "}
        <a href="https://commons.wikimedia.org">Wikipedia Commons</a> and are in
        the public domain
      </p>
    </div>
  );
}

function AuthorQuiz({ turnData, highlight, onAnswerSelected, getTurnData }) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn
        {...turnData}
        highlight={highlight}
        onAnswerSelected={onAnswerSelected}
      />
      <Continue getTurnData={getTurnData} />
      <Footer />
    </div>
  );
}

export default AuthorQuiz;
