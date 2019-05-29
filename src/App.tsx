import React, { useState } from "react";
import { PageHeader, Row, Col, Spin, Alert } from "antd";
import MainLayout from "./layout";
import UserVotes from "./components/vote";
import Voter from "./components/voter";
import Recomendations from "./components/recomendations";
import { getBestThreeVenues } from "./api";
import { connect } from "react-redux";
import SearchInput from "./components/search";

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

const App = ({ loading, message }: any) => {
  const [venues, setVenues] = useState([]);
  const [search, setSearch] = useState("Berlin");
  console.log({ loading, message });

  /**
   *  Hook into app cycle for data fetching
   */

  const onVote = (vote: any) => {
    console.log("hello", venues);
  };

  const onSearch = async () => {
    const venues = await getBestThreeVenues(search);
    setVenues(venues);
  };

  const onChange = (event: any) => {
    event.persist();
    setSearch(event.target.value);
  };
  const AppLayout = () => {
    return (
      <MainLayout>
        <PageHeader
          title="Food Venue Recomendations"
          subTitle="List of best 3 places to have a lunch"
        />
        {message && message.message && (
          <Alert message={message.message} type={message.type} />
        )}

        <SearchInput value={search} onChange={onChange} onSearch={onSearch} />

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

  if (loading.status) {
    return (
      <Spin tip={loading.text}>
        <AppLayout />
      </Spin>
    );
  }
  return <AppLayout />;
};

export default connect((state: any) => {
  const { loading, message } = state.app;
  return {
    loading,
    message
  };
})(App);
