'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FaEllipsisVertical } from "react-icons/fa6";
interface ActionDropDownProps {
    items: {
      label: string;
    icon: React.ReactNode;
    onClick: () => void;  
    }[]
    
  
}
const ActionDropDown = ({
  items
}: ActionDropDownProps) => {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger className="relative -left-6">
        <FaEllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-gray-700 font-medium" align="center" side="right" alignOffset={10} >
          {items.map((item) => (
            <DropdownMenuItem key={item.label} onClick={item.onClick}>
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionDropDown