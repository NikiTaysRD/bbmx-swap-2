import { AtomBox, AtomBoxProps } from "@pancakeswap/ui";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { pageVariants } from "./SwapWidget.css";
import { Header } from "../Menu/Header";

type SwapPageProps = AtomBoxProps & {
  removePadding?: boolean;
  hideFooterOnDesktop?: boolean;
  noMinHeight?: boolean;
  helpUrl?: string;
  helpImage?: ReactNode;
  externalText?: string;
  externalLinkUrl?: string;
};

export const SwapPage = ({
  removePadding,
  noMinHeight,
  children,
  hideFooterOnDesktop,
  helpUrl,
  helpImage,
  externalText,
  externalLinkUrl,
  ...props
}: SwapPageProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AtomBox className={pageVariants({ removePadding, noMinHeight })} {...props}>
        <Header />
        {children}
        <AtomBox display="flex" flexGrow={1} />
        <AtomBox display={["block", null, null, hideFooterOnDesktop ? "none" : "block"]} width="100%">
          {/* <SwapFooter */}
          {/*   externalText={externalText} */}
          {/*   externalLinkUrl={externalLinkUrl} */}
          {/*   helpUrl={helpUrl} */}
          {/*   helpImage={helpImage} */}
          {/* /> */}
        </AtomBox>
      </AtomBox>
    </QueryClientProvider>
  );
};
