/* eslint-disable @typescript-eslint/no-explicit-any */

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import moment from "moment";
import * as React from "react";
import { cn } from "../../../../lib/utils";
import { Button } from "../../../ui/button";
import { Calendar } from "../../../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

export function DatePickerWithPresets({ setDateForSlot }: any) {
  const [date, setDate] = React.useState<Date>();

  const formattedDate = date && moment(date).format("YYYY-MM-DD");

  console.log(formattedDate);
  setDateForSlot(formattedDate);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
