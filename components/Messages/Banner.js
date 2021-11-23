import React from "react";
import { Segment, Grid, Image } from "semantic-ui-react";

function Banner({ bannerInfo }) {
  const { name, dpLink } = bannerInfo;

  return (
    <Segment color="teal" attached="top">
      <Grid>
        <Grid.Column floated="left" width={14}>
          <h4>
            <Image avatar src={dpLink} />
            {name}
          </h4>
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default Banner;
