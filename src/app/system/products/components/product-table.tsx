import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";

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

interface ProductTableProps {
	productList: ProductProps[];
	handleViewProduct: (view: boolean, product: ProductProps) => void;
}

const ProductTable = ({
	productList,
	handleViewProduct,
}: ProductTableProps) => {
	return (
		<Table className="w-4xl mx-auto">
			<TableHeader>
				<TableRow>
					<TableHead>Nome</TableHead>
					<TableHead>Porcentagem</TableHead>
					<TableHead>Preço de Custo</TableHead>
					<TableHead>Preço</TableHead>
					<TableHead>Peso total</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{productList.map((product) => (
					<TableRow key={product.id}>
						<TableCell>{product.name}</TableCell>
						<TableCell>{product.percentage}</TableCell>
						<TableCell>{product.costPrice}</TableCell>
						<TableCell>{product.price}</TableCell>
						<TableCell>{product.weight}</TableCell>
						<TableCell>
							<Button
								size={"icon"}
								variant={"secondary"}
								onClick={() => handleViewProduct(true, product)}
							>
								<Pencil />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default ProductTable;
