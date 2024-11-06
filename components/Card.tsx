"use client";

import { forwardRef } from "react";
import { QRCode } from "react-qrcode-logo";

interface CardProps {
  gradient: string;
  qrValue: string;
  qrBgColor: string;
  qrFgColor: string;
  className: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { gradient, qrValue, qrBgColor, qrFgColor, className },
  cardRef
) {
  return (
    <div
      className={className}
      ref={cardRef || undefined}
      style={{
        backgroundImage: gradient,
      }}
    >
      <div className="rounded-lg overflow-hidden">
        <QRCode
          value={qrValue}
          eyeRadius={10}
          qrStyle="fluid"
          bgColor={qrBgColor}
          fgColor={qrFgColor}
        />
      </div>
    </div>
  );
});

export default Card;