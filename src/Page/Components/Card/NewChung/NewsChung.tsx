import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CardNormal from '../CardNormal/CardNormal';
import { callData } from '../../../../Api/CallApi';
import LinkApi from '../../../../Hook/LinkApi';
import ErrorCard from '../../../../Components/Err/ErrCallData';
import { Post } from '../interface';
import { Pagination } from 'antd';

const NewsChung = () => {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [fixedBottom, setFixedBottom] = useState(false);
  useEffect(() => {
    const handleScroll = () => setFixedBottom(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCardNormal = async () => {
      if (!id) return;
      setLoading(true);
      setError(false);
      try {
        const res = await callData({
          url: `${LinkApi.SerachSlug}categoryId=${id}&page=${currentPage}&size=${pageSize}`,
        });

        setData(res.data.data || []);
        setTotal(res.data.total || 0);
        setPageSize(res.data.pageSize || pageSize);
        setCurrentPage(res.data.currentPage || currentPage);

      } catch (err: any) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCardNormal();
  }, [id, currentPage, pageSize]);

  const handlePageChange = (page: number, newPageSize?: number) => {
    setCurrentPage(page);
    if (newPageSize && newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) return <ErrorCard />;

  return (
    <div className={`newsChung ${fixedBottom ? "header-fixed-padding-newsChung" : ""}`}>
      <CardNormal
        data={data}
        loading={loading}
      />

      <div style={{ display: 'flex', justifyContent: 'end', marginTop: 20 }}>
        <Pagination
          className="custom-pagination"
          current={currentPage}
          pageSize={pageSize}
          total={total}
          showSizeChanger={false}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default NewsChung