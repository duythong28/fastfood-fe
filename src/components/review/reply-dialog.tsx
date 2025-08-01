import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FormEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Button } from "../ui/button";
import { ResReview } from "@/types/review";
import reviewService from "@/services/review.service";
import { StarIcon } from "@heroicons/react/20/solid";
import image from "@/assets/placeholder.svg";
import { Textarea } from "../ui/textarea";
import CustomAlertDialog, {
  CustomAlertDialogRef,
} from "../shared/alert-dialog";
import { toastSuccess, toastWarning } from "@/utils/toast";
import { AxiosError } from "axios";

export interface ReplyDialogRef {
  onOpen: (id: string) => Promise<void>;
  onClose: () => void;
}

interface ReplyDialogProps {
  onRefetch: () => Promise<void>;
}

const ReplyDialog = forwardRef<ReplyDialogRef, ReplyDialogProps>(
  function ReplyDialog({ onRefetch }, ref) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [review, setReview] = useState<ResReview | null>(null);
    const [reply, setReply] = useState<string>("");
    const alertDialogRef = useRef<CustomAlertDialogRef | null>(null);

    const getOrderById = async (id: string) => {
      try {
        const response = await reviewService.getReviewById(id);
        setReply("");
        setReview(response.data);
        setIsOpen(true);
      } catch (err) {
        console.log(err);
      }
    };

    useImperativeHandle(ref, () => {
      return {
        async onOpen(id: string) {
          await getOrderById(id);
        },
        onClose() {
          setIsOpen(false);
        },
      };
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!review) return;
      if (!reply.trim()) {
        toastWarning("Phản hồi không được để trống");
        return;
      }
      alertDialogRef.current?.onOpen(
        {
          title: `Xác nhận phản hồi?`,
          description:
            "Một khi đã xác nhận, bạn sẽ không thể chỉnh sửa phản hồi này.",
        },
        async () => {
          try {
            await reviewService.reply(review.id, reply);
            toastSuccess("Phản hồi thành công");
            setIsOpen(false);
            await onRefetch();
          } catch (err) {
            if (err instanceof AxiosError && err.response?.status === 400) {
              toastWarning(
                "Vui lòng tuân thủ quy tắc cộng đồng và sử dụng ngôn từ phù hợp. Cảm ơn bạn!"
              );
            }
            console.log(err);
          }
        }
      );
    };

    return (
      review && (
        <>
          <CustomAlertDialog ref={alertDialogRef} />
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-[#A93F15]">Đánh Giá</DialogTitle>
              </DialogHeader>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="flex flex-row gap-4">
                    <div className="overflow-hidden rounded-md w-11 aspect-square">
                      <img
                        alt="Product image"
                        className="object-cover w-full h-full"
                        src={
                          review.product.image_url.length > 0
                            ? review.product.image_url[0]
                            : image
                        }
                      />
                    </div>
                    <div className="font-medium">{review.product.title}</div>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <div className="text-[#A93F15] font-medium">
                      Chất lượng sản phẩm:{" "}
                    </div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          aria-hidden="true"
                          className={(review.rating > rating
                            ? "text-[#FFC400]"
                            : "text-gray-200"
                          ).concat(" h-4 w-4 flex-shrink-0")}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-x-3">
                    <div className="text-[#A93F15] font-medium text-nowrap">
                      Bình luận:
                    </div>
                    <div>{review.description}</div>
                  </div>
                  <Textarea
                    placeholder="Hãy phản hồi bình luận."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-[#A93F15] hover:text-[#A93F15]"
                    onClick={() => {
                      setReply("");
                      setIsOpen(false);
                    }}
                  >
                    Trở lại
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#A93F15] hover:bg-[#FF7E00]"
                  >
                    Hoàn thành
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )
    );
  }
);

export default ReplyDialog;
