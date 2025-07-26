import {render, screen} from '@testing-library/react';
import App from '../App';

jest.mock('firebase/messaging', () => ({getToken: jest.fn()}));
jest.mock('../firebase', () => ({messaging: {}}));

describe('App', () => {
    it('renders Notification System header', () => {
        render(<App/>);
        expect(screen.getByText(/Notification System/i)).toBeInTheDocument();
    });
});
