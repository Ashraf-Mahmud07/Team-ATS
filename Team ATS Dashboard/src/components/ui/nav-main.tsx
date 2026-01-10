import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { RootState } from "@/store/store";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { IconType } from "react-icons/lib";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | IconType;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const location = useLocation();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const userData = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    const matchedParent = items.find((item) =>
      item.items?.some((subItem) => subItem.url === location.pathname)
    );
    if (matchedParent) {
      setOpenItem(matchedParent.title);
    }
  }, [location.pathname, items]);

  const handleItemClick = (title: string) => {
    setOpenItem((prev) => (prev === title ? null : title));
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isOpen = openItem === item.title;
          const isActive = location.pathname === item.url;

          if (userData?.role === "moderator" && (item.title === "Admins" || item.title === "Packages" || item.title === "Orders" || item.title === "Users")) {
            return null;
          }

          if (!item.items || item.items.length === 0) {
            return (
              <SidebarMenuItem key={item.title} className="text-md">
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={isActive ? "bg-gray-300 text-white hover:bg-gray-400" : ""}
                >
                  <Link to={item.url}>
                    {item.icon && <item.icon style={{ width: "32px" }} />}
                    <span className="text-lg">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }
          return (
            <Collapsible
              key={item.title}
              asChild
              open={isOpen}
              className="group/collapsible"
            >
              <SidebarMenuItem className="text-md">
                <CollapsibleTrigger asChild onClick={() => handleItemClick(item.title)}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={isOpen ? "bg-transparent" : ""}
                  >
                    {item.icon && <item.icon style={{ width: "32px", color: "#004141" }} />}
                    <span className="text-lg">{item.title}</span>
                    <ChevronRight
                      className={`ml-auto transition-transform duration-200 ${isOpen ? "rotate-90" : ""
                        }`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => {
                      const isSubActive = location.pathname === subItem.url;
                      return (
                        <SidebarMenuSubItem key={subItem.title} className="text-lg">
                          <SidebarMenuSubButton asChild>
                            <Link
                              to={subItem.url}
                              className={`block rounded-md px-2 py-1 ${isSubActive ? "bg-gray-300 hover:bg-gray-400 text-white font-semibold" : "text-black hover:bg-gray-400"
                                }`}
                            >
                              {subItem.title}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
