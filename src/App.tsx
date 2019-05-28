import React from "react";

import { PageHeader, Row, Col } from "antd";

import MainLayout from "./layout";
import UserVotes from "./components/vote";
import Voter from "./components/voter";
import Recomendations from "./components/recomendations";

const users = ["Fida", "Rehan", "Ali", "usman", "Sabir"];

const places = ["la Montana", "Monal", "Labaik"];

const userVotes = users.map((user, index) => {
  return {
    name: user,
    userId: index + 1,
    votes: places.map((place, inIndex) => {
      return {
        userId: index + 1,
        placeId: inIndex + 1,
        vote: inIndex === 1 ? true : false
      };
    })
  };
});

const App = () => {
  const onVote = (vote: any) => {
    console.log("hello", vote);
  };

  return (
    <MainLayout>
      <PageHeader
        title="Food Venue Recomendations"
        subTitle="List of best 3 places to have a lunch"
      />

      <Row gutter={16}>
        <Col className="gutter-row" span={6} offset={4}>
          Votes
        </Col>
        <Col span={10}>
          <Recomendations />
        </Col>
      </Row>

      {userVotes &&
        userVotes.map(user => {
          return (
            <Row gutter={16} key={user.name}>
              <Col className="gutter-row" span={6} offset={4}>
                <Voter name={user.name} />
              </Col>
              <Col span={10}>
                <UserVotes votes={user.votes} onVote={onVote} />
              </Col>
            </Row>
          );
        })}
    </MainLayout>
  );
};

export default App;
