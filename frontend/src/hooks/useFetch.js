import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          credentials: "include",
        });
        if (!res.ok) {
          setError("Lỗi kết nối đến csdl!");
        }
        const result = await res.json();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(true);
      }
    };
    fetchData();
  }, [url]);
  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
