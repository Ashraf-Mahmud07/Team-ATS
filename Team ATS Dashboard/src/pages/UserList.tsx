import { CustomPagination } from "@/components/common/CustomPagination";
import LimitSelector from "@/components/common/LimitSelector";
import Loading from "@/components/common/Loader";
import PageHeader from "@/components/common/PageHeader";
import { DataTable } from "@/components/ui/data-table";
import { Switch } from "@/components/ui/switch";
import { useGetAllUsersQuery } from "@/store/api/usersApi";
import { User } from "@/types/users";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import moment from "moment";
import React, { useEffect } from "react";
import dummyImage from "../assets/user-circle-svgrepo-com.svg";

const columns: ColumnDef<User>[] = [
    {
        accessorKey: "image",
        header: ({ column }) => (
            <p
                className="flex cursor-pointer"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Image <ArrowUpDown className="ml-2 h-4 w-4" />
            </p>
        ),
        cell: ({ row }) => (
            <img
                src={row.original.image ? row.original.image.startsWith("http") ? row.original.image : import.meta.env.VITE_IMG_URL + row.original.image : dummyImage}
                alt={row.original.name}
                className="w-12 h-12 rounded-full object-cover"
            />
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <p
                className="flex cursor-pointer"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name <ArrowUpDown className="ml-2 h-4 w-4" />
            </p>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <p
                className="flex cursor-pointer"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Email <ArrowUpDown className="ml-2 h-4 w-4" />
            </p>
        ),
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <p
                className="flex cursor-pointer"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Phone <ArrowUpDown className="ml-2 h-4 w-4" />
            </p>
        ),
    },
    {
        accessorKey: "isVerified",
        header: ({ column }) => (
            <p
                className="flex cursor-pointer"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Verified <ArrowUpDown className="ml-2 h-4 w-4" />
            </p>
        ),
        cell: ({ row }) => (
            <Switch checked={row.original.isVerified} id="verified" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <p
                className="flex cursor-pointer"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Status <ArrowUpDown className="ml-2 h-4 w-4" />
            </p>
        ),
        cell: ({ row }) => (
            <Switch checked={row.original.status === "active"} id="status" />
        ),
    },
    {
        accessorKey: "lastLogin",
        header: ({ column }) => (
            <p
                className="flex cursor-pointer"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Last Login <ArrowUpDown className="ml-2 h-4 w-4" />
            </p>
        ),
        cell: ({ row }) => {
            return <span>{row.original.lastLogin ? moment(row.original.lastLogin).format("Do MMM YYYY") : "----"}</span>;
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <p
                className="flex cursor-pointer"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Creation Date <ArrowUpDown className="ml-2 h-4 w-4" />
            </p>
        ),
        cell: ({ row }) => {
            return <span>{moment(row.original.createdAt).format("Do MMM YYYY")}</span>;
        },
    },

];

const UserList = () => {
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState<number>(10);
    const [searchInput, setSearchInput] = React.useState("");
    const [search, setSearch] = React.useState("");
    const [fromDate, setFromDate] = React.useState("");
    const [toDate, setToDate] = React.useState("");

    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(limit));
    if (search) params.append("search", search);
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);
    const query = params.toString();
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setSearch(searchInput.trim());
        }, 500); // 500ms debounce

        return () => clearTimeout(delayDebounce);
    }, [searchInput]);

    const { data, isLoading, isError, error } = useGetAllUsersQuery(query, {
        refetchOnFocus: true,
    });

    if (isLoading) return <Loading />;
    if (isError) {
        let errorMessage = "An error occurred.";
        if (error && "status" in error) {
            const fetchError = error as FetchBaseQueryError & { data?: { message?: string } };
            errorMessage = fetchError.data?.message ?? errorMessage;
        }
        else if (error && typeof error === "object" && "message" in error) {
            errorMessage = (error as SerializedError).message ?? errorMessage;
        }
        return (
            <p className="p-4 text-center text-2xl my-4 text-red-500">
                {errorMessage}
            </p>
        );
    }

    const users = data?.data?.data || [];
    const totalCount = data?.data?.meta?.total ?? 0;

    const handleClearDateFilters = () => {
        setFromDate("");
        setToDate("");
    };

    return (
        <div>
            <PageHeader title="Users" />
            <div className="flex flex-wrap justify-between gap-4 mb-4 items-center">
                <input
                    type="text"
                    placeholder="Search by name, email or phone"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="border px-4 py-2 rounded w-full sm:w-1/4"
                />
                <div className="flex">
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="border px-4 py-2 rounded"
                    />
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="border px-4 py-2 rounded"
                    />
                    {(fromDate || toDate) && (
                        <button
                            onClick={handleClearDateFilters}
                            className="bg-gray-200 px-3 py-2 rounded text-sm hover:bg-gray-300 transition"
                        >
                            Clear Dates
                        </button>
                    )}
                </div>
            </div>

            <DataTable columns={columns} data={users} />

            <LimitSelector
                types="Users"
                totalCount={totalCount}
                showingCount={users.length}
                setLimit={setLimit}
                limit={limit}
            />

            <CustomPagination
                limit={limit}
                page={page}
                totalCount={totalCount}
                onPageChange={(newPage) => setPage(newPage)}
            />
        </div>
    );
};

export default UserList;