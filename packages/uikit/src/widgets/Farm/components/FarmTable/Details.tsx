import styled from "styled-components";
import { ChevronDownIcon } from "../../../../components/Svg";

interface DetailsProps {
  actionPanelToggled: boolean;
}

const Container = styled.div`
  display: flex;
  padding-right: 8px;
  color: ${({ theme }) => theme.colors.primary};

  width: 40px;
  height: 40px;
  background: #101124;
  align-items: center;
  justify-content: center;

  border-radius: 12px;
  line-height: 40px;
  font-size: 18px;
  text-align: center;
  cursor: pointer;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0px;
  }
`;

const ArrowIcon = styled((props) => <ChevronDownIcon {...props} />)`
  transform: ${({ toggled }) => (toggled ? "rotate(180deg)" : "rotate(0)")};
  height: 20px;
`;

const Details: React.FC<React.PropsWithChildren<DetailsProps>> = ({ actionPanelToggled }) => {
  return (
    <Container>
      <ArrowIcon color="primary" toggled={actionPanelToggled} style={{ width: "70%", height: "100%" }} />
    </Container>
  );
};

export default Details;
