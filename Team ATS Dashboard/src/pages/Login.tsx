import backgroundImage from "@/assets/v1016-b-09.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminLoginMutation } from "@/store/api/adminApi";
import { loginUser } from "@/store/services/authSlice";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type ApiError = {
    status: number;
    data: {
        message: string;
    };
};

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [adminLogin, { isLoading }] = useAdminLoginMutation();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await adminLogin(credentials).unwrap();
            if (result?.data?.accessToken && result?.data?.admin) {
                dispatch(
                    loginUser({
                        userData: result?.data?.admin,
                        access_token: result?.data?.accessToken,
                    })
                );
                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            }
        } catch (error) {
            const err = error as ApiError;
            toast.error(err?.data?.message || 'An error occurred during login');
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{
                backgroundImage: `url('${backgroundImage}')`,
            }}
        >
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <Card className="relative z-10 w-full max-w-xl mx-4 md:mx-0 shadow-2xl border-none backdrop-blur-lg bg-white/80">
                <div className="text-center py-6 px-4 md:px-8">
                    <h1 className="text-4xl font-extrabold text-gray-800">Admin Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">Welcome back! Please login to your account.</p>
                </div>
                <CardContent className="px-6 md:px-12 pb-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <Label className="text-sm font-medium text-gray-700">Email or Phone Number</Label>
                            <Input
                                name="email"
                                placeholder="E.g: username@gmail.com"
                                type="text"
                                className="mt-1"
                                value={credentials.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="relative">
                            <Label className="text-sm font-medium text-gray-700">Password</Label>
                            <Input
                                name="password"
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                className="mt-1 pr-10"
                                value={credentials.password}
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                className="absolute cursor-pointer right-3 top-9"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="login-button"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Log In"}
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}