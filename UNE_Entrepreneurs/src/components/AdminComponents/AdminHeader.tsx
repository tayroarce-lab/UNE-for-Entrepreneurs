import React from 'react';
import { Search, Bell, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ placeholder = "Buscar...", onSearch }) => {
    const { user } = useAuth();

    return (
        <header className="admin-top-header">
            <div className="search-bar-v2">
                <Search size={18} className="search-icon-header" />
                <input 
                    type="text" 
                    placeholder={placeholder} 
                    onChange={(e) => onSearch?.(e?.target?.value || "")}
                />
            </div>

            <div className="header-user-meta" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <Link to="/" title="Ir al sitio web" style={{ color: '#64748b', display: 'flex', alignItems: 'center' }}>
                    <Home size={22} />
                </Link>

                <div className="notification-bell">
                    <Bell size={22} color="#64748b" />
                    <div className="bell-dot"></div>
                </div>

                <button className="profile-button-v2">
                    <div className="user-tag">
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--suria-plum)', textAlign: 'right' }}>
                            {user?.name || 'Admin UNE'}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', textAlign: 'right' }}>Gestor Principal</div>
                    </div>
                    <div className="profile-circle-v2">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                    </div>
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
