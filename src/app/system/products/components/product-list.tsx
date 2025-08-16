/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import RawMaterialTable from "./product-table";
import ProductViewer from "./product-viewer";

interface ProductProps {
	id: string;
	name: string;
	percentage?: number;
	price?: number;
	quantity: number;
	weight?: number;
	costPrice?: number;
	rawMaterialProductRelation?: {
		id: string;
		productId: string;
		rawMaterialId: string;
		rawMaterialQuantity: number;
	}[];
	createdAt?: Date;
	updatedAt?: Date;
}

interface ResponseProduct {
	productListed: ProductProps[];
}

const ProductList = () => {
	const [productList, setProductList] = useState<ProductProps[]>([]);
	const [viewProductMode, setViewProductMode] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [viewerProduct, setViewerProduct] = useState<ProductProps | null>(null);
	const [searchProduct, setSearchProduct] = useState("");
	useEffect(() => {
		const token = localStorage.getItem("token");
		const fetchProducts = async () => {
			const response = await fetch(
				`http://localhost:5002/api/product${searchProduct ? `?name=${searchProduct}` : ""}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);

			if (!response.ok) {
				console.log("Erro ao buscar clientes:", response.statusText);
			}
			const products: ResponseProduct = await response.json();
			console.log("Produtos:", products);
			setProductList(products.productListed);
		};
		fetchProducts().finally(() => setIsLoading(false));
	}, [viewProductMode, searchProduct]);

	const handleViewProduct = (isVisible: boolean, product?: ProductProps) => {
		setViewProductMode(isVisible);
		if (product) {
			setViewerProduct(product);
		} else {
			setViewerProduct(null);
		}
	};

	return (
		<>
			{viewProductMode ? (
				<ProductViewer
					product={viewerProduct || undefined}
					handleViewProduct={handleViewProduct}
				/>
			) : (
				<div className="h-full w-full flex flex-col justify-center items-center">
					<div className="flex flex-col md:flex-row max-w-4xl justify-between items-center gap-6 mt-4">
						<div className="w-full">
							<Input
								placeholder="Pesquisar Produtos"
								className="w-full"
								onChange={(e) => setSearchProduct(e.target.value)}
							/>
						</div>
						<div>
							<Button onClick={() => handleViewProduct(true, undefined)}>
								Novo Produto <Plus />
							</Button>
						</div>
					</div>

					<div className="">
						{isLoading ? (
							<div className="h-3/4 absolute flex justify-center items-center animate-spin">
								<Loader2Icon />
							</div>
						) : (
							<RawMaterialTable
								productList={productList}
								handleViewProduct={handleViewProduct}
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default ProductList;
