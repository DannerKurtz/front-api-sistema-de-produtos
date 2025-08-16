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

const customersSchema = z.object({
	id: z.string().optional(),
	name: z
		.string()
		.trim()
		.min(1, "O campo nome da empresa/cliente é obrigatório"),
	postalCode: z.string().trim().min(1, "O campo CEP é obrigatório"),
	city: z.string().trim().min(1, "O campo cidade é obrigatório"),
	taxId: z.string().trim().min(1, "O campo CNPJ/CPF é obrigatório"),
	stateRegistration: z
		.string()
		.trim()
		.min(1, "O campo Inscrição Estadual é obrigatório"),
	address: z.string().trim().min(1, "O campo endereço é obrigatório"),
	neighborhood: z.string().trim().min(1, "O campo bairro é obrigatório"),
	addressNumber: z.string().trim().min(1, "O campo número é obrigatório"),
	contactName: z
		.string()
		.trim()
		.min(1, "O campo nome do contato é obrigatório"),
	phone: z.string().min(1, "O campo telefone é obrigatório"),
	mobile: z.string().min(1, "O campo celular é obrigatório"),
	email: z.email("O campo e-mail é obrigatório"),
});
type formValues = z.infer<typeof customersSchema>;
const emptyCustomer: formValues = {
	name: "",
	postalCode: "",
	city: "",
	taxId: "",
	stateRegistration: "",
	address: "",
	neighborhood: "",
	addressNumber: "",
	contactName: "",
	phone: "",
	mobile: "",
	email: "",
};

interface CustomerViewProps {
	customer?: formValues;
	handleViewCustomer: (isVisible: boolean) => void;
}

const CustomerViewer = ({
	customer,
	handleViewCustomer,
}: CustomerViewProps) => {
	const form = useForm<formValues>({
		resolver: zodResolver(customersSchema),
		defaultValues: emptyCustomer,
	});
	useEffect(() => {
		if (customer) {
			form.reset(customer);
		} else {
			form.reset(emptyCustomer);
		}
	}, [customer, form]);
	const handleDeleteCustomer = async () => {
		const token = localStorage.getItem("token");
		if (!customer?.id) return;
		if (window.confirm("Você tem certeza que deseja deletar este cliente?")) {
			await fetch(`http://localhost:5002/api/customer/${customer.id}`, {
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
					handleViewCustomer(false);
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
			const url = `http://localhost:5002/api/customer${customer?.id ? `/${customer.id}` : ""}`;
			const method = customer?.id ? "PUT" : "POST";
			const body = {
				name: values.name,
				postalCode: values.postalCode,
				city: values.city,
				taxId: values.taxId,
				stateRegistration: values.stateRegistration,
				address: values.address,
				neighborhood: values.neighborhood,
				addressNumber: values.addressNumber,
				contactName: values.contactName,
				phone: values.phone,
				mobile: values.mobile,
				email: values.email,
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
				handleViewCustomer(false);
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
						onClick={() => handleViewCustomer(false)}
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
							<h2 className="text-2xl font-bold pb-4">Dados da Empresa</h2>
							<div className="flex justify-center space-x-6 ">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Nome</FormLabel>
											<FormControl>
												<Input
													placeholder="Nome da Empresa/Cliente"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="taxId"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Código Fiscal</FormLabel>
											<FormControl>
												<Input
													placeholder="Código Fiscal"
													{...field}
													type="text"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="stateRegistration"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Inscrição Estadual</FormLabel>
											<FormControl>
												<Input
													placeholder="Inscrição Estadual"
													{...field}
													type="text"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<h2 className="text-2xl font-bold p-4">Endereço</h2>
							<div className="grid grid-cols-3 gap-4">
								<FormField
									control={form.control}
									name="address"
									render={({ field }) => (
										<FormItem className="col-span-2">
											<FormLabel>Endereço</FormLabel>
											<FormControl>
												<Input placeholder="Endereço" {...field} type="text" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="addressNumber"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Número do Endereço</FormLabel>
											<FormControl>
												<Input
													placeholder="Número do Endereço"
													{...field}
													type="text"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="neighborhood"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Bairro</FormLabel>
											<FormControl>
												<Input placeholder="Bairro" {...field} type="text" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="city"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Cidade</FormLabel>
											<FormControl>
												<Input placeholder="Cidade" {...field} type="text" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="postalCode"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Código Postal</FormLabel>
											<FormControl>
												<Input
													placeholder="Código Postal"
													{...field}
													type="text"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<h2 className="text-2xl font-bold p-4">Informações de Contato</h2>
							<div className="flex space-x-6">
								<FormField
									control={form.control}
									name="contactName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nome do Contato</FormLabel>
											<FormControl>
												<Input
													placeholder="Nome do Contato"
													{...field}
													type="text"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder="Email" {...field} type="email" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Telefone</FormLabel>
											<FormControl>
												<Input placeholder="Telefone" {...field} type="tel" />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="mobile"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Celular</FormLabel>
											<FormControl>
												<Input placeholder="Celular" {...field} type="tel" />
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
								onClick={handleDeleteCustomer}
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
export default CustomerViewer;
