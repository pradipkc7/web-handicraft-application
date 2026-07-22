import Link from "next/link";
import { notFound } from "next/navigation";
import { handleGetProductById } from "@/lib/actions/admin/product-action";
import ProductFormEdit from "../../_components/ProductFormEdit";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await handleGetProductById(id);
  if (!result.success || !result.data) notFound();

  return (
    <section>
      <Link
        href="/admin/products"
        className="text-xs uppercase tracking-[1.5px] text-muted hover:text-on-dark"
      >
        ← Back to products
      </Link>
      <h2 className="mb-8 mt-4 text-3xl font-bold text-on-dark">
        Edit product
      </h2>
      <ProductFormEdit product={result.data} />
    </section>
  );
}
