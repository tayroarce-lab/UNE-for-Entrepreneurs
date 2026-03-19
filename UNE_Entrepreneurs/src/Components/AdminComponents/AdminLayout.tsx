import type { ReactNode } from 'react'
import AdminSidebar from './AdminSidebar'
import '../../styles/AdminDashboard.css'

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main-wrap">
        {children}
      </div>
    </div>
  )
}
