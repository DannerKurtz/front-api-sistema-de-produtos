import Link from "next/link";

const SystemLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<>
			<div className="w-full h-[72px] flex justify-between items-center bg-amber-300 p-4">
				<div>Logo</div>
				<div className="flex justify-between space-x-4">
					<Link href="/system/sales">Vendas</Link>
					<Link href="/system/customers">Clientes</Link>
					<Link href="/system/products">Produto</Link>
					<Link href="/system/raw-material">Materia Prima</Link>
				</div>
			</div>
			{children}
		</>
	);
};

export default SystemLayout;
