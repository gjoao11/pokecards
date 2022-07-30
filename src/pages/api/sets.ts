import { api } from '@/services/api';
import { PokemonTCGAPIRes, Set as SetType } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function Sets(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await api.get<PokemonTCGAPIRes<SetType[]>>('sets', {
        params: {
          pageSize: 12,
          page: req.query.page,
          orderBy: '-releaseDate',
        },
      });

      return res.status(200).json(response.data);
    } catch (error) {
      return res.send(400);
    }
  }

  return res.send(401);
}
