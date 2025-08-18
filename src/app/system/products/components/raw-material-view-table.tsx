import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Eraser } from "lucide-react";

interface rawMaterialProductRelationProps {
	rawMaterialQuantity: number;
	rawMaterial: {
		id: string;
		name: string;
		price: number;
		unitWeight: number;
		createdAt?: Date;
		updatedAt?: Date;
	};
}

interface RawMaterialProps {
	rawMaterialProductRelation: rawMaterialProductRelationProps[] | undefined;
}

const RawMaterialViewerTable = ({
	rawMaterialProductRelation,
}: RawMaterialProps) => {
	return (
		<Table className="w-4xl mx-auto">
			<TableHeader>
				<TableRow>
					<TableHead>Nome</TableHead>
					<TableHead>Peso Unitário</TableHead>
					<TableHead>Preço</TableHead>
					<TableHead>Quantidade</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{rawMaterialProductRelation
					? rawMaterialProductRelation.map((rawMaterial) => (
							<TableRow key={rawMaterial.rawMaterial.id}>
								<TableCell>{rawMaterial.rawMaterial.name}</TableCell>
								<TableCell>{rawMaterial.rawMaterial.unitWeight}</TableCell>
								<TableCell>{rawMaterial.rawMaterial.price}</TableCell>
								<TableCell>{rawMaterial.rawMaterialQuantity}</TableCell>
								<TableCell>
									<Button
										size={"icon"}
										variant={"secondary"}
										onClick={() => {}}
									>
										<Eraser />
									</Button>
								</TableCell>
							</TableRow>
						))
					: ""}
			</TableBody>
		</Table>
	);
};

export default RawMaterialViewerTable;
