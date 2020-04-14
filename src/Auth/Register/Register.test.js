import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Register from '../Register';

jest.mock('react-router-dom', () => ({
    useHistory: () => ({
        replace: jest.fn(),
    }),
    useLocation: () => ({
        state: {},
    }),
    Link: jest.fn().mockReturnValue(null)
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