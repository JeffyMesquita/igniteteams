import { Header } from "@components/Header";
import { Container } from "./styles";
import { Highlight } from "@components/Highlight";

export function Players() {
  return (
    <Container>
      <Header showBackButton />

      <Highlight 
        title="Group Name"
        subTitle="Add the peoples and separate the teams"
      />

    </Container>
  );
}