import { Request, Response } from 'express';
import { AjusteSistema } from '../models/ajustes.model';

export class AjustesController {
  public static async getAjustes(_req: Request, res: Response) {
    try {
      let ajustes = await AjusteSistema.findOne();
      if (!ajustes) {
        ajustes = await AjusteSistema.create({
          une_loan_max: 500000.00,
          commission: 0.0100,
        });
      }
      return res.status(200).json(ajustes);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  public static async updateAjustes(req: Request, res: Response) {
    try {
      let ajustes = await AjusteSistema.findOne();
      if (!ajustes) {
        ajustes = await AjusteSistema.create({
          une_loan_max: req.body.une_loan_max || 500000.00,
          commission: req.body.commission || 0.0100,
        });
      } else {
        await ajustes.update(req.body);
      }
      return res.status(200).json(ajustes);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default AjustesController;
