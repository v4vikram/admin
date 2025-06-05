import { Link } from "react-router-dom";
import SidebarDropdown from "./SidebarDropdown";
import {
  ChartArea,
  ChartColumnDecreasingIcon,
  List,
  NotebookPen,
  User,
  UsersRound,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-screen md:block sticky top-0 left-0 overflow-y-scroll">
      <h2 className="text-2xl font-bold mb-8 text-font-200">Time Watch</h2>
      <nav className="flex flex-col gap-4 text-font-200">
        <Link to="/dashboard" className="hover:text-blue-400 px-2">
          Dashboard
        </Link>

        <SidebarDropdown
          label="Blogs"
          Icon={NotebookPen}
          items={[
            { label: "Create", href: "/dashboard/blog/create" },
            // { label: "Edit", href: "/dashboard/blog/edit" },
            { label: "List", href: "/dashboard/blog/list" },
            { label: "Category", href: "/dashboard/blog/category" },
            // { label: "Product Tags", href: "/dashboard/product/tags" },
          ]}
        />
        <SidebarDropdown
          label="Products"
          Icon={List}
          items={[
            { label: "Create Product", href: "/dashboard/product/create" },
            { label: "Products List", href: "/dashboard/product/list" },
            { label: "Product Category", href: "/dashboard/product/category" },
            // { label: "Product Tags", href: "/dashboard/product/tags" },
          ]}
        />
        <SidebarDropdown
          label="Sales Management"
          Icon={ChartColumnDecreasingIcon}
          items={[
            { label: "Sales Person List", href: "/dashboard/sales-management/salespersons/list" },

          ]}
        />
        <SidebarDropdown
          label="Customer Management"
          Icon={UsersRound}
          items={[
            {
              label: "Customer List",
              href: "/dashboard/customer-management/customer/list",
            },
            {
              label: "Create Customer",
              href: "/dashboard/customer-management/customer/visit",
            },
          ]}
        />
        <SidebarDropdown
          label="User Management"
          Icon={User}
          items={[
            {
              label: "User List",
              href: "/dashboard/user-management/user/list",
            },
          ]}
        />
      </nav>
    </div>
  );
};

export default Sidebar;
