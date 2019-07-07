import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';

//test imports
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: ['David Copperfield', 'A Tale of Two cities'],
    author: {
      name: 'William Shakespeare',
      imageUrl: 'images/authors/williamchakespeare.jpg',
      imageSource: 'Wikipedia commons',
      books: ['Hamlet', 'Macbeth', 'Romea and Juliet']
    }
  },
  highlight: 'none'
}

describe('AuthorQuix test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => { }} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('When no answer is selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => { }} />)
    })

    it('background color should be none', () => {
      expect(wrapper.find('div.turn').props().style.backgroundColor).toBe('');
    });
  });

  describe('When correct answer is selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...Object.assign({}, state, { highlight: 'correct' })} onAnswerSelected={() => { }} />)
    })

    it('background color should be green', () => {
      expect(wrapper.find('div.turn').props().style.backgroundColor).toBe('green');
    });
  });

  describe('When wrong answer is selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...Object.assign({}, state, { highlight: 'wrong' })} onAnswerSelected={() => { }} />)
    });

    it('background color should be red', () => {
      expect(wrapper.find('div.turn').props().style.backgroundColor).toBe('red');
    });
  });

  describe('When user selected an answer', () => {
    let wrapper;
    const handleAnserSelected = jest.fn();
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz {...Object.assign({}, state, { highlight: 'wrong' })} onAnswerSelected={handleAnserSelected} />);
      wrapper.find('.answer').first().simulate('click');
    });

    it('onAnswerSelected should be called', () => {
      expect(handleAnserSelected).toHaveBeenCalled();
    });

    it('Should receive correct answer', () => {
      expect(handleAnserSelected).toHaveBeenCalledWith('David Copperfield');
    })
  })
});
