import { OrderItem } from "@/types/order";
import image from "@/assets/placeholder.svg";
import React from "react";
import { formatNumber } from "@/utils/format";

interface ProductOrderDetailRowProps {
  data: OrderItem;
  onShowProductDetail?: () => void;
}

export const ProductOrderDetailRow: React.FC<ProductOrderDetailRowProps> = ({
  data,
  onShowProductDetail,
}) => {
  return (
    <div
      className="w-full py-2 items-center flex flex-row font-medium text-muted-foreground text-sm border-b border-gray-300"
      onClick={onShowProductDetail}
    >
      <div className="basis-[55%]  px-2 text-left flex flex-row gap-4">
        <img
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={
            data.product.image_url.length > 0
              ? data.product.image_url[0]
              : image
          }
          width="64"
        />
        <div className="w-full flex flex-col justify-center">
          <div className="font-medium">{data.product.title}</div>
        </div>
      </div>
      <div className="basis-[15%] px-2 text-right">
        {formatNumber(data.price)}
      </div>
      <div className="basis-[15%] px-2 text-right">{data.quantity}</div>
      <div className="basis-[15%] px-2 text-right ">
        {formatNumber(data.total_price)}
      </div>
    </div>
  );
};
