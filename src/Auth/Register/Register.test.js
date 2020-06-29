import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Register from '../Register';
import { useDispatch } from 'react-redux';

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        replace: jest.fn(),
    }),
    useLocation: () => ({
        state: {},
    }),
    Link: jest.fn().mockReturnValue(null)
}));
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}));

it('renders correctly', () => {


    let container = document.createElement('div');
    act(() => {
            ReactDOM.render(
                <Register />,
                container
            )
        }
    );

    expect(container).toMatchSnapshot();
});
