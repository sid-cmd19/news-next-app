'use client'

import NotFound from "@/app/(content)/news/[newsIdSlug]/not-found";
import { DUMMY_NEWS } from "@/dummy-news";
import { useRouter } from "next/navigation";

export default function InterceptedImagePage({ params }) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const newsItemSlug = params.newsIdSlug;

  const newsItem = DUMMY_NEWS.find((item) => item.slug === newsItemSlug);

  if (!newsItem) {
    return <NotFound />;
  }
  return (
    <>
      <div className="modal-backdrop" onClick={handleBackClick} />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem?.title} />
        </div>
      </dialog>
    </>
  );
}
