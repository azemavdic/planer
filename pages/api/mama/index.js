import dbConnect from '../../../lib/mongodb';
import Mama from '../../../models/Mama';

export default async function (req, res) {
    await dbConnect();

    switch (req.method) {
        case 'GET':
            try {
                const aktivnosti = await Mama.find({})
                    .sort({
                        createdAt: 'desc',
                    })
                    .exec();
                res.status(200).json({ uspjesno: true, mama: aktivnosti });
            } catch (error) {
                res.status(400).json({ uspjesno: false });
            }
            break;
        case 'POST':
            try {
                const aktivnost = await Mama.create(req.body);
                res.status(201).json({ uspjesno: true, aktivnost });
            } catch (error) {
                res.status(400).json({ uspjesno: false });
            }
            break;
        default:
            res.status(400).json({ uspjesno: false });
            break;
    }
}
