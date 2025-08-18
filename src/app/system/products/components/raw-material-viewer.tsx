import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RawMaterialSearch from "./raw-material-serach";
import RawMaterialViewerTable from "./raw-material-view-table";

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
const RawMaterialViewer = ({
	rawMaterialProductRelation,
}: RawMaterialProps) => {
	return (
		<div className="flex flex-col justify-center items-center gap-4 m-2.5">
			<h2 className="text-2xl font-semibold">Materiais Utilizado</h2>
			<div className="flex justify-between items-center w-2xl">
				<div>
					<RawMaterialSearch />
				</div>
				<Button>
					Adicionar <Plus />
				</Button>
			</div>
			<RawMaterialViewerTable
				rawMaterialProductRelation={rawMaterialProductRelation}
			/>
		</div>
	);
};

export default RawMaterialViewer;
