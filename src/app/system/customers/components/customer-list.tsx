"use client";

import { Button } from "@/components/ui/button";
import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

interface ICustomers {
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

interface IResponseCustomer {
	customerListed: ICustomers[];
}

const CustomerList = () => {
	const [customerList, setCustomerList] = useState<ICustomers[]>([]);
	useEffect(() => {
		const token = localStorage.getItem("token");
		const fetchCustomers = async () => {
			const response = await fetch("http://localhost:5002/api/customer", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				console.log("Erro ao buscar clientes:", response.statusText);
			}
			const customers: IResponseCustomer = await response.json();
			console.log("Clientes:", customers);
			setCustomerList(customers.customerListed);
		};

		fetchCustomers();
	}, []);

	return (
		<Table className="w-4xl mx-auto">
			<TableRow>
				<TableHead>Nome</TableHead>
				<TableHead>CPF</TableHead>
				<TableHead>Telefone</TableHead>
				<TableHead>Email</TableHead>
			</TableRow>
			{customerList.map((customer) => (
				<TableRow key={customer.id}>
					<TableCell>{customer.name}</TableCell>
					<TableCell>{customer.taxId}</TableCell>
					<TableCell>{customer.phone}</TableCell>
					<TableCell>{customer.email}</TableCell>
					<TableCell>
						<Button size={"icon"} variant={"secondary"}>
							<Pencil />
						</Button>
					</TableCell>
				</TableRow>
			))}
		</Table>
	);
};

export default CustomerList;
