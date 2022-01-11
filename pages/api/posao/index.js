import { execOnce } from 'next/dist/shared/lib/utils';
import dbConnect from '../../../lib/mongodb.js';
import Posao from '../../../models/Posao.js';

export default async function (req, res) {
    await dbConnect();

    switch (req.method) {
        case 'GET':
            try {
                const poslovi = await Posao.find({})
                    .sort({
                        createdAt: 'desc',
                    })
                    .exec();
                res.status(200).json({ uspjesno: true, posao: poslovi });
            } catch (error) {
                res.status(400).json({ uspjesno: false });
            }
            break;
        case 'POST':
            try {
                const posao = await Posao.create(req.body);
                res.status(201).json({ uspjesno: true, posao });
            } catch (error) {
                res.status(400).json({ uspjesno: false });
            }
            break;
        default:
            res.status(400).json({ uspjesno: false });
            break;
    }
}
