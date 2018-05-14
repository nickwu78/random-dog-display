import * as React from "react";
import styled from "styled-components";

const StyledVideo = styled.video`
  max-width: 100%;
  height: 250px;
`;

const StyledImage = styled.img`
  max-width: 100%;
  height: 250px;
`;

interface IProps {
  url: string;
}

class Content extends React.Component<IProps> {
  public render() {
    const { url } = this.props;
    return url.includes(".mp4") || url.includes(".MP4") ? (
      <StyledVideo src={url} controls={true} />
    ) : (
      <StyledImage src={url} />
    );
  }
}

export default Content;
