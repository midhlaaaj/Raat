import { Suspense } from "react";
import { ShopClient } from "./shop-client";

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopClient />
    </Suspense>
  );
}
