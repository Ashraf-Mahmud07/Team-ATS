import { CustomPagination } from "@/components/common/CustomPagination";
import LimitSelector from "@/components/common/LimitSelector";
import Loading from "@/components/common/Loader";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useGetAllAdminsAndModeratorQuery, usersApi } from "@/store/api/usersApi";
import { store } from "@/store/store";
import { IAdmin } from "@/types/users";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUpDown } from "lucide-react";
import moment from "moment";
import React from "react";
import { toast } from "react-toastify";
import { CreateNewAdmin } from "./CreateNewAdmin";

const handleRoleChange = async (id: string, newRole: string) => {
    try {
        const res = await store.dispatch(usersApi.endpoints.updateAdminOrModeratorRole.initiate({ id, role: newRole }))
        if (res.data?.success) {
            toast.success(res.data.message)
        }
    } catch (error) {
        console.error("Failed to update role", error);
    }
};

const handleStatusChange = async (id: string, type: "enable" | "disable") => {
    try {
        const res = await store.dispatch(
            usersApi.endpoints.updateAdminOrModeratorStatus.initiate({ id, type })
        );

        if (res.data?.success) {
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Failed to update status", error);
    }
};

const columns: ColumnDef<IAdmin>[] = [
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
        accessorKey: "role",
        header: ({ column }) => (
            <p
                className="flex cursor-pointer"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Role <ArrowUpDown className="ml-2 h-4 w-4" />
            </p>
        ),
        cell: ({ row }) => {
            const role = row.getValue("role") as string;
            const userId = row.original._id;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            {role === "admin" ? "Admin" : "Moderator"} <ArrowDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="left">
                        <DropdownMenuItem className="cursor-pointer" onSelect={() => handleRoleChange(userId, "admin")}>
                            Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onSelect={() => handleRoleChange(userId, "moderator")}
                        >
                            Moderator
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
    {
        accessorKey: "isDisabled",
        header: ({ column }) => (
            <p
                className="flex cursor-pointer"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Disabled <ArrowUpDown className="ml-2 h-4 w-4" />
            </p>
        ),
        cell: ({ row }) => {
            const isDisabled = row.original.isDisabled as boolean;
            const userId = row.original._id;

            return (
                <Switch
                    checked={isDisabled}
                    id={`isDisabled-${userId}`}
                    onCheckedChange={(checked) => {
                        const type = checked ? "disable" : "enable";
                        handleStatusChange(userId, type);
                    }}
                />
            );
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

const AdminList = () => {
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState<number>(10);

    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(limit));

    const query = params.toString();
    const { data, isLoading } = useGetAllAdminsAndModeratorQuery(query, {
        refetchOnFocus: true,
    });

    if (isLoading) return <Loading />;


    const users = data?.data?.data || [];
    const totalCount = data?.data?.meta?.total ?? 0;

    return (
        <div>
            <PageHeader title="Admins" />
            <CreateNewAdmin />
            <DataTable message={"No Admins Data Found!"} columns={columns} data={users} />
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

export default AdminList;