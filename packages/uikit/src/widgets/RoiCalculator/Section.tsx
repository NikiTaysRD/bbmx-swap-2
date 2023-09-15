import { PropsWithChildren, ReactNode } from "react";
import { SpaceProps } from "styled-system";

import { Box, Text } from "../../components";

export function Section({ title, children, ...rest }: { title?: ReactNode } & PropsWithChildren & SpaceProps) {
  return (
    <Box mb="24px" width="100%" {...rest}>
      <Text color="#4e09f8" bold fontSize="12px" textTransform="uppercase" mb="16px">
        {title}
      </Text>
      {children}
    </Box>
  );
}
