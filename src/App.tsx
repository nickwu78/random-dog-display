import * as React from "react";
import styled from "styled-components";
import Content from "./Content";
import Spinner from "./Spinner";

const Grid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  grid-gap: 20px;
  align-items: center;
  justify-items: center;

  @media (max-width: 900px) {
    width: 90%;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const Card = styled.div`
  background-color: white;
  padding: 20px;
`;

const Loading = styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  min-height: 100%;
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  -moz-box-shadow: 0px 0px 0px 0px #3dc21b;
  -webkit-box-shadow: 0px 0px 0px 0px #3dc21b;
  box-shadow: 0px 0px 0px 0px #3dc21b;
  background-color: #44c767;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  padding: 10px 25px;
  text-decoration: none;

  :hover {
    background-color: #5cbf2a;
  }

  :active {
    position: relative;
    top: 1px;
  }
`;

interface IState {
  dogs: Array<{ url: string }>;
  loading: boolean;
}

class App extends React.Component<{}, IState> {
  public state: IState = {
    dogs: [],
    loading: true
  };

  public componentDidMount() {
    this.fetchDogs();
  }

  public async fetchDogs() {
    const numberOfDogs: number = 8;
    const dogs = this.state.dogs;
    for (let i = 0; i <= numberOfDogs - 1; i++) {
      await fetch("https://random.dog/woof.json")
        .then(res => res.json())
        .then(res => dogs.push(res))
        .catch(err => err);
    }
    this.setState({ dogs, loading: false });
  }

  public handleClick = () => {
    this.fetchDogs();
  };

  public render() {
    const { dogs, loading } = this.state;
    return (
      <div>
        <h1>Random Dog App</h1>
        {loading ? (
          <Loading>
            <Spinner />
          </Loading>
        ) : null}
        <Grid>
          {dogs.map(dog => (
            <Card>
              <Content key={1} url={dog.url} />
            </Card>
          ))}
          {!loading && dogs.length === 0 ? <h1> No Dogs Found</h1> : null}
        </Grid>
        <ButtonContainer>
          <Button onClick={this.handleClick}>Load more dogs</Button>
        </ButtonContainer>
      </div>
    );
  }
}

export default App;
