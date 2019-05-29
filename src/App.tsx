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
  Input
} from "antd";
import MainLayout from "./layout";
import UserVotes from "./components/vote";
import Voter from "./components/voter";
import Recomendations from "./components/recomendations";
import { getBestThreeVenues } from "./api";
import { connect } from "react-redux";
import SearchInput from "./components/search";

const App = ({ loading, message }: any) => {
  const [venues, setVenues]: any = useState([]);
  const [search, setSearch] = useState("Berlin");
  const [user, setUser] = useState("");
  let [userVotes, setUserVotes]: any = useState([]);
  const [showParticipant, setShowParticipant]: any = useState(false);

  /**
   *  Process Voted Items
   */
  const processVenueVotes = () => {
    const votes = userVotes.reduce((venueVotes: any, user: any) => {
      const { votes } = user;
      const [voteVenue]: any = votes.filter((venue: any) => venue.vote);
      if (voteVenue) {
        if (!venueVotes[voteVenue.placeId]) {
          venueVotes[voteVenue.placeId] = 1;
        } else {
          venueVotes[voteVenue.placeId] = venueVotes[voteVenue.placeId] + 1;
        }
      }
      return venueVotes;
    }, {});

    return votes;
  };

  /**
   *  Voting For a User
   */

  const onVote = (vote: any) => {
    const searchUser = (user: any) => user.userId === vote.userId;

    const user = userVotes.find(searchUser);
    if (user) {
      const userIndex = userVotes.findIndex(searchUser);
      const updatedUser = {
        ...user,
        votes: venues.map((venue: any) => {
          return {
            userId: vote.userId,
            placeId: venue.id,
            vote: venue.id === vote.placeId
          };
        })
      };

      userVotes[userIndex] = {
        ...updatedUser
      };
      setUserVotes([...userVotes]);
      const currentVotes = processVenueVotes() || {};

      /**
       *  Update Venues Rating
       */
      const newVenues = venues.map((venue: any) => {
        return {
          ...venue,
          rating: currentVotes[venue.id] ? currentVotes[venue.id] : 0
        };
      });

      setVenues(newVenues);
    }
  };

  const onSearch = async () => {
    const venues = await getBestThreeVenues(search);
    setVenues(venues);
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
          <Col className="gutter-row" span={6} offset={4}>
            Votes
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
                content={
                  <React.Fragment>
                    <Input
                      className="search-item"
                      value={user}
                      onChange={event => {
                        event.persist();
                        setUser(event.target.value);
                      }}
                      autoFocus
                    />
                    <Button
                      style={{ marginTop: "20px" }}
                      type="primary"
                      onClick={addParticipant}
                    >
                      Add
                    </Button>
                  </React.Fragment>
                }
                title="Add Participant"
                trigger="click"
                visible={showParticipant}
                onVisibleChange={() => setShowParticipant(!showParticipant)}
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
