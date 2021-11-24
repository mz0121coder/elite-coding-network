import React from "react";
import {
  Placeholder,
  Divider,
  List,
  Button,
  Card,
  Container,
  Icon,
} from "semantic-ui-react";
import { range } from "lodash";

export const phPosts = () =>
  range(1, 3).map((item) => (
    <div key={item}>
      <Placeholder fluid>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
      <Divider hidden />
    </div>
  ));

export const phSuggestions = () => (
  <>
    <List.Item>
      <Card color="red">
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
        <Card.Content>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length="medium" />
            </Placeholder.Header>
          </Placeholder>
        </Card.Content>

        <Card.Content extra>
          <Button
            disabled
            circular
            size="small"
            icon="add user"
            content="Follow"
            color="connectdevelop"
          />
        </Card.Content>
      </Card>
    </List.Item>
  </>
);

export const phAlerts = () =>
  range(1, 10).map((item) => (
    <>
      <Placeholder key={item}>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
      </Placeholder>
      <Divider hidden />
    </>
  ));
