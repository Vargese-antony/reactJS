import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import _ from 'lodash';

const authors = [
    {
        name: 'Mark Wain',
        imageUrl: 'images/authors/Mark_Twain.jpg',
        imageSource: 'Wikipedia commons',
        books: [
            'The Adventures of Mark wain',
            'Life on the Missisipi',
            'Roughing It'
        ]
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconard.png',
        imageSource: 'Wikipedia commons',
        books: ['Heart of Darkness']
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikipedia commons',
        books: ['Harry Potter and the Sorceners Stone']
    },
    {
        name: 'Stephan King',
        imageUrl: 'images/authors/stephanking.jpg',
        imageSource: 'Wikipedia commons',
        books: ['The Shining', 'IT']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikipedia commons',
        books: ['David Copperfield', 'A Tale of Two cities']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/williamchakespeare.jpg',
        imageSource: 'Wikipedia commons',
        books: ['Hamlet', 'Macbeth', 'Romea and Juliet']
    }
]

function getTurnData(authors) {
    let allBooks = authors.reduce((p, c) => {
        return p.concat(c.books);
    }, []);

    const fourRandomBooks = _.shuffle(allBooks).slice(0, 4);
    const anyOneBook = _.sample(fourRandomBooks);
    //get the author for the book
    return {
        books: fourRandomBooks,
        author: authors.find((author) => {
            return author.books.some((book) => book === anyOneBook);
        })
    }
}

const state = {
    turnData: getTurnData(authors),
    highlight: ''
}

function onAnswerSelected(title) {
    const isCorrect = state.turnData.author.books.some((item) => item === title);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

function render() {
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />, document.getElementById('root'));
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
