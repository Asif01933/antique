import Order from '../../../models/Order';
import db from '../../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  const newOrder = new Order({
    ...req.body,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
};
export default handler;
