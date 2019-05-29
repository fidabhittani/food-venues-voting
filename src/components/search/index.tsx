import React from "react";
import { Col, Row, Button, Input } from "antd";
/**
 *
 *   Voter Component
 *
 */
type TEvent = (...args: any) => void;

interface ISearchInput {
  value: string;
  onChange: TEvent;
  onSearch: TEvent;
}

const SearchInput = ({ value, onChange, onSearch }: ISearchInput) => {
  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={6} offset={4}>
        <Input
          className="search-item"
          value={value}
          onChange={onChange}
          autoFocus
        />
      </Col>
      <Col span={10}>
        <Button
          type="primary"
          shape="circle"
          icon="search"
          onClick={onSearch}
        />
      </Col>
    </Row>
  );
};

export default SearchInput;
