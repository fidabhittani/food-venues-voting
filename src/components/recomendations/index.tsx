import React from "react";
import { Card, Col, Row } from "antd";
import RecomendedItem from "./recomended-item";
/**
 *
 *   Voter Component
 *
 */

const Recomendations = () => {
  return (
    <Card title="Recomendations">
      <Row gutter={16}>
        <Col span={8}>
          <RecomendedItem title="Turkish" rating={10} description="Hello" />
        </Col>

        <Col span={8}>
          <RecomendedItem
            title="Turkish"
            rating={10}
            description="Hello"
            active={true}
          />
        </Col>
        <Col span={8}>
          <RecomendedItem title="Turkish" rating={10} description="Hello" />
        </Col>
      </Row>
    </Card>
  );
};

export default Recomendations;
