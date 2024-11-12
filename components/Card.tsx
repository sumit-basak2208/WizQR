"use client";

import { forwardRef } from "react";
import { QRCode } from "react-qrcode-logo";

interface CardProps {
  gradient: string;
  qrValue: string;
  qrBgColor: string;
  qrFgColor: string;
  className: string;
  style?: object;
  id?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { gradient, qrValue, qrBgColor, qrFgColor, className, style = {}, id = "" },
  cardRef
) {
  return (
    <div
      id={id}
      className={className}
      ref={cardRef || undefined}
      style={{
        ...style,
        backgroundImage: gradient,
      }}
    >
      <div className="rounded-lg overflow-hidden">
        <QRCode
          value={qrValue}
          eyeRadius={10}
          // qrStyle="fluid"
          bgColor={qrBgColor}
          fgColor={qrFgColor}
        />
      </div>
    </div>
  );
});

export default Card;
