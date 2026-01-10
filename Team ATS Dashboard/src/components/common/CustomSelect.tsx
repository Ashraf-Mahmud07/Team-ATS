import React from 'react';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from '@/components/ui/select';

type Exam = {
    _id: string;
    title: string;
};

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    data: Exam[];
    isLoading?: boolean;
    placeholder?: string;
}

const CustomSelect: React.FC<SelectProps> = ({
    value,
    onChange,
    data,
    isLoading = false,
    placeholder = 'Select an Exam',
}) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full mb-2">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {!isLoading &&
                        data?.map((row) => (
                            <SelectItem key={row._id} value={row._id}>
                                {row.title}
                            </SelectItem>
                        ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default CustomSelect;
