import React from "react";
import { Card, Col, Row, Alert } from "antd";
import RecomendedItem from "./recomended-item";
/**
 *
 *   Voter Component
 *
 */

interface IVenue {
  name: string;
  id: number;
  location: any;
  rating: number;
}
interface IVenues {
  venues: IVenue[];
}

const Recomendations = ({ venues }: IVenues) => {
  return (
    <Card title="Recomendations">
      <Row gutter={16}>
        {venues.length ? (
          venues.map((venue: IVenue, index: number) => {
            const { formattedAddress, address } = venue.location || {
              formattedAddress: "",
              address: ""
            };
            return (
              <Col span={8} key={`recomendation-${index}`}>
                <RecomendedItem
                  title={venue.name}
                  rating={venue.rating}
                  description={
                    (formattedAddress && formattedAddress.join(",")) || address
                  }
                  active={true}
                />
              </Col>
            );
          })
        ) : (
          <Alert
            type="warning"
            message={"Suggessted Menus will be shown here"}
          />
        )}
      </Row>
    </Card>
  );
};

export default Recomendations;
