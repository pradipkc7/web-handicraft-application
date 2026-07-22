import { getProducts, getProductCategories } from "@/lib/api/product";
import ProductGrid from "./_components/ProductGrid";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const page = query.page ? parseInt(query.page as string, 10) : 1;
  const limit = query.limit ? parseInt(query.limit as string, 10) : 12;
  const search = query.search ? (query.search as string) : "";
  const category = query.category ? (query.category as string) : "";

  const [productsRes, categoriesRes] = await Promise.all([
    getProducts({ page, limit, search, category }).catch(() => null),
    getProductCategories().catch(() => null),
  ]);

  const data = productsRes?.data ?? [];
  const pagination = productsRes?.meta ?? { page, limit, totalPages: 1, total: 0 };
  const categories: string[] = categoriesRes?.data ?? [];

  return (
    <ProductGrid
      data={data}
      pagination={pagination}
      search={search}
      category={category}
      categories={categories}
    />
  );
}
