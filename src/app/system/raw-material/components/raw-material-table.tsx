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

interface RawMaterialProps {
	id: string;
	name: string;
	price: number;
	unitWeight: number;
	createdAt?: Date;
	updatedAt?: Date;
}

interface RawMaterialTableProps {
	rawMaterialList: RawMaterialProps[];
	handleViewRawMaterial: (view: boolean, rawMaterial: RawMaterialProps) => void;
}

const RawMaterialTable = ({
	rawMaterialList,
	handleViewRawMaterial,
}: RawMaterialTableProps) => {
	return (
		<Table className="w-4xl mx-auto">
			<TableHeader>
				<TableRow>
					<TableHead>Nome</TableHead>
					<TableHead>Peso Unitário</TableHead>
					<TableHead>Preço</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{rawMaterialList.map((rawMaterial) => (
					<TableRow key={rawMaterial.id}>
						<TableCell>{rawMaterial.name}</TableCell>
						<TableCell>{rawMaterial.unitWeight}</TableCell>
						<TableCell>{rawMaterial.price}</TableCell>
						<TableCell>
							<Button
								size={"icon"}
								variant={"secondary"}
								onClick={() => handleViewRawMaterial(true, rawMaterial)}
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

export default RawMaterialTable;
