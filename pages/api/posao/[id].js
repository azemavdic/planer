import dbConnect from '../../../lib/mongodb';
import Posao from '../../../models/Posao';

export default async function (req, res) {
    await dbConnect();
    const { id } = req.query;
    switch (req.method) {
        case 'GET':
            try {
                const posao = await Posao.findById({ _id: id });
                res.status(200).json({ uspjesno: true, posao });
            } catch (error) {
                res.status(400).json({ uspjesno: false });
            }
            break;
        case 'DELETE':
            try {
                await Posao.findByIdAndDelete({ _id: id });
            } catch (error) {
                res.status(400).json({ uspjesno: false });
            }
            break;
        default:
            res.status(400).json({ uspjesno: false });
            break;
    }
}
