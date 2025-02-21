import { render, screen } from '../../../../test-utils';
import { fireEvent } from '@testing-library/react'
import { Login } from './Login';

const fuelSites = require('../../../../test-utils/test-data/LOC_MAIN.json')
const formattedSites = fuelSites.map(site => ({
    value: site.LOC_loc_code,
    label: `${site.LOC_loc_code}--${site.name}`
}));

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
        prefetch: jest.fn(),
    }),
}));

describe('Login Component', () => {
    // Mock Fetch API
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true }),
            })
        );

        localStorage.setItem('siteData', JSON.stringify(formattedSites));
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
