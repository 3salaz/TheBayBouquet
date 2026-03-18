import AdminSidebar from "../components/AdminSidebar"
import AdminToolbar from "../components/AdminToolbar"

type Props = {
  children: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="min-h-screen h-screen bg-neutral-100">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <div className="flex flex-grow flex-1 flex-col">
          <AdminToolbar />

          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}