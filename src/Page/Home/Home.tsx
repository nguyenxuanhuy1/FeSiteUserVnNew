import React, { useEffect, useState } from 'react';
import { callData } from '../../Api/CallApi';
import LinkApi from '../../Hook/LinkApi';
import CardHot from "../Components/Card/CardHot/CardHot";
import CardRela from "../Components/Card/CardRela/CardRela";
import { Post } from '../Components/Card/interface';
import CardNormal from '../Components/Card/CardNormal/CardNormal';
import VideoList from '../Components/Card/CardVideo/CardVideo';
import LienKet from '../Components/Card/CardLienKet/LienKet';
import { CaretRightFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const [data, setData] = useState<Post[]>([]);
    const [newsData, setNewsData] = useState<Post[]>([]);
    const [newsThoiSu, setNewsThoiSu] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchNewClass = async () => {
            setLoading(true);
            try {
                const res = await callData({
                    url: `${LinkApi.NoiBat}?categoryId=${1}&page=1&size=5`
                });
                setData(res.data.data);
            } catch (err: any) {

            } finally {
                setLoading(false);
            }
        };
        fetchNewClass();
    }, []);


    useEffect(() => {
        const fetchNewClass = async () => {
            setLoading(true);
            try {
                const res = await callData({
                    url: `${LinkApi.NoiBat}?categoryId=${2}&page=1&size=16`,
                });
                setNewsData(res.data.data);
            } catch (err: any) {

            } finally {
                setLoading(false);
            }
        };
        fetchNewClass();
    }, []);

    useEffect(() => {
        const fetchNewClass = async () => {
            setLoading(true);
            try {
                const res = await callData({
                    url: `${LinkApi.NoiBat}?categoryId=${3}&page=1&size=16`,
                });
                setNewsThoiSu(res.data.data);
            } catch (err: any) {

            } finally {
                setLoading(false);
            }
        };
        fetchNewClass();
    }, []);

    const hotPosts = data.filter((post) => post.isFeatured === true);
    const relaPosts = data.filter((post) => post.isFeatured !== true);



    return (
        <div className="home-pageTutor">
            <div className="home-card-top">
                <div className="homeCardMain-top">
                    <CardHot posts={hotPosts} loading={loading} />
                </div>
                <div className="homeCardRela-top">
                    <CardRela posts={relaPosts} loading={loading} />
                </div>
            </div>
            <div className="home-card-center">
                <div className="section-header-tinmoinhat">
                    <div className="label">VIDEO</div>
                </div>
                <VideoList />
            </div>
            <div className="home-card-bottom">
                <div>
                    <div className="section-header-tinmoinhat">
                        <div className="label">TIN MỚI NHẤT</div>
                        <div className='xemThem' onClick={() => { navigate('/category/2') }} ><CaretRightFilled /> Xem thêm</div>
                    </div>
                    <CardNormal
                        data={newsData}
                        loading={loading}
                    />
                </div>
            </div>
            <div className="home-card-bottom">
                <div>
                    <div className="section-header-tinmoinhat">
                        <div className="label">THỜI SỰ</div>
                        <div className='xemThem' onClick={() => { navigate('/category/3') }} ><CaretRightFilled /> Xem thêm</div>
                    </div>
                    <CardNormal
                        data={newsThoiSu}
                        loading={loading}
                    />
                </div>
            </div>
            <div>
                <div className="section-header-tinmoinhat">
                    <div className="label">LIÊN KẾT</div>
                </div>
                <LienKet />
            </div>
        </div>
    )

}
export default Home