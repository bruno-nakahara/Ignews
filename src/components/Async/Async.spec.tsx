import { render, screen, waitFor } from '@testing-library/react';
import { Async } from '.';

test('it renders correctly', async () => {
    render(<Async />)

    expect(screen.getByText('Hello World')).toBeInTheDocument()
    await waitFor(() => {
        return expect(screen.getByText('Button')).toBeInTheDocument()
        //Caso acontecer de verificar se o button tem que desaparecer, pode usar o "not". True => False
        //Ex: return expect(screen.getByText('Button')).not.toBeInTheDocument()
        //Ou usar - await waitForElementToBeRemoved(screen.queryByText('Button'))
    })
    //expect(await screen.findByText('Button')).toBeInTheDocument()
})