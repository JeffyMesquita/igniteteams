import { Header } from "@components/Header";
import { Container } from "./styles";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";

export function Players() {
  return (
    <Container>
      <Header showBackButton />

      <Highlight 
        title="Group Name"
        subTitle="Add the peoples and separate the teams"
      />

      <ButtonIcon 
        
      />
    </Container>
  );
}