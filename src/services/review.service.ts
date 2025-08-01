import { ReviewStatus } from "@/common/enums";
import { api } from "@/lib/api-client";
import { Page } from "@/types/api";
import {
  GetAllReviewQueries,
  GetAllReviews,
  GetReviewByProductId,
  ResReview,
} from "@/types/review";
import { trimObjectAttributes } from "@/utils/format";

class ReviewService {
  async getAllReviews(
    { page, take }: Page,
    query: GetAllReviewQueries,
  ): Promise<GetAllReviews> {
    const trimmedData = trimObjectAttributes(query);
    let url = `reviews/get-all?page=${page}&take=${take}`;
    if (trimmedData.rating.length > 0) {
      const ratingParams = trimmedData.rating
        .map((rating) => `rating[]=${rating}`)
        .join("&");
      url += `&${ratingParams}`;
    } else {
      return {
        data: {
          data: [],
          meta: {
            page: 1,
            take: 20,
            itemCount: 0,
            pageCount: 0,
            hasPreviousPage: false,
            hasNextPage: false,
          },
        },
      };
    }
    if (trimmedData.date) {
      url += `&date=${trimmedData.date}`;
    }
    if (trimmedData.search) {
      url += `&search=${trimmedData.search}`;
    }
    if (trimmedData.state in ReviewStatus) {
      url += `&state=${trimmedData.state}`;
    }
    if (trimmedData.isHidden !== null)
      url += `&isHidden=${trimmedData.isHidden}`;
    return api.get(url);
  }

  async getReviewById(id: string) {
    return api.get(`reviews/${id}`);
  }

  async reply(id: string, reply: string) {
    return api.post(`reviews/${id}/reply`, { reply: reply.trim() });
  }

  async getReviewsByOrderId(
    orderId: string
  ): Promise<{ data: { data: ResReview[] } }> {
    return api.get(`reviews/get-review-by-order-id/${orderId}`);
  }

  async getReivewsByProductId(
    { page, take }: Page,
    productId: string,
    query: { rating: number[] }
  ): Promise<GetReviewByProductId> {
    let url = `reviews/get-review-by-product-id/${productId}?page=${page}&take=${take}`;
    if (query.rating.length > 0) {
      const ratingParams = query.rating
        .map((rating) => `rating[]=${rating}`)
        .join("&");
      url += `&${ratingParams}`;
    } else {
      return {
        data: {
          data: [],
          meta: {
            page: 1,
            take: 20,
            itemCount: 0,
            pageCount: 0,
            hasPreviousPage: false,
            hasNextPage: false,
          },
        },
      };
    }
    return api.get(url);
  }

  async hideReview(id: string) {
    return api.post(`reviews/hide/${id}`);
  }

  async showReview(id: string) {
    return api.post(`reviews/unhide/${id}`);
  }
}

export default new ReviewService();
