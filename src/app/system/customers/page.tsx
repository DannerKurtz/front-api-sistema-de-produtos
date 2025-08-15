import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomerList from "./components/customer-list";

const CustomersPage = async () => {
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
			<CustomerList />
		</div>
	);
};

export default CustomersPage;
