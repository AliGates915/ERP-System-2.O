import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Truck,
  Barcode,
  MessageSquare,
  FileText,
  Building2,
  Bell,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Sales", href: "/sales", icon: ShoppingCart },
  { name: "Consignment", href: "/consignment", icon: Truck },
  { name: "Barcode", href: "/barcode", icon: Barcode },
  { name: "Communication", href: "/communication", icon: MessageSquare },
  { name: "Reports", href: "/reports", icon: FileText },
];

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedCompany = JSON.parse(localStorage.getItem("selectedCompany") || "{}");

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 bg-card border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </Button>
            <div className="flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" />
              <div className="hidden sm:block">
                <h2 className="font-semibold text-foreground">{selectedCompany.name}</h2>
                <p className="text-xs text-muted-foreground">{selectedCompany.role}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="z-[9999] w-72 bg-gray-50 border border-border shadow-xl rounded-xl p-2"
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5">
                  Notifications
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Dummy notifications */}
                <DropdownMenuItem className="flex items-start gap-3 cursor-pointer hover:bg-muted px-3 py-2 rounded-md transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      New sales report available
                    </p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-start gap-3 cursor-pointer hover:bg-muted px-3 py-2 rounded-md transition-colors">
                  <div className="w-2 h-2 bg-success rounded-full mt-1.5"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Inventory updated successfully
                    </p>
                    <p className="text-xs text-muted-foreground">10 minutes ago</p>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="flex items-start gap-3 cursor-pointer hover:bg-muted px-3 py-2 rounded-md transition-colors">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-1.5"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Failed to sync with Toulouse branch
                    </p>
                    <p className="text-xs text-muted-foreground">30 minutes ago</p>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center text-sm text-primary hover:bg-muted/50 cursor-pointer rounded-md">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>


            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="z-[9999] bg-card/90 backdrop-blur-md border border-border shadow-lg rounded-lg p-1"
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate('/company-selection')}
                  className="flex items-center gap-2 hover:bg-muted hover:text-foreground px-3 py-2 rounded-md cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-primary" />
                  Switch Company
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:bg-destructive hover:text-white px-3 py-2 rounded-md cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>

            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-200 lg:translate-x-0 top-16",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="flex flex-col gap-2 p-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#36BFFA] text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-ring"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
