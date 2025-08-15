"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import CustomerTable from "./cutomer-table";

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
	const [viewCustomerMode, setViewCustomerMode] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
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
		fetchCustomers().finally(() => setIsLoading(false));
	}, []);

	const handleViewCustomer = (view: boolean) => {
		setViewCustomerMode(view);
	};

	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<div className="flex flex-col md:flex-row max-w-4xl justify-between items-center">
				<div className="">search</div>
				<div>
					<Button>
						Novo Cliente <Plus />
					</Button>
				</div>
			</div>
			{viewCustomerMode ? (
				<p>Nenhum cliente encontrado.</p>
			) : (
				<div className="">
					{isLoading ? (
						<div className="h-3/4 absolute flex justify-center items-center animate-spin">
							<Loader2Icon />
						</div>
					) : (
						<CustomerTable
							customerList={customerList}
							handleViewCustomer={handleViewCustomer}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default CustomerList;
