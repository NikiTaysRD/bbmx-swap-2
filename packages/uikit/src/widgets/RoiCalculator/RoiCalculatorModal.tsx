import { useTranslation } from "@pancakeswap/localization";
import styled from "styled-components";

import { RoiCalculatorProps, RoiCalculator } from "./RoiCalculator";
import { mobileFooterHeight, Modal, ModalBody, ModalV2, ModalV2Props } from "../Modal";

export const StyledModal = styled(Modal)`
  font-family: "Base Display", sans-serif;

  & > :nth-child(2) {
    padding: 0;
  }

  ${ModalBody} {
    max-height: calc(80vh - ${mobileFooterHeight}px);
    ${({ theme }) => theme.mediaQueries.md} {
      max-height: 80vh;
    }
  }
`;

export function RoiCalculatorModal({
  isOpen,
  closeOnOverlayClick,
  onDismiss,
  ...rest
}: RoiCalculatorProps & ModalV2Props) {
  const { t } = useTranslation();

  return (
    <ModalV2 onDismiss={onDismiss} isOpen={isOpen} closeOnOverlayClick={closeOnOverlayClick}>
      <StyledModal title={t("ROI Calculator")}>
        <RoiCalculator {...rest} />
      </StyledModal>
    </ModalV2>
  );
}
