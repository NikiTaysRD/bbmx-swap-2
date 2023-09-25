import styled from "styled-components";
import { baseDisplay } from "../../../../../../../apps/web/src/pages/_app";

const Label = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSubtle};
  text-align: left;
`;

const ContentContainer = styled.div`
  min-height: 24px;
  display: flex;
  align-items: center;
`;

interface CellLayoutProps {
  label?: string;
}

const CellLayout: React.FC<React.PropsWithChildren<CellLayoutProps>> = ({ label = "", children }) => {
  return (
    <div>
      {label && (
        <Label
          className={baseDisplay.className}
          style={{ color: "#a0a3c4", letterSpacing: "0.75px", fontSize: "13px", lineHeight: "160%" }}
        >
          {label}
        </Label>
      )}
      <ContentContainer>{children}</ContentContainer>
    </div>
  );
};

export default CellLayout;
