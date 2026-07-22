import Link from "next/link";
import ProductForm from "../_components/ProductForm";

export default function Page() {
  return (
    <section>
      <Link
        href="/admin/products"
        className="text-xs uppercase tracking-[1.5px] text-muted hover:text-on-dark"
      >
        ← Back to products
      </Link>
      <h2 className="mb-8 mt-4 text-3xl font-bold text-on-dark">
        New product
      </h2>
      <ProductForm />
    </section>
  );
}
