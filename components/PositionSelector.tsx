import { Dispatch, SetStateAction } from "react";

export default function PositionSelector({
  setX,
  setY,
  y,
  x,
}: {
  setX: Dispatch<SetStateAction<number>>;
  setY: Dispatch<SetStateAction<number>>;
  y: number;
  x: number;
}) {
  return (
    <div className="">
      <div className="grid">
        <p className="text-[0.94rem] leading-5 font-semibold mr-1 opacity-80 uppercase">
          X
        </p>
        <input
          value={x}
          onChange={ev => setX(Number(ev.target.value))}
          type="range"
          min={-20}
          max={120}
          step={10}
          className="bg-white text-stone-950 h-5 w-28"
        />
      </div>
      <div className="grid">
        <p className="text-[0.94rem] leading-5 font-semibold mr-1 opacity-80 uppercase">
          Y
        </p>
        <input
          value={y}
          onChange={ev => setY(Number(ev.target.value))}
          type="range"
          min={-20}
          max={120}
          step={10}
          className="bg-white text-stone-950 h-5 w-28"
        />
      </div>
    </div>
  );
}