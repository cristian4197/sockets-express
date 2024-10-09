import { Router, Request, Response } from 'express';

export const router = Router();

router.get('/message', (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: 'Get correcto'
  });
});


router.post('/message', (req: Request, res: Response) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  res.json({
    ok: true,
    firstName,
    lastName
  });
});

router.post('/message/:id', (req: Request, res: Response) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const id = req.params.id;

  res.json({
    ok: true,
    firstName,
    lastName,
    id
  });
});

export default router;