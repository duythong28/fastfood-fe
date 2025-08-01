import { ResReview } from "@/types/review";
import { StarIcon } from "@heroicons/react/20/solid";
import image from "@/assets/placeholder.svg";
import { dateToVNString } from "@/utils/format";

interface ReviewItemProps {
  data: ResReview;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-[44px_1fr] gap-4">
      <div className="overflow-hidden rounded-full w-11 aspect-square">
        <img
          alt="Product image"
          className="object-cover w-full h-full"
          src={data.user.avatar_url || image}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="text-xs">{data.user.full_name}</div>
          <div className="flex text-xs">
            {[0, 1, 2, 3, 4].map((rating) => {
              return (
                <StarIcon
                  key={rating}
                  aria-hidden="true"
                  className={(data.rating > rating
                    ? "text-[#FFC400]"
                    : "text-gray-200"
                  ).concat(" h-4 w-4 flex-shrink-0")}
                />
              );
            })}
          </div>
        </div>
        <div className="text-xs">
          {dateToVNString(new Date(data.created_at))}
        </div>
        <div>{data.description}</div>
        {(data as ResReview).ReplyReviews && (
          <div className="bg-[#FFFBF7] p-4 rounded-md border border-[#A93F15]">
            <p className="mb-2 text-[#A93F15] font-semibold">
              Phản hồi của người bán
            </p>
            <div className="ml-3 mt-5">
              {(data as ResReview).ReplyReviews &&
                (data as ResReview).ReplyReviews?.reply}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
