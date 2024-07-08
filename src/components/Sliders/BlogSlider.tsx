import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import {FetchPostType} from "@/data/types";
import Card2 from "@/components/Card2/Card2";

interface BlogSliderProps{
    posts: FetchPostType[];
    forSingleNote?: boolean
}

const BlogSlider: FC<BlogSliderProps> = ({ posts,forSingleNote }) => {

    return (
        <div className="swiper-container md:hidden">
            <Swiper
                slidesPerView={1.3}
                spaceBetween= '5%'
                className="h-[500px]"
                breakpoints={{
                    320: {
                        slidesPerView: 1.3,
                    }
                }}
            >
                {posts.map((post, i) => (
                    <SwiperSlide key={i} className="w-100 bg-primary">
                        <Card2 kind="blog" post={post} className="h-[500px]" forSingleNote={forSingleNote}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BlogSlider;
