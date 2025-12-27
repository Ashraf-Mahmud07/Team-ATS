import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "../ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink
} from "../ui/pagination";

interface Props {
    totalCount: number;
    page: number;
    limit: number;
    onPageChange: (page: number) => void;
}

export function CustomPagination({ totalCount, page, limit, onPageChange }: Props) {
    const totalPages = Math.ceil(totalCount / limit);

    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        let start = Math.max(1, page - Math.floor(maxVisible / 2));
        let end = start + maxVisible - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <Pagination className="my-4">
            <PaginationContent>
                {totalPages > 5 && <PaginationItem>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) onPageChange(1);
                        }}
                        disabled={page === 1}
                        className="cursor-pointer"
                    >
                        <ChevronsLeft className="w-4 h-4" />
                    </Button>
                </PaginationItem>}
                <PaginationItem>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) onPageChange(page - 1);
                        }}
                        disabled={page === 1}
                        className="cursor-pointer"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                </PaginationItem>

                {pages.map((pg) => (
                    <PaginationItem key={pg}>
                        <PaginationLink
                            href="#"
                            isActive={pg === page}
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(pg);
                            }}
                        >
                            {pg}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {totalPages > pages[pages.length - 1] && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(totalPages);
                                }}
                            >
                                {totalPages}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                <PaginationItem>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                            e.preventDefault();
                            if (page < totalPages) onPageChange(page + 1);
                        }}
                        disabled={page === totalPages}
                        className="cursor-pointer"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </PaginationItem>
                {totalPages > 5 && <PaginationItem>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                            e.preventDefault();
                            if (page < totalPages) onPageChange(totalPages);
                        }}
                        disabled={page === totalPages}
                        className="cursor-pointer"
                    >
                        <ChevronsRight className="w-4 h-4" />
                    </Button>
                </PaginationItem>}
            </PaginationContent>
        </Pagination>
    );
}
