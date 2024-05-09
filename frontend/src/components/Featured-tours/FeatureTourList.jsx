import React from "react";

import TourCard from "../../shared/TourCard";
import { Col } from "reactstrap";
import { Spin } from "antd";

import useFetch from "../../hooks/useFetch.js";
import { BASE_URL } from "../../utils/config";

const FeatureTourList = () => {
  const {
    data: featuredTours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/search/getFeatureTour`);

  return (
    <>
      {loading && (
        <h4>
          <Spin tip="Loading" size="large"></Spin>
        </h4>
      )}
      {error && <h4>{error}</h4>}
      {!loading &&
        !error &&
        featuredTours?.map((tour) => (
          <Col lg="3" className="mb-4" key={tour._id}>
            <TourCard tour={tour} />
          </Col>
        ))}
    </>
  );
};

export default FeatureTourList;
