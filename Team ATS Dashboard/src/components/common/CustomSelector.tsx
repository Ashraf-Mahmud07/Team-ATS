import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomSelectProps<T> {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  options: T[];
  optionLabelKey: keyof T;
  optionValueKey?: keyof T;
  onChange: (value: string) => void;
}

function CustomSelector<T extends object>({
  label,
  name,
  value,
  placeholder = "Select an option",
  options,
  optionLabelKey,
  optionValueKey,
  onChange,
}: CustomSelectProps<T>) {
  const handleValueChange = (val: string) => {
    if (val === "all") {
      onChange("");
    } else {
      onChange(val);
    }
  };
  return (
    <div className="space-y-2">
      <Label htmlFor={`select-${name}`}>{label}</Label>
      <Select name={name} value={value} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">{placeholder}</SelectItem>
            {options.map((option, index) => (
              <SelectItem
                key={String(option[optionValueKey || optionLabelKey]) + index}
                value={String(option[optionValueKey || optionLabelKey])}
              >
                {String(option[optionLabelKey])}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default CustomSelector;
