/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import RawMaterialTable from "./raw-material-table";
import RawMaterialViewer from "./raw-material-viewer";

interface RawMaterial {
	id: string;
	name: string;
	price: number;
	unitWeight: number;
	createdAt?: Date;
	updatedAt?: Date;
}

interface ResponseRawMaterial {
	rawMaterialListed: RawMaterial[];
}

const RawMaterialList = () => {
	const [rawMaterialList, setRawMaterialList] = useState<RawMaterial[]>([]);
	const [viewRawMaterialMode, setViewRawMaterialMode] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [viewerRawMaterial, setViewerRawMaterial] =
		useState<RawMaterial | null>(null);
	const [searchRawMaterial, setSearchRawMaterial] = useState("");
	useEffect(() => {
		const token = localStorage.getItem("token");
		const fetchRawMaterials = async () => {
			const response = await fetch(
				`http://localhost:5002/api/raw-material${searchRawMaterial ? `?name=${searchRawMaterial}` : ""}`,
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
			const rawMaterials: ResponseRawMaterial = await response.json();
			console.log("Matérias-primas:", rawMaterials);
			setRawMaterialList(rawMaterials.rawMaterialListed);
		};
		fetchRawMaterials().finally(() => setIsLoading(false));
	}, [viewRawMaterialMode, searchRawMaterial]);

	const handleViewRawMaterial = (
		isVisible: boolean,
		rawMaterial?: RawMaterial,
	) => {
		setViewRawMaterialMode(isVisible);
		if (rawMaterial) {
			setViewerRawMaterial(rawMaterial);
		} else {
			setViewerRawMaterial(null);
		}
	};

	return (
		<>
			{viewRawMaterialMode ? (
				<RawMaterialViewer
					rawMaterial={viewerRawMaterial || undefined}
					handleViewRawMaterial={handleViewRawMaterial}
				/>
			) : (
				<div className="h-full w-full flex flex-col justify-center items-center">
					<div className="flex flex-col md:flex-row max-w-4xl justify-between items-center gap-6 mt-4">
						<div className="w-full">
							<Input
								placeholder="Pesquisar Materiais"
								className="w-full"
								onChange={(e) => setSearchRawMaterial(e.target.value)}
							/>
						</div>
						<div>
							<Button onClick={() => handleViewRawMaterial(true, undefined)}>
								Novo Cliente <Plus />
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
								rawMaterialList={rawMaterialList}
								handleViewRawMaterial={handleViewRawMaterial}
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default RawMaterialList;
