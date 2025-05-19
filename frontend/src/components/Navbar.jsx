import { Menu } from "lucide-react";
import AdminDropdown from "./AdminDropdown";
import SearchBar from "./SearchBar";

const Navbar = ({isSidebarOpen, setIsSidebarOpen}) => {
  return (
    <div className="sticky top-0 shadow p-4 er bg-secondary-gray border-b border-border-gray z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="bg-dary-gray-2 p-2 rounded-full global-t hover:bg-" onClick={()=>setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="text-icon-gray" />
          </span>
          <SearchBar />
        </div>
        <AdminDropdown />
      </div>
    </div>
  );
};

export default Navbar;
