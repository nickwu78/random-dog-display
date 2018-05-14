import * as React from "react";
import styled from "styled-components";
import "./App.css";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 400px);
  grid-template-rows: auto;
  grid-gap: 20px;
  align-items: center;
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
      await fetch("https://random.dog/woof.json?filter=mp4,webm")
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
      <Container>
        {loading ? <h1>Loading 🐕</h1> : null}
        {dogs.map(dog => (
          <img src={dog.url} style={{ height: "300px", width: "400px" }} />
        ))}
        {!loading && dogs.length === 0 ? <h1> No Dogs Found</h1> : null}
        <button onClick={this.handleClick}>Load more dogs</button>
      </Container>
    );
  }
}

export default App;
