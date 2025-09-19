import 'swiper/css';
import { Banner } from "../components/Banner";
import Mental from '../components/Mental';
import TrendingAlbums from '../components/TrendingAlbums';
import Genres from '../components/Genres';
import HeroPromotions from '../components/HeroPromotions';

const Home = () => {
    const images = [
        "https://i.scdn.co/image/ab67616d0000b273fabd32dd9cefca8714c0ed41",
        "https://placeit-img-1-p.cdn.aws.placeit.net/uploads/stage/stage_image/21198/optimized_large_thumb_stage.jpg",
        "https://www.t-mobilecenter.com/assets/img/530x500-imagine-dragons-f17c4dcf76.jpg",
        "https://i.scdn.co/image/ab67616d0000b273f1e7b0a9efa7bd0519afecb2",
        "https://i.scdn.co/image/ab67616d00001e02206264058f4cd1174df664b9",
        "https://e.snmc.io/i/600/s/1ca74c7094f200b36b8d5ea6b6d33e5b/11681212/queen-queen-Cover-Art.jpg",
        "https://i.pinimg.com/736x/fe/68/49/fe68490272a5e0e2068f4ffb1c8d9341.jpg",
        "https://www.bravado.de/cdn/shop/files/KATSEYE_SIS-Soft-Is-Strong-Strong-Ver_CD_s508767_o4105200_a468639_v12126274.9202ee64_62794b86-19d6-48f5-8b5e-b00fcadde153.jpg?v=1750789673&width=1000",

    ];

    const imagesWithId = images.map((image) => ({
        id: crypto.randomUUID(),
        image
    }));
    return (
        <>
            <HeroPromotions />
            <TrendingAlbums />
            <Genres />
            <Banner images={imagesWithId} speed={90000} />
            <Mental />


        </>)

};


export default Home;

