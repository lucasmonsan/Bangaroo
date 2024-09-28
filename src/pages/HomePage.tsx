import { FC } from "react";
import { PageContainer } from "../containers/PageContainer";

interface HomePageProps { };

export const HomePage: FC<HomePageProps> = (props) => {
  return (
    <PageContainer>
      <h1>HomePage</h1>
    </PageContainer>
  );
}
