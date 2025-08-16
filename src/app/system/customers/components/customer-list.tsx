/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import CustomerViewer from "./customer-viewer";
import CustomerTable from "./cutomer-table";

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

interface ResponseCustomer {
	customerListed: Customers[];
}

const CustomerList = () => {
	const [customerList, setCustomerList] = useState<Customers[]>([]);
	const [viewCustomerMode, setViewCustomerMode] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [viewerCustomer, setViewerCustomer] = useState<Customers | null>(null);
	const [searchCustomer, setSearchCustomer] = useState("");
	useEffect(() => {
		const token = localStorage.getItem("token");
		const fetchCustomers = async () => {
			const response = await fetch(
				`http://localhost:5002/api/customer${searchCustomer ? `?name=${searchCustomer}` : ""}`,
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
			const customers: ResponseCustomer = await response.json();
			console.log("Clientes:", customers);
			setCustomerList(customers.customerListed);
		};
		fetchCustomers().finally(() => setIsLoading(false));
	}, [viewCustomerMode, searchCustomer]);

	const handleViewCustomer = (isVisible: boolean, customer?: Customers) => {
		setViewCustomerMode(isVisible);
		if (customer) {
			setViewerCustomer(customer);
		} else {
			setViewerCustomer(null);
		}
	};

	return (
		<>
			{viewCustomerMode ? (
				<CustomerViewer
					customer={viewerCustomer || undefined}
					handleViewCustomer={handleViewCustomer}
				/>
			) : (
				<div className="h-full w-full flex flex-col justify-center items-center">
					<div className="flex flex-col md:flex-row max-w-4xl justify-between items-center gap-6 mt-4">
						<div className="w-full">
							<Input
								placeholder="Pesquisar Clientes"
								className="w-full"
								onChange={(e) => setSearchCustomer(e.target.value)}
							/>
						</div>
						<div>
							<Button onClick={() => handleViewCustomer(true, undefined)}>
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
							<CustomerTable
								customerList={customerList}
								handleViewCustomer={handleViewCustomer}
							/>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default CustomerList;
