import React, { useRef, useEffect } from "react";
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
  /**
   * Set Focus Back to element
   */
  const inputEl = useRef(null);
  useEffect(() => {
    (inputEl as any).current.focus();
  }, [inputEl]);

  return (
    <Row gutter={16}>
      <Col className="gutter-row" span={6} offset={4}>
        <span>
          <Input
            className="search-item"
            value={value}
            onChange={onChange}
            ref={inputEl}
          />
        </span>
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
