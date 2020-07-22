import React from 'react';
import {
  Link
} from "react-router-dom";

function About () {

return (
  <div className="jumbotron">
  	<h1>Learn German with Games, and make learning fun!</h1><br />
  	<p className="lead">Learning a new language like German, is hard, and many parts of the process are tedious, frustrating and boring! deutsch.games is here to help!</p>
	<p>At the beginners level, between A1 – B2, you will need to absorb a lot of new vocabulary, grammar rules and new spelling and pronunciation. It is essential that you learn and understand these elements in order to be able to start speaking and forming your own sentences. However just learning and understanding isn’t enough! In order to talk fluently, these new ideas need to become ‘second nature’ in your mind, because there is no time to stop and think about grammar while you are chatting with a friend.</p>
	<p>The best way for it to become second nature is through repetition and practice by talking with a native speaking friend. Preferably one who is willing to correct your mistakes! But, we don’t always have access to such lovely patient German friends, or we may not be at a level where having a meaningful conversation is possible. One-on-one German classes are expensive.</p>
	<p>That is where deutsch.games is there to help you. We want to make repetition and practice fun, so you can enjoy practising new vocabulary, grammar, sentence structure and pronunciation and help them become imprinted in your brain. They will come to you automatically in no time helping you make the step that you need to start having basic conversations. You can play and compete with your German learning friends / classmates for high scores, or just play for a fun way to study.</p>
	<p> <Link className="btn btn-link p-0" to='/games/falling-text'>Falling Text</Link> game allows you to practice Vocabulary, Verb conjugation and past principle.</p>
	<Link className="btn btn-success btn-lg mb-2" to='/games/falling-text'>Play Now!</Link><br />
	<p>Use keyboard input to practice your recall and spelling, and voice input to practice your pronunciation. Each word is repeated back to you with correct subject/article to also help them become naturally ingrained in your mind through repetition.</p>
	<p>We hope this is a bit more fun that staring at your textbook!</p>
	<p>More games are coming soon!</p>
  </div>
  )
}

export default About
