import { FC, useEffect } from "react";
import { PageContainer } from "../containers/PageContainer";

interface HomePageProps { };

export const SplashPage: FC<HomePageProps> = (props) => {
  useEffect(() => {
    document.title = "Kangaroo - Splash";
    const now = new Date();
    sessionStorage.setItem("first", now.toISOString());
  }, []);

  return (
    <PageContainer>
      <h1>SplashPage</h1>
    </PageContainer>
  );
}
