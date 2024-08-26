// import { Button } from "../../ui/button";
import { Menu } from "lucide-react";
import { Button } from "../../../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../ui/sheet";

export function AdminMobileMenu() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet key="left">
        <SheetTrigger asChild>
          <Button variant="outline" className="w-[150px] h-[80px]">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div>Menus</div>
          <SheetFooter>
            {/* <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
