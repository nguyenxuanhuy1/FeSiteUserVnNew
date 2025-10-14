import React, { useEffect, useState } from 'react';
import { callData } from '../../Api/CallApi';
import LinkApi from '../../Hook/LinkApi';
import CardHot from "../Components/Card/CardHot/CardHot";
import CardRela from "../Components/Card/CardRela/CardRela";
import { Post } from '../Components/Card/interface';
import CardNormal from '../Components/Card/CardNormal/CardNormal';
import ErrorCard from '../../Components/Err/ErrCallData';
import { Divider } from 'antd';
import ScrollingTextLinks from '../Components/LinkOut';
import PhoneButton from '../Components/Phone';
const Home = () => {
    const [data, setData] = useState<Post[]>([]);
    const [newsData, setNewsData] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);


    useEffect(() => {
        const fetchNewClass = async () => {
            setLoading(true);
            try {
                const res = await callData({
                    url: `${LinkApi.NoiBat}?categoryId=${2}&page=1&size=5`
                });
                setData(res.data.data);
            } catch (err: any) {
                setError(true);
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
                    url: `${LinkApi.SerachSlug}&page=${1}&size=${24}`,
                });
                setNewsData(res.data.data);
            } catch (err: any) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchNewClass();
    }, []);


    const hotPosts = data.filter((post) => post.isFeatured === true);
    const relaPosts = data.filter((post) => post.isFeatured !== true);
    if (error) return <ErrorCard />;


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
            <div className="home-card-bottom">

                <div>
                    <Divider style={{ color: 'rgb(0, 161, 255)', fontSize: '22px' }}>TIN MỚI NHẤT</Divider>
                    <CardNormal
                        data={newsData}
                        loading={loading}
                    />
                </div>
                <div>

                </div>
            </div>
           <ScrollingTextLinks/>
           <PhoneButton/>
        </div>
    )

}
export default Home