const baseURL = process.env.REACT_APP_DB_URL;
const LinkApi = {
    NoiBat: `${baseURL}/api/articles/search`,
    Detail: `${baseURL}/api/articles/detail/`,
    Rela: `${baseURL}/api/articles/search?`,
    SerachSlug: `${baseURL}/api/articles/search?`,
    Category: `${baseURL}/api/articles/category`
};

export default LinkApi;
