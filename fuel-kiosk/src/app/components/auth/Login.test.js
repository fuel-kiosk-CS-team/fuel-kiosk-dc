import { render, screen } from '../../../../test-utils';
import { fireEvent } from '@testing-library/react'
import { Login } from './Login';

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
        prefetch: jest.fn(),
    }),
}));

describe('Login Component', () => {
    const fuelSitesMock = [
        { value: 'site1', label: 'Site One' },
        { value: 'site2', label: 'Site Two' },
        { value: 'site3', label: 'Site Three' },
    ];

    // Mock Fetch API
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true }),
            })
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('password can be typed in and saved as value', async () => {
        render(<Login />);

        // Enter a password but don't select a site
        const passwordInput = screen.getByPlaceholderText(/Your password/i);
        fireEvent.change(passwordInput, { target: { value: 'mypassword' } });

        expect(passwordInput.value).toBe('mypassword')

    });
});
