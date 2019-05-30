import React, { useState } from "react";
import {
  PageHeader,
  Row,
  Col,
  Spin,
  Alert,
  Card,
  Button,
  Popover,
  Typography
} from "antd";

import MainLayout from "./layout";
import UserVotes from "./components/vote";
import Voter from "./components/voter";
import Recomendations from "./components/recomendations";
import { getBestThreeVenues } from "./api";
import { connect } from "react-redux";
import SearchInput from "./components/search";
import {
  getInitialVotes,
  getVotes,
  getMaxVoteVenue,
  updateVenuesRatings,
  updateUserVotes
} from "./config/functions";
import AddParticipant from "./components/add-participant";
const { Title } = Typography;

const App = ({ loading, message }: any) => {
  /**
   *  APP State
   */
  const [venues, setVenues]: any = useState([]);
  const [search, setSearch] = useState("Berlin");
  const [user, setUser] = useState("");
  let [userVotes, setUserVotes]: any = useState([]);
  const [showParticipant, setShowParticipant]: any = useState(false);

  /**
   *  Process Venue ratings
   */

  const processVenueRatings = () => {
    const currentVotes = processVenueVotes() || {};
    const maxVotesVenue = getMaxVoteVenue(currentVotes);
    /**
     *  Update Venues
     */
    const newVenues = updateVenuesRatings(venues, currentVotes, maxVotesVenue);

    setVenues(newVenues);
  };

  /**
   *  Process Voted Items
   */
  const processVenueVotes = () => {
    return getVotes(userVotes, getInitialVotes(venues));
  };

  /**
   *  Voting For a User
   */

  const onVote = (vote: any) => {
    const newUserVotes = updateUserVotes(venues, userVotes, vote);
    if (newUserVotes) {
      setUserVotes([...newUserVotes]);
      processVenueRatings();
    }
  };

  const onSearch = async () => {
    const venues = await getBestThreeVenues(search);
    setVenues(venues);
    setUserVotes([]);
  };

  const onChange = (event: any) => {
    event.persist();
    setSearch(event.target.value);
  };

  /**
   *  Add Participant View
   */

  const addParticipant = () => {
    const newId = userVotes.length + 10;
    const newUser = {
      name: user,
      userId: newId,
      votes: venues.map((venue: any) => {
        return {
          userId: newId,
          placeId: venue.id,
          vote: false
        };
      })
    };
    setUserVotes([...userVotes, newUser]);
    setShowParticipant(false);
    setUser("");
  };

  const AppLayout = () => {
    return (
      <MainLayout>
        <PageHeader
          title="Food Venue Recomendations"
          subTitle="List of best 3 places to have a lunch"
        />
        <Card>
          {message && message.message && (
            <Alert message={message.message} type={message.type} />
          )}

          <SearchInput value={search} onChange={onChange} onSearch={onSearch} />
        </Card>
        <Row gutter={16}>
          <Col span={6} offset={4}>
            <Card style={{ height: "100%" }}>
              <Title level={3}>Participants</Title>
            </Card>
          </Col>
          <Col span={10}>
            <Recomendations venues={venues} />
          </Col>
        </Row>

        {userVotes &&
          userVotes.map((user: any) => {
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
        <Card>
          <Row gutter={2}>
            <Col className="gutter-row" span={6} offset={4}>
              <Popover
                key="add-participant"
                content={
                  <AddParticipant
                    value={user}
                    setValue={setUser}
                    addParticipant={addParticipant}
                  />
                }
                title="Add Participant"
                trigger="click"
                visible={showParticipant}
                onVisibleChange={visible => setShowParticipant(visible)}
              >
                <Button
                  type="primary"
                  disabled={!venues.length}
                  onClick={() => setShowParticipant(!showParticipant)}
                >
                  Add Participant
                </Button>
              </Popover>
            </Col>
          </Row>
        </Card>
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
