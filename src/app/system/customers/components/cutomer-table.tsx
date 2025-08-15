import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";

interface CustomersProps {
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

interface CustomerTableProps {
	customerList: CustomersProps[];
	handleViewCustomer: (view: boolean, customer: CustomersProps) => void;
}

const CustomerTable = ({
	customerList,
	handleViewCustomer,
}: CustomerTableProps) => {
	return (
		<Table className="w-4xl mx-auto">
			<TableHeader>
				<TableRow>
					<TableHead>Nome</TableHead>
					<TableHead>CPF</TableHead>
					<TableHead>Telefone</TableHead>
					<TableHead>Email</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{customerList.map((customer) => (
					<TableRow key={customer.id}>
						<TableCell>{customer.name}</TableCell>
						<TableCell>{customer.taxId}</TableCell>
						<TableCell>{customer.phone}</TableCell>
						<TableCell>{customer.email}</TableCell>
						<TableCell>
							<Button
								size={"icon"}
								variant={"secondary"}
								onClick={() => handleViewCustomer(true, customer)}
							>
								<Pencil />
							</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default CustomerTable;
