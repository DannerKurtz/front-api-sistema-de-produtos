/** biome-ignore-all lint/a11y/useSemanticElements: <explanation> */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

interface RawMaterialProps {
	id: string;
	name: string;
	price: number;
	unitWeight: number;
	createdAt?: Date;
	updatedAt?: Date;
}

interface RawMaterialProductRelationProps {
	rawMaterialQuantity: number;
	rawMaterial: RawMaterialProps;
}

interface RawMaterialSearchProps {
	rawMaterialListed: RawMaterialProps[];
}

interface HandleRawMaterialSelect {
	handleRawMaterialSelect: (props: RawMaterialProductRelationProps) => void;
}

const RawMaterialSearch = ({
	handleRawMaterialSelect,
}: HandleRawMaterialSelect) => {
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [selectedValue, setSelectedValue] = useState("");
	const [rawMaterial, setRawMaterial] = useState<RawMaterialSearchProps>();

	useEffect(() => {
		const fetchData = async () => {
			if (!inputValue) return;

			const response = await fetch(
				`http://localhost:5002/api/raw-material?name=`,
			);
			const data = await response.json();
			console.log("Raw Material Data:", data);
			setRawMaterial(data);
		};
		fetchData();
	}, [inputValue]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" aria-expanded={open}>
					{selectedValue
						? rawMaterial?.rawMaterialListed.find(
								(item) => item.name === selectedValue,
							)?.name
						: "Buscar Matéria Prima"}
					<ChevronsUpDown className="opacity-50 ml-2 size-4" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput
						placeholder="Buscar Matéria Prima"
						className="h-9"
						value={inputValue}
						onValueChange={setInputValue}
					/>
					<CommandList>
						<CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
						<CommandGroup>
							{rawMaterial?.rawMaterialListed.map((item) => (
								<CommandItem
									key={item.id}
									value={item.name}
									onSelect={(val) => {
										setSelectedValue(val);
										setInputValue("");
										setOpen(false);
										handleRawMaterialSelect({
											rawMaterial: rawMaterial?.rawMaterialListed.find(
												(item) => item.name === selectedValue,
											) || { id: "", name: "", price: 0, unitWeight: 0 },
											rawMaterialQuantity: 0,
										});
									}}
								>
									{item.name}
									<Check
										className={cn(
											"ml-auto",
											selectedValue === item.name ? "opacity-100" : "opacity-0",
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};

export default RawMaterialSearch;
