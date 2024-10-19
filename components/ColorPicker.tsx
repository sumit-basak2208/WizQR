"use client";
import { HslStringColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function ColorPicker({
  color,
  setColor,
}: {
  color: string;
  setColor: (newColor: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="w-24 h-28 rounded-lg border"
          style={{ backgroundColor: color }}
        ></div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full">
        <HslStringColorPicker color={color} onChange={setColor} />
      </PopoverContent>
    </Popover>
  );
}
