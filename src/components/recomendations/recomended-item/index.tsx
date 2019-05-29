import React from "react";
import { Rate } from "antd";
import "./index.less";
/**
 *
 *   RecomendedItem Component
 *
 */

interface IRecomendedItem {
  title: string;
  rating: number;
  active?: boolean;
  description: string;
}

const RecomendedItem = ({
  title,
  rating,
  description,
  active
}: IRecomendedItem) => {
  return (
    <div className={`recomended-item ${active ? "active-item" : ""}`}>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="rating">{rating}</div>
      <div>
        <Rate allowHalf defaultValue={rating} />
      </div>
    </div>
  );
};

export default RecomendedItem;
