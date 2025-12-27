import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateAdminOrModeratorMutation } from "@/store/api/usersApi";
import { IAdmin } from "@/types/users";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../components/ui/select";

export function CreateNewAdmin() {
    const [formData, setFormData] = useState<Partial<IAdmin>>({});
    const [isOpen, setIsOpen] = useState(false);

    // ... API ...
    const [createAdmin, { isLoading }] = useCreateAdminOrModeratorMutation();

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            const response = await createAdmin(formData).unwrap();
            if (response.success === true) {
                toast.success(response.message);
                setIsOpen(false);
            }
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 mb-3"
                >
                    Create new
                    <Plus className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-2/3 max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create new Admin or Moderator</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 w-full mx-auto py-6 bg-white rounded-2xl"
                >
                    <div className="md:flex justify-between items-center gap-3">
                        <div className="space-y-2 w-full">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter name"
                                required
                            />
                        </div>
                        <div className="space-y-2 w-full">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />
                        </div>
                    </div>

                    <div className="md:flex justify-between gap-2">
                        <div className="space-y-2 w-full">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <div className="space-y-2 w-full">
                            <Label htmlFor="role">Role</Label>
                            <Select
                                value={formData?.role as string}
                                onValueChange={(value: "admin" | "moderator") =>
                                    setFormData((prev) => ({ ...prev, role: value }))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem key={"admin"} value={"admin"}>
                                        Admin
                                    </SelectItem>
                                    <SelectItem key={"moderator"} value={"moderator"}>
                                        Moderator
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button
                        variant={"outline"}
                        type="submit"
                        className="w-full cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating..." : "Create"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
