import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession } from 'next-auth/client';
import { SignInButton } from './index';

jest.mock('next-auth/client')

describe('SignInButton Component', () => {
    it('renders correctly when user is not logged', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])

        render(
            <SignInButton />
        )
    
        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })

    it('renders correctly when user is logged', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([
            { user: { name: 'John Doe', email: 'john.doe@exemple.com' }, expires: 'fake-expires' }, 
            false
        ])

        render(
            <SignInButton />
        )
    
        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
    
})
