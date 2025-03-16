
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Search, 
  UserCircle, 
  CreditCard, 
  Settings, 
  LogOut,
  User
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function DashboardSidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Results",
      icon: FileText,
      path: "/result",
    },
    {
      title: "New Scrape",
      icon: Search,
      path: "/dashboard/scrape",
    },
    {
      title: "Profile",
      icon: UserCircle,
      path: "/dashboard/profile",
    },
    {
      title: "Billing",
      icon: CreditCard,
      path: "/dashboard/billing",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-center">
          <Link to="/dashboard" className="text-2xl font-bold text-primary">
            G-Scraper
          </Link>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive(item.path)}
                  tooltip={item.title}
                >
                  <Link to={item.path}>
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm truncate max-w-[140px]">
                {user?.email}
              </span>
              <span className="text-xs text-gray-500">Free Plan</span>
            </div>
          </div>
          <Separator />
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center gap-2"
            onClick={() => signOut()}
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
