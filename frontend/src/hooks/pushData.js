import { useEffect } from "react";

const PushData = (url, data) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          method: "push",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        });
        const result = await res.json();

        if (!res.ok) {
          return alert(result.message);
        }
        alert("Sửa thành công!");
        window.location.reload();
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, [url, data]);
  return {
    data,
  };
};

export default PushData;
