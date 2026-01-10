import { RootState } from '@/store/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedLayoutProps {
    children?: ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    const location = useLocation();
    const access_token = useSelector((state: RootState) => state.user.access_token);
    return access_token ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default ProtectedLayout;