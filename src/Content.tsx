import * as React from "react";

interface IProps {
  url: string;
}

class Content extends React.Component<IProps> {
  public render() {
    const { url } = this.props;
    return url.includes(".mp4") || url.includes(".MP4") ? (
      <video src={url} controls={true} height="300" width="400" />
    ) : (
      <img src={url} height="300" width="400" />
    );
  }
}

export default Content;
