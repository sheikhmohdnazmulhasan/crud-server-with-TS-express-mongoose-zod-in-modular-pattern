import { Request, Response } from "express";
import { ProductServices } from "./product.services";

async function createProduct(req: Request, res: Response) {
    const data = req.body

    try {
        const result = await ProductServices.createProductIntoDb(data);

        if (result) {
            res.status(200).json({
                success: true,
                message: 'product created successfully!',
                data: data,
            });

        } else {
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }

    } catch (error) {

        res.status(400).json({
            success: false,
            message: 'Something wrong!',
            error: error
        });
    }
};

async function getProduct(req: Request, res: Response) {

    try {
        const result = await ProductServices.getProductsFromDb();

        if (result) {
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                data: result
            });

        } else {
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }


    } catch (error) {

        res.status(400).json({
            success: false,
            message: 'Something wrong!',
            error: error
        });
    }
};

async function getProductBySearchParams(req: Request, res: Response) {
    const productId = req.params.productId;

    try {
        const result = await ProductServices.getProductBySearchParamsFromDb(productId);

        if (result) {
            res.status(200).json({
                success: true,
                message: 'Products fetched successfully!',
                data: result
            });

        } else {
            res.status(500).json({
                success: false,
                message: "internal server error",
            });
        }


    } catch (error) {

        res.status(400).json({
            success: false,
            message: 'Something wrong!',
            error: error
        });
    }

}

export const ProductController = { createProduct, getProduct, getProductBySearchParams };