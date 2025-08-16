import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const rawMaterialSchema = z.object({
	id: z.string().optional(),
	name: z
		.string()
		.trim()
		.min(1, "O campo nome da empresa/cliente é obrigatório"),
	price: z.union([
		z
			.string()
			.refine((val) => !isNaN(Number(val)), {
				message: "Precisa ser um número válido",
			})
			.min(0, "O preço unitário deve ser um número positivo"),
		z.number().min(0, "O preço unitário deve ser um número positivo"),
	]),
	unitWeight: z.union([
		z
			.string()
			.refine((val) => !isNaN(Number(val)), {
				message: "Precisa ser um número válido",
			})
			.min(0, "O peso unitário deve ser um número positivo"),
		z.number().min(0, "O peso unitário deve ser um número positivo"),
	]),
});
type formValues = z.infer<typeof rawMaterialSchema>;
const emptyRawMaterial: formValues = {
	name: "",
	price: "0",
	unitWeight: "0",
};

interface RawMaterialViewProps {
	rawMaterial?: formValues;
	handleViewRawMaterial: (isVisible: boolean) => void;
}

const RawMaterialViewer = ({
	rawMaterial,
	handleViewRawMaterial,
}: RawMaterialViewProps) => {
	const form = useForm<formValues>({
		resolver: zodResolver(rawMaterialSchema),
		defaultValues: emptyRawMaterial,
	});
	useEffect(() => {
		if (rawMaterial) {
			form.reset(rawMaterial);
		} else {
			form.reset(emptyRawMaterial);
		}
	}, [rawMaterial, form]);
	const handleDeleteRawMaterial = async () => {
		const token = localStorage.getItem("token");
		if (!rawMaterial?.id) return;
		if (window.confirm("Você tem certeza que deseja deletar este material?")) {
			await fetch(`http://localhost:5002/api/raw-material/${rawMaterial.id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Erro ao deletar cliente");
					}
					handleViewRawMaterial(false);
				})
				.catch((error) => {
					console.error("Erro na requisição:", error);
				});
		}
	};
	const onSubmit = async (values: formValues) => {
		const token = localStorage.getItem("token");
		console.log("Iniciando submit com valores:", values);
		try {
			const url = `http://localhost:5002/api/raw-material${rawMaterial?.id ? `/${rawMaterial.id}` : ""}`;
			const method = rawMaterial?.id ? "PUT" : "POST";
			const body = {
				name: values.name,
				price: Number(values.price),
				unitWeight: Number(values.unitWeight),
			};

			const response = await fetch(url, {
				method: method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(body),
				credentials: "include",
				mode: "cors",
			});

			if (!response.ok) {
				const errorData = await response.text();
				console.error("Erro da API:", errorData);
				throw new Error(errorData || "Erro desconhecido");
			}

			if (response.ok) {
				handleViewRawMaterial(false);
			}
		} catch (error) {
			console.error("Erro na requisição:", error);

			if (error instanceof TypeError && error.message === "Failed to fetch") {
				console.error(
					"Erro de conexão com a API. Verifique se o servidor está rodando em http://localhost:5002",
				);
			}

			if (error instanceof Error) {
				console.error("Detalhes do erro:", {
					message: error.message,
					name: error.name,
					stack: error.stack,
				});
			}
		}
	};
	return (
		<div className="w-full flex flex-col justify-center items-center p-6">
			<div className="w-4xl h- flex flex-col justify-center items-center border-solid border-2 border-blue-500 rounded-lg space-x-1">
				<div className="flex justify-end w-full p-4">
					<Button
						size={"icon"}
						variant={"secondary"}
						onClick={() => handleViewRawMaterial(false)}
					>
						<X />
					</Button>
				</div>
				<Form {...form}>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							console.log("Form submit event triggered");
							console.log("Form values:", form.getValues());
							console.log("Form errors:", form.formState.errors);
							form.handleSubmit(onSubmit)(e);
						}}
						className="space-y-8 flex flex-col justify-center items-center"
					>
						<CardContent className="flex flex-col h-full justify-center items-center ">
							<h2 className="text-2xl font-bold pb-4">Dados do material</h2>
							<div className="flex justify-center space-x-6 ">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Nome</FormLabel>
											<FormControl>
												<Input placeholder="Nome do Material" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="unitWeight"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Peso Unitário</FormLabel>
											<FormControl>
												<Input
													placeholder="Peso Unitário"
													{...field}
													type="number"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="price"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Preço</FormLabel>
											<FormControl>
												<Input
													placeholder="Digite o Preço"
													{...field}
													type="number"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</CardContent>
						<CardFooter className="w-full flex justify-between pb-6">
							<Button
								type="button"
								size={"lg"}
								variant={"destructive"}
								onClick={handleDeleteRawMaterial}
							>
								Deletar
							</Button>
							<Button type="submit" size={"lg"}>
								Enviar
							</Button>
						</CardFooter>
					</form>
				</Form>
			</div>
		</div>
	);
};
export default RawMaterialViewer;
