import ProductModel from "../product/product.model";
import { Order } from "./order.interface";
import OrderModel from "./order.model";

async function createOrderIntoDb(order: Order) {
    const { productId, quantity } = order;

    try {

        const product = await ProductModel.findById(productId);

        if (product) {

            if (product.inventory.quantity < quantity) {
                return { status: 200, success: false, message: 'Insufficient quantity available in inventory!', data: null };

            } else {
                const updatedProductQuantity = product.inventory.quantity - quantity;
                let inStock = true;

                if (updatedProductQuantity < 1) {
                    inStock = false;
                }

                const updatedInventory = { quantity: updatedProductQuantity, inStock };
                const updateProduct = await ProductModel.findByIdAndUpdate(productId, { inventory: updatedInventory });

                if (updateProduct) {

                    // final operation
                    const result = await OrderModel.create(order);
                    if (result) return { status: 200, success: true, message: 'Order created successfully!', data: result }
                }

            }
        } else {
            return { status: 400, success: false, message: `Unable to place order. Invalid Product ID: ${productId}`, data: null }
        }

    } catch (error) {
        console.log(error);
    }
};

async function getAllOrdersFromDb(email: string | undefined) {

    try {

        if (email) {
            const result = await OrderModel.find({ email });
            if (result) return result;

        } else {
            const result = await OrderModel.find();
            if (result) return result;
        }

    } catch (error) {
        console.log(error);
    }
}

export const OrderServices = { createOrderIntoDb, getAllOrdersFromDb } 