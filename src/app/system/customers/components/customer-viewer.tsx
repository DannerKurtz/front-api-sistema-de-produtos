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
import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Customers {
	id: string;
	name: string;
	postalCode: string;
	city: string;
	taxId: string;
	stateRegistration: string;
	address: string;
	neighborhood: string;
	addressNumber: string;
	contactName: string;
	phone: string;
	mobile: string;
	email: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const emptyCustomer: Customers = {
	id: "",
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
	customer?: Customers;
	handleViewCustomer: (isVisible: boolean) => void;
}

const CustomerViewer = ({
	customer,
	handleViewCustomer,
}: CustomerViewProps) => {
	const form = useForm<Customers>({
		defaultValues: emptyCustomer,
	});
	useEffect(() => {
		if (customer) {
			form.reset(customer); // Modo edição
		} else {
			form.reset(emptyCustomer); // Modo criação
		}
	}, [customer, form.reset]);
	const onSubmit = async () => {
		try {
			const response = await fetch("http://localhost:5002/api/user/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
				credentials: "include",
			});
			const responseData = await response.json();
			if (!response.ok)
				throw new Error(responseData.message || "Erro desconhecido");
			console.log("Status:", response.status);
			console.log("Resposta:", responseData);
			localStorage.setItem("token", responseData.userLoggedIn);
		} catch (error) {
			console.error("Erro na requisição:", error);
		}
	};
	return (
		<div className="w-full  flex flex-col justify-center items-center p-6">
			<Form {...form}>
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
					<form
						onSubmit={form.handleSubmit(onSubmit)}
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
							<Button type="button" size={"lg"} variant={"destructive"}>
								Deletar
							</Button>
							<Button type="submit" size={"lg"}>
								Enviar
							</Button>
						</CardFooter>
					</form>
				</div>
			</Form>
		</div>
	);
};

export default CustomerViewer;
