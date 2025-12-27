import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const LimitSelector = ({
    limit,
    types,
    totalCount,
    showingCount,
    setLimit,
}: {
    limit: number;
    types: string;
    totalCount: number;
    showingCount: number;
    setLimit: (limit: number) => void;
}) => {
    const limits = [10, 20, 50, 100, 200];

    return (
        <div className="flex items-center gap-3 mt-3">
            <p className="text-sm text-gray-700">
                Showing {showingCount} of {totalCount} {types}
            </p>
            {totalCount < 10 ? null : <div>
                <Select
                    value={limit.toString()}
                    onValueChange={(value) => setLimit(Number(value))}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select limit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {limits.map((row) => (
                                <SelectItem key={row} value={row.toString()}>
                                    {row}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>}
        </div>
    );
};

export default LimitSelector;
