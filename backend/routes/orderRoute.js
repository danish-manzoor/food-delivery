import { changeStatus, orderList, placeOrder, userOrders, verifyOrder } from "../controllers/orderController.js";
import authMiddleware from "../middelware/auth.js";
import experss from "express";


const orderRouter = experss.Router();


orderRouter.post('/place',authMiddleware, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userOrders',authMiddleware,userOrders);
orderRouter.post('/list',orderList);
orderRouter.post('/status',changeStatus)

export default orderRouter;