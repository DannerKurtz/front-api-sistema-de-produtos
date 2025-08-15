"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const schemaLoginForm = z.object({
	user: z.string().min(1, "User is required"),
	password: z.string().min(1, "Password is required"),
});

type schemaLoginFormValues = z.infer<typeof schemaLoginForm>;

const CardLogin = () => {
	const router = useRouter();
	const form = useForm<schemaLoginFormValues>({
		resolver: zodResolver(schemaLoginForm),
		defaultValues: {
			user: "",
			password: "",
		},
	});

	const onSubmit = async (data: schemaLoginFormValues) => {
		try {
			const response = await fetch("http://localhost:5002/api/user/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: data.user,
					password: data.password,
				}),
				credentials: "include",
			});
			const responseData = await response.json();
			if (!response.ok)
				throw new Error(responseData.message || "Erro desconhecido");
			console.log("Status:", response.status);
			console.log("Resposta:", responseData);
			localStorage.setItem("token", responseData.userLoggedIn);
			router.push("/system");
		} catch (error) {
			console.error("Erro na requisição:", error);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>Por favor, insira suas credenciais</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<CardContent className="grid gap-6">
						<FormField
							control={form.control}
							name="user"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome</FormLabel>
									<FormControl>
										<Input placeholder="Digite seu nome" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Senha</FormLabel>
									<FormControl>
										<Input
											placeholder="Digite sua senha"
											{...field}
											type="password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<Button type="submit">Entrar</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
};

export default CardLogin;
