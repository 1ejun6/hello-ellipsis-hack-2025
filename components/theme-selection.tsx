import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function ThemeSelection(){
  return(
  <div className="flex justify-between items-center w-full max-w-5xl p-5">
        {/* Choose the theme */}
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 bg-red-500 text-white rounded-md">
            Choose Theme
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Food</DropdownMenuItem>
            <DropdownMenuItem>Hospital</DropdownMenuItem>
            <DropdownMenuItem>Pay Bills</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Points System NEED TO CHANGE */}
        <div className="flex justify-start gap-2 bg-muted px-4 py-2 rounded-lg shadow">
          <span className="font-semibold">Points:</span>
          <span className="text-primary font-bold">{10}</span>
        </div>
      </div>
  )
} 