"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import React, { useEffect } from "react";

const Data: Record<`rank${number}`, { name: number }[]> = {
  rank1: [{ name: 1 }, { name: 2 }, { name: 3 }],
  rank2: [{ name: 1 }, { name: 2 }, { name: 3 }],
  rank3: [{ name: 1 }, { name: 2 }, { name: 3 }],
};

const PaginationItems = [{ rank: 1 }, { rank: 2 }, { rank: 3 }];

function ServerPage() {
  const router = useRouter();
  const [rank, setRank] = useQueryState("page", parseAsInteger.withDefault(1));

  useEffect(() => {}, [rank]);

  return (
    <div className="mb-[3rem] flex flex-col gap-[6rem]">
      {/* Grid hiển thị dữ liệu */}
      <div className="grid grid-cols-3 place-items-center justify-items-center gap-[2rem]">
        {Data[`rank${rank}`]?.map((data, index) => (
          <div
            key={`rank${rank}-${index}`}
            className="border-input flex h-[400px] w-[400px] items-center justify-center rounded-xl border bg-[#0c0c0c]"
          >
            <p className="text-8xl">{data.name}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              onClick={() => setRank(Math.max(1, rank - 1))}
              aria-disabled={rank <= 1}
              className={rank <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {/* Links */}
          {PaginationItems.map((data) => (
            <PaginationItem className="cursor-pointer" key={data.rank}>
              <PaginationLink
                isActive={data.rank === rank}
                onClick={() => router.push(`/server?page=${data.rank}`)}
              >
                {data.rank}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              onClick={() =>
                setRank(Math.min(PaginationItems.length, rank + 1))
              }
              aria-disabled={rank >= PaginationItems.length}
              className={
                rank >= PaginationItems.length
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default ServerPage;
