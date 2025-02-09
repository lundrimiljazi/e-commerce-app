"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useProductStore from "@/store/useProductStore";

export default function ClientPageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const setCurrentPage = useProductStore((state) => state.setCurrentPage);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [searchParams, setCurrentPage]);

  return <>{children}</>;
}
