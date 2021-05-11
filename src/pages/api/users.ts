import { NextApiRequest, NextApiResponse} from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        { id: 1, name: 'Bruno' },
        { id: 2, name: 'Diego' },
        { id: 3, name: 'Mayk' },
    ]

    return response.json(users)
}